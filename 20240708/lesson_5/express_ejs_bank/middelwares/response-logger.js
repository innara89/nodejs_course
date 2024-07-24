// Custom middleware - LOG RESPONSES - SEND & JSON
const resLogger =((req, res, next) => {
    const oldSend = res.send;
    const oldJSON = res.json;

    res.send = function(body) {
        console.log(`Body: ${body}`);
        oldSend.call(this, body);
    }

    res.json = function(body) {
        console.log(`JSON Body: ${JSON.stringify(body)}`);
        oldJSON.call(this, body);
    }

    next();
});
module.exports = resLogger;