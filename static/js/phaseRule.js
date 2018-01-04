// console.log('---phase rule loaded---');

/* 
전체적인 페이즈 흐름. 이 흐름을 OCAR을 이용해 구성
OC는 대부분 의문문 AR은 대부분 평서문, 그러나 에외도 있음
---phase1---
인사 및 OQ guide
---phase2---
문제 탐색 problem exploration
 - O,R 이 주를 이룸. 간혹 C,A 섞어줌
---phase3---
변화의 동기 Motivation for Change
 - R보다는 A의 비중 늘리기... 근데 A를 늘리면 내담자 대답이 애매함
---phase4---
마무리 Wrap up, ending

OCAR- 0: O, 1: C, 2: A, 3: R
*/

var phaseState = 0;
// // 정해진 순서로 로드
// var phaseCursor = 0;
// var phaseRule2 = [0,0,3,1,0,3,0,2,1,0,3];
// var phaseRule3 = [1,0,2,1,1,3,2,0,1,1,2,3];

// 확률로 로드
// var pr2 = 
// var pr3 = Math.random()

/* 
-1=padding, 5=O|C, 6=A|R
엘리자와의 대화가 자연스러워질 수 있도록 만드는 최후 확인 조건
 a - 질문이 너무 많다 - O|C 가 두개오면 다음은 무조건 A|R
 b0 - A 이후엔 무조건 C
 b1 - A|R 두개 이후엔 무조건 O|C
 c - 맨 처음엔 -1,-1 참조해서 R 뱉는다.
 d - 아무룰도 없으면 랜덤
앞의 대답 두개까지 참조.

var atomicRule = [
  ['-1','-1','c'],
  ['1','-10123','e'],
  ['-101','01','a-'],
  ['-123','23','b1-'],
  // 아래는 디폴트 룰
  ['-10123','-10123','d-'],
];
*/

// 엘리자가 말한 ocar값 저장
// 앞에 두개 참조하므로 맨처음엔 -1,-1 채워줌 
var ocarMem = [-1,-1];
var rulesMem = [];

// ocar메모리 참조해서 대답할 ocar atom리턴
function checkOCAR(ocarMem, text){
  var atom; // return value
  var pre = ocarMem[ocarMem.length-1];
  var ppre = ocarMem[ocarMem.length-2];

  // var crtRule = atomicRule[i];
  // var rule = crtRule[2];

  if(phaseState==2){  // R O R O
    if(pre==0 || pre==-1) atom = 3;
    else if(pre==3) atom = 0;
  }
  // various phase3 cycles
  else if(phaseState>=3 && verP3==1){ // C R A C + O->R
    if(pre==1) atom = 3;
    else if(pre==3) atom = 2;
    else if(pre==2) atom = 1;
    else if(pre==0) atom = 3;
  }
  else if(phaseState>=3 && verP3==2){ // C A O R C
    if(pre==1) atom = 2;
    else if(pre==2) atom = 0;
    else if(pre==0) atom = 3;
    else if(pre==3) atom = 1;
  }

  // rulesMem.push(rule);

  // 상대방의 질문에 대한 대답 처리 ex. //?, really? 
  if(!timeoverFlag && text.indexOf('?')>-1){
    phaseState==2? atom = 3: atom = 2;
  }
  document.getElementById('ocar').value = atom;
  return atom;
}


// 문장갯수로 페이즈 변경
function checkPhase(logLength){
  // 15문장 넘으면 phase2 -> 3로 변경
  var p2AllLogLength = guides.length + oqs.length + p2Length;
  var p3AllLogLength = p2AllLogLength + p3Length;
  var phaseChecker = document.querySelector('span#phaseChecker');
  if(logLength>p3AllLogLength-1){
    console.log('######## PHASE 4 ########');    
    phaseState=4;  
    phaseChecker.style.color='black';    
  }
  else if(logLength>p2AllLogLength-1){
    console.log('######## PHASE 3 ########');
    phaseState=3;
    phaseChecker.style.color='yellow';    
  }
  else if(oqCnt>oqs.length-1){
    console.log('######## PHASE 2 ########');
    phaseState=2;
    phaseChecker.style.color='pink';
  }
  else if(oqCnt>0){
    console.log('######## PHASE 1 ########');
    phaseState=1;
  }
}

//array shuffle
function shuffle(a) {
  var j, temp, i;
  for (i = a.length; i; i -= 1) {
      j = Math.floor(Math.random() * i);
      temp = a[i - 1];
      a[i - 1] = a[j];
      a[j] = temp;
  }
}