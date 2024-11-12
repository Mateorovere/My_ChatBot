from flask import Flask, request, jsonify
from flask_cors import CORS
import ollama  # Importing the Ollama API

app = Flask(__name__)
CORS(app, resources={r"/chat": {"origins": "*"}}, headers='Content-Type', expose_headers='Content-Type', methods=['OPTIONS', 'POST', 'GET'])

# Replace your model with Ollama's Llama3.1 model
model_name = "llama3.2:3b"

# Leer instrucciones y resumen
with open('data/instructions.txt', 'r', encoding='utf-8') as f:
    instructions = f.read()

with open('data/resume.txt', 'r', encoding='utf-8') as f:
    resume = f.read()

# Preparar el prompt del sistema
system_prompt = f"""
{instructions}

Resumen:
{resume}
"""

@app.route('/chat', methods=['POST'])
def chat():
    try:
        data = request.get_json()
        context = data.get('context', '')
        question = data.get('question', '')

        # Preparar los mensajes de la conversación
        messages = [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": context},
            {"role": "user", "content": question}
        ]

        # Generar una respuesta utilizando Ollama sin streaming
        response = ollama.chat(
            model=model_name,
            messages=messages
        )

        # Obtener el contenido de la respuesta
        full_response = response['message']['content']

        return jsonify({'response': full_response})

    except Exception as e:
        app.logger.error(f"Error durante el procesamiento del chat: {e}", exc_info=True)
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
