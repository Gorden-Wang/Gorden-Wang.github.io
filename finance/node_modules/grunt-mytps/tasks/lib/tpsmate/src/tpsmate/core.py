# -*- coding: utf-8 -*-
import os
import sys
import time
import fileinput
import re
import json
import csv
import urllib2
import codecs
import base64

import pyquery
import poster

import auth
import config


TPS_PAGE = base64.decodestring('aHR0cDovL3Rwcy50bXMudGFvYmFvLmNvbS9waG90by9pbmRleC5odG0=\n')
UPLOAD_HOST = base64.decodestring('aHR0cDovL3Rwcy50bXMudGFvYmFvLmNvbQ==\n')
FILE_ENCODING = ('utf-8','gbk','big5')

class TPSMate():
    def __init__(self,**nargs):
        #super(TPSMate,self).__init__(**nargs)
        inst = auth.Auth(**nargs)
        self.opener = inst.opener

    def upload(self,photo):
        page = self.opener.open(TPS_PAGE)

        selector = pyquery.PyQuery(page.read(), parser = 'html')

        form = selector('#J_UploadForm')
        fields = form.filter('input')
        params =[]

        def params_collection(index, node):
            if node.attr('name') != 'force_opt':
                params.append(poster.encode.MultipartParam(node.attr('name'), node.attr('value')))
            else:
                params.append(poster.encode.MultipartParam('force_opt','1'))

        fields.each(params_collection)
        params.append(poster.encode.MultipartParam('photo',filename=os.path.basename(photo).decode('utf-8','ignore'),fileobj=open(photo,'rb')))

        datagen, headers = poster.encode.multipart_encode(params)
        request = urllib2.Request(UPLOAD_HOST + form.attr('action'), datagen, headers)
        upload_response = urllib2.urlopen(request)

        return json.loads(upload_response.read())

    def batch(self, photos):
        for photo in photos:
            response = self.upload(photo['path'])

            if response.has_key('url'):
                photo.update({
                    'url':response['url'],
                    'filename':response['file_name'],
                })

        return photos

    def parse(self, path):
        chunk = open(path,'rb')
        paths = re.finditer(r'url\("?([a-zA-Z0-9_\-\/\.]+\.(jpg|png|gif|jpeg))"?\)|src="([a-zA-Z0-9_\-\/\.]+\.(jpg|png|gif|jpeg))"', chunk.read())
        files = []
        store = []

        chunk.close()

        for p in paths:
            matchgroup = p.group(1) if p.group(1) else p.group(3)
            files.append(matchgroup)


        files = list(set(files))

        for original in files:
            store.append({
                'original':original,
                'path':os.path.join(os.path.abspath(os.path.dirname(path)), original),
            })

        return store

    def generate(self, path, export, inplace):
        data = self.batch(self.parse(path))
        inplace = 1 if inplace else 0
        lines = []

        original = fileinput.FileInput(path, inplace = inplace)
        fenc = FILE_ENCODING[0]

        for line in original:
            for idx, enc in enumerate(FILE_ENCODING):
                try:
                    line = line.decode(enc)

                    for o in data:
                        if o.has_key('url'):
                            b = re.compile('url\("?' + o['original'] +'"?\)')
                            s = re.compile('src="' + o['original'] +'"')
                            line = re.sub(s, 'src="' + o['url'] +'"', re.sub(b,'url(' + o['url'] +')' , line))


                    lines.append(line)
                    sys.stdout.write(line.encode(enc))
                    break
                except Exception:
                    if enc != FILE_ENCODING[-1]:
                        fenc = FILE_ENCODING[idx+1]
                        continue
                    else:
                        fenc = FILE_ENCODING[0] 

                    sys.exit(1)

        fileinput.close()

        if export is not None:
            try:
                target = codecs.open(export, 'wb', fenc) 
                for line in lines:
                    target.write(line)

                target.close()
            except Exception, e:
                print e

        return data

    def csv(self, o, path):
        prefix = 'tpsmate_'
        path = os.path.join(os.path.abspath(path),prefix + time.strftime('%Y%m%d%H%S',time.localtime(time.time())) + '.csv')
        f = open(path,'wb')
        c = csv.writer(f)
        c.writerow(['FileName','Path','URL'])

        for item in o:
            url = item['url'] if item.has_key('url') else ''
            c.writerow([item['filename'],item['path'],url])

        f.close()

        return path 

    def log(self, o):
        for item in o:
            url = item['url'] if item.has_key('url') else ''
            print '%s[%s] = %s' % (item['filename'].decode(config.default_encoding),item['path'].decode(config.default_encoding),url)
