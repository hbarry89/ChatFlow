import openai
from flask import Flask, request
from flask_cors import cross_origin

import os
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv("OPENAI_API_KEY")

app = Flask(__name__)

@app.route("/ask")
@cross_origin()
def ask():
    completions = openai.Completion.create(
        model="gpt-3.5-turbo-instruct",
        prompt=request.args["q"],
        max_tokens=1024,
        n=1,
        stop=None,
        temperature=0.5
    )
    message = completions.choices[0].text
    return {"answers": message}

if __name__ == "__main__":
    app.run(debug=True)