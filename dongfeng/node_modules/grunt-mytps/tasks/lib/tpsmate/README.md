#TPS Mate 使用指南
TPS Mate是TPS系统的命令行版本。其中命令行版本基于python，当前功能主要包括上传单张图片、批量上传图片以及样式文件中背景图片的批量上传以及输出。其目的主要为减少手工替换以及为可能出现的前端打包工具提供更为有效的支持。

##环境支持以及权限说明

命令行版本支持Linux、Mac、Windows平台，请下载对应平台的二进制包，另外你需要一个有TPS上传权限的账号。
如果无对应平台的可执行文件，参考[这里](https://github.com/sodabiscuit/tpsmate/tree/master/build)。

##命令总览
    tpsmate upload "/path/to/image.jpg"
    tpsmate upload "/path/to/image.jpg" --no-interactive
    tpsmate upload "/path/to/image.jpg" --no-log
    tpsmate upload "/path/to/image.jpg" "/path/to/another/image.png"

    tpsmate upload "/path/to/image/directory"
    tpsmate upload "/path/to/image/directory" --logdir "/path/to/save/csv/log/"

    tpsmate upload "/path/*.png"

    tpsmate upload "/path/to/sheet.css"
    tpsmate upload "/path/to/sheet.css" --inplace
    tpsmate upload "/path/to/sheet.css" --export "/path/to/another/sheet.css"
    tpsmate upload "/path/to/sheet.css" --logdir "/path/to/save/csv/log/"
    tpsmate upload "/path/to/html"

    tpsmate upload "/path/to/image.jpg" "/path/to/image/directory" "/path/to/sheet.css"

    tpsmate config --username "username"
    tpsmate config --password "password"
    tpsmate config --encoding "utf-8,gbk,big5"
    tpsmate config --logdir "/path/to/save/csv/log/"

    tpsmate login --username "username" --password "password"

    tpsmate logout

##登陆
无论你通过login命令登陆还是在upload中以参数形式传入，cookie会保存在你的用户目录下，以便进行上传等操作。通常情况下，建议你使用config命令对账户和密码进行配置。config命令的使用可以参考“配置”章节。

如果你已经通过config命令配置过账户和密码，可通过以下命令即可登陆：

    tpsmate login

或者：

    tpsmate login --username "username" --password "password"

或直接执行upload命令，第一次上传文件时会进行登陆验证。

    tpsmate upload "/path/to/file" 
    
如果未做完全配置，即配置过账户或密码中的某一项，请在命令中指定缺少的参数，否则会以交互命令的方式提示你输入缺少的参数。

##配置
配置用户名：

    tpsmate config --username "username"

配置密码：

    tpsmate config --password "password"

配置样式表文件编码解析顺序，默认为utf-8,gbk,big5：

    tpsmate config --encoding "utf-8,gbk"
    
配置csv格式的日志文件存储目录，默认值为用户目录：

    tpsmate config --logdir "/path/to/save/csv/log/"

##上传图片
上传单张图片：

    tpsmate upload "/path/to/image.jpg"

未登陆状态下上传单张图片：

    tpsmate upload "/path/to/image.jpg" --username "username" --password "password"

上传单张图片且不在终端输出上传信息：

    tpsmate upload "/path/to/image.jpg" --no-interactive

上传单张图片且不输出csv：

    tpsmate upload "/path/to/image.jpg" --no-log

上传多张图片：

    tpsmate upload "/path/to/image.jpg" "/path/to/another/image.png"

上传某目录下的图片：

    tpsmate upload "/path/to/image/directory"

上传图片且将log文件保存到指定目录，如果无此参数，则会保存至config配置的logdir或者默认的用户目录中。通常日志名格式为tpsmate_20120611.csv。

    tpsmate upload "/path/to/image/directory" --logdir "/path/to/save/csv/log/"

##上传样式表中的的背景图片，导出或显示替换后的文件：
上传样式表中的背景图片，只在终端显示：

    tpsmate upload "/path/to/sheet.css"

上传样式表中的背景图片，并对原文件做替换操作：

    tpsmate upload "/path/to/sheet.css" --inplace

上传样式表中的背景图片，并生成指定的新文件：

    tpsmate upload "/path/to/sheet.css" --export "/path/to/another/sheet.css"

logdir参数与upload命令中的解释保持一致。

##上传html中的内联样式背景图片或者src属性，导出或显示替换后的文件：
上传html中的内联样式背景图片或者src属性，只在终端显示：

    tpsmate upload "/path/to/html"

上传html中的内联样式背景图片或者src属性，并对原文件做替换操作：

    tpsmate upload "/path/to/html" --inplace

上传html中的内联样式背景图片或者src属性，并生成指定的新文件：

    tpsmate upload "/path/to/html" --export "/path/to/another/html"

##强制上传任意文件中的内联样式背景图片或者src属性，导出或显示替换后的文件：

    tpsmate upload "/path/to/file" --force


##通配符支持

    tpsmate upload "/path/*.png"

##混合上传方式

    tpsmate upload "/path/to/image" "/path/to/image/directory" "path/to/sheet.css"

在你不清楚做什么之前，强烈不建议你这么做。

##关于
TPS Mate基于TPS的非官方接口，因此任何TPS官方的变动都可能导致TPS Mate短时间内不可用。当前版本未做过严格的测试，如果在使用中发现问题，可以创建ISSUE，我会尽快修复。同时你也可以通过下面的方式联系。

gmail/gtalk: sodabiscuit@gmail.com
AliWangWang:无语
AliMail:wuyu@taobao.com
