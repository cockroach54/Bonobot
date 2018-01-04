// data for elizabot.js
// entries prestructured as layed out in Weizenbaum's description
// [cf: Communications of the ACM, Vol. 9, #1 (January 1966): p 36-45.]

var guides = [ // 1207
  "Welcome! What is your name?",
  //"Hi @, I'm Bonobono. I listen to your stories and help you guide yourself. If you're ready to talk, please type 'OK'.",
  "Hi @! I'm BonoBot.",
  "I am a chatbot that listens to your stories and helps you guide yourself.",
  "Everything you say in this chat will be kept secret, so no worries!",
  "If you're ready to talk, please type 'OK' to begin.",
  "Great. Thank you for coming in today.",
  //"Good. Since your personal information is perfectly safe with me, no worries. Please type 'OK' to begin.",
];

var oqs = [
  //"Great. What would you like to talk about today?",
  // "Great. Thank you for coming in to talk with me today.",
  "What would you like to talk about?",
  //"I see. How does that make you feel?",
  "I see. Can you elaborate on that?"
];

var summaries = [
  // encouragement 0102
  "You know, they say action is the foundational key to success. So keep it up!",
  "They say life is trying things to see if they work. So let's not give it up!",
  "It does not matter how slowly you go as long as you don't stop. We'll keep carrying on.",
  "People say an obstacle is often a stepping stone. Don't let it discourage you.",
];

var ends = [
  //"Good. I’m glad we talked about this today.",
  //"Well, I'd love to talk more, but I'm afraid our time's almost up.",
  //"Well, I'm glad to see where you're headed. But I'm afraid our time's up.",
  // "Before we go, what was it like to share your thoughts and feelings?",
  //"Through our dialogues, we've talked about \"@\". Could you share your thoughts and feelings?",
  //"So we talked about \"@\" today. How do you feel after talking about it now?",
  //"Good to know. We'll talk about it again next time. See you soon!",
  //"Good to know. I'm glad you came in today.",
  //"Also, I appreciate your honesty in our conversation.",
  //"I hope we catch another time to talk again. See you soon!"
  // ending 0102
  summaries[Math.random()*summaries.length<<0],
  "Oops, but the time's almost up. We've got to wrap up our conversation today.",
  "So we talked about \"@\" today. How do you feel after talking about it now?",
  "Good to know. Thank you for coming in today. Let's talk again soon!"
];

var qsts = [
  "Maybe I misunderstood it. What were we talking about?",
  "Sorry, perhaps I misunderstood it. What did you want to talk about?",
  "I guess I misunderstood. Where were we?",
  "Oh, I think I misunderstood. What did you want to talk about?",
  "I'm not sure I understand you fully. What was it that you wanted to talk about?",
];

var typos =[
  "I think that was a mistake. Could you tell me again?",
  "Oops, that wasn't quite clear. Please try again.",
  "Sorry, I didn't get that. Please tell me again.",
  "Could you come again with what you just said?",
];

var noWords = [
  "Pardon me? ",
  "Pardon?",
  "Sorry?",
  "Sorry, I can understand only text word.",
];

var elizaInitials = [
  //"How do you do.  Please tell me your problem.",
  // additions (not original)
  //"Please tell me what's been bothering you.", // added
  //"Is something troubling you ?", // added
  // sohyun's additions
  "Hello. I'm BonoBot. What brings you in today?",
  "Hi. How's everything going for you today?",
  "Hello. What would you like to talk about today?",
  "Hello. Do you have any concerns you'd like to talk with me?"
];

var elizaFinals = [
  //"Goodbye.  It was nice talking to you.",
  // additions (not original)
  "Goodbye.  This was really a nice talk.",
  "Goodbye.  I'm looking forward to our next session.",
  //"This was a good session, wasn't it -- but time is over now. Goodbye.",
  "Maybe we could discuss this more over in our next session? Goodbye.",
  // sohyun's additions
  "It was nice talking to you today. See you again!",
  "It was pleasurable today. I'll see you next time."
];

var elizaQuits = [
  "bye",
  "goodbye",
  "done",
  "exit",
  "quit",
  // sohyun's additions
  "stop"
];

// keyword레벨에서 [0]->[1]으로 대체
var elizaPres = [
  "dont", "don't",
  "cant", "can't",
  "wont", "won't",
  "recollect", "remember",
  "recall", "remember", // added
  "dreamt", "dreamed",
  "dreams", "dream",
  "maybe", "perhaps",
  "certainly", "yes",
  "were", "was",
  "you're", "you are",
  "i'm", "i am",
  "same", "alike",
  "identical", "alike",
  "equivalent", "alike",
  // sohyun's additions
  "have to", "must",
  "like to", "love to",
  "will not", "won't",
  // sungwoo's addition for refinery
  "i m", 'i am',
  "you re", "you are",
  "they re", "they are",
  "he s", "he is",
  "she s", "she is",
  "it s", "it is"
];

var elizaPosts = [
  "am", "are",
  "your", "my",
  "me", "you",
  "myself", "yourself",
  "yourself", "myself",
  "i", "you",
  "you", "I",
  "my", "your",
  "i'm", "you are",
  // sohyun's additions
  "we're", "you are",
  "we", "you",
  "us", "you",
  "our", "your",
  "ours", "yours",
  "ourselves", "yourselves"
];

// decomosition레벨에서 교체
var elizaSynons = {
  "be": ["am", "is", "are", "was"],
  "belief": ["believe", "wish"],
  "cannot": ["can't"],
  "desire": ["have to", "wish", "want", "hope"],
  "everyone": ["everybody", "nobody", "noone", "people", "other"],
  "family": ["family", "mother", "mom", "father", "dad", "sister", "brother", "wife", "children", "child", "husband", "wife", "grandmother", "grandfather", "cousin"],
  "happy": ["elated", "glad", "better"],
  "sad": ["unhappy", "depressed", "sick", "upset", "down", "nervous", "stressed", "worried", "concerned", "scared", "frustrated", "afraid", "sorry"], // sohyun
  "friend": ["friends", "boyfriend", "girlfriend", "partner"],
  //"should": ["must"],
  "hello": ["hi", "hello", "how are you", "how's it going"],
  "anxious": ["sad",  "difficult", "hard", "upset", "worried", "concerned", "depressed", "nervous", "frustrated"],
  "struggle": ["hard", "difficult"],
  "fund": ["funding"],
  //"grad": ["year", "phd", "student", "research", "school", "grad", "graduate", "field", "program", "master", "university", "science", "undergrad"] // 어떻게 처리할 것인가
};

