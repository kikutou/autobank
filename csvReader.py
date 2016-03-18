#coding=utf8

import csv
import codecs
import os

import sys

with codecs.open(filename='./uploadcsv/201603180154_01.csv',mode='rt',encoding='sjis') as fin:

    #タイトル
    #お客さま口座情報
    title = fin.readline().encode('utf8').strip()
    print title

    #残高
    #現在高：,"100,000",円,
    balance = int(''.join(fin.readline().encode('utf8').split('\"')[1].split(',')))
    print balance

    #出力日時
    #出力日時：平成 28 年 03 月 18 日 22 時 01 分
    outputTime = fin.readline().encode('utf8')

    #お客さま口座番号
    #10110-75294431
    bankAcount = fin.readline()

    #照会対象
    #照会対象：期間指定
    print fin.readline()

    #日付指定
    #日付指定：平成 28 年 03 月 09 日 〜 平成 28 年 03 月 16 日
    print fin.readline()

    #明細件数
    #明細件数：1
    count = fin.readline()
    print count

    #項目タイトル
    #取引日,入出金明細ＩＤ,受入金額（円）,払出金額（円）,詳細１,詳細２,現在（貸付）高,
    titiles = fin.readline().encode('utf8')
    print titiles

    for row in fin:
        items = row.strip().split(',')
        print items
        for item in items:
            print item.encode('utf8').strip()



def jpYearToWesYear(str,num):
    if str == '平成':
        return 2000 + int(num) - 12
    elif str == '昭和':
        return 1900 + int(num) + 25
    else:
        raise Exception('can not change the year')
