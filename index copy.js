const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/product.model');
const app = express()

// middleware json
app.use(express.json());
// url form
app.use(express.urlencoded({extended: false}));

app.get('/', function (req, res) {
  res.send('Hello from Node API Server Updated')
})

app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message});
    }

  })

app.get('/api/product/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);

    } catch (error) {
        res.status(500).json({message: error.message});
    }

  })
  

app.post('/api/products', async (req,res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message})
    }

})

// update a product
app.put('/api/product/:id', async (req,res) => {
    try {
        const { id } = req.params;

        const product = await Product.findByIdAndUpdate(id, req.body);

        if (!product) {
            return res.status(404).json({message: "Product not found."});
        }

        const updatedProduct = await Product.findById(id);

        res.status(200).json(updatedProduct);
        
    } catch (error) {

        res.status(500).json({message: error.message});
        
    }

})


// delete a product
app.delete('/api/product/:id', async (req,res) => {
    try {
        const { id } = req.params;

        const product = await Product.findByIdAndDelete(id, req.body);

        if (!product) {
            return res.status(404).json({message: "Product not found."});
        }

        res.status(200).json({message: "Product deleted successfully."});
        
    } catch (error) {

        res.status(500).json({message: error.message});
        
    }

})


mongoose.connect('mongodb://127.0.0.1:27017')
  .then(() => {
    console.log('Connected to database!');
    app.listen(3000, () => {
        console.log('Server is running and listening on port 3000')
    })
  })
  .catch(() => {
    console.log('Connection failed!');
  })