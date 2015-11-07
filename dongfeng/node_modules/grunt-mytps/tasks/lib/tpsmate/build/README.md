##可执行文件##

* tpsmate_i386 (编译环境为Ubuntu Server 12.04 LTS)
* tpsmate_x86_64 (编译环境为Arch Linux x86_64)
* tpsmate.exe (编译环境为Windows 7 32bit)

##python执行环境##
Mac和大部分的*nix发行版默认安装python，在使用前确认安装版本最低要求为2.6，且安装python包管理工具pip。

1. 进入src目录;
- 执行```pip install -r requirements.txt``` 安装依赖模块;
- 如果你使用的版本为2.6，需要安装argparse，执行 ```pip install argparse```;
- 执行```python cli.py```等同运行可执行文件。

##参考文档##
* [pip官方安装指南](http://www.pip-installer.org/en/1.3.X/installing.html)
