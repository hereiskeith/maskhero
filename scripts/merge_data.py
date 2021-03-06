import requests
import base64

key_secrets={
    "grey":("zlscs0MHtGwSsHhR0BR2TA", "A5h4--Hrisrx0L24l-yZDg"),
    "char":('9Jjmui4TUG6IbHkD1GgiEw', 'SnQC7qv1oBkVGKza7_xMww'),
    "donvi":('Vz0MnZYKPy0ov9lNwUHrmw', '92vQmCAVk3GOODdWrm9-tw'),
}

data_sources = [
    ('con81f', 'char'),
    ('Ukw1aQ', 'grey'),
    ('lOg5eU', 'char'),
    ('RQlAnN', 'char'),
]

data_result = ('1slVSR', 'donvi')

headers={"Accept": "application/json", "Content-Type": "application/json"}

url_base = 'https://jinshuju.net/api/v1/'
        
result = []
for source in data_sources:
    secret = key_secrets[source[1]]
    code = source[0]
    print(code)
    endpoint = '/forms/%s/entries' % code
    url = url_base + endpoint
    response = requests.get(url, headers=headers, auth = (secret[0], secret[1]))
    resp_json = response.json()
    
    result += resp_json["data"]
    while(resp_json["next"] != None):
        response = requests.get(url+'?next='+str(resp_json["next"]), headers=headers, auth = (secret[0], secret[1]))
        resp_json = response.json()
        result += resp_json["data"]

import json
code = data_result[0]
endpoint = '/forms/%s' % code
url = url_base + endpoint
secret = key_secrets[data_result[1]]
list_post_data = []
for data in result:
    time = ''
    post_data = {}
    for key in data:
        if key[0:6] == 'field_' or key[0:14] == 'x_field_weixin' or key == 'created_at':
            post_data[key] = data[key]
                
    list_post_data.append(post_data)

list_post_data = sorted(list_post_data, key=lambda post_data: post_data['created_at'])
for list_post_data_val in list_post_data:
    response = requests.post(url, json = list_post_data_val, headers=headers, auth = (secret[0], secret[1]))
    print(response.text)

