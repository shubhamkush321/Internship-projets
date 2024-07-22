const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
require('dotenv').config();

app.use(express.json());
app.use(cors());
 
// Database connection mongoDB

mongoose.connect(process.env.MONGO_DB_CONNECTION)

// API creation

app.get("/", (req, res) => {
  res.send("Express app is Running")
});

// image storage engine

const storage = multer.diskStorage({                                                      // Configuración el almacenamiento en disco para los archivos subidos.
  destination: './upload/images',
  filename: (req, file, cb) => {
    return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
  }
});

const upload = multer({ storage: storage });                             // Se crea una instancia de multer utilizando la configuración de almacenamiento definida previamente.

// Crating endpoint for images
app.use("/images", express.static("upload/images"))                      // Se configura una ruta estática para acceder a los archivos subidos http://localhost:4000/images
app.post("/upload", upload.single("product"), (req, res) => {            // endpoint POST en /upload // upload.single("product"): Middleware de multer para manejar la subida de un solo archivo con el campo de formulario llamado product. 
  res.json({
    success: 1,
    image_url: `http://localhost:${port}/images/${req.file.filename}`
  })
});

// Schema for creating products
const Product = mongoose.model("Product",  {
  id:{
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  new_price: {
    type: Number,
    required: true,
  },
  old_price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now,
  },
  available: {
    type: Boolean,
    default: true
  },
});

app.post("/addproduct", async(req, res) => {

  let products = await Product.find({})
  let id;

  if(products.length > 0){
    let last_product_array = products.slice(-1);
    let last_product = last_product_array[0];
    id = last_product.id+1
  }else{
    id = 1;
  }

  const product = new Product({
    id: id,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
  })
  console.log(product)
  await product.save();
  console.log("Saved")
  res.json({
    success: true,
    name: req.body.name
  })
});

// Creating API for deleting products
app.post("/removeproduct", async(req, res) => {
  await Product.findOneAndDelete({id:req.body.id});
  console.log("Removed")
  res.json({
    success: true,
    name: req.body.name
  })
});

//Creating API for getting all products
app.get("/allproducts", async(req, res) => {
  let products = await Product.find({})
  console.log("All products fetched")
  res.send(products)
});

// Schema Creating for User Model
const User = mongoose.model('User', {
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  cartData: {
    type: Object,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

//Creating endpoint for registering user
app.post('/signup', async(req, res) => {                      // Endpoint para crear un nuevo usuario
  let check = await User.findOne({email: req.body.email});    // Comprobamos que el usuario existe en bd 
  if(check){                                                  // Si existe mensaje de error avisando de que el usario ya existe
    return res.status(400).json({
      success: false,
      errors: 'Existing user found with same email',
    });
  }
  let cart = {};                                              // Sino existe inicializamos el carrito como un objeto vacio    
  for(let i=0; i<300; i++){                                   // de 299 posiciones
    cart[i] = 0
  }
  const user = new User({                                     // Creamos una nueva instancia del modelo User
    name: req.body.name,                                      // con el contenido del formulario de signup
    email: req.body.email,
    password: req.body.password,
    cartData: cart,
  })

  await user.save();                                          // Se graba en bd el usuario 
  const data ={                                               // id del usuario dado por bd 
    user: {
      id: user.id,
    },
  };

  const token = jwt.sign(data, "secret_ecom")                 // creamos un jwt en base a ese id     
  res.json({success: true, token})                            // que se devuelve en la respuesta
});

//Creating endpoint for user login
app.post('/login', async(req, res) => {
  let user = await User.findOne({ email: req.body.email})     // Buscamos un usuario en bd en base al email del body   
  if(user){                                                   // Si existe
    const passMatch = req.body.password === user.password;    // comprobamos que la pass proporcionada coincida con la de la bd
    if(passMatch){                                            // Si coincide
      const data = {                                          // Establecemos la data como el id del usuario
        user: {
          id: user.id,
        },
      };
      const token = jwt.sign(data, "secret_ecom");            // Obtenemos el token asociado al id según secret
      res.json({success: true, token});                       // y devolvemos dicho token

    }else{
      res.json({success:false, errors: "Wrong Password"});
    }
  }else{
    res.json({success:false, errors: "Wrong Email address"});
  }
});

// Creating endpoint for newcollection data
app.get('/newCollections', async (req, res) => {
  let products = await Product.find({});
  let newcollection = products.slice(1).slice(-8); // Esto toma los últimos 8 productos del array resultante de la operación anterior.
  console.log("New Collection fetched")
  res.send(newcollection)
})

// Creating endpoint for popularProducts in clothing
app.get('/popularproducts', async (req, res) => {
  let products = await Product.find({category: 'clothing'});
  let popularproducts = products.slice(0, 4); // Esto toma los últimos 4 primeros productos de la categoría clothing.
  console.log("Popularproducts fetched")
  res.send(popularproducts)
});


//Creating middleware to fetch user
const fetchUser = async (req, res, next) => {
  const token = req.header('auth-token');                                         // Obtiene el token del header
  if (!token) {
    res.status(401).send({ errors: 'please authenticate usirg valid login' })
  } else {
    try {
      const data = jwt.verify(token, "secret_ecom");                              // Obtiene la data en base el secret del jwt  
      req.user = data.user;                                                       // Si el user de la petición = al del token
      next()                                                                      // continua con la siguiente operación.
    } catch (error) {
      res.status(401).send({errors: "Please authenticate using valid token"})
    }
  }
}

// Creating endpoint for adding products in cartdata
app.post('/addtocart', fetchUser, async (req, res) => {
  console.log("Added", req.body.itemId)                           // Se recibe el id del pto y el id del usuario
  let userData = await User.findOne({_id: req.user.id});          // Con el id del usuario obtenemos toda su información desde la bd
  userData.cartData[req.body.itemId] += 1;                        // y aumentamos en cardata del user el item que se ñade en 1   
  await User.findOneAndUpdate({_id:req.user.id}, {cartData: userData.cartData}); // Actualizamos en bd el User
  res.send("Added")

})

// Creatind endpoint for remove product
app.post('/removefromcart', fetchUser, async (req, res) => {
  console.log("Removed", req.body.itemId)                                 
  let userData = await User.findOne({ _id: req.user.id });  
  if(userData.cartData[req.body.itemId] > 0)        
  userData.cartData[req.body.itemId] -= 1;                           
  await User.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData }); 
  res.send("Removed")

})

// Creating endpoint for getting cartdata
app.post('/getcart', fetchUser, async(req, res) => {
  console.log('get Cart')
  let userData = await User.findOne({_id:req.user.id});
  res.json(userData.cartData);
})

app.listen(port, (error) => {
  if(!error){
    console.log("Server is Running on port:" +port)
  }else{
    console.log("Error: " +error)
  }
})