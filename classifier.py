import tensorflow as tf
import time
import pandas as pd
import numpy as np

n_lable = 3
n_size = 50

# -------- tf model 재설정 ------------
tf.reset_default_graph()
# writer.flush()

num_label = n_lable
num_feature = n_size
DROPOUT = 0.5
LEARNING_RATE = 0.02# 0.01 잘됨
ALPHA = 0.01
EPOCHS = 5
MINI_BATCH = 1 # mini batch 작으면 노이즈 효과

with tf.device('/cpu:0'):
    X = tf.placeholder(tf.float32, shape=[None, num_feature])
    Y = tf.placeholder(tf.float32, shape=[None, num_label])
    keep_prob = tf.placeholder(tf.float32)

# Xavier 초기화 하니 잘됨
# dropout잘 확인안됨, 데이터 노멀라이징 필요, cost자꾸 튐
    with tf.name_scope('LAYER1') as scope:
        W1 = tf.get_variable(name='weight1', shape=[num_feature, 1000], initializer=tf.contrib.layers.xavier_initializer())
        b1 = tf.Variable(tf.random_normal([1000]), name='bias1')
    #     L1 = tf.nn.tanh(tf.matmul(X, W1)+b1)
        L1 = tf.nn.relu(tf.matmul(X, W1)+b1)
        L1 = tf.nn.dropout(L1, keep_prob=keep_prob)

    # with tf.name_scope('LAYER2') as scope:
    #     W2 = tf.get_variable(name='weight2', shape=[1000, 500], initializer=tf.contrib.layers.xavier_initializer())
    #     b2 = tf.Variable(tf.random_normal([500]), name='bias2')
    #     L2 = tf.nn.tanh(tf.matmul(L1, W2)+b2)
    #     L2 = tf.nn.dropout(L2, keep_prob=keep_prob)

    # with tf.name_scope('LAYER3') as scope:
    #     W3 = tf.get_variable(name='weight3', shape=[1000, 500], initializer=tf.contrib.layers.xavier_initializer())
    #     b3 = tf.Variable(tf.random_normal([500]), name='bias3')
    #     L3 = tf.nn.relu(tf.matmul(L2, W3)+b3)
    #     L3 = tf.nn.dropout(L3, keep_prob=keep_prob)

    with tf.name_scope('LAYER4') as scope:
        W4 = tf.get_variable(name='weight4', shape=[1000, num_label], initializer=tf.contrib.layers.xavier_initializer())
        b4 = tf.Variable(tf.random_normal([num_label]), name='bias4')
        hypothesis = tf.nn.softmax(tf.matmul(L1, W4)+b4)
        
    # 훈련부는 삭제하더라도 아래 predict, accuracy종속 변수는 모두 있어야 함
    predicted = tf.argmax(hypothesis, 1)
    accuracy = tf.reduce_mean(tf.cast(tf.equal(predicted, tf.argmax(Y, 1)), dtype=tf.float32))

# -------- 텐서플로 모델 로드 ----------
    sess = tf.Session(config=tf.ConfigProto(log_device_placement=True))
    # sess.run(tf.global_variables_initializer()) # 이니셜라이징 하면 안됨
    save_path = "../models/tf_intent_model.ckpt"
    saver = tf.train.Saver()
    saver.restore(sess, save_path)


# -------- 대화 파싱 --------
import gensim

from nltk.tokenize import word_tokenize
from nltk.tokenize import RegexpTokenizer
from gensim import corpora, models, similarities
from pprint import pprint
from nltk.stem import PorterStemmer

st = PorterStemmer()
t = RegexpTokenizer("[A-Za-z]+")

# 저장한 d2v 모델 로드
model = models.doc2vec.Doc2Vec.load('../models/doc2vec.model')

