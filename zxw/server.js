// var http = require('http');
// var fs = require('fs');//引入文件读取模块

// var documentRoot = 'C:/Users/Administrator/Desktop/走秀网项目';
// //需要访问的文件的存放目录

// var server= http.createServer(function(req,res){

//     var url = req.url; 
//     //客户端输入的url，例如如果输入localhost:8888/index.html
//     //那么这里的url == /index.html 

//     var file = documentRoot + url;
//     console.log(url);
//     //E:/PhpProject/html5/websocket/www/index.html 


//     fs.readFile( file , function(err,data){
    
//         一参为文件路径
//         二参为回调函数
//             回调函数的一参为读取错误返回的信息，返回空就没有错误
//             二参为读取成功返回的文本内容
    
//         if(err){
//             res.writeHeader(404,{
//                 'content-type' : 'text/html;charset="utf-8"'
//             });
//             res.write('<h1>404错误</h1><p>你要找的页面不存在</p>');
//             res.end();
//         }else{
//             res.writeHeader(200,{
//                 'content-type' : 'text/html;charset="utf-8"'
//             });
//             res.write(data);//将index.html显示在客户端
//             res.end();

//         }

//     });



// }).listen(8888);

// console.log('服务器开启成功');
var PORT = 3000;//

var http = require('http');
var url=require('url');
var fs=require('fs');
var mine=require('./mine').types;//
var path=require('path');

var server = http.createServer(function (request, response) {
    var pathname = url.parse(request.url).pathname;
    var realPath = path.join("C:/Users/Administrator/Desktop/zxw", pathname);    //这里设置自己的文件名称;

    var ext = path.extname(realPath);
    ext = ext ? ext.slice(1) : 'unknown';
    fs.exists(realPath, function (exists) {
        if (!exists) {
            response.writeHead(404, {
                'Content-Type': 'text/plain'
            });

            response.write("This request URL " + pathname + " was not found on this server.");
            response.end();
        } else {
            fs.readFile(realPath, "binary", function (err, file) {
                if (err) {
                    response.writeHead(500, {
                        'Content-Type': 'text/plain'
                    });
                    response.end(err);
                } else {
                    var contentType = mine[ext] || "text/plain";
                    response.writeHead(200, {
                        'Content-Type': contentType
                    });
                    response.write(file, "binary");
                    response.end();
                }
            });
        }
    });
});
server.listen(PORT);
console.log("Server runing at port: " + PORT + ".");