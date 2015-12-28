# -*- coding: utf-8 -*-
import base64
import os
import urllib
import urllib2
import cookielib

import poster
import config

LOGIN_PAGE = base64.decodestring('aHR0cHM6Ly9sb2dpbi50YW9iYW8uY29tL21lbWJlci9sb2dpbi5qaHRtbA==\n')

class AuthError(NotImplementedError):
    def __init__(self,error,message):
        self.error = error
        self.message = message
    def __str__(self):
        return repr(self.message)

class Auth(object):
    def __init__(self, **nargs):
        if nargs.has_key('cookie_path'):
            self.cookie_path = nargs['cookie_path']
        else:
            raise AuthError('REQUIRED','the path of cookie is REQUIRED!')

        if self.cookie_path:
            self.cookiejar = cookielib.MozillaCookieJar()
            if os.path.exists(self.cookie_path):
                self.load_cookies()

        self.opener = urllib2.build_opener(urllib2.HTTPCookieProcessor(self.cookiejar))
        proc = poster.streaminghttp.register_openers()
        proc.add_handler(urllib2.HTTPCookieProcessor(self.cookiejar))

        if not self.has_logged():
            if nargs.has_key('login') and nargs['login']:
                self.login(nargs['username'], nargs['password'])

    def login(self, username, password):
        if username:
            username = username.decode(config.default_encoding).encode('utf-8')
        else:
            username = self.get_username() if self.has_cookie('.taobao.com', 'tracknick') else config.get_config('username')

        if not username:
            raise AuthError('REQUIRED','Error: username is REQUIRED!')
        if not password:
            raise AuthError('REQUIRED','Error: password is REQUIRED!')

        login_data = urllib.urlencode({
            'TPL_username':username.decode('utf-8').encode('gbk'),
            'TPL_password':password,
        })

        self.opener.open(LOGIN_PAGE, login_data)
        self.save_cookies()

        if not self.has_logged():
            raise AuthError('FAILED','Error: login FAILED,MAYBE the username or password is NOT correct!')

    def logout(self):
        if self.cookie_path:
            self.cookiejar.clear()
            self.save_cookies()

    def has_logged(self):
		return True if self.get_cookie('.taobao.com', '_l_g_') and self.get_username() else False

    def load_cookies(self):
        self.cookiejar.load(self.cookie_path, ignore_discard=True, ignore_expires=True)

    def save_cookies(self):
        if self.cookie_path:
            self.cookiejar.save(self.cookie_path, ignore_discard=True)

    def get_cookie(self, domain, k):
        if self.has_cookie(domain, k):
            return self.cookiejar._cookies[domain]['/'][k].value

    def has_cookie(self, domain, k):
        return domain in self.cookiejar._cookies and k in self.cookiejar._cookies[domain]['/']

    def get_username(self):
        return self.get_cookie('.taobao.com', 'tracknick')
