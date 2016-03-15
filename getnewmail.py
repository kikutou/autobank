#-*- encoding: utf-8 -*-
#author : rayment
#CreateDate : 2012-06-24
import imaplib
import re


def gmail_checker(mailhost, username, password, flag = 0):


        i=imaplib.IMAP4_SSL(mailhost)
        try:
                i.login(username, password)
                x, y=i.status('INBOX', '(MESSAGES UNSEEN)')

                print y
                exit()

                messages=int(re.search('MESSAGES\s+(\d+)', y[0]).group(1))
                unseen=int(re.search('UNSEEN\s+(\d+)', y[0]).group(1))
                #print "-------------------------------------------------"
                #print "%s : total %i messages, %i unseen." % (username, messages, unseen)
                outstr = []
                outstr.append(username)
                outstr.append(' : total ')
                outstr.append(str(messages))
                outstr.append(' messages, ')
                outstr.append(str(unseen))
                outstr.append(' unseen.')
                
                print(''.join(outstr), flag)
        finally:
                i.logout()

if __name__ == '__main__':
    #gmail_checker('imap.gmail.com', 'juteng2005', 'Juteng378084190', 1)
    gmail_checker('mail.mamol.co.jp', 'kiku@mamol.co.jp', 'kiku0287')