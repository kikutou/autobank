#coding=utf-8
import time

from selenium import webdriver
from splinter import Browser
import urllib


def splinter(url):

    browser = Browser()
    #login gmail websize

    browser.visit(url)
    #wait web element loading

    time.sleep(5)
    #fill in account

    browser.find_by_id('focus1').fill('1012374201018')
    #click the button of next
    browser.find_by_name('U010103').click()
    time.sleep(5)

    string="ガンダム"
    plainstring1 = unicode(string, "utf-8")
    browser.find_by_id('form02').fill(plainstring1)
    browser.execute_script("javascript:post_deviceprint(); return dcRequest('submitData','/tp1web/pc/U310201BLC.do',new Array('event'),new Array ('U310103'),false);")
    time.sleep(5)

    browser.find_by_id('form04').fill(plainstring1)
    browser.find_by_name('riyouKankyouTourokuFuyouUmu').click()
    browser.execute_script("javascript:post_deviceprint(); return dcRequest('submitData','/tp1web/pc/U310301BLC.do',new Array('event'),new Array ('U310204'),false);")
    time.sleep(5)

    #fill in password
    string1="gift362price"
    plainstring2 = unicode(string1, "utf-8")  
    browser.find_by_name('loginPassword').fill(plainstring2)
    #click the button of login
    browser.find_by_name('U010302').click()
    #wait web element loading
    time.sleep(2)
    browser.execute_script("javascript:return dcRequest('simpleTransitionForm','/tp1web/pc/U030101RED.do',new Array('event'),new Array ('U480112'),false);")
    time.sleep(2)
    browser.execute_script("javascript:return dcRequest('simpleTransitionForm','/tp1web/pc/U070101KCK.do','','',false);")
    time.sleep(2)
    browser.execute_script("javascript:return dcRequest('submitData','/tp1web/pc/U590101BLC.do',new Array('event'),new Array ('U070205'),false);")
    time.sleep(2)

    browser.execute_script("javascript:return dcRequest('submitData','/tp1web/pc/U590201BLC.do',new Array('csvDownloadBangou','event'),new Array('99','U590101'),true);")
    #print result
    #browser.execute_script("javascript:return dcRequest('submitData','/tp1web/pc/U590201BLC.do',new Array('csvDownloadBangou','event'),new Array('1','U590102'),true);")
 
    #m=driver.find_element_by_name("shiteiKanouKaishiTsukiId")
    #m.find_element_by_xpath("//option[@value='3']").click()
    #close the window of brower
    #browser.quit()

if __name__ == '__main__':
    websize3 ='https://direct.jp-bank.japanpost.jp/tp1web/U010101WAK.do'
    splinter(websize3)
