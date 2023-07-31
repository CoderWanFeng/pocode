# -*- coding: UTF-8 -*-
'''
@作者 ：B站/抖音/微博/小红书/公众号，都叫：程序员晚枫
@微信 ：CoderWanFeng : https://mp.weixin.qq.com/s/yFcocJbfS9Hs375NhE8Gbw
@个人网站 ：www.python-office.com
@Date    ：2023/4/5 23:30 
@Description     ：
'''

import unittest

from pocode import *


class TestPip(unittest.TestCase):

    def test_pip_times(self):
        pip_times('python-office')

    def test_python_minor(self):
        python_version('python-office')

    def test_system(self):
        system('python-office')
