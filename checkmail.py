#-*- encoding: utf-8 -*-
#author : rayment
#CreateDate : 2012-06-24
import imaplib
import email


import sys
reload(sys)
sys.setdefaultencoding('utf-8')


def my_unicode(s, encoding):
    if encoding:
        return unicode(s, encoding)
    else:
        return unicode(s)


def checkMail(mailhost, accout, password):
    con = imaplib.IMAP4_SSL(mailhost)
    con.login(accout, password)
    try:
        con.select('INBOX', readonly=True)
        flag, data = con.search(None, 'ALL')

        print('Accout : ' + accout)
        for num in (data[0]).split(' '):
            typ, msg_data = con.fetch(num, '(RFC822)')

            print('No : ' + num)
            for response_part in msg_data:
                if isinstance(response_part, tuple):

                    print response_part
                    exit()

                    msg = email.message_from_string(response_part[1])
                    ls = msg["From"].split(' ')

                    strfrom = ''

                    if(len(ls) == 2):
                        fromname = email.Header.decode_header((ls[0]).strip('\"'))
                        strfrom = 'From : ' + my_unicode(fromname[0][0], fromname[0][1]) + ls[1]
                    else:
                        strfrom = 'From : ' + msg["From"]

                    print(strfrom)

                    strdate = 'Date : ' + msg["Date"]
                    print(strdate)

                    subject = email.Header.decode_header(msg["Subject"])

                    strsub = 'Subject : ' + my_unicode(subject[0][0], subject[0][1])
                    print(strsub)
    finally:
        try:
            con.close()
        except:
            pass
        con.logout()

if __name__ == '__main__':
    checkMail('mail.mamol.co.jp', 'kiku@mamol.co.jp', 'kiku0287')
    #checkMail('imap.gmail.com', 'juteng2005', 'Juteng378084190')
