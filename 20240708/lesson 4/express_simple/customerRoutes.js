const express = require('express');
const router = express.Router();

// Resource database
const customers = [
    {
        id: 1,
        name: "John Doe",
        address: "123 Main St, Springfield",
        numberOfAccounts: 2,
        balance: 1500.75
    },
    {
        id: 2,
        name: "Jane Smith",
        address: "456 Oak St, Metropolis",
        numberOfAccounts: 1,
        balance: 2500.50
    },
    {
        id: 3,
        name: "Alice Johnson",
        address: "789 Pine St, Gotham",
        numberOfAccounts: 3,
        balance: 3500.00
    },
    {
        id: 4,
        name: "Bob Brown",
        address: "101 Maple St, Star City",
        numberOfAccounts: 4,
        balance: 4500.25
    },
    {
        id: 5,
        name: "Charlie Davis",
        address: "202 Birch St, Central City",
        numberOfAccounts: 1,
        balance: 5500.75
    },
    {
        id: 6,
        name: "Diana Evans",
        address: "303 Cedar St, Coast City",
        numberOfAccounts: 2,
        balance: 6500.50
    },
    {
        id: 7,
        name: "Ethan Foster",
        address: "404 Elm St, Bludhaven",
        numberOfAccounts: 3,
        balance: 7500.00
    },
    {
        id: 8,
        name: "Fiona Green",
        address: "505 Spruce St, Keystone City",
        numberOfAccounts: 4,
        balance: 8500.25
    },
    {
        id: 9,
        name: "George Harris",
        address: "606 Ash St, Smallville",
        numberOfAccounts: 1,
        balance: 9500.75
    },
    {
        id: 10,
        name: "Hannah Martin",
        address: "707 Walnut St, Fawcett City",
        numberOfAccounts: 2,
        balance: 10500.50
    },
    {
        id: 11,
        name: "Isaac Nelson",
        address: "808 Chestnut St, Hub City",
        numberOfAccounts: 3,
        balance: 11500.00
    },
    {
        id: 12,
        name: "Jackie O'Neill",
        address: "909 Poplar St, Midway City",
        numberOfAccounts: 4,
        balance: 12500.25
    },
    {
        id: 13,
        name: "Karen Phillips",
        address: "1010 Beech St, Ivy Town",
        numberOfAccounts: 1,
        balance: 13500.75
    },
    {
        id: 14,
        name: "Liam Quinn",
        address: "1111 Cypress St, Opal City",
        numberOfAccounts: 2,
        balance: 14500.50
    },
    {
        id: 15,
        name: "Megan Roberts",
        address: "1212 Holly St, Happy Harbor",
        numberOfAccounts: 3,
        balance: 15500.00
    },
    {
        id: 16,
        name: "Nathan Scott",
        address: "1313 Redwood St, Ivy City",
        numberOfAccounts: 4,
        balance: 16500.25
    },
    {
        id: 17,
        name: "Olivia Turner",
        address: "1414 Willow St, Monument Point",
        numberOfAccounts: 1,
        balance: 17500.75
    },
    {
        id: 18,
        name: "Patrick Underwood",
        address: "1515 Alder St, Platinum Flats",
        numberOfAccounts: 2,
        balance: 18500.50
    },
    {
        id: 19,
        name: "Quincy Vaughn",
        address: "1616 Sequoia St, New Carthage",
        numberOfAccounts: 3,
        balance: 19500.00
    },
    {
        id: 20,
        name: "Rachel White",
        address: "1717 Fir St, Coral City",
        numberOfAccounts: 4,
        balance: 20500.25
    }
];

function generateUniqueId(nextId) {
    if(isDuplicateId(nextId))
        generateUniqueId(++nextId);
    return nextId;
}

function isDuplicateId(id) {
    return customers.some(customer => customer.id === id);
}

// Example: /api/customers
router.get('/', (req, res) => {
    res.status(200).json(customers);
});

// Example: /api/customers
router.post('/', (req, res, next) => {
    const newID = generateUniqueId(customers.length + 1);
    const newCustomer = req.body;
    newCustomer.id = newID;
    customers.push(newCustomer);

    res.status(201).json(newCustomer);
});

// Example: /api/customers/:id
router.get('/:id', (req, res, next) => {
    const id = parseInt(req.params.id);
    const customer = customers.find(c=> c.id === id);
    if(customer)
        res.status(200).json(customer);
    else
        res.status(404).json({message: `Customer with id ${id} not found`});
    next();
});

router.put('/:id', (req, res) => {
    const updatedCustomer = req.body;

    const id = parseInt(req.params.id);
    const customerIndex = customers.findIndex(c=> c.id === id);
    if(customerIndex !== -1){
        const customer = customers[customerIndex];
        for(let key in req.body){
            customer[key] = req.body[key];
        }
        customers[customerIndex] = customer;
        res.status(200).json(customer);
    }
    else
        res.status(404).json({message: `Customer with id ${id} not found`});
});

router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const customerIndex = customers.findIndex(c=> c.id === id);
    if(customerIndex !== -1){
        customers.splice(customerIndex, 1);
        res.status(200).json(customers);
    }
    else
        res.status(404).json({message: `Customer with id ${id} not found`});
});

router.get('/:id/transactions/:tran_id', (req, res) => {
    const {id, tran_id} = req.params;
    console.log('id:', id);
    console.log('tran_id:', tran_id);

    res.send({name: `ID ${id}`, tran_id: `Transaction ID ${tran_id}`});
});

module.exports = router;