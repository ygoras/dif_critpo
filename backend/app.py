from flask import Flask, jsonify
from flask_cors import CORS

# Inicializando o app
app = Flask(__name__)
CORS(app)  # Habilita CORS para o frontend acessar o backend

# Rota de teste para verificar se o servidor está funcionando
@app.route('/api/test', methods=['GET'])
def test():
    return jsonify({"message": "Backend está funcionando!"})

# Registrar as rotas (blueprints)
from routes.crypto_routes import crypto_routes
from routes.news_routes import news_routes

app.register_blueprint(crypto_routes)
app.register_blueprint(news_routes)

# Configuração para iniciar o servidor
if __name__ == '__main__':
    app.run(debug=True, port=5000)
