import os.path
import collections
import pandas as pd
from operator import itemgetter
from nltk.tokenize import RegexpTokenizer
from gensim import corpora, models, similarities

t = RegexpTokenizer("[A-Za-z]+")
# 저장한 d2v 모델 로드
model = models.doc2vec.Doc2Vec.load('../models/doc2vec.model')

# WORDFILE = '/usr/share/dict/words'
cps_sum = list(pd.read_csv('../models/dict.csv', header=None).dropna()[0]) # IMDB + REDDIT + brown
# cps_sum = [i.lower() for i in cps_sum]

# 음소별 bigram
class Autocorrect(object):
    """
    Very simplistic implementation of autocorrect using ngrams.
    https://gist.github.com/bgreenlee/1321254
    """
    def __init__(self, ngram_size=3, len_variance=1):
        self.ngram_size = ngram_size
        self.len_variance = len_variance

#         self.words = set([w.lower() for w in open(WORDFILE).read().splitlines()])
#         self.words = list(pd.read_csv('dict.csv').dropna()['0'])
        self.words = cps_sum

        # create dictionary of ngrams and the words that contain them
        self.ngram_words = collections.defaultdict(set)
        for word in self.words:
            for ngram in self.ngrams(word):
                self.ngram_words[ngram].add(word)
        print("Generated %d ngrams from %d words" % (len(self.ngram_words), len(self.words)))

    def lookup(self, word):
        "Return True if the word exists in the dictionary."
        return word in self.words

    def ngrams(self, word):
        "Given a word, return the set of unique ngrams in that word."
        all_ngrams = set()
        word = str(word)
        for i in range(0, len(word) - self.ngram_size + 1):
            all_ngrams.add(word[i:i + self.ngram_size])
        return all_ngrams

    def suggested_words(self, target_word, results=20):
        "Given a word, return a list of possible corrections."
        word_ranking = collections.defaultdict(int)
        possible_words = set()
        for ngram in self.ngrams(target_word):
            words = self.ngram_words[ngram]
            for word in words:
                # only use words that are within +-LEN_VARIANCE characters in 
                # length of the target word
                if len(word) >= len(target_word) - self.len_variance and \
                   len(word) <= len(target_word) + self.len_variance:
                    word_ranking[word] += 1
        # sort by descending frequency
        ranked_word_pairs = sorted(word_ranking.items(), key=itemgetter(1), reverse=True)
        return [(word_pair[0], word_pair[1]) for word_pair in ranked_word_pairs[0:results]]

# class instance 생성
corrector = Autocorrect()

import nltk.collocations
import nltk.corpus
import collections

# 실질적인 오타 교정 함수
def correctWord(w1, w0=False, w2=False):
    # 음소별 bigram 으로 가능 단여 유추
    ng = corrector.suggested_words(w1)
    # 첫글자 다르면 무조건 제외... 처음 글자는 거의 안틀림
    # 음소별 바이그램 가장 큰 두개 그룹만
    n_group = 2
    ngs = []
    cnt_sim = 0
    ctr_sim = 999
    for i in ng:
        if ctr_sim > i[1]: cnt_sim+=1
        if cnt_sim <= n_group:
            ctr_sim = i[1]
            if i[0][0]==w1[0]: ngs.append(i[0])
        else: break
    # 한글자 문장 들어오면 ngram 가장 첫번째것, 그것도 없으면 '$$$' 출력
    if not w0 and not w2:
        res = ngs[0] if len(ngs) > 0 else '$$$'
        print('-------',w1,'->',res,'------\n',res)
        return res
    
    # w2v model 이용
    toks = []
    for i in ngs:
        try:
            if w0:
                score = model.wv.similarity(w0, i)
                toks.append([i, score])
            if w2:
                score2 = model.wv.similarity(w2, i)
                toks.append([i, score2])
        except:
            continue
    
    # 중복 키워드 스코어 합 계산
    toks_ = []
    for i,el in enumerate(toks):
    #     print(el[0],'----')
        flag = False
        for j in range(i+1,len(toks)):
    #         print(toks[j][0])
            if el[0] == toks[j][0]:
                flag=True
                toks[j][1] += el[1]
                break
        if not flag:
            toks_.append(el)
            
    toks = toks_
            
    toks.sort(key= lambda x: x[1])
    if(toks): toks.reverse()
    toks_modi = toks[0][0] if len(toks)>0 else '$$$'
    print('-------',w1,'-->',toks_modi,'------\n',toks)
    return toks_modi

def refine(inputs):
    outputs = []
    for ipt in inputs:
        ipt = t.tokenize(ipt)
        ipt = [ i.lower() for i in ipt ]
        ipt = [(i, True) if i in cps_sum else (i, False) for i in ipt]

#         print(ipt)
        output = []
        for idx, el in enumerate(ipt):
            if not(el[1]):
                # 맨 처음은 뒤에걸로 참조 마지막은 앞에걸로 참조
                if idx==0:
                    if len(ipt)<2: output.append(correctWord(ipt[idx][0], False, False))
                    else: output.append(correctWord(ipt[idx][0], False, ipt[idx+1][0]))
                elif idx==len(ipt)-1:
                    output.append(correctWord(ipt[idx][0], ipt[idx-1][0], False))
                else:
                    output.append(correctWord(ipt[idx][0], ipt[idx-1][0], ipt[idx+1][0]))
            else:
                output.append(el[0])

        output = ' '.join(output)
        outputs.append(output)
    
    return outputs