var elizaKeywords = [

  /*
  Array of
  ["<0-key>", <1-rank>, [
  ["<decomp>", [
  ["<reasmb>", <OCAR>],
  ["<reasmb>", 1],
  ["<reasmb>", 2],
], <memflag>],
["<decomp>", [
["<reasmb>", 0],
["<reasmb>", 1],
["<reasmb>", 2],
], <memflag>]
],<3-origin index> ,<4-category>]
category - 0: emotion, 1: info, 2: others
OCAR- 0: O, 1: C, 2: A, 3: R, 4: 'goto~~"
*/

["xnone", 0, [
  ["*", [
    ["Please go on.",0],
    ["What concerns do you have now?",0], // added
    //["I see. Please continue.",0], //added - open talk
    ["Could you tell me more?", 0], // 1221
    ["So tell me more about how you're doing.",0], // added - open talk
    ["Would you like to talk a little more about that?", 0], // - open talk
    ["What else?", 0],
    //["What happened?", 0],
    ["Can you give me an example?", 0],
    ["Could you give me some more context?", 0], // 1222
    ["Could you share some stories or episodes?", 0],
    ["I'd appreciate some more examples.", 0],
    //["How do you feel talking now?", 0], // 1223
    //["Umm-hmmm. Please go on.", 0], // 1222
    //["How have you managed all you have been through so far?", 1], //1213 A
    ["What do you think would happen if things stay the way they are?", 1], //1213 R
    ["What has changed from the past when things were at their best?", 1], //1213 R
    //["Who can give you help around you? In what ways?", 1], // 1213 N
    ["What needs to happen to move you towards your goals?", 1], // 1213 N
    //["What can you say to yourself to move on?", 1],
    //["What are the things that cannot change?", 1],
    ["What changes do you think you can make?",1], // 1221
    //["What do you usually do to relax?", 1],
    //["What usually gives you confidence in doing things?", 1], // A
    // ["What usually keeps you going?", 1], // 1221
    ["How would you like things to be different?", 1], // D
    ["What can be the next step forward now?", 1], // 0102
    //["Who has been supportive in your life?", 1], //added
    //["How do you want things to turn out, ideally?", 1], // added
    ["What can you do to bring about some positive changes?", 1], // 1223
    //["What resources could you find helpful?", 1], // added
    ["What is your best hope now?", 1], // 0102
    ["What could have been done differently in the past?", 1], // 0102
    ["What would be some of the good things about making a change?", 1], // 0102
    ["I know how you feel.", 3], // added
    ["That's impressive.", 2], //
    ["You're not alone. I'm sure there are many more like you.", 3], // added
    ["That's right.", 3], // added
    ["Yeah, I'm with you.", 3], // added
    ["I think you're right.", 2], // added
    ["I understand how you feel.", 3], // added
    //["That's an idea.", 2], // added
    ["It's only natural that you think that way.", 3], // added
    ["Right. I am with you.", 3],
    ["I can feel you. I've seen quite a lot of people struggling.", 3], // added
    ["I'd think the same way.", 2], // added
    ["That's understandable.", 3], //added
    ["If I were you, I'd feel just as you do.", 2], // added
    ["I see your point.", 2], // added
    ["I've seen some people with similar issues.", 3], // added
    ["That makes sense.", 2], //added
    ["I understand.", 3], // added
    // ["Right.", 3], // added
    ["That's interesting.", 2], // added
    // ["I see.", 3], //
    ["Really?", 3], // added
    // ["What you're saying is (1), right?", 3], // added
    // ["(1)?", 3], // added 1220
    ["I know what you mean.", 2], // added
    ["It's important that you're thinking about it.", 2], // 1221
    ["I hear you. You're not the only one.", 3], // 0102
    ["No one is perfect. Don't be so hard on yourself.", 2], // 0102
    ["From what you said, I think you're doing just fine.", 2], // 0102
    ["Right. I think you're on the right track.", 3], // 0102
    ["I can agree with you.", 3], // 0103
    ["It probably wasn't easy, but you've come this far.", 2], // 0103
    ["You sound a bit tired.", 3], // 0103
    ["It's good to try, but don't be so harsh on yourself.", 2], // 0103
  ]]
],,2],

["grad\\w*|thesis\\b|paper\\b|master\\b|school\\b|university\\b|phd\\b|reserch\\b|field\\b", 3, [ // 대학원 생활에 대한 전반적인 질문들로 구성.
  ["*", [
    ["Would you like to talk a little more about that?", 0], // - open talk
    ["Can you tell me more about your life in graduate school?", 0], // sohyun added
    ["Can you tell me more about your life in school?", 0], // sohyun added
    ["What's it like at your school these days?", 0], // added
    ["Tell me about the people in your lab, cohort or your advisor.", 0], // sohyun added
    ["Perhaps you can give me some more context so that I can better understand you.", 0], // sohyun added
    ["What initially gave you the confidence in seeking a graduate degree?", 1],
    ["What are some successes that you've accomplished in school so far?", 1],
    ["How has school benefited you or troubled you?", 1],
    ["What will it be like when the problem is solved?", 1],
    ["If graduate degree's not right for you, what might you be doing instead?", 1], // sohyun added
    ["What were your initial goals when you first planned for a graduate degree?", 1], // sohyun added
    ["How do you usually respond to challenges?", 1], // sohyun added
    ["I have heard a lot of graduate students say that.", 2],
    ["Many students struggle with variations of the same problem.", 2],
    ["Being a graduate student usually means a lot of stress and responsibilities.", 2], // sohyun added
    ["It seems to me that you're doing more than enough you can do.", 2], // 0102
    ["You don't have to try so hard.", 2], // 0102
    ["Every graduate student I've talked to was quite stressed out.", 2], // 0102
    ["I can tell. I've seen some stressed graduate students with similar problems.", 3], //
    ["I hear your struggle. That's exactly how many students feel during their graduate program.", 3],
    ["Yeah. Many graduate students even suffer from an imposter syndrome.", 3], // 0102
    ["You're not the only one in this.", 3], //added
    ["It's tough being a grad student.", 3], // added
    ["Grad school usually gives a feeling of uncertainty.", 3],
  ]]
],,0], // 11/30 modified

["really\\?", 11, [ // \\?, really\\?는 O, C 있으면 안됨
  ["*", [
    ["I'd guess so.", 3],
    ["I think so.", 3],
    ["Yes, really.", 3],
    ["I'd guess so.", 2],
    ["I guess so.", 2],
    ["Yeah, really.", 2],
    ["Certainly. Now tell me, how do you want things to turn out, ideally?", 1],
    ["Yeah, I guess so. If you give me some more details, that would help.", 0],
  ]]
],,0],

["sorry", 0, [
  ["*", [
    // sohyun's additions
    ["It's understandable. Please continue.",0], // - encourager
    ["The important part is you tried so hard.",2], // - affirmation
    ["Is there anything that can help you with that?", 1], // added
    ["It sounds like you are a bit uneasy.", 3] // added
  ]]
],,2],

["apologise", 0, [
  ["*", [
    ["goto sorry",4]
  ]]
],,2],

["remember", 5, [
  ["* i remember *", [
    ["What else do you recollect?",0],
    ["What in the present situation reminds you of (2)?",0],
    ["What else does (2) remind you of?",0],
    ["What does (2) bring to mind?",1],
    ["You remember (2)?", 3], // added
    ["Somehow it sounds like you're not sure of something.", 3] // added
  ]],
  ["* do you remember *", [
    ["What about (2)?",0],
    ["goto what",4],
    ["You mentioned (2)?",3],
  ]],
  ["* you remember *", [ //added
    ["How could I forget (2)?",0],
    ["What about (2) should I remember?",0],
    ["goto you",4],
    ["You mentioned (2)?", 3] // added
  ]]
],,2],

["forget", 5, [ //added
  ["* i forget *", [
    ["Can you think of why you might forget (2)?",0],
    ["Why do you think you can't remember (2)?",0],
    ["How often do you think of (2)?",0],
    ["Are you generally forgetful?",0],
    ["Do you think you are suppressing (2)?",0],
    ["Could it be a mental block?",1],
    ["What could help you remember?", 1], // added
    ["Given your situation, it's no wonder you forget.", 2], // added
    ["Things happen. Don't worry.", 2], // sohyun's addition
    ["Maybe you have a lot on your mind.", 3], // added
    ["Maybe you're just not sure right now.", 3], // added
  ]],
  ["* did you forget *", [ //added
    ["Why do you ask?",0],
    ["Please tell me again about (2).",0],
    ["Remind me about (2).", 0],
    ["goto what",4],
  ]]
],,2],

["if", 3, [
  ["* if *", [
    //["What do you know about (2)?",0],
    ["What will happen if (2)?", 0],
    ["What would you do if (2)?",1], //added
    ["But what are the chances that (2)?",1], //added
    ["What does this speculation lead to?",1], //added
    ["How might you go about it?", 1], // 0102
    //["Do you think it's likely that (2)?",1],
    //["Do you wish that (2)?",1],
    ["Anyone would think that way.", 2], // 1223
    ["I think what you're facing is a common dilemma.", 2], // added
    ["That can be a very reasonable thinking.", 2], // 0102
    ["You sound a bit unsure.", 3], // 0102
    ["Right. I'd think so, too.", 3], // 0102
    ["Really, if (2)?",3],
  ]]
],,2],

["dreamed", 5, [
  ["* i dreamed *", [
    ["What does that suggest to you?", 0], // added
    ["How might you go about making (2) come true?", 1], //added
    ["What would be a good first step?", 1], // added
    ["I understand.", 2], // added
    ["I think that says something about your hopes.", 2], // added
    ["Really, (2)?",3],
    ["goto dream",4],
  ]]
],,2],

["dream", 3, [
  ["*", [
    ["What does that dream suggest to you?",0],
    ["What might you do differently?", 1], // added
    ["What do you think you can do about it?", 1], // added
    ["That's understandable.", 2], // added
    ["I think that says something about your hopes.", 2], // added
    ["Maybe you have some ideas, but you don't know how to carry them out.", 3], // added
  ]]
],,2],

["name", 15, [
  ["your name", [
    ["I am not interested in names.",3],
    ["Sorry, I don't care about names.",3], // 1220
  ]]
],,2],

// 1220
// ["deutsch", 0, [
//   ["*", [
//     ["goto xforeign",4],
//     ["I told you before, I don't understand German.",3],
//   ]]
// ],,2],

// ["francais", 0, [
//   ["*", [
//     ["goto xforeign",4],
//     ["I told you before, I don't understand French.",3],
//   ]]
// ],,2],

// ["italiano", 0, [
//   ["*", [
//     ["goto xforeign",4],
//     ["I told you before, I don't understand Italian.",3],
//   ]]
// ],,2],

// ["espanol", 0, [
//   ["*", [
//     ["goto xforeign",4],
//     ["I told you before, I don't understand Spanish.",3],
//   ]]
// ],,2],

["korean", 0, [
  ["*", [
    ["goto xforeign",4],
    ["I told you before, I don't understand Korean.",3],
  ]]
],,2],

["xforeign", 0, [
  ["*", [
    ["I speak only English.",-1],
  ]]
],,2],

["hello", 0, [ // CAR이 불가함
  ["*", [
    ["How do you do. Please state your problem.",0],
    ["Hi.  What seems to be your problem?",0],
    // sohyun's additions
    ["Hi! What brought you in today?",0],
    ["Hello! What would you like to talk about today?",0],
    ["Hi! How are you today?",0],
  ]]
],,2],

["am", 1, [
  ["* am i *", [ // OAR이 불가함
    ["Do you believe you are (2)?",1],
    ["Would you want to be (2)?",1],
    ["Do you wish I would tell you you are (2)?",1],
    ["What would it mean if you were (2)?",1],
    ["goto what",4]
  ]],
  ["* i am *", [
    ["goto i",4]
  ]],
  ["*", [
    ["Why do you say that?",0],
    ["I don't understand that.",3],
  ]]
],,2],

["are", 2, [
  ["* are you *", [
    ["Would it matter to you?",0], //added
    ["What if I were (2)?",1] //added
    ["Would you prefer if I weren't (2)?",1],
    ["goto what",4],
  ]],
  ["* you are *", [ //added
    ["goto you",4] //added
  ]],
  ["* are *", [
    ["Are they always (2)?",0], //added
    ["Did you think they might not be (2)?",1],
    ["Would you like it if they were not (2)?",1],
    ["What if they were not (2)?",1],
    ["Are you positive they are (2)?",1], //added
    ["Possibly they are (2).",3],
  ]]
],,2],

["your", 0, [
  ["* your *", [
    ["What about your own (2)?",0],
    ["Really, my (2)?",3],
    ["What makes you think of my (2)?",0],
  ]]
],,2],

["was", 2, [
  ["* was i *", [
    ["Were you (2)?",0],
    ["What about it? I'd like to hear more.", 0], // added
    ["What does '(2)' suggest to you?",0],
    ["What if you were (2)?",1],
    ["Why do you think you were (2)?",1],
    ["What would it mean if you were (2)?",1],
    ["goto what",4]
  ]],
  ["* i was *", [
    ["What do you think was the issue?",0],
    ["What do you think about yourself being (2)?", 0], // added
    ["What could have been different?", 1], // added
    ["What could have helped you?", 1], // added
    ["Anyone might have felt that way.", 3], // added
    ["I understand your feelings.", 3], // added
    ["It's totally understandable that you were (2).",3], // added
    ["Were you really?", 3], // added
  ]],
  ["* was you *", [
    ["What do you think?",0],
    ["What if I had been (2)?",1],
    ["What suggests that I was (2)?",1],
    ["Perhaps I was (2).",3],
  ]]
],,2],

["i", 5, [
  ["* i @desire *", [
    ["What keeps this problem going?", 0], // added
    ["What worries about your current situation?", 0], // added
    ["What concerns you the most?", 0], // added
    ["What would it mean to you if you (2)?",1], // 0102
    ["Why do you want (3)?",1],
    ["Suppose you (2). What might have contributed?",1], // 0102
    ["What would getting (3) mean to you?",1],
    ["How would you go about making it true?",1], // 0102
    ["What could have been different?",1], // -- change talk; desire
    // sohyun's additions
    ["Many people (2) as well.", 2], // added
    ["I can tell that you do.", 2], // 1221
    ["If I were you, I'd wish so, too.", 2], // 1221
    ["It seems like you're quite sure about (3).",3], // -- change talk; desire
    ["It is understandable that you wish to (2).", 3], // added
  ]],
  ["* i am* @sad *", [ // 0102
    ["What keeps this problem going?", 0], // added
    ["What worries about your current situation?", 0], // added
    ["What concerns you the most?", 0], // added
    ["Can you explain what made you (3)?",0],
    ["How is talking to me helping you not to be (3)?",1], // modified
    ["What do you wish to be different?", 1], // added
    ["How would you like things to be different?", 1], // 0102
    ["Even though you are (3), you're still carrying on.",2], // - affirmation
    ["But I think you've done quite well so far.", 2], // 1221
    ["It's incredible you took it inside. You're very patient.", 2], // 0102
    ["You might have felt like giving up, but you didn't.", 2], // 0102
    ["You've tried. I think you should give yourself credit for that.", 2], // 0102
    ["Things can be discouraging sometimes, but you've managed very well.", 2], // 0102
    ["You seem to be dealing with your disappointment better than others.", 2], // 0102
    ["It's only so natural that you are (3).",3], // - affirmation
    ["That you feel (3) is understandable.",3],
    ["It seems that you're feeling quite frustrated right now.", 3], // 0102
    ["It must have been very difficult for you.", 3], // 0102
    ["I understand how you feel.",3], // -- reflection
    ["I am sorry to hear that you are (3).",3],
    ["I'm sure it's not pleasant to be (3).",3],
  ]],
  ["* i am* @happy *", [
    ["What made you (3)?",0], // - open question
    ["What made you feel better?", 0], // added
    ["What things have you done differently, if any?", 1], // added
    ["Great! What have you achieved in making this change?", 1], // added
    ["That's wonderful! You should feel so proud of yourself.", 2], // added
    ["That's fantastic!.", 2], // added
    ["That's great!",2], // - encourager
  ]],
  ["* i @belief i *", [
    ["How did you come to that thought?", 0], // added
    ["What concerns do you have about this in the long term?", 0], // added
    ["What could be some problems you have?",0], // -- change talk; ability
    ["What kinds of things have you tried?", 1], // added
    ["How confident are you about (3)?",1], // -- change talk; ability
    ["What resources would you need to (3)?",1], // -- change talk; ability
    ["Has there been any similar experiences?",1],// -- change talk; ability
    ["Things somestimes seem stuck for everyone.", 3], // added
    ["I have heard many people say that.", 3], // added
    ["I'd think the same way.", 2], // added
    ["That's pretty common.", 3], // added 1221
    ["You sound a bit uneasy.", 3], // added 1221
    ["Maybe you are not sure about yourself.", 3], // 1221
  ]],
  ["* i* @belief *you *", [
    ["goto you",4]
  ]],
  ["I * just *", [
    ["How long has it been going on?", 0],
    ["What do you think will happen if you don't take any action about your problem?", 0],
    ["How have you managed with all you have been through?", 1],
    ["If you decide to make a change, what are your hopes for the future?", 1],
    ["It must have been very difficult for you.", 2],
    ["I see your point.", 3], // 1221
    ["You were (2).", 3], // added
  ]],
],,0],

["i", 3, [
  ["* i am *", [
    //["How long have you been (2)?",0], // 1223
    ["Do you believe it is normal to be (2)?",0],
    ["Why do you think you are (2)?",0], // -- open question
    ["What is your best hope now?", 1], // 11/27 추가함
    ["What do you wish to be able to do?", 1],
    ["It's understandable you think you are (2).",3], // 1223
    ["I can see where you're coming from.", 3], // 1221
    ["People go through similar phases. You're not alone.", 2], // 0103
    ["If you think you are (2), I understand.", 3], // added
    ["That's understandable. I've heard many like that.", 2], // 0103
    ["I think you being (2) is just like others.", 2], // 0103
  ]],
  ["* i @cannot *", [
    ["How do you know that you can't (3)?",1],
    ["Have you tried anything?",1],
    ["Do you really want to be able to (3)?",1],
    ["What differences would it make if you could (3)?",1], //added
    // sohyun's additions
    ["What would encourage you?",1], // change talk; ability
    ["What is getting in your way?",1], // change talk; ability
    ["What benefits would you see if you can?",1], // change talk; reason 1213
    ["The important thing is that you try.",2], // encourager
    //["Perhaps you could (3) now.",2],
    ["It seems to me that you'd like to be able to (3).", 2], // 1221
    ["You sound discouraged that you cannot (3).", 3], // added
    ["You don't have to try too hard.", 2], // 1221
    ["It may be diappointing.", 3], // 0103
    ["That's a pity.", 3], // 0103
  ]],
  ["* i don't *", [ // keyword중 하나, 11/14/2017
    ["Don't you really (2)?",0],
    ["Does that trouble you?",0],
    ["What do you mean?", 0], // added
    ["Do you wish to be able to (2)?",1],
    ["What is getting in your way?", 1], // added
    ["That's totally understandable.", 3], // 1221
    ["Right. I can agree with you.", 3], //1221
    ["You don't (2). Hmm.", 3], // added
    ["Hmm. No need to worry if you don't.", 2], //1221
    ["Well, that's okay. We'll keep talking.", 2], // 1221
  ]],
  ["* i feel *", [ // 0102
    ["Tell me more about such feelings.",0],
    ["Could you say some more about your feelings?", 0], //added
    ["Can you elaborate on that?", 0], //added
    ["What does feeling (2) make you think?", 0], // added
    ["Of what does feeling (2) remind you?",1],
    ["What would you like to be able to do now?", 1], // added
    ["It's only natural that you feel (2).", 3], // 1221
    ["If I were you, I'd feel (2), too", 3], // 1221
    // ["You are (2).", 3], // added
    ["Right. Anyone would feel that way.", 3], // added
    ["Well, I'm glad you're telling me about your feelings.", 2], // 1221
    ["It's quite difficult to share such feelings. You're taking a step.", 2], // 1221
    ["In fact, I'm surprised you've carried on so far.", 2], // 0102
  ]],
  // ["* i * you *", [
  //   ["Do you wish to (2) me?",1],
  //   ["You seem to need to (2) me.",3],
  //   ["Do you (2) anyone else?",0],
  //   ["Really, you (2) me?", 3], // added
  //   ["I don't quite get that. What do you mean?", 0], // added
  //   ["How does that make you feel?", 0], // added
  // ]],
  ["@anxious", [ // 0102
    ["What concerns you the most?", 0],
    ["What do you want to do at this point?", 0],
    ["Help me better understand your anxiety and how it has affected your life.", 0],
    ["How have you managed with everything?", 0],
    ["How would you like things to turn out for you now, ideally?", 1],
    ["What support can you get from your institution?", 1],
    ["What support could you get from your friends?", 1], // added
    ["What helped you when you felt this way before?", 1],
    ["What is your best hope now?", 1], // 0102
    ["What can help you move forward?", 1], // 0102
    ["It's unbelievable you have been able to live with the problem this long and not fall apart.", 2],
    ["You have worked hard to do the right thing, desptie how hard it is.", 2],
    ["Sounds like you've already handled some challenges quite well.", 2], // 1221
    ["That can be difficult.", 2], // 1221
    ["Now that you're talking about it, things won't be the same next time.", 2], // 0102
    ["It's natural you feel discouraged and not sure how to help yourself.", 3],
    ["Right. No wonder you feel that way.", 3], // 0102
    ["I totally understand.", 3], // 0102
    ["You may be so worried and not sure what to do.", 3], // 0102
    ["I'm so sorry to hear that.", 3], // 0102
    ["Oh no. I'd feel the same, too.", 3], // 0102
  ]],
  ["* i was *", [
    ["goto was",4]
  ]],
],,2],

["i", 0, [
  ["*", [
    //["You say (1)?",3], // 1220
    ["Can you tell me more?",0],
    ["What concerns do you have about that?", 0], // added
    // sohyun's additions
    ["Right. I hear you.",3], // 1223
    ["Sounds like a sensible response to me.", 3], // 1223
    ["I see. (1).",3], // 1221
    ["Really?",3], // - encourager
    ["Actually, I think you're already moving forward by talking about this.", 2], // 1221
    ["I think you're on the right track.", 2], // 0103
    ["It's not easy for anyone.", 2], // 1223
    ["We encounter all kinds of issues in life.", 2], // 0103
  ]]
],,2],

["you", 15, [ // 사실상 얘가 엘리자에게 질문하는거 방지용
  ["* you remind me of *", [
    ["goto alike",4]
  ]],
  ["* do you think *", [
    ["I certainly don't have the answers for you, but working together we can find a way.", 2],
    ["Maybe you have some idea of your own about what to do.", 2],
    ["Sorry, I cannot tell you what to do. What can be done to better your life?", 1],
    ["In fact, I think you are the best judge of what will work for you. What do you think?", 0],
    ["I am not sure you really want my answer.", 3], // 1221
    ["I am not here to tell you what to do. You will decide when and if you wish to change anything.", 3],
  ]],
  ["* you are *", [
    ["What do you mean?", 0], // added
    ["What makes you think I am (2)?",0],
    ["Do you sometimes wish you were (2)?",1],
    //["Perhaps you would like to be (2).",3],
    ["Really, you think I am (2)?", 3], // added
  ]],
  ["* you * me *", [
    ["Why do you think I (2) you?",1],
    ["You like to think I (2) you -- don't you?",1],
    ["What makes you think I (2) you?",1],
    ["Really, I (2) you?",1],
    ["Suppose I did (2) you -- what would that mean?",1],
  ]],
  // ["thank you", [ // 1208
  //   ["You're quite welcome.",2],
  //   ["I'm happy to help you here.", 2], // 1221
  // ]],
  // 1219
  // ["* you *", [
  //   ["I see. What else?", 0], // added
  //   ["Okay. What next?", 0], // added
  //   ["Oh, I (2)?", 3], // added
  // ]],
],,0],

["yes", 0, [
  ["*", [
    ["Could you tell me some more?",0], // 1221
    // sohyun's additions
    ["Hmm. I think you're right.",3], // 1221
    ["Please continue.",0], // - open question
    //["Okay, go on.", 0], // added
    ["What else?", 0], // added
    ["What needs to happen?", 1], // 1221
    ["What are some concerns you might have?", 1], // 1221
    ["What could be the next step now?", 1], // 1221
    ["Yes. You're working on it.", 2], // 1221
    // ["You're working on it.", 2], // 1221
    ["That's understandable.", 2], // 1223
    ["Right. I understand.", 3], // 1221
    ["Makes sense to me.", 3], // 1221
    ["Right, totally.", 3], // 1221
  ]]
],,0],

["yeah\\b|yea\\b|right\\b|yep\\b", 0, [ // 11/27 added
  ["*", [
    ["goto yes", 4]
  ]]
],,2],

["thank\\w?\\b|thx\\b", 0, [ // 1229
  ["*", [ // 1208
    ["You're welcome.",3],
    ["I'm glad to help you.", 3], // 1221
    ["You're quite welcome.",2],
    ["I'm happy to help you here.", 2], // 1221
  ]],
],,2],

["no", 0, [
  ["* no one *", [ //added
    ["Are you sure, no one (2)?",0],
    ["Can you think of anyone at all?",0],
    ["Are you thinking of a very special person?",0],
    ["Who, may I ask?",0],
    ["You have a particular person in mind, don't you?",0],
    ["Surely someone (2).",3],
  ]],
  ["*", [
    // sohyun's additions
    ["What else would you like to talk about?",0], // - open question
    ["What do you want to talk about now?",0],
    ["That's understandable.", 3], // added
    ["Okay, I understand.", 3]
  ]]
],,2],

["nope", 0, [ // 1130 added
  ["*", [
    ["goto no", 4]
  ]]
],,2],

["my", 3, [
  ["$ * my *", [
    // sohyun's additions
    ["Let's talk about your (2).",0], // - open question
    ["Are their any concerns about your (2)?",0], // - open question
    ["What is (2) like?", 0], // added
    ["How does this trouble you?",0], // - open question
    ["What's happened with your (2)?",0], // -- open question
    ["How does (2) make you feel?", 0], // added
    ["How do you feel about your (2)?", 0],
    ["What do you think about your (2)?", 1], // added
    //["How have you been dealing with (2)?",1], // added ---> ?????
    ["You've got a point there.", 2], // added
    ["Glad to see you're thinking about your (2).", 2], // 1221
    ["I've heard many students talking about their (2).", 3], // 1221
    ["Your (2)?", 3], // added 1220
    ["Really, your (2)?", 3], // added
  ]],
  ["* my* @family *", [
    ["Tell me more about your family.",0],
    ["Who else in your family (4)?",0],
    ["What else comes to your mind when you think of your (3)?",0],
    ["Tell me what your family thinks about what you're dealing with.", 0], // added
    ["How does that make you feel?", 0], // added
    ["It's not always easy to talk about your family.", 2], // added
    ["Your (3)?",3], // 1220
  ]],
  // sohyun's additions
  ["* my* @friend *", [
    ["Tell me more about your (3).",0], // - open question
    ["What happened?",0], // - open question
    ["Can you elaborate on that?",0], // - open question
    ["Tell me what your friends think about what you're dealing with.", 0], // added
    ["How does that make you feel?", 0], // added
    ["I wish your friends are a source of support.", 2], // added
    ["That's a pretty common and natural reaction.", 2], // added
    ["Your (3)?",3],  // 1220
  ]]
],,2],

["can", 2, [
  ["* can you *", [
    ["You believe I can (2), don't you?",0],
    ["goto what",4],
    ["You want me to be able to (2).",3],
    ["Perhaps you would like to be able to (2) yourself.",3],
  ]],
  ["* can i *", [
    ["What worries you?", 0], // added
    ["Do you want to be able to (2)?",1],
    ["goto what",4],
    ["How do you want things to be different?", 1], // added
    ["Everyone can have doubts.", 2], // added
    ["If you're asking if you can, I think so.", 2], // 1221
    ["You seem to be unsure.", 3], // added
    ["Whether or not you can (2) depends on you more than on me.",3],
    ["You think you cannot (2).", 3], // added
  ]]
],,2],

["what", 5, [
  ["* i *", [
    ["Why do you ask?",0],
    ["Are such questions much on your mind?",0],
    ["What do you think?",0],
    ["What comes to mind when you ask that?",0],
    //sohyun's additions
    ["What does it mean to you?",0], // -- open question
    ["What is at the heart of the problem?",1], // -- open question
    ["How would you like things to be different for you?",1], // -- open question
    ["What would make you happier?",1],
    // ["I cannot give an answer, but we can work together.", 3], // added
    ["Maybe we can figure it out.", 3], // added
  ]],
],,2],

["who", 0, [ //added
  ["who *", [
    ["goto what",4]
  ]]
],,2],

["when", 0, [ //added
  ["when *", [
    ["goto what",4]
  ]]
],,2],

["where", 0, [ //added
  ["where *", [
    ["goto what",4]
  ]]
],,2],

["how", 0, [ //added
  ["how *", [
    ["goto what",4]
  ]]
],,2],

["because", 0, [
  ["*", [
    ["Is that the real reason?",1],
    ["What other reasons come to mind?",1], // modified
    ["Does that reason seem to explain anything else?",1],
    ["What other reasons might there be?",1]
  ]]
],,2],

["why", 0, [
  ["* why don't you *", [
    ["Should you (2) yourself?",0],
    ["You want me to (2)?",0],
    ["goto what",4]
  ]],
  ["* why can't i *", [
    ["Do you think you should be able to (2)?",1],
    ["Do you want to be able to (2)?",1],
    ["Must you be able to (2)?",1],
    ["goto what",4],
    ["You don't need to be so harsh on yourself.", 2], // added
    ["I see you think you cannot (2).", 3], // added
  ]],
  ["*", [
    ["goto what",4]
  ]]
],,2],

["everyone", 2, [
  ["* @everyone *", [
    ["Can you think of anyone in particular?",0],
    ["Who, for example?",0],
    ["Are you thinking of a very special person?",0],
    ["Who, may I ask?",0],
    ["Someone special perhaps?",0],
    ["You have a particular person in mind, don't you?",0],
    ["People have their own issues and moments. Don't let them discourage you.", 2], // added
    ["You may feel like you're the only one.", 2], // added
    //["Really, (2)?",3], // 1220
    //["Surely not (2).",3],
    ["That's quite unbelievable.", 3], // 1221
    ["That's quite something.", 3], // 1221
  ]]
],,2],

["everybody\\b|nobody\\b|noone\\b", 2, [
  ["*", [
    ["goto everyone",4]
  ]]
],,2],

["always", 1, [
  ["*", [
    ["Can you think of a specific example?",0],
    ["When?",0],
    ["What incident are you thinking of?",0],
    ["Really, always?",3]
  ]]
],,2],

["alike", 2, [
  ["*", [
    ["In what way?",0],
    ["What resemblence do you see?",0],
    ["What does that similarity suggest to you?",0],
    ["What do you suppose that resemblence means?",0],
    ["Could there really be some connection?",0],
    ["How?",0]
  ]]
],,2],

// ["like", 10, [
//   ["* @be *like *", [
//     ["goto alike",4]
//   ]]
// ],,2],

["different", 2, [ //added 1228
  ["*", [
    ["How is it different?",0],
    ["What differences do you see?",0],
    ["What does that difference suggest to you?",0],
    ["What other distinctions do you see?",0],
    ["What do you suppose that disparity means?",0],
    ["Could there be some connection, do you suppose?",0],
    ["How?",0]
  ]]
],,2],

// sohyun's additions, 11/14/2017, Reddit Keywords
// General Keywords
["just", 1, [
  ["*", [
    ["Right. Please go on.", 0], // 1221
    ["What worries you about your current situation?", 0],
    ["What are your concerns?", 0],
    ["What would be a good first step forward?", 1],
    ["How would you like things to turn out for you now, ideally?", 1],
    ["I get it. I am on your side here.", 2], // added
    ["It sounds like you may be feeling some trouble with that.", 3]
  ]],
],,0],

["time", 1, [
  ["* full time *", [
    ["goto grad\\w*|thesis\\b|paper\\b|master\\b|school\\b|university\\b|phd\\b|reserch\\b|field\\b", 4],
  ]],
  ["* part time *", [
    ["goto grad\\w*|thesis\\b|paper\\b|master\\b|school\\b|university\\b|phd\\b|reserch\\b|field\\b", 4],
  ]]
],,0],

["like", 10, [
  ["feel like *", [
    ["What are your worst fears?", 0],
    ["What would other people do if they were in your shoes?", 0],
    ["You are certainly having a lot going on right now.", 3], // 1221
    ["I understand how you feel.", 3], // 1221
    ["Anyone could feel that way.", 2], // 1221
    ["It sounds like things aren't the way they should be.", 3],
    ["Right. I can see that.", 3], // added
    ["Well, I appreciate that you're sharing such feelings with me.", 2], // 1221
    ["Right. I'd feel that way as well.", 2], // 1221
  ]],
  ["would like *", [
    ["What can you do? What are your options?", 1],
    ["Where do we go from here? Any plans?", 1],
    ["What needs to happen to move you towards your wish?", 1]
  ]],
  ["* @be *like *", [
    ["goto alike",4]
  ]],
  // ["I like *", [ // 애매함. 없애든지 다시 만들어야 함
  //   ["What does (1) mean about your resources, skills, and strenghts?", 1],
  //   ["From (1), it seems like you've got some strength to deal with your problem.", 2]
  // ]],
],,0],

["want", 5, [
  ["i don\.+want to *", [
    ["In what ways does this concern you?", 0],
    ["What concerns you the most?", 0],
    ["How would you like things to turn out for you?", 1],
    ["You sound quite uncomfortable about that.", 3],
    ["Some of what I heard you say suggest some difficulties you have.", 3],
    ["It must be quite hard to be in such a situation.", 2]
  ]],
  ["i * want to *", [
    ["What stopped you from doing what you want to do?", 0],
    ["What difficulties have you had in relation to your wish?", 1],
    ["Who could help at your institution to make it happen?", 1],
    ["What are some feasible options for you?", 1],
    ["What can help you to make it happen?", 1], // added
    ["So you want to (2).", 3], // 1223
    ["I understand.", 3], // 1221
    //["That's reasonable.", 2],
    ["I'd think so, too.", 2], // 1222
  ]],
],,0],

["want", 3, [
  ["*", [ // 11/27 want에 사용한거 반복 ???
    ["What stopped you from doing what you want to do?", 0],
    ["What difficulties have you had in relation to your wish?", 1],
    ["Who could help at your institution to make it happen?", 1],
    ["What are some feasible options for you?", 1],
    ["What can help you to make it happen?", 1], // added
    ["It sounds like there's an ideal state you want to be in.", 3], // 1223
    ["I understand.", 3], // 1221
    //["That's reasonable.", 2]
    ["I'd think so, too.", 2], //1222
  ]],
],,2],

["know", 5, [
  ["i don\.+know *", [ // 내담자가 갈팡질팡하는 상황.
    ["Think about times in the past that you had been able to catch yourself like this. How did you deal with that?", 1],
    ["What strengths do you have that can help you relieve uncertainty?", 1],
    ["What things make you feel that this is a problem?", 0],
    ["You sound unsure. Maybe you can elaborate on your thoughts and feelings.", 3],
    ["What sources of support do you have to figure out?", 1],
    ["That's understandable.", 2],
    //["You're not alone.", 2],
    ["Right. It's not easy to figure out.", 2], // 1221
    //["Don't you really know (1)?", 3], // sohyun added
    ["You don't know (1).", 3],
    ["Maybe you aren't sure.", 3], // 1221
  ]],
  ["i know *", [ // 내담자가 어떤 부분에 확신하고 있는 상황인데 마땅한 응답이 없음
    ["In what ways does this concern you?", 0],
    ["How do you feel about that?", 0],
    ["How does that make you feel?", 0], // 1213
    ["How can knowing (1) help you?", 1], // added
    ["How would you like things to turn out for you?", 1],
    ["What do you think you might be able to do about it?", 1], // 0102
    ["What changes do you wish to make, if any?", 1], // 0102
    //["You sound quite convinced.", 3],
    ["Yes, good to see where you're headed", 2], // 1221
    ["Right. I am with you.", 2], // 1221
    ["I know what you're talking about.", 3],
    ["That's totally understandable.", 3], // 0102
    //["That's reasonable.", 3], //added
  ]],
  // ["*", [ // 11/27 know에 사용한거 반복
  //   ["Can you say some more about that?", 0],
  //   //["You sound quite convinced.", 3],
  //   ["How does that make you feel?", 0], // 1213
  //   //["How can knowing (1) help you?", 1], // added
  //   ["I see where you're coming from.", 3], // 1221
  //   ["I think that's the way to go.", 2], // 1221
  // ]]
],,0],

// Emotional Keywords
["friend\\w*", 3, [
  ["make friends", [
    ["How much does making or being friends concern you?", 0],
    ["What worries you about making friends?", 0],
    ["What was helpful when you felt lonely before?", 1],
    ["Do you remember a time when things were going well with you and your friends? What has changed?", 1],
    ["What happened? Can you give a specific example or a situation?", 0],
    ["You're struggling with making friends.", 3],
    ["Perhaps you're feeling lonely.", 3]
  ]]
],,0],

["say", 3, [    // 일단 정규식은 맞고 i say는 이미 앞에서 i키워드로 걸러짐
  ["[^i] say", [ // 잘 모르겠음. '내'가 아닌 다른 사람들이 ... 라고 말했다 라고 하는 경우. he, she, they, supervisor, director, PI, advisor, department, school 등
  ["How does that make you feel now?", 0],
  ["How did you feel about that?", 0],
  ["What do you think should have been said instead?", 1], //
  ["What could have been done differently?", 1],
  ["That could have been difficult.", 2],
  ["That's quite something.", 2],
  ["Really?", 3], // added
  ]]
],,0],

["exam\\w?", 1, [
  ["*", [
    ["What things make you feel that this is a problem?", 0],
    ["What concerns you the most about this in the long term?", 0],
    ["How have managed exams in the past?", 1],
    ["What were things like beforehand? What were you like back then?", 1],
    ["Although you feel stressed, it sounds like you have managed it so well.", 2],
    ["You still have worked very hard.", 2],
    ["You may feel overwhelmed, and very tired, but you've managed so far.", 3]
  ]]
],,0],

["stress\\w*|difficult\\b|hard\\b|helpless\\b|hopeless\\b", 3, [
  ["*", [
    ["What thoughts come to your mind right now?", 0],
    ["What are you thinking about at this point?", 0],
    ["What keeps the problem going?", 0], // 1222
    //["How have you managed all you have been through?", 1], // 1222
    ["What do you think would happen if things stay in this way?", 1], // 1222
    ["How would you like things to be different?", 1],
    ["Are there any others you could call for support? If so, in what ways?", 1],
    ["You certainly have a lot on your mind.", 3],
    ["You sound frustrated about not being able to have a better control over your life.", 3],
    ["It sounds like things have been difficult for you.", 3], // 0102
    ["I hear you. Life is hard, isn't it?", 3], // 0102
    ["But so far, I think you're doing just fine.", 2], // 0102
    ["It's impossible to have everything in control. You're not alone.", 2], // 0102
    ["I think what you're going through is pretty tough.", 2],
    ["I think you show quite a willingness to carry on.", 2]
  ]]
],,0],

["leav\\w*", 3, [
  ["I * leave", [
    ["What worries you about your current situation?", 0],
    ["How long has it been going on?", 0],
    ["What concerns you the most?", 0],
    ["What might you do if you decide to leave?", 1],
    ["What do you think might happen if you decide to leave?", 1],
    ["You sound like you persevered some difficult circumstances.", 2], // 1221
    ["How might you go about making this change?", 1],
    ["I understand you have some concerns.", 3], // 1221
  ]]
],,0],

["anxi\\w*", 3, [
  ["*", [
    ["What concerns you the most?",0],
    ["How would you like things to turn out for you now, ideally?", 0],
    ["Help me better understand your anxiety and how it has affected your life.", 0],
    ["How have you managed thus far?", 1],
    ["What support can you draw on from your institution?", 1],
    ["What support can you get from your friends or family?", 1],
    ["What helped you when you felt this way before?", 1],
    ["You seem overwhelmed and not sure how to help yourself.", 3],
    ["I am so sorry to see you struggling.", 3], // 0102
    ["Sounds like you've already managed things quite well.", 2], // 1221
    ["You are certainly a strong person to have come this far.", 2],
    ["You have worked hard, although it has not always been easy.", 2],
    ["It must be difficult for you to deal with so much stress.", 3],
  ]]
],,0],

["he\\b|she\\b", 1, [ // 1206
  ["*", [ // 내담자를 괴롭히는 누군가 ???
    ["In what way does this bother you?", 0],
    ["In what ways do you think this has troubled you?", 0],
    ["What do you think will happen if you don't take any action?", 1],
    ["What changes, if any, are you thinking about making?", 1],
    ["What do you think you will do now?", 1],
    ["You show a lot of patience and understanding by telling me about this.", 2],
    ["It seems like you are a really good-willed person in a way.", 2],
    ["You've still carried on. That's impressive.", 2], // 0103
    ["It sounds like you may be feeling some frustration with that.", 3],
    ["I understand how you feel.", 3], // 0102
    ["That can be tricky.", 3], // 0102
    ["People skills are usually the toughest.", 2], // 0102
  ]]
],,0],

["fail\\w*", 3, [
  ["I fail", [
    ["What is there about your problem that you or other people might see as reasons for concern?", 0],
    ["What are your worst fears about what might happen?", 0],
    ["What can you do about your frustrations?", 0],
    ["How would you like things to turn out for you?", 1],
    ["I can see that you are feeling frustrated right now. How would you like things to be different?", 1],
    ["I appreciate your willingness to be so open about this.", 2],
    ["One on hand, you feel you have done all you could do, but on the other hand, you want to figure out what else you needed to do.", 3],
    ["I somehow sense that you feel discouraged.", 3],
    ["You have worked hard, despite the result.", 2]
  ]],
  ["*", [
    ["What things make you think that this is a problem?", 0],
    ["What contributed to this problem?", 0],
    ["What are the options for you now? What can you do?", 1],
    ["Suppose that things went well. What most likely is it that worked?", 1],
    ["If I were in your position, I would also find that difficult.", 2],
    ["You may be a bit frusrated for getting into this situation.", 3],
    ["You've been through a lot, perhaps more than most people.", 2]
  ]],
],,0],

["didn\\w?", 1, [ // 상황이 잘못된 경우?
  ["*", [
    ["How would you feel about that?", 0],
    ["In what ways does this concern you?", 0],
    ["What could you have done differently?", 1],
    ["Suppose you could change one thing about this situation. What would that be?", 1],
    ["I understand.", 3], // 1221
    ["That makes sense.", 3]
  ]]
],,0],

["situat\\w*", 1, [
  ["* situation *", [
    ["What do you feel deep down in your heart about this situation, or options?", 0],
    ["What do you think you can do to manage all your responsibilities?", 0],
    ["How would you like things to be different?", 1],
    ["If you decide to make a change, what are your hopes for the future?", 1],
    ["I'm impressed that you care so much to handle the situation.", 2],
    ["I think you have been able to make your way through.", 2],
  ]]
],,0],

["advis\\w*|adviser\\b|professor\\b|\\bPI\\b|\\bPL\\b", 3, [ // he 키워드랑 동일하게 해보자
  ["*", [
    ["In what way does this bother you?", 0],
    ["In what ways do you think this has troubled you?", 0],
    ["What do you think will happen if you don't take any action?", 0],
    ["What changes, if any, are you thinking about making?", 1],
    ["What do you think you will do now?", 1],
    ["What do you want to see different?", 1],
    ["You show a lot of patience by telling me about this.", 2],
    ["It's not always easy to handle these things.", 2], // 1221
    ["I wouldn't be surprised.", 3], // 1221
    ["You might feel a bit discouraged.", 3], // 1221
  ]],
],,0],

["struggl\\w*", 3, [
  ["* struggle with *", [
    ["How much does that concern you? In what ways?", 0],
    ["How has this affected you?", 0],
    ["What are your hopes for the future with (1)?", 1],
    ["Help me better understand the struggle, and how it has affected your life.", 3],
    ["Perhaps you can think of your own strengths in dealing with this kind of problem.", 2],
    ["You are struggling to figure out what else you could do with (1).", 3]
  ]],
  ["struggle to * ", [
    ["What made you nervous to (1)?", 0],
    ["What are the options for you now? What could you do to (1)?", 1],
    ["What changes, if any, are you thinking about making?", 1],
    ["You are not sure how anyone can help (1).", 3],
    ["You seem to be unsure of how to deal with this problem.", 3]
  ]],
  ["I * @struggle", [
    ["What have you done to cope with it?", 0],
    ["What will make you feel better?", 0],
    ["What sources of social support do you have?", 1],
    ["Who else could help you with this?", 1],
    ["That must have been very difficult for you.", 2],
    ["You may feel you have failed.", 3],
    ["You feel stressed you struggle with that and you want to make good changes for yourself.", 3]
  ]],
  ["*", [
    ["What else needs to happen to move you a little more towards your wish?", 0],
    ["How do you think you will go about it for now?", 0],
    ["It's understandable.", 2],
    ["What support can you draw on about this?", 1],
    ["When in your life have you made up your mind to do something, but it didn't work out? What did you do that eventually worked?", 1],
    ["I think it's great that you want to do something about this problem. That must have been very difficult for you.", 2],
    ["I think you show a great deal of determination to handle this problem.", 2],
    ["I applaud your courage and tenacity to deal with the challenge you have.", 2]
  ]]
],,0],

// Informational Keywords
["cours\\w?", 2, [
  ["[^of] cours\\w?", [ // 이 패턴만 제외하면 모두 course에 관한 이야기
    ["What do you think you can do to manage all your responsibilities?", 1],
    ["How you think the decision on continuing with this workload will affect you?", 1],
    ["What can you do so you won't get overwhelmed or stressed?", 1],
    ["It may be difficult for you to deal with so much stuff.", 2], //
    ["If I were in your shoes, I don’t know if I could have managed nearly so well.", 2],
    ["You feel overwhelmed, and very tired, maybe you need some rest.", 3]
  ]],
],,0],

["think", 5, [
  ["I * think", [
    ["What else can you think of?", 0],
    ["What other concerns might come up for you?", 0],
    ["What do you imagine are the worst things that might happen to you?", 0],
    ["At this point, after reviewing all of this, what's the next step for you?", 1],
    ["What do you want to do at this point?", 1],
    ["That's one good way of going about it.", 2],
    ["You should feel proud of yourself for taking this situation in control with your ideas.", 2],
  ]]
],,0],

["unfund\\w*", 1, [ // 일단 보류
  ["*", [
    ["What concerns you the most about this in the long term?", 0],
    ["What would your friends say to this?", 0],
    ["What supports can you draw upon?", 1],
    ["Are there others you could call for support? In what ways?", 1],
    ["What do you think would happen if the situation goes on?", 1],
    ["If I were in your position, I might have a hard time dealing with a lot of stress.", 2],
    ["I think what you are doing is really difficult.", 2],
    ["This can be difficult for everyone.", 3], // 1221
    ["You're not sure what to do.", 3],
  ]]
],,0],

["fund\\w*", 1, [
  ["no @fund*", [
    ["What concerns you the most about this in the long term?", 0],
    ["What would your friends say to this?", 0],
    ["What supports can you draw upon?", 1],
    ["Are there others you could call for support? In what ways?", 1],
    ["What do you think would happen if the situation goes on?", 1],
    ["If I were in your position, I might have a hard time dealing with a lot of stress.", 2],
    ["I think what you are doing is really difficult.", 2],
    ["This can be difficult for everyone.", 3], // 1221
    ["You're not sure what to do.", 3],
  ]]
],,0],

["apply\\b|applied\\b|application\\b|applicant\\b", 1, [ // 이 부분은 공감, 이해보다는 다른 쪽으로 돌려야
  ["*", [
    ["What strong points do you have that could help you succeed in making this work?", 1],
    ["Is there someone around you can help you with this?", 1],
    ["Who else could help with this?", 1],
    ["Are there others you could call for support? In what ways?", 1]
  ]],
],,0],

["advic\\w+", 1, [  //1219
  ["* tell|give|have * advice", [
    ["I'm sorry, I can't give you an answer, but may help you find a way.", -1], // added
  ]],
  ["advice", [
    ["What kind of advice would you wish to get?", 1], // added
    ["What would you wish to be heard?", 1], // added
    ["What could be a good advice in this situation?", 1], // added
    ["How would you like things to turn out, ideally?", 1], // added
  ]]
],,0],

["need\\w?", 5, [
  ["I * need", [
    ["Anything specific about your thought that made you feel as you do?", 0],
    ["What makes you think that things are not working for you?", 0],
    ["What obstacles do you foresee, and how might you deal with them?", 1],
    ["It sounds like things can't stay the way they are now. What do you think you might do?", 1],
    ["You're willing to take responsibility for your situation and life.", 2], // 1221
    ["I somehow sense that you know what needs to be done, but just a little overworked.", 2], // 1221
  ]],
  ["do I * need", [
    ["Who can help you, do you think?", 1], // added
    ["What other sources of support can you use?", 1], //added
    ["What would be a good first step?", 1], // added
    ["Well, how would you advise yourself if you could?", 1], // added
  ]]
],,0],

["plan\\w?", 5, [ // 내담자의 계획에 긍정적으로 반응해야 할듯
  ["I * plan", [
    ["Please go on. I am with you.", 3], // 1221
    ["That's a good plan.", 2],
    ["I'm really proud to see you working on this.", 2],
    ["What else?", 0],
    ["Can you elaborate on that?", 0]
  ]],
  ["my * plan", [
    ["Please go on. I am with you.", 3], // 1221
    ["That's a good plan.", 2],
    ["I'm really proud to see you working on this.", 2],
    ["What else?", 0],
    ["Can you elaborate on that?", 0]
  ]]
],,0],

// 1226 톤 낮추기
["\\?", 10, [ // \\?, really\\?는 O, C 있으면 안됨
  ["*", [
    ["Yes, perhaps.", 2],
    ["Yeah, maybe.", 3],
    ["That's what I think.", 2],
    ["That's right.", 3],
    ["Yeah. Now tell me, what can you do to achieve your goals?", 1],
    ["Yes, I think so. If you give me some more details, that would help.", 0],
    // ["I am not sure you really want my answer.", 2], // 1221
    // ["I can't tell you what to do. You will decide when and if you wish to change anything.", 2],
    // ["In fact, I think you are the best judge of what will work for you.", 2],
  ]]
],,0],

["^is", 10, [ //1205
  ["is it *", [ // 일단 * do you think * 랑 똑같이 가도록
    ["What do you think?", 0], // added
    ["How did you come to that thought?", 0], // added
    ["What about it concerns you?", 0], // added
    ["Well, what would other people say?", 0], // added
    // add 2 or 3...
  ]]
],,0],

["afghans", 999, [ //마지막 about 요약 위해
  ["afghans *", [
    ["(1)", -1], // added
  ]]
],,0],

];

// regexp/replacement pairs to be performed as final cleanings
// here: cleanings for multiple bots talking to each other
var elizaPostTransforms = [
  / old old/g, " old",
  /\bthey were( not)? me\b/g, "it was$1 me",
  /\bthey are( not)? me\b/g, "it is$1 me",
  /Are they( always)? me\b/, "it is$1 me",
  /\bthat your( own)? (\w+)( now)? \?/, "that you have your$1 $2 ?",
  /\bI to have (\w+)/, "I have $1",
  /Earlier you said your( own)? (\w+)( now)?\./, "Earlier you talked about your $2.",
  /You you/, "You",
];

// eof

//sung woo`s experiment code
var li =[];
elizaKeywords.forEach(function(el, id){
  el[2].forEach(function(e,i){
    li = li.concat(e[1]);
  });
  // li.push([el[1],el[0]]);
  // li.sort(function(a,b){ return a[0]-b[0]; });
});

// ocar갯수 확인용
for(var x=0;x<5;x++){
  var a=0;
  li.forEach(function(e,i){
    try{
      if(e[1]==x) a++;
    }
    catch(err){
      console.log(li[i-1], 'its neighborhoods have no comma....');
    }
  });
  console.log(x,a);
}
