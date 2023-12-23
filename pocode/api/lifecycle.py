# -*- coding: UTF-8 -*-
'''
@作者  ：B站/抖音/微博/小红书/公众号，都叫：程序员晚枫
@微信     ：CoderWanFeng : https://mp.weixin.qq.com/s/Nt8E8vC-ZsoN1McTOYbY2g
@个人网站      ：www.python-office.com
@代码日期    ：2023/12/23 21:48 
@本段代码的视频说明     ：
'''
import functools


def deprecated(version=None, demo=None):
    """
    标明一个函数已经被弃用的装饰器函数
    :param version: (Optional) 函数弃用的版本号
    :param demo: (Optional) 函数的最新写法示例
    :return: 被弃用的函数的包装函数
    """
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            print(version, demo)
            if version is not None:
                print(f"这个函数已经过期了，请更新到最新的版本> {version}")
            if demo is not None:
                print(f"这个函数的最新写法，请见：{demo}")
            return func(*args, **kwargs)

        return wrapper

    return decorator
