from flask import Flask

app = Flask(__name__)

@app.route('/ask')
def ask():
    return {"answers:": ["Yes", "No", "Maybe"]}

app.run()