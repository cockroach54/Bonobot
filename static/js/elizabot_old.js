/*
  elizabot.js v.1.1 - ELIZA JS library (N.Landsteiner 2005)
  Eliza is a mock Rogerian psychotherapist.
  Original program by Joseph Weizenbaum in MAD-SLIP for "Project MAC" at MIT.
  cf: Weizenbaum, Joseph "ELIZA - A Computer Program For the Study of Natural Language
      Communication Between Man and Machine"
      in: Communications of the ACM; Volume 9 , Issue 1 (January 1966): p 36-45.
  JavaScript implementation by Norbert Landsteiner 2005; <http://www.masserk.at>

  synopsis:

         new ElizaBot( <random-choice-disable-flag> )
         ElizaBot.prototype.transform( <inputstring> )
         ElizaBot.prototype.getInitial()
         ElizaBot.prototype.getFinal()
         ElizaBot.prototype.reset()

  usage: var eliza = new ElizaBot();
         var initial = eliza.getInitial();
         var reply = eliza.transform(inputstring);
         if (eliza.quit) {
             // last user input was a quit phrase
         }

         // method `transform()' returns a final phrase in case of a quit phrase
         // but you can also get a final phrase with:
         var final = eliza.getFinal();

         // other methods: reset memory and internal state
         eliza.reset();

         // to set the internal memory size override property `memSize':
         eliza.memSize = 100; // (default: 20)

         // to reproduce the example conversation given by J. Weizenbaum
         // initialize with the optional random-choice-disable flag
         var originalEliza = new ElizaBot(true);

  `ElizaBot' is also a general chatbot engine that can be supplied with any rule set.
  (for required data structures cf. "elizadata.js" and/or see the documentation.)
  data is parsed and transformed for internal use at the creation time of the
  first instance of the `ElizaBot' constructor.

  vers 1.1: lambda functions in RegExps are currently a problem with too many browsers.
            changed code to work around.
*/

// 엘리자 클래스 선언 및 프로퍼티 바인딩
// 먼저 선언후에 뒤에서 프로토타입 정의하네
// 어떤기준으로 내부 프로퍼티와 프로토타입으로 나눴지?
function ElizaBot(noRandomFlag) {
	this.noRandom= (noRandomFlag)? true:false;
	this.capitalizeFirstLetter=true;
	this.debug=false;
	this.memSize=20;
	this.version="1.1 (original)";
	this.category = 0; //0: emotion // 1: infomation // 2: other
	this.findAnotherFlag = true; //false 이면 다른 카테고리에서 키워드 안찾음
	this.atom = -1;
	if (!this._dataParsed) this._init();
	this.reset();
}

ElizaBot.prototype.reset = function() {
	this.quit=false;
	this.mem=[];	// 메모리 초기화
	// this.lastchoice=[];	// 이전 선택 초기화
	// for (var k=0; k<elizaKeywords.length; k++) {
	// 	this.lastchoice[k]=[];
	// 	var rules=elizaKeywords[k][2];
	// 	for (var i=0; i<rules.length; i++) this.lastchoice[k][i]=-1;
	// }
}

ElizaBot.prototype._dataParsed = false;

