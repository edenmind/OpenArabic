# http://localhost:5555/?unvoweled=ARABIC_WORD

import mishkal.tashkeel
from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
voweler = mishkal.tashkeel.TashkeelClass()


def get_vowels(unvoweled):
    voweled = voweler.tashkeel(unvoweled)
    return voweled


@app.route('/tashkeel', methods=["GET"])
def set_vowels():
    unvoweled = request.args.get('unvoweled')
    voweled = get_vowels(unvoweled)
    # deepcode ignore XSS: <running inside of cluster>
    return voweled


@app.route('/health', methods=["GET"])
def health_check():
    unvoweled = "لحمد لله"
    voweled = get_vowels(unvoweled)
    return voweled


if __name__ == '__main__':
    app.run()
