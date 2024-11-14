from flask import Blueprint, jsonify
import requests
from config import Config

# Criar um blueprint para as rotas de notícias
news_routes = Blueprint('news_routes', __name__)

@news_routes.route('/api/news', methods=['GET'])
def get_crypto_news():
    try:
        url = f"{Config.NEWSAPI_BASE_URL}/everything"
        params = {
            "q": "cryptocurrency",
            "language": "en",
            "sortBy": "publishedAt",
            "apiKey": Config.NEWSAPI_KEY
        }
        response = requests.get(url, params=params)
        response.raise_for_status()
        data = response.json()
        return jsonify(data["articles"]), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
