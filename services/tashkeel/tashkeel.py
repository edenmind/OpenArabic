import mishkal.tashkeel
from flask import Flask
from flask import request

app = Flask(__name__)


def get_vowels(unvoweled):
    voweler = mishkal.tashkeel.TashkeelClass()
    voweled = voweler.tashkeel(unvoweled)
    return voweled


@app.route('/')
def hello_world():
    unvoweled = request.args.get('unvoweled')
    voweled = get_vowels(unvoweled)
    return voweled


if __name__ == '__main__':
    app.run()
