#-*- encoding: utf-8 -*-
#author : kiku
#CreateDate : 2016-03-17
import re
import time
import sqlite3

def checkEmail(path = '/home/kiku/.thunderbird/kx3gfqlm.default/ImapMail/mail.mamol.co.jp/INBOX.sbd/&UWWR0Xi6io0-'):

    '''ユーザーのメール受信ボックスをスキャンして
    入金確認メールがきたら、すぐデータベースに書き込み

    前提条件：
        thunderbirdを利用する
        そして、フィルタをかけて、自分のフォルダに保存させるようにする

    パラメーター：
        自分のフォルダのフルパス
    '''

    con = sqlite3.connect('autobank.db')
    curs = con.cursor()

    datePattern = re.compile('Date: .*');
    messageIdPattern = re.compile('Message-ID: <.*>')
    subjectPattern = re.compile('Subject: =.*')
    fromPattern = re.compile('From:.*<.*>');


    fin = open(path)
    while True:
        #まず、日付を取る
        line = fin.readline()
        if datePattern.match(line):
            date = line.split('Date: ')[1].strip()

            dateTime = time.strptime(date,"%a, %d %b %Y %H:%M:%S +0900")

            #続いて、メッセージをとる
            line = fin.readline()
            if(messageIdPattern.match(line)):
                messageId = line.split('Message-ID: ')[1].strip()[1:-1]

                #主題をとる
                line = fin.readline()
                if(subjectPattern.match(line)):
                    subject = '入金確認'

                    #差出人をとる
                    line = fin.readline()
                    if(fromPattern.match(line)):
                        sentMan = line.split('From: =?UTF-8?B?6Z6g6aiw?= ')[1].strip()[1:-1]

                        print messageId

                        #DBの処理をいれましょう
                        ins = 'insert into RECEIVE_MAIL VALUES(?,?,?)'
                        curs.execute(ins,(messageId,dateTime,0))



                        print dateTime
                        print messageId
                        print len(messageId)
                        print subject
                        print sentMan
                        print '*************************'
                        continue

                    else:
                        print 'some problems from sentman'
                        continue

                else:
                    print 'some problems with subject'
                    continue


            else:
                print 'error'
                continue


if __name__ == '__main__':
    checkEmail()