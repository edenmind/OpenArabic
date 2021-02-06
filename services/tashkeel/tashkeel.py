# http://localhost:5555/?unvoweled=ARABIC_WORD

import mishkal.tashkeel
from flask import Flask
from flask import request

app = Flask(__name__)
voweler = mishkal.tashkeel.TashkeelClass()


def get_vowels(unvoweled):
    voweled = voweler.tashkeel(unvoweled)
    return voweled


@app.route('/tashkeel', methods=["GET"])
def set_vowels():
    unvoweled = request.args.get('unvoweled')
    voweled = get_vowels(unvoweled)
    return voweled


if __name__ == '__main__':
    app.run()
