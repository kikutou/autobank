#coding=utf-8
import time
from splinter import Browser

def splinter(url):
    browser = Browser()
    #login 126 email websize
    browser.visit(url)
    #wait web element loading
    time.sleep(5)
    #fill in account and password
    browser.find_by_id('idInput').fill('kiku')
    browser.find_by_id('pwdInput').fill('123456')
    #click the button of login
    browser.find_by_id('loginBtn').click()
    time.sleep(8)
    #close the window of brower
    browser.quit()

if __name__ == '__main__':
    websize3 ='http://www.126.com'
    splinter(websize3)
