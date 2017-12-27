#### html-webpack-plugin-introduce-extend

```webpack.config.js

var htmlWebpackPluginIntroduceExtend = require('./html-webpack-plugin-introduce-extend');


plugins: [
    ...
    new htmlWebpackPluginIntroduceExtend({ 
        htmlPaths:["./index.html"],         //引入html
        jsPaths:["//res.wx.qq.com/open/js/jweixin-1.0.0.js"]   //引入js
    })

]