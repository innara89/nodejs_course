const express = require('express');

// Import all route handlers
const customerRoutes = require('./customerRoutes');

// 1. Set up the server
const app = express();
const port = 3000;

// PRE-HANDLER MIDDLEWARE
app.use(express.json());

// Custom middlware - LOGGING
app.use((req, res, next) => {
    console.log(`Time: ${new Date()} | Method: ${req.method} | Param: ${req.params}}`);
    next();
});

// Custom middlware - LOG RESPONSES
app.use((req, res, next) => {
    const oldSend = res.send;
    
    res.send = (body) => {
        console.log(`Body : ${body}`);
        oldSend.call(oldSend, body);
    }
    next();
});

// 2. Set up the routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/api', (req, res) => {
    res.send({message: 'Hello World!'});
});

// Delegate routing for '/api/customers' starting endpoint
app.use('/api/customers', customerRoutes);

// Example: /api/search?q=hello
app.get('/api/search', (req, res, next) => {
    const { q } = req.query;

    // Iterate over all keys in a JS object
    for (let key in req.query) {
        console.log(key, req.query[key]);
    }

    // Perform search
    const error = new Error('Critical server error');
    error.status = 403;

    if (error){
        next(error);
    } else{
        res.send({'search': q});
    }
   
});

// POST-HANDLER MIDDLEWARE
// app.use((req, res, next) => {
//     console.log('Reposnse sent');
//     res.on('finish')
//     next();
// });


app.use((err, req, res, next) => {
    console.log(`Error: ${err.status} - ${err.message}`);
    res.status(err.status || 500).json({error: err.message});
});

// 3. Start the server
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
