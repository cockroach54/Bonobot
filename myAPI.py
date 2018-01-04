# ---------------------- liwc
import requests
import json
import asyncio

async def postContent(cmt):
    loop = asyncio.get_event_loop()
    URL="https://app.receptiviti.com/v2/api/person/59def3a3dc8a68057102abbb/contents"
    headers = {'Content-Type': 'application/json',
          'Accept': 'application/hal+json',
          'X-API-SECRET-KEY': 'VJ82pPKS4UDtcjPaBzKGP0PHfL8cMrXNFa44dHlJPFA',
          'X-API-KEY': '5a0bf6c58c015505824f99ba',
          }
    content = {
          "content_tags": ["counseling"],
          "language": "english",
          "content_source": 1,
          "recipient_id": "5a0bfa368c0155058443891a",
          "language_content": cmt
    }
    # run_in_executor() 로 kwargs 못보내므로 미리 설정
    s = requests.Session()
    s.headers.update(headers)
#     다행히도 post(url, body)형태로 사용가능
    task = loop.run_in_executor(None, s.post, URL, json.dumps(content))
    res = await task
#     print(res.request.headers)
#     print(res.request.body)
    res = res.json()
    return res['receptiviti_scores']['percentiles']
    # return res

async def getPerson(name):
  loop = asyncio.get_event_loop()
  URL = "https://app.receptiviti.com/v2/api/person"
  URL += '?name='+name
  headers = {
    "Accept":"application/hal+json",
    'X-API-SECRET-KEY': 'VJ82pPKS4UDtcjPaBzKGP0PHfL8cMrXNFa44dHlJPFA',
    'X-API-KEY': '5a0bf6c58c015505824f99ba',
  }
  s = requests.Session()
  s.headers.update(headers)

  task = loop.run_in_executor(None, s.get, URL) # async resolved
  res = await task
  res = res.json()
  return res
#--------------------------------------