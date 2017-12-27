/**
 * sue
 * 2017-12-18
 */
var fs = require('fs');
function htmlWebpackPluginIntroduceExtend(options){
    this.options = options;
}

htmlWebpackPluginIntroduceExtend.prototype.apply = function(compiler){
    var self = this;
    var htmlPaths = self.options.htmlPaths || [];
    var jsPaths = self.options.jsPaths || [];
    compiler.plugin('compilation', function(compilation,options){
        compilation.plugin('html-webpack-plugin-before-html-processing', function(htmlPluginData, callback) {  

            var bodyRegExp = /(<\/body\s*>)/i;
            if(htmlPaths&&htmlPaths.length>0){
                for (var j = htmlPaths.length - 1; j >=0; j--){    //引入公共html,如引入html里包含图片路径并不会进行改变

                    htmlPluginData.html = htmlPluginData.html.replace(bodyRegExp,function(){
                        return self.getHtml(htmlPaths[j]) + "</body>";
                    })
                    
                }
            }
            if(jsPaths&&jsPaths.length>0){
                for (var i = jsPaths.length - 1; i >= 0; i--) {    //引入外链
                    htmlPluginData.assets.js.unshift(jsPaths[i]);
                }
            }
            
            callback(null, htmlPluginData);
        });
    })
}

htmlWebpackPluginIntroduceExtend.prototype.getHtml = function(htmlPath){
    if(htmlPath.indexOf('.html')!==-1){
        return fs.readFileSync(htmlPath,'utf-8');
    }else{
        return htmlPath;
    }
}

module.exports = htmlWebpackPluginIntroduceExtend;