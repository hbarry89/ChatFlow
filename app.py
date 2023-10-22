import openai
from flask import Flask, request, render_template, send_from_directory
from flask_cors import cross_origin

import os
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv("OPENAI_API_KEY")

app = Flask(__name__)

# Serve the React app's index.html
@app.route('/client/public/index.html')
def serve_index():
    return send_from_directory('static', 'index.html')

@app.route('/')
def index():
    return render_template('index.html')

@app.route("/ask")
@cross_origin()
def ask():
    completions = openai.Completion.create(
        engine="text-davinci-003",
        prompt=request.args["q"],
        max_tokens=1024,
        n=1,
        stop=None,
        temperature=0.5
    )
    message = completions.choices[0].text
    return {"answers": message}

if __name__ == "__main__":
    app.run(debug=False)