# 도큐먼트 벡터 추출
docs_exam = [
    "I have a ton of papers to read, TA to do, and a project to work on. I don’t know how I should manage my time. I am so out of time. I try to schedule my weekly plan and try really hard to follow that, but I always fail, because unexpected things come up and I fail to manage my time. I don’t know how other people people keep track of everything on top of coursework. It bothers me that I don’t have time for myself. This week I have a presentation within my cohort as well, but I am not prepared at all. ",
    "I just started my PhD, and it sucks. I feel so dumb when I talk with my supervisor. He asks me to come in every week and we talk for almost an hour, but I feel totally helpless after the meeting. He criticizes what I am doing wrong, and every subject that I bring does not seem to satisfy him at all. I don’t know what to do. So when I read papers, I don’t know where to start, and when I do read them, I don’t understand a thing. It makes me so stressed out. I don’t know where to start, or what problem is interesting to research as a PhD.",
    "I am trying to get into Columbia’s School of Education. I’ve got my GPA okay, but I am having trouble with GRE scores.  So I think I can ace the quantitative section, but I always screw up the verbal section. I am afraid I won’t be able to get into the school I want. ",
    'TAing undergrads... the struggles. I don\'t understand why these kids are complaining about their "very low" lab report marks when:\n\n1. The rubric was posted online.\n2. A guide on how to write a good report was posted online.\n3. I\'ve explained countless times on what to do and don\'t do in a lab report. \n4. They write a piss poor discussion section and don\'t bother with adding a title/label on their figures/graphs to save their life, even if it was explained in the guide.\n\nAnyone else have these struggles? End rant.',
    'alslskk xxzsx pxoeo3 plaak xkxksiwq pse all',
    'I graduated from a lower engineering college in 2014 and worked on mechanical design work for about three years. After leaving last year, I want to get a job again, but it is a very critical factor. I want to do a job related to a machine majors. Of course, I am worried about myself not being a student of escape education by simply failing to work. I would like to briefly explain my situation: 1. I do not seem to be going to graduate school with my major, but I want to go to mechanical engineering. (Even if I do my major, I will not be able to get a job anymore.) 2. I have 3 credits and have no experience in mechanical engineering. I do not think it will help though there is a general machine certificate certificate just a while ago. 3. I am now 30 years old ... I have not tried it yet. It seems that it is not tough to be like this, but if the graduate professor that I want to go does not answer, the risk seems a little big. Is graduation school the right way? I have graduated a lot and my major is different, so I do not know how much the graduate thio is. Thank you for reading ...',
]
def doc2Stc(*docs):
    docs = list(docs)
    
    # tokenize
    tok_exam = [t.tokenize(i) for i in docs]

    # stop words
    stops = []
#     stops = stopwords.words('english')
#     stops = list(set([st.stem(stop) for stop in stops])) # stemming stop words 

    # 1글자 제거, stemming
    st_exam = []
    for comment in tok_exam:
        comment = list(filter(lambda x: x not in['deleted', 'nan'], comment)) # 한글자 제거, [deleted]제거
#         comment = list(filter(lambda x: len(x)>1 and x not in['deleted', 'nan'], comment)) # 한글자 제거, [deleted]제거
        comment = [st.stem(word) for word in comment if not st.stem(word) in stops] # 어근 뽑아내면 소문자 변환 자동으로 됨
        st_exam.append(comment)

    stc_exam = []
    for idx, el in enumerate(st_exam): #어근 분류한것
    # for idx, el in enumerate(comments): # 그냥 넣은것
    #     sentences.append(models.doc2vec.LabeledSentence(words=el, tags=[df['y'][idx]]))
        if len(el)==0: el= ['empty']
        stc_exam.append(models.doc2vec.LabeledSentence(words=el, tags=['s%d'%idx])) 
    
    return stc_exam

# w2v값 평균내기
# d2v의 labeled sentence를 파라메터로 사용
# 생각해보니 다른 큰 코퍼스를 삽입하니까 tf-idf정의 자체가 안되네.. 
def makeW2V(*sentences):
    print('num of sentences:',len(sentences))
    w2v = []
    ex_cnt = 0
    ex_words=[]
    for i , el in enumerate(sentences):
        wv_val=[]
        for  ele in el[0]:
            try: # vocab이 없을수도 있으므로
                temp = model.wv[ele]
                wv_val.append(temp)
            except:
                ex_cnt += 1
                wv_val.append([0]*n_size)
                ex_words.append(ele)
                # a배 하나 안하나 똑같지 않나?? 다르네...
    #     wv_val = [model.wv[w] for w in el[0]]

        wv_val = np.array(wv_val)
        wv_val = wv_val.mean(axis=0)
        w2v.append(wv_val)
    print('num of excepted words:', ex_cnt, ex_words)
    return w2v

# ------- 분류 결과 --------
def classify(docs_exam):
    print('Merged:\t', docs_exam)
    # *args로 넣을것
    stc_exam = doc2Stc(*docs_exam)
    exams = makeW2V(*stc_exam)
    
    acc = predicted.eval(feed_dict={X:exams, keep_prob: 1}, session=sess)
    h = hypothesis.eval(feed_dict={X:exams, keep_prob: 1}, session=sess)
    print('0: emotion // 1: infomation // 2: other')
    return acc, h

print('classify module loaded')