const express = require('express')
const mongoose = require('mongoose');
const Product = require('./models/product.model.js');
const app = express()

app.use(express.json());
  //encoded
  app.use (express.urlencoded({extended: false}));


//routes

app.use("/api/products",productRoute);


//run in console
app.listen(3000, () => {
    console.log('Server is running on port 3000');
 
});

  //run in webserver
app.get('/', (req, res) => {
        
    res.send('Hello from Node api server');
});

  

 //get product via id
 app.get('/api/products/:id', async(req, res) => {

  try{
    const {id}= req.params;
   const product = await Product.findById(id);
   res.status(200).json(product);

  }catch(error){
    res.status(500).json({message: error.message});
  }
});


  //get all products
  app.get('/api/products', async(req, res) => {

    try{
      const products= await Product.find();
      res.status(200).json(products);

    }catch(error){
      res.status(500).json({message: error.message});
    }
  });


   //product update

app.put('/api/products/:id', async(req, res) => {

      try{
        const {id}= req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);

        if(!product){
          return res.status(404).json({message: 'Product not found'});
        }
           
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);

      }catch(error){
        res.status(500).json({message: error.message});
      }

});


//product delete
app.delete('/api/products/:id', async(req, res) => {

  try{
    const {id}= req.params;
     const product = await Product.findByIdAndDelete(id, req.body);

    if(!product){
      return res.status(404).json({message: 'Product not found'});
    }
       
    res.status(200).json({message: 'Product deleted successfully'});

  }catch(error){
    res.status(500).json({message: error.message});
  }

});



    //product apis
 app.post('/api/products', async(req, res) => {
    //console.log(req.body);
    //res.send(req.body);

    try{
      const product= await Product.create(req.body);
      res.status(200).json(product);

    }catch(error){
      res.status(500).json({message: error.message});
    }
 });


//connect to mongodb

mongoose.connect("mongodb+srv://admin:pabasara@backenddb.ayk56z0.mongodb.net/?retryWrites=true&w=majority&appName=BackendDB")
.then(()=>{
    console.log('Connected to database');
})
.catch(()=>{
    console.log('Connection failed');
});