ElizaBot.prototype._init = function() {
	// install ref to global object
	var global=ElizaBot.prototype.global=self;
	// parse data and convert it from canonical form to internal use
	// produce synonym list
	var synPatterns={};
	if ((global.elizaSynons) && (typeof elizaSynons == 'object')) {
		for (var i in elizaSynons){
			synPatterns[i]='('+i+'|'+elizaSynons[i].join('|')+')';
			// console.log(	synPatterns[i]);
		}
	}
	// check for keywords or install empty structure to prevent any errors
	if ((!global.elizaKeywords) || (typeof elizaKeywords.length == 'undefined')) {
		elizaKeywords=[['###',0,[['###',[]]]]];
	}
	// 1st convert rules to regexps
	// expand synonyms and insert asterisk expressions for backtracking
	// decomposition rule 정규식 변환
	var sre=/@(\S+)/;
	var are=/(\S)\s*\*\s*(\S)/;
	var are1=/^\s*\*\s*(\S)/;
	var are2=/(\S)\s*\*\s*$/;
	var are3=/^\s*\*\s*$/;
	var wsre=/\s+/g;
	for (var k=0; k<elizaKeywords.length; k++) {
		var rules=elizaKeywords[k][2];
		elizaKeywords[k][3]=k; // save original index for sorting
		for (var i=0; i<rules.length; i++) {
			var r=rules[i];
			// check mem flag and store it as decomp's element 2
			if (r[0].charAt(0)=='$') {
				var ofs=1;
				while (r[0].charAt[ofs]==' ') ofs++;
				r[0]=r[0].substring(ofs);
				r[2]=true;
			}
			else {
				r[2]=false;
			}
			// expand synonyms (v.1.1: work around lambda function)
			var m=sre.exec(r[0]);
			while (m) {
				var sp=(synPatterns[m[1]])? synPatterns[m[1]]:m[1];
				r[0]=r[0].substring(0,m.index)+sp+r[0].substring(m.index+m[0].length);
				m=sre.exec(r[0]);
			}
			// expand asterisk expressions (v.1.1: work around lambda function)
			// * decomposition rule 정규식 변경
			if (are3.test(r[0])) {
				r[0]='\\s*(.*)\\s*';
			}
			else {
				m=are.exec(r[0]);
				if (m) {
					var lp='';
					var rp=r[0];
					while (m) {
						lp+=rp.substring(0,m.index+1);
						if (m[1]!=')') lp+='\\b';
						lp+='\\s*(.*)\\s*';
						if ((m[2]!='(') && (m[2]!='\\')) lp+='\\b';
						lp+=m[2];
						rp=rp.substring(m.index+m[0].length);
						m=are.exec(rp);
					}
					r[0]=lp+rp;
				}
				m=are1.exec(r[0]);
				if (m) {
					var lp='\\s*(.*)\\s*';
					if ((m[1]!=')') && (m[1]!='\\')) lp+='\\b';
					r[0]=lp+r[0].substring(m.index-1+m[0].length);
				}
				m=are2.exec(r[0]);
				if (m) {
					var lp=r[0].substring(0,m.index+1);
					if (m[1]!='(') lp+='\\b';
					r[0]=lp+'\\s*(.*)\\s*';
				}
			}
			// expand white space
			r[0]=r[0].replace(wsre, '\\s+');
			wsre.lastIndex=0;
		}
	}
	// now sort keywords by rank (highest first)
	elizaKeywords.sort(this._sortKeywords);
	// and compose regexps and refs for pres and posts
	ElizaBot.prototype.pres={};
	ElizaBot.prototype.posts={};
	if ((global.elizaPres) && (elizaPres.length)) {
		var a=new Array();
		for (var i=0; i<elizaPres.length; i+=2) {
			a.push(elizaPres[i]);
			ElizaBot.prototype.pres[elizaPres[i]]=elizaPres[i+1]; // 객체화
		}
		ElizaBot.prototype.preExp = new RegExp('\\b('+a.join('|')+')\\b');
	}
	else {
		// default (should not match)
		ElizaBot.prototype.preExp = /####/;
		ElizaBot.prototype.pres['####']='####';
	}
	if ((global.elizaPosts) && (elizaPosts.length)) {
		var a=new Array();
		for (var i=0; i<elizaPosts.length; i+=2) {
			a.push(elizaPosts[i]);
			ElizaBot.prototype.posts[elizaPosts[i]]=elizaPosts[i+1];
			// 객체화 {am: "are", your: "my", me: "you", myself...}
		}
		ElizaBot.prototype.postExp = new RegExp('\\b('+a.join('|')+')\\b');
	}
	else {
		// default (should not match)
		ElizaBot.prototype.postExp = /####/;
		ElizaBot.prototype.posts['####']='####';
	}
	// check for elizaQuits and install default if missing
	if ((!global.elizaQuits) || (typeof elizaQuits.length == 'undefined')) {
		elizaQuits=[];
	}
	// done
	ElizaBot.prototype._dataParsed=true;
}

ElizaBot.prototype._sortKeywords = function(a,b) {
	// sort by rank
	if (a[1]>b[1]) return -1
	else if (a[1]<b[1]) return 1
	// 둘이 랭크가 같으면
	// or original index
	else if (a[3]>b[3]) return 1
	else if (a[3]<b[3]) return -1
	else return 0;
}

