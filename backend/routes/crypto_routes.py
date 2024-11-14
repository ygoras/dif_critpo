
from flask import Blueprint, jsonify, request
from binance.client import Client
from config import Config

crypto_routes = Blueprint('crypto_routes', __name__)

# Inicializar o cliente da Binance
client = Client(api_key=Config.BINANCE_API_KEY, api_secret=Config.BINANCE_API_SECRET)

# Função para calcular RSI (indicador técnico)
def calculate_rsi(prices, period=14):
    gains, losses = [], []
    for i in range(1, len(prices)):
        change = prices[i] - prices[i - 1]
        gains.append(max(0, change))
        losses.append(max(0, -change))
    avg_gain = sum(gains[:period]) / period
    avg_loss = sum(losses[:period]) / period
    rs = avg_gain / avg_loss if avg_loss != 0 else 0
    rsi = 100 - (100 / (1 + rs))
    return rsi

# Função para calcular MACD (indicador técnico)
def calculate_macd(prices, short_period=12, long_period=26, signal_period=9):
    short_ema = sum(prices[:short_period]) / short_period
    long_ema = sum(prices[:long_period]) / long_period
    macd_line = short_ema - long_ema
    signal_line = sum([macd_line] * signal_period) / signal_period  # Placeholder
    return macd_line - signal_line

@crypto_routes.route('/api/crypto', methods=['GET'])
def get_crypto_data():
    try:
        # Criptomoedas pré-definidas
        groups = {
            "group1": ["BTCUSDT", "ETHUSDT", "BNBUSDT", "XRPUSDT", "ADAUSDT"],  # Consolidadas
            "group2": ["SOLUSDT", "DOTUSDT", "LINKUSDT", "MATICUSDT", "AVAXUSDT"],  # Promissoras
            "group3": ["SHIBUSDT", "DOGEUSDT", "APEUSDT", "SANDUSDT", "GALAUSDT"]  # Emergentes
        }
        
        crypto_data = {"group1": [], "group2": [], "group3": []}

        # Buscar informações de mercado para cada grupo
        for group_name, symbols in groups.items():
            for symbol in symbols:
                ticker = client.get_ticker(symbol=symbol)
                historical_klines = client.get_historical_klines(
                    symbol, Client.KLINE_INTERVAL_1DAY, "30 days ago UTC"
                )
                close_prices = [float(kline[4]) for kline in historical_klines]

                crypto_data[group_name].append({
                    "symbol": symbol,
                    "price": float(ticker["lastPrice"]),
                    "volume": float(ticker["volume"]),
                    "price_change_24h": float(ticker["priceChangePercent"]),
                    "rsi": calculate_rsi(close_prices),
                    "macd": calculate_macd(close_prices),
                })

        return jsonify(crypto_data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@crypto_routes.route('/api/crypto/news', methods=['GET'])
def get_crypto_news():
    try:
        symbol = request.args.get('symbol', '')
        if not symbol:
            return jsonify({"error": "Missing 'symbol' parameter"}), 400

        # Simulação de busca de notícias para o símbolo
        news = [
            {"title": f"Notícia relevante sobre {symbol}", "link": "https://example.com/news1"},
            {"title": f"Análise técnica para {symbol}", "link": "https://example.com/news2"},
            {"title": f"Atualização do mercado de {symbol}", "link": "https://example.com/news3"}
        ]

        return jsonify({"symbol": symbol, "news": news}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
