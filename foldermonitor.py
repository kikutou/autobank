#!/usr/bin/python
#coding=utf-8

import os
from  pyinotify import  WatchManager, Notifier, ProcessEvent,IN_DELETE, IN_CREATE,IN_MODIFY
import readmail

class EventHandler(ProcessEvent):
    def process_IN_CREATE(self, event):
        print   "Create file: %s "  %   os.path.join(event.path,event.name)

    def process_IN_DELETE(self, event):
        print   "Delete file: %s "  %   os.path.join(event.path,event.name)

    def process_IN_MODIFY(self, event):
        readmail.checkEmail('/home/kiku/.thunderbird/xe9nddv0.default/Mail/mail.mamol.co.jp/入金確認')
        print   "Modify file: %s "  %   os.path.join(event.path,event.name)

def FSMonitor(path='/var/log'):
    wm = WatchManager()
    mask = IN_DELETE | IN_CREATE |IN_MODIFY
    notifier = Notifier(wm, EventHandler())
    wm.add_watch(path, mask,rec=True)
    print 'now starting monitor %s'%(path)
    while True:
        try:
            notifier.process_events()
            if notifier.check_events():
                notifier.read_events()
        except KeyboardInterrupt:
            notifier.stop()
            break

if __name__ == "__main__":
    FSMonitor(path='/home/kiku/.thunderbird/kx3gfqlm.default/ImapMail/mail.mamol.co.jp/filterlog.html')
