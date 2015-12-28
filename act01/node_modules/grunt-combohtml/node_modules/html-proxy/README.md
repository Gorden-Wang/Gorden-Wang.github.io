## html-proxy

为 `grunt-flexcombo` 提供的 html 区块代理功能。

`npm install html-proxy --save`

### 使用方法

	var HTMLProxy = require('html-proxy'),
    	htmlProxy;
    
    

    // 初始化 HTML-Proxy 实例
    if (options.htmlProxy) {
        htmlProxy = new HTMLProxy({
            htmlProxyConfig: options.htmlProxy,
            htmlProxyPort: options.htmlProxyPort,
            needServer: true
        });
    }
    
    
    // 整合 reverse-proxy，在反向代理中根据 url 重写反向代理配置
    // 检查是否匹配HTML-Proxy中的某个URL RegExp
    htmlProxy && (config = htmlProxy.exportConfigForRProxy(req, config));
        
       
### API

#### 构造函数

	new HTMLProxy({
        htmlProxyConfig: options.htmlProxy,
        htmlProxyPort: options.htmlProxyPort,
        needServer: true
    });
    
- `htmlProxyConfig` : 指定要代理的各个 url 以及需要替换的区块和选择器
- `htmlProxyPort` : `html-proxy` 服务工作的端口号，默认为 `8090`
- `needServer` : 是否需要启动代理服务，如果只用到 build 阶段的区块替换功能，不需要开启本地服务

#### `replaceDom`

    /**
     * 替换 HTML 字符串中指定 dom 的内容
     * @param str {String} HTML 字符串
     * @param replacements {Array} 替换配置[{selector: 'xxx', fragment: 'path'}, {...}]
     * @returns {String} 替换后的 HTML 字符串
     */
    replaceDom: function (str, replacements) {
        
    }

#### `exportConfigForRProxy`

    /**
     * 对匹配上的请求 url, 配置 RProxy 反向代理的 config， 使其转发请求到 html-proxy 服务
     * @param request {Object} 请求对象
     * @param config {Object} reverse-proxy 的请求配置
     * @return config {Object} 返回配置
     *
     */
    exportConfigForRProxy: function (request, config) {
        
    }

### History

- [0.0.8] [iconv-lite](https://www.npmjs.org/package/iconv-lite#readme) 不支持 GB2312，兼容为 GBK 处理
- [0.0.7] fix 包含中文 url 导致 matchIdx 为 `undefined`
- [0.0.6] 移除不太好用的 js-beautify 的格式化 html 功能
- [0.0.5] Bugfix
- [0.0.1] 初始功能