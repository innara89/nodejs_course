//1.import 'http'
const http = require ('http');

//2.create server
const server = http.createServer((request,response)=>{

//3.create default response
response.end('Hello world');
});

//4. start
const PORT = 3000;
server.listen(PORT,()=>{
    console.log(`server is running on port http://localhost:${PORT}`)

});



