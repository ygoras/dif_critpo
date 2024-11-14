from flask import Blueprint, jsonify
from binance.client import Client
from config import Config
import numpy as np
import pandas as pd

crypto_routes = Blueprint('crypto_routes', __name__)

# Inicializar o cliente da Binance
client = Client(api_key=Config.BINANCE_API_KEY, api_secret=Config.BINANCE_API_SECRET)

def calculate_ema(prices, period=20):
    """
    Calcula a EMA (Exponential Moving Average).
    """
    if len(prices) < period:
        return None
    return float(pd.Series(prices).ewm(span=period).mean().iloc[-1])

def calculate_adx(prices, period=14):
    """
    Calcula o ADX (Average Directional Index).
    """
    if len(prices) < period + 1:
        return None
    high = pd.Series(prices)
    low = pd.Series(prices)
    close = pd.Series(prices)

    plus_dm = high.diff()
    minus_dm = low.diff()

    plus_dm[plus_dm < 0] = 0
    minus_dm[minus_dm > 0] = 0

    tr = pd.concat([high - low, abs(high - close.shift()), abs(low - close.shift())], axis=1).max(axis=1)
    atr = tr.rolling(window=period).mean()

    plus_di = 100 * (plus_dm.rolling(window=period).mean() / atr)
    minus_di = 100 * (minus_dm.abs().rolling(window=period).mean() / atr)
    dx = 100 * (abs(plus_di - minus_di) / abs(plus_di + minus_di))
    adx = dx.rolling(window=period).mean()

    return float(adx.iloc[-1])

def calculate_stochastic(prices, period=14):
    """
    Calcula o Stochastic Oscillator.
    """
    if len(prices) < period:
        return None
    close = pd.Series(prices)
    lowest_low = close.rolling(window=period).min()
    highest_high = close.rolling(window=period).max()

    stochastic = 100 * ((close - lowest_low) / (highest_high - lowest_low))
    return float(stochastic.iloc[-1])

def calculate_rsi(prices, period=14):
    """
    Calcula o RSI (Relative Strength Index).
    """
    if len(prices) < period:
        return None  # Não há dados suficientes para o cálculo

    # Calculando os ganhos e perdas
    gains = []
    losses = []
    for i in range(1, len(prices)):
        change = prices[i] - prices[i - 1]
        if change > 0:
            gains.append(change)
            losses.append(0)
        else:
            gains.append(0)
            losses.append(abs(change))

    # Calculando as médias dos ganhos e perdas
    avg_gain = sum(gains[:period]) / period
    avg_loss = sum(losses[:period]) / period

    for i in range(period, len(prices)):
        change = prices[i] - prices[i - 1]
        gain = max(change, 0)
        loss = abs(min(change, 0))

        avg_gain = ((avg_gain * (period - 1)) + gain) / period
        avg_loss = ((avg_loss * (period - 1)) + loss) / period

    # Evitar divisão por zero
    if avg_loss == 0:
        return 100

    rs = avg_gain / avg_loss
    rsi = 100 - (100 / (1 + rs))
    return rsi

def calculate_macd(prices):
    """
    Calcula o MACD (Linha MACD, Linha de Sinal e Histograma).
    """
    if len(prices) < 26:  # Certificar-se de que há dados suficientes para o cálculo
        return {"macd_line": 0, "signal_line": 0, "histogram": 0}
    
    short_window = 12
    long_window = 26
    signal_window = 9

    short_ema = np.array(pd.Series(prices).ewm(span=short_window).mean())
    long_ema = np.array(pd.Series(prices).ewm(span=long_window).mean())
    macd_line = short_ema - long_ema
    signal_line = np.array(pd.Series(macd_line).ewm(span=signal_window).mean())
    macd_histogram = macd_line - signal_line

    return {
        "macd_line": float(macd_line[-1]),
        "signal_line": float(signal_line[-1]),
        "histogram": float(macd_histogram[-1]),
    }

def get_historical_data(symbol):
    """
    Busca dados históricos da Binance para a moeda especificada.
    """
    try:
        klines = client.get_historical_klines(
            symbol, Client.KLINE_INTERVAL_1DAY, "30 days ago UTC"
        )
        return [{"date": int(kline[0]), "price": float(kline[4])} for kline in klines]  # Timestamp e preço de fechamento
    except Exception as e:
        print(f"Erro ao buscar dados históricos para {symbol}: {e}")
        return []

@crypto_routes.route('/api/crypto', methods=['GET'])
def get_crypto_data():
    try:
        symbols = [
            "BTCUSDT", "ETHUSDT", "BNBUSDT", "ADAUSDT", "XRPUSDT",
            "SOLUSDT", "DOTUSDT", "DOGEUSDT", "SHIBUSDT", "LTCUSDT",
            "UNIUSDT", "BCHUSDT", "LINKUSDT", "MATICUSDT", "XLMUSDT"
        ]

        def fetch_data(symbols):
            data = []
            for symbol in symbols:
                try:
                    ticker = client.get_ticker(symbol=symbol)
                    historical_prices = get_historical_data(symbol)
                    prices = [p["price"] for p in historical_prices] if historical_prices else []

                    rsi = calculate_rsi(prices)
                    macd = calculate_macd(prices)
                    ema = calculate_ema(prices)
                    adx = calculate_adx(prices)
                    stochastic = calculate_stochastic(prices)

                    data.append({
                        "symbol": symbol,
                        "price": float(ticker.get("lastPrice", 0)),
                        "price_change_24h": float(ticker.get("priceChangePercent", 0)),
                        "market_cap": float(ticker.get("quoteVolume", 0)),
                        "volume": float(ticker.get("volume", 0)),
                        "rsi": rsi if rsi is not None else "N/A",
                        "macd": macd["histogram"] if macd else "N/A",
                        "ema": ema if ema is not None else "N/A",
                        "adx": adx if adx is not None else "N/A",
                        "stochastic": stochastic if stochastic is not None else "N/A",
                        "historicalData": historical_prices,
                    })
                except Exception as e:
                    print(f"Erro ao processar {symbol}: {e}")
                    data.append({"symbol": symbol, "error": str(e)})
            return data

        return jsonify({
            "group1": fetch_data(symbols[:5]),
            "group2": fetch_data(symbols[5:10]),
            "group3": fetch_data(symbols[10:]),
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500