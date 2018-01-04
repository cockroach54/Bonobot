# from werkzeug.wrappers import Request, Response
import sys, json
from flask import Flask, render_template, url_for, session,\
redirect, escape, send_from_directory, request#, json
import os
import asyncio
from myAPI import *
from classifier import classify
from refinery import refine

# --- for mongoDB
import pymongo, datetime
client = pymongo.MongoClient('mongodb://lsw:elizaproject2017@ds119585.mlab.com:19585/eliza')
db = client.eliza
collection = db.dialogs
print('mongoDB connected...', file=sys.stdout)

# --- for sqlite3
import sqlite3
conn = sqlite3.connect('eliza.db') #확장자마다 파일 다름. 주의할것
c = conn.cursor()
c.execute('CREATE TABLE IF NOT EXISTS dialogs(user TEXT, dialogs TEXT, time TEXT)') # only once execute

# --- routing
app = Flask(__name__)

# app.add_url_rule('/favicon.ico',
#                  redirect_to=url_for('static', filename='img/logo.png'))

@app.route('/favicon.ico')
def favicon():
  return send_from_directory(os.path.join(app.root_path, 'static'), 'img/favicon.png')

@app.route("/")
def login():
  print('log-in page called...', file=sys.stdout)  
  # return render_template('login.html')
  return render_template('index.html')  

@app.route('/index')
def index():
  print('Main page called...', file=sys.stdout)
  return render_template('index.html')

@app.route('/api/login', methods=['POST'])
def api_login():
  # requet parsing, 파이썬은 기본적으로 유니코드, 웹은 utf8
  body = json.loads(request.data.decode('utf-8')) # json.dumps()
  print(body, file=sys.stdout)
  name = body['name']

  asyncio.set_event_loop(asyncio.new_event_loop())
  loop = asyncio.get_event_loop()

  res = loop.run_until_complete(getPerson(name))
  print(res, file=sys.stdout)

  return json.dumps(res[0])
  # return res[0]['name']

@app.route('/api/lable', methods=['POST'])
def toClassifier():
  # requet parsing, 파이썬은 기본적으로 유니코드, 웹은 utf8
  body = json.loads(request.data.decode('utf-8')) # json.dumps()
  dialogs = body['userLogMem']
  print('Raw:\t', dialogs, file=sys.stdout)
  

  # asyncio.set_event_loop(asyncio.new_event_loop())
  # loop = asyncio.get_event_loop()

  # res = loop.run_until_complete(getPerson(name))
  # print(res, file=sys.stdout)
  pred, h = classify([' '.join(dialogs)])
  print('Category:', pred, ', Point:', h, file=sys.stdout)
  
  # 플라스크는 무조건 문자열 리턴인듯 ... 
  return str(pred[-1])

@app.route('/api/refine', methods=['POST'])
def toRefinery():
  # requet parsing, 파이썬은 기본적으로 유니코드, 웹은 utf8
  body = json.loads(request.data.decode('utf-8')) # json.dumps()
  input_ = body['sentense']
  # print(input_, file=sys.stdout)
  
  # 여러문장 한번에 배열로 오는거 현재 막아둠
  output_ = refine([input_])
  output_ = output_[0]
  # print(output_, file=sys.stdout)
  
  # 플라스크는 무조건 문자열 리턴인듯 ... 
  return (output_)

@app.route('/api/saveMongo', methods=['POST'])
def saveMongo():
  body = json.loads(request.data.decode('utf-8')) # json.dumps()
  collection.insert({
    'user':body['user'],
    'userLogMem': body['userLogMem'],
    'elizaLogMem': body['elizaLogMem'],
    'allLogMem': body['allLogMem'],
    'dialogSqnc': body['dialogSqnc'],
    'rulesMem': body['rulesMem'],
    'liwcTop3': body['liwcTop3'],
    'startTime': body['startTime'],
    'endTime': body['endTime'],
    'duration': body['duration'],
    # 'time': str(datetime.datetime.now())
  })

