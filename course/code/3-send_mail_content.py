# -*- coding: UTF-8 -*-
'''
@作者  ：B站/抖音/微博/小红书/公众号，都叫：程序员晚枫
@微信     ：CoderWanFeng : https://mp.weixin.qq.com/s/Nt8E8vC-ZsoN1McTOYbY2g
@个人网站      ：www.python-office.com
@代码日期    ：2023/12/24 1:26 
@本段代码的视频说明     ：
'''
import os
from datetime import datetime

import poemail

key = os.getenv('EMAIL_KEY')
msg_from = os.getenv('EMAIL_FROM')
msg_to = os.getenv('EMAIL_TO')

poemail.send.send_email(key=key,
                        msg_from=msg_from,
                        msg_to=msg_to,
                        msg_subject='自动发邮件' + str(datetime.now().strftime('%Y-%m-%d %H:%M:%S')),
                        content='测试邮件发送' + str(datetime.now().strftime('%Y-%m-%d %H:%M:%S')))