ElizaBot.prototype.transform = function(text) {
	if(ocarMem[ocarMem.length-1]==-2) ocarMem.pop();  // 오타 플래그 지우기
	
	var rpl='';
	// 프로토타입은 디스바인딩 안하는듯 this == eliza
	this.quit=false;

	var hasWord = new RegExp(/\w+\?*/);
	var qstmark = new RegExp(/\?/);
	var typo = new RegExp(/\$\$\$/);
	if(hasWord.test(text)){
		// unify text string-------------
		// 이 부분을 백단으로 보낼까...???
		text=text.toLowerCase();
		//임시로.. 나중에 파이썬 토크나이징으로 대체
		text=text.replace(/[@#\$%\^&\*\(\)_\+=~`\{\[\}\]\|:;<>\/\\\t]/g, ' ');
		text=text.replace(/\s+-+\s+/g, '.');
		text=text.replace(/\s*[,\.!;]+\s*/g, '.');
		// text=text.replace(/\s*[,\.\?!;]+\s*/g, '.'); //?물음표 뺌
		text=text.replace(/\s*\bbut\b\s*/g, '.');
		text=text.replace(/\s{2,}/g, ' ');

		// split text in part sentences and loop through them
		// 여기서 단어 구분
		// parts 는 마침표 단위로 문장구분 ["dont stop me now", "have a good time", ""]
		var parts=text.split('.');
	}
	else{ // 특수문자들만 있으면 여기로 걸러짐
		// this.atom = -2;
		// ocarMem.push(this.atom);
		if(qstmark.test(text)){ // ?는 특별관리
			var rn = Math.floor(Math.random()*qsts.length);
			return qsts[rn];
		}
		else if(typo.test(text)){ // $$$ 타이핑에러
			var rn = Math.floor(Math.random()*typos.length);
			return typos[rn]; 
		}
		else{ // ? 이외 비문자들
			var rn = Math.floor(Math.random()*noWords.length);
			return noWords[rn];
		}
	}
	// ------------------------------
	// 최상단에서 랜덤 선택. 한번 인풋하면 atom은 바뀌면 안됨. 이곳에 atomicRule 삽입
	// if(timeoverFlag){
	// 	if(phaseState==2) this.atom = 0;
	// 	else if(phaseState==3){
	// 		if(ocarMem[ocarMem.length-2]==2 || ocarMem[ocarMem.length-2]==3) this.atom=1;			
	// 		else if(ocarMem[ocarMem.length-1]==2) this.atom=3;
	// 		else if(ocarMem[ocarMem.length-1]==3) this.atom=2;
	// 	}
	// }
	// else this.atom = checkOCAR(ocarMem, text);
	this.atom = checkOCAR(ocarMem, text);
	console.log('~~~~~make new ocar:',this.atom,'~~~~~');

	console.log(parts);
	// 파트들 돌면서 elizaPres 전처리 및 키워드 서칭
	for (var i=0; i<parts.length; i++) {
		var part=parts[i];
		if (part!='') {
			// check for quit expression
			for (var q=0; q<elizaQuits.length; q++) {
				if (elizaQuits[q]==part) {
					this.quit=true;
					return this.getFinal();
				}
			}
			// preprocess (v.1.1: work around lambda function)
			var m=this.preExp.exec(part);
			if (m) {
				var lp='';
				var rp=part;
				while (m) {
					lp+=rp.substring(0,m.index)+this.pres[m[1]];
					rp=rp.substring(m.index+m[0].length);
					m=this.preExp.exec(rp);
				}
				part=lp+rp;
			}
			this.sentence=part;
			// loop trough keywords
			for (var k=0; k<elizaKeywords.length; k++) {
				// search only in a specific category
				if(elizaKeywords[k][4] != this.category) continue;
				// '?'룰은 앞에 \b붙으면 안돼서 따로 만듦. 카테고리 0 으로
				var re = elizaKeywords[k][0].indexOf('?')==-1? new RegExp('\\b'+elizaKeywords[k][0]+'\\b', 'i'): new RegExp(elizaKeywords[k][0], 'i');
				//  .search() = .indexOf()
				if (part.search(re)>=0) {
					rpl = this._execRule(k);
				}
				// 현재 elizaKeywords를 큰 수부터 소팅해둬서 하나라도 걸리면 리턴임
				if (rpl!='') return rpl;
			}

			// find in a basic(Other) category
			if(this.findAnotherFlag){

				console.log('find at others category!!!');
				for (var k=0; k<elizaKeywords.length; k++) {
					// search only in a other category
					if(elizaKeywords[k][4] != 2) continue;

					if (part.search(new RegExp('\\b'+elizaKeywords[k][0]+'\\b', 'i'))>=0) {
						rpl = this._execRule(k);
					}
					if (rpl!=''){
						return rpl;
					}			
				}
			}
		}
	}
	// nothing matched try mem
	// rpl=this._memGet();
	// if nothing in mem, so try xnone
	if (rpl=='') {
		this.sentence=part;
		var k=this._getRuleIndexByKey('xnone');
		if (k>=0) rpl=this._execRule(k);
	}
	// return reply or default string
	return (rpl!='')? rpl : 'Ummm... sorry, I am at a loss for words.';
}

ElizaBot.prototype._execRule = function(k) {
	// k는 현재 키워드 인덱스
	// mem 역할용 임시코드
	// 현재 메모리 안쓰이고 있음
	// console.log('memory:', this.mem);

	var rule=elizaKeywords[k];
	var decomps=rule[2];
	var paramre=/\(([0-9]+)\)/; // ex) (2), (22), (10)...
	console.log('$$$$_exec_rule_$$$$\n',rule);
	for (var i=0; i<decomps.length; i++) {
		var m=this.sentence.match(decomps[i][0]);
		// console.log('$$$$_m_$$$$\n',m,this.sentence);
		if (m!=null) {
			var reasmbs=decomps[i][1];
			var memflag=decomps[i][2];	// 얘는 지금 코드에 없는듯
			
				
			// var ri = getRi(this.atom);
			// reasemble중에 맞는 ocar매칭
			var ri = -1;
			// 처음 탐색 인덱스 랜덤 시작위해서 셔플
			if(!this.noRandom) shuffle(reasmbs);
			
			// var x = (this.noRandom)? 0 : Math.floor(Math.random()*reasmbs.length);
			for(var x=0; x<reasmbs.length; x++){
				var ocar = reasmbs[x][1]; // reasemble OCAR value
				console.log('OCAR:', ocar,'atom_RULE:', this.atom);
				
				if(ocar==4){
					// goto 이동
					ki=this._getRuleIndexByKey(reasmbs[x][0].substring(5));
					console.log('goto finded:',elizaKeywords[k][0],'->',reasmbs[x][0].substring(5))
					if (ki>=0) return this._execRule(ki);
				}
				else if(ocar!=-1 && this.atom!=ocar && this.atom>-1) continue;				

				// 여기가 최종으로 리어셈블 결정되는 부분
				ri = x;
				ocarMem.push(this.atom);
				console.log('OCAR rule matched!!');
				console.log('$$$$_OCAR_MEM_$$$$\n',ocarMem);			
				console.log('$$$$_selected_ri_$$$$\n', decomps[i], reasmbs[ri]);			
				break;
			}
		
			if(ri==-1) return '';

			// 바로 직전 대답이랑 안겹치게 기록
			// if (((this.noRandom) && (this.lastchoice[k][i]>ri)) || (this.lastchoice[k][i]==ri)) {
			// 	ri= ++this.lastchoice[k][i];
			// 	if (ri>=reasmbs.length) {
			// 		ri=0;
			// 		this.lastchoice[k][i]=-1;
			// 	}
			// }
			// else {
			// 	this.lastchoice[k][i]=ri;
			// }

			var rpl=reasmbs[ri][0]; // reasmemble에서 고름, rpl이 골라진 대답
			if (this.debug) alert('match:\nkey: '+elizaKeywords[k][0]+
				'\nrank: '+elizaKeywords[k][1]+
				'\ndecomp: '+decomps[i][0]+
				'\nreasmb: '+rpl+
				'\nmemflag: '+memflag);
			

			// (1), (2) 등에 말 채우기 m1, m2는 ()포획 정규식에 매칭, rpl은 reassembeled
			// substitute positional params (v.1.1: work around lambda function)
			var m1=paramre.exec(rpl);
			// console.log('$$$_m1_$$$\n', m1);
			if (m1) {
				var lp='';
				var rp=rpl;
				while (m1) {
					// m은 decomposition 매치된 결과, param은 포획정규식 내부값
					var param = m[parseInt(m1[1])];
					// postprocess param
					var m2=this.postExp.exec(param);
					if (m2) {
						var lp2='';
						var rp2=param;
						// 여기 계속 돌리네
						while (m2) {
							lp2+=rp2.substring(0,m2.index)+this.posts[m2[1]];
							rp2=rp2.substring(m2.index+m2[0].length);
							m2=this.postExp.exec(rp2);
						}
						param=lp2+rp2;
					}
					lp+=rp.substring(0,m1.index)+param;
			// console.log('$$$_lp_$$$\n', lp);	ppp=m1;		
					rp=rp.substring(m1.index+m1[0].length);
			// console.log('$$$_rp_$$$\n', rp);			
					m1=paramre.exec(rp);
				}
				rpl=lp+rp;
			}
			// rpl이 최종 결과물
			rpl=this._postTransform(rpl);
			// if (memflag) this._memSave(rpl)
			// else return rpl;

			if(reasmbs[ri][0].indexOf('(')==-1 && reasmbs[ri][1]!=-1){
				console.log('"',reasmbs[ri][0],'" deleted...');
				var temp = reasmbs.splice(ri,1);
				removedRules.push(temp[0]);
			}
			return rpl;
		}
	}
	return '';
}

ElizaBot.prototype._postTransform = function(s) {
	// final cleanings
	s=s.replace(/\s{2,}/g, ' '); // trim
	s=s.replace(/\s+\./g, '.'); // 공백제거
	if ((this.global.elizaPostTransforms) && (elizaPostTransforms.length)) {
		for (var i=0; i<elizaPostTransforms.length; i+=2) {
			s=s.replace(elizaPostTransforms[i], elizaPostTransforms[i+1]);
			elizaPostTransforms[i].lastIndex=0;
		}
	}
	// capitalize first char (v.1.1: work around lambda function)
	if (this.capitalizeFirstLetter) {
		var re=/^([a-z])/;
		var m=re.exec(s);
		if (m) s=m[0].toUpperCase()+s.substring(1);
	}
	return s;
}

ElizaBot.prototype._getRuleIndexByKey = function(key) {
	for (var k=0; k<elizaKeywords.length; k++) {
		if (elizaKeywords[k][0]==key) return k;	//인덱스 리턴
	}
	return -1;
}

ElizaBot.prototype._memSave = function(t) {
	this.mem.push(t);
	if (this.mem.length>this.memSize) this.mem.shift(); // 맨 앞에 삭제ㅣ
}

ElizaBot.prototype._memGet = function() {
	if (this.mem.length) {
		if (this.noRandom) return this.mem.shift();
		else {
			var n=Math.floor(Math.random()*this.mem.length);
			var rpl=this.mem[n];
			for (var i=n+1; i<this.mem.length; i++) this.mem[i-1]=this.mem[i];
			this.mem.length--;
			return rpl;
		}
	}
	else return '';
}


// elizaData에서 랜덤 리턴
ElizaBot.prototype.getFinal = function() {
	if (!ElizaBot.prototype.global.elizaFinals) return '';
	return elizaFinals[Math.floor(Math.random()*elizaFinals.length)];
}

ElizaBot.prototype.getInitial = function() {
	if (!ElizaBot.prototype.global.elizaInitials) return '';
	return elizaInitials[Math.floor(Math.random()*elizaInitials.length)];
}


// fix array.prototype methods (push, shift) if not implemented (MSIE fix)
if (typeof Array.prototype.push == 'undefined') {
	Array.prototype.push=function(v) { return this[this.length]=v; };
}
if (typeof Array.prototype.shift == 'undefined') {
	Array.prototype.shift=function() {
		if (this.length==0) return null;
		var e0=this[0];
		for (var i=1; i<this.length; i++) this[i-1]=this[i];
		this.length--;
		return e0;
	};
}

// eof
