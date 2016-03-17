#-*- encoding: utf-8 -*-
#author : kiku
#CreateDate : 2016-03-17
import re
import time
import mailDbController

def checkEmail(path = '/home/kiku/.thunderbird/kx3gfqlm.default/ImapMail/mail.mamol.co.jp/INBOX.sbd/&UWWR0Xi6io0-'):

    '''ユーザーのメール受信ボックスをスキャンして
    入金確認メールがきたら、すぐデータベースに書き込み

    前提条件：
        thunderbirdを利用する
        そして、フィルタをかけて、自分のフォルダに保存させるようにする

    パラメーター：
        自分のフォルダのフルパス
    '''

    datePattern = re.compile('Date: .*');
    messageIdPattern = re.compile('Message-ID: <.*>')
    subjectPattern = re.compile('Subject: =.*')
    fromPattern = re.compile('From:.*<.*>');


    fin = open(path)
    while True:

        line = fin.readline()

        if not line:
            break

        if datePattern.match(line):
            #まず、日付を取る
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

                        #DBの処理をいれましょう
                        mailDbController.createNewMailInfo(messageId,dateTime,0)


                    else:
                        print 'some problems from sentman'
                        continue

                else:
                    print 'some problems with subject'
                    continue


            else:
                print 'error'
                continue

    fin.close()


if __name__ == '__main__':

    while True:
        checkEmail('/home/kiku/.thunderbird/xe9nddv0.default/Mail/mail.mamol.co.jp/入金確認')
        time.sleep(10)