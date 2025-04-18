# -*- coding: UTF-8 -*-
'''
@作者  ：B站/抖音/微博/小红书/公众号，都叫：程序员晚枫，微信：CoderWanFeng
@读者群     ：http://www.python4office.cn/wechat-group/
@学习网站      ：https://www.python-office.com
@代码日期    ：2023/7/31 21:07 
@本段代码的视频说明     ： https://mp.weixin.qq.com/s/jplHHmEkftCFevFJYEibGw
'''

import pocode

count_of_code_lines, count_of_blank_lines, count_of_annotation_lines = pocode.line.count_line(
    code_path=r'd:/workplace/程序员晚枫/github/python-office')
print(f'代码总行数：{count_of_code_lines}，代码空行：{count_of_blank_lines}，代码注释：{count_of_annotation_lines}')
