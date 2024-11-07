const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
const fs = require('fs').promises;

const app = express();

// Set up Handlebars as the view engine
app.engine('hbs', engine({
    extname: '.hbs',
    defaultLayout: false // Disable the default layout
}));
app.set('view engine', 'hbs');
app.set('views', './views');

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Define a route to render the index.hbs file
app.get('/', (req, res) => {
    res.render('index', { 
        title: 'Hello, Handlebars!', 
        message: 'Welcome to my Handlebars app!' 
    });
});

// Define a route to render the item.hbs file with item details
app.get('/item', async (req, res) => {
    const itemId = req.query.id;
    if (!itemId) {
        return res.status(400).send('Item ID is required');
    }

    try {
        const data = await fs.readFile(path.join(__dirname, 'items.json'), 'utf-8');
        const items = JSON.parse(data).items;
        const item = items.find(item => item.id === itemId);

        if (!item) {
            return res.status(404).send('Item not found');
        }

        res.render('item', { 
            title: 'Item Details',
            item
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
