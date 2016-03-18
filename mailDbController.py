#-*- encoding: utf-8 -*-
#author : kiku
#CreateDate : 2016-03-17
import sqlite3
import time

def createNewMailInfo(id,created_time,status = 0):

    con = sqlite3.connect('autobank.db')
    curs = con.cursor()

    #DBの処理をいれましょう
    ins = 'insert into RECEIVE_MAIL (mail_id,received_at,status) VALUES(?,?,?)'

    try:
        curs.execute(ins,(id,time.mktime(created_time),0))
        con.commit()
        print 'you have a new file'
    except sqlite3.Error,e:
        con.rollback()

    curs.close()
    con.close()