# # sqlite3.ProgrammingError: SQLite objects created in a thread can only be used in that same thread.The object was created in thread id 18912 and this is thread id 17740 
# # api 처리하는 쓰레드가 메인 쓰레드와 달라서 안되는듯
#   doc = '. '.join(body['dialogs'])
#   c.execute('INSERT INTO dialogs VALUES('+body['user']+','+doc+','+ str(datetime.datetime.now())+')')
#   conn.commit()
#   # c.close()
#   # conn.close()

  return body['user']

# -------------------- 여기부턴 예비. 지금은 아직 안쓰임
@app.route('/api/post', methods=['POST'])
def api_post():
  # body로 liwc보내 코멘트 받음
  body = json.loads(request.data.decode('utf-8')) # json.dumps()
  print(body, file=sys.stdout)
  asyncio.set_event_loop(asyncio.new_event_loop())
  loop = asyncio.get_event_loop()

  res = loop.run_until_complete(postContent(body))
  # print(res, file=sys.stdout)
  return str(res) #응답은 문자열로 안하면 에러남

@app.route('/api/test', methods=['POST'])
def api_test():
    body = json.loads(request.data) # json.dumps()
    print(body['name'], file=sys.stdout)
    return 'nope'


# # ---------------------- liwc
# import requests
# import json
# import asyncio

# async def postContent(cmt):
#     loop = asyncio.get_event_loop()
    
#     URL="https://app.receptiviti.com/v2/api/person/59def3a3dc8a68057102abbb/contents"
#     headers = {'Content-Type': 'application/json',
#           'Accept': 'application/hal+json',
#           'X-API-SECRET-KEY': 'VhIQoWAVZDvmWwu5FZgy2fvf4ExhnbraHWywihhxT0I',
#           'X-API-KEY': '59dee762dc8a68057102abb4'}
#     content = {
#           "content_tags": ["counseling1017"],
#           "language": "english",
#           "content_source": 1,
#           "recipient_id": "59e2dc7ddc8a68056f43ca7e",
#           "language_content": cmt
#         }
#     # run_in_executor() 로 kwargs 못보내므로 미리 설정
#     s = requests.Session()
#     s.headers.update(headers)
# #     다행히도 post(url, body)형태로 사용가능
#     task = loop.run_in_executor(None, s.post, URL, json.dumps(content))
# #     task = loop.run_in_executor(None, requests.post, (URL,), dict(headers=headers, data=json.dumps(content)))

#     res = await task
# #     print(res.request.headers)
# #     print(res.request.body)
#     res = res.json()
# #     return res['receptiviti_scores']['percentiles']
# #     return res['receptiviti_scores']['percentiles']
#     return res

# async def getPerson(name):
#   loop = asyncio.get_event_loop()
#   URL = "https://app.receptiviti.com/v2/api/person"
#   URL += '?name='+name
#   headers = {
#     "Accept":"application/hal+json",
#     "X-API-SECRET-KEY":"VhIQoWAVZDvmWwu5FZgy2fvf4ExhnbraHWywihhxT0I",
#     "X-API-KEY":"59dee762dc8a68057102abb4"
#   }
#   s = requests.Session()
#   s.headers.update(headers)

#   task = loop.run_in_executor(None, s.get, URL) # async resolved
#   res = await task
#   res = res.json()
#   return res
# #--------------------------------------

if __name__ == '__main__':
      app.run(debug=True, host='10.0.1.21', port=5000)

# 환경변수에서 gpu끄기
# set CUDA_VISIBLE_DEVICES=""
# echo %CUDA_VISIBLE_DEVICES%

# ('10.0.1.21', 5000, app) # 이더넷 고정 ip 147.47.123.184:5910 에서 포워딩
# ('10.0.1.71', 5000, app) # 무선
# ('localhost', 5000, app)