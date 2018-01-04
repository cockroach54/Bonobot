// -------------for rcp api call
function reqSaveMongo(){
    var httpRequest;
    if(window.XMLHttpRequest) httpRequest = new XMLHttpRequest();
    else if(window.ActiveXObject) httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
    var url= window.location.origin;
    url += '/api/saveMongo';
    console.log(url);
    var headers ={  //key 요구가 없네...
      'Accept': 'application/json'
    };
    if(endTime) endTime = new Date()
    var payloads = {
      'user': user,
      'userLogMem': userLogMem,
      'elizaLogMem': elizaLogMem,
      'allLogMem': elizaLines,
      'dialogSqnc': ocarMem.join(' '),
      'rulesMem': rulesMem.join(' '),
      'liwcTop3': (domain)? domain: [],
      'startTime': startTime.toString(),
      'endTime': endTime.toString(),
      'duration': (endTime-startTime)/1000,
    };

    return new Promise((resolve, reject)=>{
      httpRequest.open('POST', url, true);
      for (key in headers){
        httpRequest.setRequestHeader(key, headers[key]);            
      }
      httpRequest.send(JSON.stringify(payloads));
      
      httpRequest.onreadystatechange = function(){
          if(httpRequest.readyState==4){
              if(httpRequest.status==200){ //이건 클라이언트꺼 서버것 아님
                  var res = httpRequest.responseText;
                  // res = JSON.parse(res);
                  resolve(res);
              }
              else{
                console.error('server has errors.');
                reject();
              }
          }
      };
    });
  }

  function reqClassify(userLogMem){
    var httpRequest;
    if(window.XMLHttpRequest) httpRequest = new XMLHttpRequest();
    else if(window.ActiveXObject) httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
    var url= window.location.origin;
    url += '/api/lable';
    // console.log(url);
    var headers ={  //key 요구가 없네...
      'Accept': 'application/json'
    };
    var payloads = {
      'userLogMem': userLogMem,
    };

    return new Promise((resolve, reject)=>{
      httpRequest.open('POST', url, true);
      for (key in headers){
        httpRequest.setRequestHeader(key, headers[key]);            
      }
      httpRequest.send(JSON.stringify(payloads));
      
      httpRequest.onreadystatechange = function(){
          if(httpRequest.readyState==4){
              if(httpRequest.status==200){ //이건 클라이언트꺼 서버것 아님
                  var res = httpRequest.responseText;
                  // res = JSON.parse(res);
                  resolve(res);
              }
              else{
                var err = 'Server has errors. Classfier is not used now.';
                reject(err);
              }
          }
      };
    });
  }

  function reqRefine(sentense){
    var httpRequest;
    if(window.XMLHttpRequest) httpRequest = new XMLHttpRequest();
    else if(window.ActiveXObject) httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
    var url= window.location.origin;
    url += '/api/refine';
    // console.log(url);
    var headers ={  //key 요구가 없네...
      'Accept': 'application/json'
    };
    var payloads = {
      'sentense': sentense,
    };

    return new Promise((resolve, reject)=>{
      httpRequest.open('POST', url, true);
      for (key in headers){
        httpRequest.setRequestHeader(key, headers[key]);            
      }
      httpRequest.send(JSON.stringify(payloads));
      
      httpRequest.onreadystatechange = function(){
          if(httpRequest.readyState==4){
              if(httpRequest.status==200){ //이건 클라이언트꺼 서버것 아님
                  var res = httpRequest.responseText;
                  // res = JSON.parse(res);
                  resolve(res);
              }
              else{
                console.error('server has errors.');
                reject();
              }
          }
      };
    });
  }

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

  function postContents(sentense){
    // return new Promise((resolve, reject)=> resolve(null)); // 임시용

    if(!sentense) sentense='empty sentense';

    var httpRequest;
    if(window.XMLHttpRequest) httpRequest = new XMLHttpRequest();
    else if(window.ActiveXObject) httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
    var id = "5a1f7be7cd0da3058ec0579f"; // Choi
    var url="https://app.receptiviti.com/v2/api/person";
    url += '/'+id+'/contents';
    var headers ={  //key 요구가 없네...
      'Content-Type': 'application/json',
      'Accept': 'application/hal+json',
      'X-API-SECRET-KEY': 'VJ82pPKS4UDtcjPaBzKGP0PHfL8cMrXNFa44dHlJPFA',
      'X-API-KEY': '5a0bf6c58c015505824f99ba',
    };
    var contents = {
      "content_tags": ["counseling_eve"],
      "language": "english",
      "content_source": 2,
      "recipient_id": "5a0bfa368c0155058443891a", // Eliza id
      "language_content": sentense
    };

    return new Promise((resolve, reject)=>{
      httpRequest.open('POST', url, true);
      for (key in headers){
        httpRequest.setRequestHeader(key, headers[key]);            
      }
      httpRequest.send(JSON.stringify(contents));
      
      httpRequest.onreadystatechange = function(){
          if(httpRequest.readyState==4){
              if(httpRequest.status==200){ //이건 클라이언트꺼 서버것 아님
                var res = httpRequest.responseText;
                res = JSON.parse(res);
                // console.log(res);
                resolve(res);
              }
              else{
                reject('server has errors. liwc account expired!');
              }
          }
      };
    });
  }

  function drawChart(raw){
    if(raw){

    console.log('!!!draw chart!!!');
    var data = [];
    // --- drawing d3
    document.querySelector('svg').innerHTML = null; //이전 차트 지우기

    // 차트 좌우로 스크롤 가능하게하기, 호버효과 구현, 동적인 효과, 엔터키업
      // 날짜 데이터 파싱 함수
      // var parseDate = d3.timeParse("%Y%m%d");
      // var formatTime = d3.timeFormat("%Y/%m/%d");
      // 데이터 개수
      var infoLength = Object.keys(raw).length;

      var x_min=Infinity, x_max=0, y_min=0, y_max=100;
      // var x_min=Infinity, x_max=0, y_min=Infinity, y_max=0;
      // data 스무딩 7일 단위
      var yCum = 0;
      var interval = this.interval * this.magnification;
      // for(var i=0; i<infoLength; i++){      
      //   if(i!==0 && i%interval==0){
      //     if(xVal<x_min) x_min = xVal;
      //     if(xVal>x_max) x_max = xVal;
      //     if(yCum<y_min) y_min = yCum;
      //     if(yCum>y_max) y_max = yCum;
      //     data.push(
      //       {
      //         x: parseDate(keyword.day_fqs[i-3*this.magnification]['date']),
      //         y: yCum
      //       }
      //     );       
      //     yCum = 0;
      //   }

      //   var xVal = parseDate(keyword.day_fqs[i]['date']);
      //   var yVal = keyword.day_fqs[i]['number of keyword'];//.replace(/,/gi,'')*1;
      //   yCum += yVal;
      // }
      for (key in raw){
        data.push(
          {
            x: key,
            y: raw[key]
          }
        );
      }
      data = data.sort((a,b)=> b.y-a.y)
                  .filter((d,i)=>{return i<10});
      domain = [];
      data.forEach((el, id) => {
        domain.push(el.x);
      });

      var liwc = document.querySelectorAll('input.liwc');
      for(var i=0; i<liwc.length; i++){
        liwc[i].value = domain[i];
      }

      var margin = {top: 20, right: 40, bottom: 20, left: 40},
      width = 400 - margin.left - margin.right,
      height = 150 - margin.top - margin.bottom;
      // *(data.length-1)/data.length 이거 없으면 바 하나 넘어감
      var bandwidth = width/data.length*(data.length-1)/data.length - 2; 

    // var x = d3.scale.ordinal() //v3.x
    // var x = d3.scaleOrdinal() 
    var x = d3.scaleBand() 
        // .domain(d3.extent(data, function(d) {return d.x;}))
        .domain(domain)
        // .domain(Object.keys(raw))
        // .rangePoints([0, width]);
        .range([0, width]);
    
    // var y = d3.scale.linear() //v3.x
    var y = d3.scaleLinear() 
        .domain([y_min, y_max])
        .range([height, 0]);

    var svg = d3.select("svg")
        .datum(data)
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom + 200)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    console.log('data', data);
    // console.log('min_max', x_min, x_max, y_min, y_max);

    // var xAxis = d3.svg.axis()  //v3.x
    //   .scale(x)
    //   .orient("bottom");

    // var yAxis = d3.svg.axis()
    //   .scale(y)
    //   .orient("left")
    //   .ticks(6);

    svg.append("g")
        // .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        // .call(xAxis)
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "rotate(45)")
        .attr("dy", "0.5em")
        // .attr("dx", "0.5em")
        .attr("font-size", "1.5em")
        .attr("fill", function(d, i){
          if(i<3) return "red";
          else return "gray";
        })
        // .attr("dy", ".35em")
        .style("text-anchor", "start");
    
    svg.append("g")
        // .attr("class", "axis axis--y")
        // .call(yAxis)
        .call(d3.axisLeft(y).ticks(6))
        .select('path')
    
    var pathDelay = 2000;

      // opacity - click:1, mouseover:0.8, click:0.6
      svg.selectAll(".rect")
      .data(data.filter(function(d) { return d; }))
      // .data(data.filter(d => d.y>200)) //array filter 처럼 사용가능
      .enter().append("rect")
        .attr("class", "rect")
        .attr('id', function(d, i){return 'rect'+i;})
        .attr("fill", '#26a69a')
        // .attr("fill", function(d){ return 'rgba(164, 66, 220,'+(y(d.y)/y_max)+')' })
        .attr("x", function(d){return x(d.x);})
        // .attr("y", function(d){return height;})
        .attr("width", bandwidth)
        // .attr("height", 0)
        .style('cursor', 'pointer')
        .style('z-index', 2)
        // .transition() //hidden, display = 'none' 모두 트랜지션 안먹는다
        //   .delay(function(d, i){ return pathDelay*i/infoLength })
          .attr("height", function(d){return height-y(d.y);})
          .attr("y", function(d){return y(d.y);})
        //   .attr('stroke', 'mediumpurple')
    }

    return new Promise((resolve, reject)=>{
      resolve();
    });
  }

  var socket = io.connect('http://' + document.domain + ':' + location.port);  
  function makeBalloon(dialog, flag){
    var balloon = document.createElement('div');
    var chip = document.createElement('div');
    var log = document.createElement('div');
    if(flag==0){ // 0==eliza
      balloon.setAttribute('class', 'col s10');
      chip.setAttribute('class', 'chip elizaSay');
      log.setAttribute('class', 'col s12');
      log.innerText = dialog;
      chip.innerHTML = '<img src="../static/img/chat_icon.png" alt="Contact Person"/>Bonobot';
      balloon.appendChild(chip);
      balloon.appendChild(log);
      setTimeout(function(){
        socket.emit('message', {data: balloon.outerHTML, type: 'balloon', sender: 'eliza'});
      }, elizaDelay);
    }
    else if(flag==1){ // 1==user
      balloon.setAttribute('class', 'col s10 right');
      chip.setAttribute('class', 'chip right userSay');
      log.setAttribute('class', 'col s12 right-align');
      log.innerText = dialog;
      chip.innerHTML = '<img src="../static/img/user_icon.png" alt="Contact Person"/>'+user;
      balloon.appendChild(chip);
      balloon.appendChild(log);
      socket.emit('message', {data: balloon.outerHTML, type: 'balloon'});    
    }
    else if(flag==2){ // 2==loader
      balloon.setAttribute('class', 'col s10');
      balloon.setAttribute('id', 'loader');
      chip.setAttribute('class', 'chip elizaSay');
      log.setAttribute('class', 'col s12');
      log.innerHTML = '<img src="../static/img/loader.gif"/ style="height:50px; margin-left:30px;">';
      chip.innerHTML = '<img src="../static/img/chat_icon.png" alt="Contact Person"/>Bonobot';      
      balloon.appendChild(chip);
      balloon.appendChild(log);
      socket.emit('message', {data: balloon.outerHTML, type: 'balloon'});    
    }
    return balloon;
  }

  function devMode(){
    document.body.style.width = '1000px';
    var chat = document.getElementById('chat');
    var dev = document.getElementById('dev');
    var wrap = document.createElement('div');
    chat.setAttribute('class', 'col s6');
    dev.setAttribute('class', 'col s6');
    dev.style.display = 'initial';
    wrap.setAttribute('class', 'row');
    wrap.appendChild(chat);
    wrap.appendChild(dev);
    document.body.appendChild(wrap);
  }

  function toggleProgress(){
    // var bar = document.getElementById('pBar');
    // if(bar.getAttribute('class')=='indeterminate') bar.setAttribute('class', 'determinate');
    // else bar.setAttribute('class', 'indeterminate');
  }

  // ------------- setting -------------
  var devFlag = false;  // 대시보드 보기
  var userDelay = 10000; // 유저 답변 없을때 기다리는 시간
  var elizaDelay = 2500; // eliza 답변 기다리는 시간
  var p2Length = 5; // phase2 length //10
  var p3Length = 18; // phase3 length //15
  var verP3 = 1; // phase3 cycle
  var user = 'You'; // default user name
  var pastSize = 1; // userLogMem에서 몇번째 이전 키워드까지 돌아볼지

  function setEliza(p2, p3, ver){
    p2Length = p2;
    p3Length = p3;
    verP3 = ver;
    var cycle; 
    if(verP3==1) cycle = 'CRAC';
    else if(verP3==2) cycle = 'CAORC';
    console.log('Settigg completed\n phase2 length is', p2Length, ', phase3 length is', p3Length);
    console.log('phase3 cycle:', cycle);
  }
