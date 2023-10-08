import openai
openai.api_key = "you-wish"
from flask import Flask, request, jsonify
from flask_cors import cross_origin

app = Flask(__name__)

@app.route("/ask")
@cross_origin()
def ask():
    completions = openai.Completion.create(
        engine="text-davinci-003",
        prompt="good morning",
        max_tokens=1024,
        n=1,
        stop=None,
        temperature=0.5
    )
    message = completions.choices[0].text
    return {"answers": message}

# @app.route('/ask')
# @cross_origin()
# def ask():
#     return {"answers:": ["Yes", "No", "Maybe"]}

if __name__ == "__main__":
    app.run(debug=True)