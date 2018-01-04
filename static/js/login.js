// var request = require('request');  //commonJS style
// import * as request from "request"; 
console.log('login.js loaded');

var signBtn = document.getElementById('signIn');
var logBtn = document.getElementById('logIn');
var person; // for receptiviti api test
var counselor = document.getElementById('counselor');
var user = document.getElementById('logIn_name'); // name은 예약어

var privateInfo = {
  "name":"James",
  "id":"",
  "recipient_name":"Eliza",
  "recipient_id":"",
  "dialogs":[] //["#1@hi", "#2@hello"]
}


logBtn.addEventListener('click', function(e){
  if(user.value) privateInfo.name = user.value;
  if(counselor.value) privateInfo.recipient_name = counselor.value;

  // ---for ajax call
  var httpRequest;
  if(window.XMLHttpRequest) httpRequest = new XMLHttpRequest();
  else if(window.ActiveXObject) httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
  var url="/api/login";
  var headers ={ // header configuration
    'Content-Type': 'application/json'  // 이거 설정 안하면 서버에서 못읽음 ㅜㅜ
  }
  httpRequest.open('POST', url, true);
  for (key in headers){
    httpRequest.setRequestHeader(key, headers[key]);            
  }
  httpRequest.send(JSON.stringify(privateInfo));
  console.log('call login post api');
  httpRequest.onreadystatechange = function(){
      if(httpRequest.readyState==4){
          if(httpRequest.status==200){ //이건 클라이언트꺼 서버것 아님
              var res = httpRequest.responseText;
              res = JSON.parse(res);
              console.log(res);
              // 백단 "/api/login"로 정보 보낸 뒤 로그인
              window.location.href = '/index?user='+res.name+'&id='+res._id;
              
              // getPerson(user.value).then(body=>{
              //   // console.log(res, )
              //   window.location.href = '/index?user='+res+'&id='+body._id;
              // });
          }
          else console.error('server has errors.');
      }
  };
});

document.getElementById("logIn_name").addEventListener('keyup', e => {
  if(e.keyCode === 13) loginClick();
});

// get person from RCP directly.
document.getElementById('getPerson').addEventListener('click', function(e){
  getPerson(user.value).then((res)=>console.log(res));
});

function loginClick(){
  var e = new MouseEvent('click', {
    view: window,
    bubbles: true,
    cancelable: true,
  });
  var btn = document.getElementById('logIn');
  logBtn.dispatchEvent(e);
}

//------------- rcp api fn.

function getPerson(user){
  var httpRequest;
  if(window.XMLHttpRequest) httpRequest = new XMLHttpRequest();
  else if(window.ActiveXObject) httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
  var url="https://app.receptiviti.com/v2/api/person";
  url +="?name="+user;
  var headers ={  //key 요구가 없네...
    'Accept': 'application/json',
    'X-API-SECRET-KEY': 'VJ82pPKS4UDtcjPaBzKGP0PHfL8cMrXNFa44dHlJPFA',
    'X-API-KEY': '5a0bf6c58c015505824f99ba',
  }

  return new Promise((resolve, reject)=>{
    httpRequest.open('GET', url, true);
    for (key in headers){
      httpRequest.setRequestHeader(key, headers[key]);            
    }
    httpRequest.send('null');
    
    httpRequest.onreadystatechange = function(){
        if(httpRequest.readyState==4){
            if(httpRequest.status==200){ //이건 클라이언트꺼 서버것 아님
                var res = httpRequest.responseText;
                res = JSON.parse(res);
                res.forEach(function(el, id){
                  console.log(id, el.name, el._id);
                });
                resolve(res[0]);
            }
            else{
              console.error('server has errors.');
              reject();
            }
        }
    };
  });
}

/*
signBtn.addEventListener('click', function(e){

  var httpRequest;
  if(window.XMLHttpRequest) httpRequest = new XMLHttpRequest();
  else if(window.ActiveXObject) httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
  var url="https://app.receptiviti.com/v2/api/person";
  var headers ={  //key 요구가 없네...
    'X-API-SECRET-KEY': 'VhIQoWAVZDvmWwu5FZgy2fvf4ExhnbraHWywihhxT0I',
    'X-API-KEY': '59dee762dc8a68057102abb4'
  }
  var payload = {   "name": "choi2",   "person_tags": [],   "gender": 1,   "content": {     "content_tags": [],     "language": "english",     "content_handle": "string",     "content_source": 0,     "recipient_id": "",     "language_content": "string",     "custom_fields": {}   },   "custom_fields": {   },   "person_handle": "" };
  httpRequest.open('POST', url, true);
  for (key in headers){
    httpRequest.setRequestHeader(key, headers[key]);            
  }
  httpRequest.send(JSON.stringify(payload));
  
  httpRequest.onreadystatechange = function(){
      if(httpRequest.readyState==4){
          if(httpRequest.status==200){ //이건 클라이언트꺼 서버것 아님
              var res = httpRequest.responseText;
              console.log(res);
          }
          else console.error('server has errors.');
      }
  };
});
*/