import pprint

import requests


def print(x):
    pprint.pprint(x)


langinputs = {

    'en': ['myy nam is peter. i sucks at speelling in english. what is the fuck? '],
    'es': ['me no puede hablas inglais'],
    'fr': ['j''aime pas etude maths'],

}

s = requests.Session()
for lang in langinputs:
    for input in langinputs[lang]:
        payload = {
            'text': input,
            'lang':lang,
        }
        url = 'https://us-central1-project-318531836785902414.cloudfunctions.net/'
        r = s.post(url + 'correct', json=payload).json()
        print(r)

# payload = {
#     'text': 'Your mo'
# }
# r = s.post(url+'suggest', json=payload).json()
# print(r)
