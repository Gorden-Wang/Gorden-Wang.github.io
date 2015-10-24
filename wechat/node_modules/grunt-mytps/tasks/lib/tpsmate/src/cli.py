# -*- coding: utf-8 -*-
import re
import os
import glob
import getpass
import argparse

import tpsmate.auth
import tpsmate.core
import tpsmate.config

COOKIE_PATH  = tpsmate.config.DEFAULT_COOKIES

def authorize(username = None, password = None):
    username = username if username is not None else tpsmate.config.get_config('username')
    password = password if password is not None else tpsmate.config.get_config('password')

    if not username or not password:
        cookies = tpsmate.auth.Auth(cookie_path = COOKIE_PATH, login = False)
        if cookies.has_logged():
            return True
        else:
            username = raw_input('username: ')
            password = getpass.getpass('password: ')
            return authorize(username, password)
    else:
        try:
            cookies = tpsmate.auth.Auth(username = username, password = password, cookie_path = COOKIE_PATH, login = True)
            return cookies.has_logged()
        except Exception, e:
            print e
            return False 

def upload(args):
    is_authorized = authorize(args.username, args.password)
    sources = args.sources 
    export = args.export
    inplace = args.inplace
    force = args.force

    if not is_authorized:
        return

    client = tpsmate.core.TPSMate(username = args.username, password = args.password, cookie_path = COOKIE_PATH, login = True)
    log_output = []

    for source in sources:
        if os.path.exists(source):
            if os.path.isfile(source):
                log = upload_skel(client = client, source = source, export = export, inplace = inplace, force = force)
                log_output = log_output + log
            elif os.path.isdir(source):
                for root,dirs,f in os.walk(source):
                    for filepath in f:
                        log = upload_skel(client = client, source = os.path.join(root, filepath), export = None, inplace = inplace, force = force)
                        log_output = log_output + log
            else:
                globs = glob.glob(source)
                for filepath in globs:
                    log = upload_skel(client = client, source = os.path.join(root, filepath), export = None, inplace = inplace, force = force)
                    log_output = log_output + log

    if not args.no_interactive:
        client.log(log_output)

    logdir = args.logdir or tpsmate.config.get_config('logdir') or tpsmate.config.DEFAULT_LOGDIR

    if not args.no_log and logdir and os.path.exists(logdir) and os.path.isdir(logdir):
        client.csv(log_output, logdir)

def upload_skel(client, source, export, inplace, force):
    r = []

    if re.match('.*\.(jpg|png|gif|jpeg)$',os.path.basename(source)):
        ret = {'path':os.path.abspath(source),'filename':os.path.basename(source)} 
        response = client.upload(source)
        if response.has_key('url'):
            ret.update({'url':response['url']})
        r.append(ret)
    elif force or re.match('.*\.(css|less|sass|scss|styl|html|htm)$', os.path.basename(source)):
        r = client.generate(source, export, inplace)

    return r

def config(args):
    keys = ['encoding', 'logdir', 'username', 'password']

    for k, v in args._get_kwargs():
        if k in keys and v is not None:
            tpsmate.config.put_config(k, v)

def login(args):
    is_authorized = authorize(args.username, args.password)
    if is_authorized:
        print 'login SUCCESSFUL'
    else:
        print 'login FAILED'

def logout(args):
    client = tpsmate.auth.Auth(cookie_path = COOKIE_PATH, login = False)
    client.logout()

def execute():
    parser = argparse.ArgumentParser(description = 'Taobao Photo System Command Line Tools')
    subparsers = parser.add_subparsers()

    upload_parser = subparsers.add_parser('upload')
    upload_parser.add_argument('--username', type = str, help = 'taobao photo system account')
    upload_parser.add_argument('--password', type = str, help = 'taobao photo system password')
    upload_parser.add_argument('sources', nargs='+', help = 'some images, style sheets or html. wildcard supported')
    upload_parser.add_argument('--export', type = str, help = 'parse it and export it to the new one')
    upload_parser.add_argument('--inplace', action = 'store_true', help = 'parse and replace it')
    upload_parser.add_argument('--no-interactive', action = 'store_true', help = 'don\'t print the upload log to terminal')
    upload_parser.add_argument('--no-log', action = 'store_true', help = 'don\'t save the upload log to the csv file')
    upload_parser.add_argument('--force', action = 'store_true', help = 'ignore the suffix name')
    upload_parser.add_argument('--logdir', type = str, help = 'the path stored the csv log')
    upload_parser.set_defaults(func = upload)

    config_parser = subparsers.add_parser('config')
    config_parser.add_argument('--username', type = str, help = 'taobao photo system account')
    config_parser.add_argument('--password', type = str, help = 'taobao photo system password')
    config_parser.add_argument('--logdir', type = str, help = 'the path stored the csv log')
    config_parser.add_argument('--encoding', type = str, help = 'try these codecs in order, split with comma')
    config_parser.set_defaults(func = config)

    login_parser = subparsers.add_parser('login')
    login_parser.add_argument('--username', type = str, help = 'taobao photo system account')
    login_parser.add_argument('--password', type = str, help = 'taobao photo system password')
    login_parser.set_defaults(func = login)

    logout_parser = subparsers.add_parser('logout')
    logout_parser.set_defaults(func = logout)

    args = parser.parse_args()
    args.func(args)

if __name__ == '__main__':
    execute()
