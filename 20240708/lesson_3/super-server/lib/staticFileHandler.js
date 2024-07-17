// 1. Import 'http' module
const http = require('http');
const path = require('path');
const fs = require('fs');

// 2. Create a server
const serverStaticFile = (request, response) => {
    // 3.1 Parse URL and determine filename
    // 3.2 If no 'path' is defined, return 'index.html'
    
    // Ternary condition
    const url = request.url === '/' ? 'index.html' : request.url;

    // http://localhost:3006/file.html ==> c:\...\file.html
    // __dirname = 'c:\_nodejs_course\Lesson 1 - 8.7.24\fileServer'
    // __dirname = 'c:\_nodejs_course\Lesson 1 - 8.7.24\fileServer\public'
    // __dirname = 'c:\_nodejs_course\Lesson 1 - 8.7.24\fileServer\public\file.html'
    const publicDir = path.resolve(__dirname, '../')
    const filePath = path.join(publicDir, "public", url);
    const fileExt = path.extname(filePath);
    console.log(`filePath: ${filePath}`);   

    // Set the corret response content type
    let contentType = "";

    switch (fileExt) {
        case ".css":
            contentType = "text/css";
            break;
        default:
            contentType = "text/html";
    }

    // 3.3 ELSE look for the desired file
    // Read file asynchronously
    fs.readFile(filePath, (error, content) => {
        // 1. Check for errors, if error exists return 404.html
        if (error != null) {
            // Check if file doesn't exist
            if (error.code === 'ENOENT') {
                const errorFile = path.join(publicDir, "public", "404.html");
                fs.readFile(errorFile, (err, data) => {
                    // Assumption, all is well
                    response.writeHead(404, {'Content-Type': 'text/html'});
                    response.end(data, 'utf8');
                });
            } else {
                // DEFAULT error handling
                response.writeHead(500);
                response.end(`Server error: ${error.code}`);
            }
        } else {
            // 2. If all is well, return file
            response.writeHead(200, {'Content-Type': contentType});
            response.end(content, 'utf8');
        }
    });
};

module.exports = { serverStaticFile };