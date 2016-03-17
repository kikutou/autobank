#!python2.6
# -*- coding: utf-8 -*-
import sqlite3

con = sqlite3.connect("autobank.db",isolation_level=None)

sql = u"""
create table if not exists bank (
  id varchar(20) PRIMARY,
  mail varchar(100),
  url varchar(200),
  loginId varchar(50),
  password varchar(50)
);
"""
con.execute(sql)

sql = u"insert into bank values ('mizuho', 'send@b-web.mizuhobank.co.jp', 'https://wwww.b-web.mizuhobank.co.jp/login','mizuho_login_id','mizuho_login_password')"
con.execute(sql)

con.row_factory = sqlite3.Row
rows = con.execute(u"select * from bank")

for row in rows:
    print row["id"]