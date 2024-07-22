const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

const user = {
    name: 'John Doe',
    accounts: [
        { number: '12345678', balance: 5000 },
        { number: '87654321', balance: 3000 }
    ]
};

const transactions = [];

app.get('/', (req, res) => {
    res.render('index', { user: user });
});

app.get('/transfer', (req, res) => {
    res.render('transfer', { user: user });
});

app.post('/transfer', (req, res) => {
    const fromAccount = user.accounts.find(account => account.number === req.body.fromAccount);
    const toAccount = user.accounts.find(account => account.number === req.body.toAccount);
    const amount = parseFloat(req.body.amount);

    if (fromAccount && toAccount && fromAccount !== toAccount && amount > 0 && fromAccount.balance >= amount) {
        fromAccount.balance -= amount;
        toAccount.balance += amount;

        transactions.push({
            date: new Date().toLocaleString(),
            amount: amount,
            from: fromAccount.number,
            to: toAccount.number
        });
    }

    res.redirect('/');
});

app.get('/transactions', (req, res) => {
    res.render('transactions', { transactions: transactions });
});

app.listen(port, () => {
    console.log(`Banking app listening at http://localhost:${port}`);
});