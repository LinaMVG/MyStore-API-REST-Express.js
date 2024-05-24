const express = require('express')
const routerApi = require('./routes')
const cors = require('cors');
const { checkApiKey } = require('./middleware/authHandler');


const {logErrors, errorHandler, boomErrorHandler, ormErrorHandler} = require('./middleware/errorHandler')
// const {faker} = require('@faker-js/faker')
// const { name } = require('faker/lib/locales/az')
// const { product_name } = require('faker/lib/locales/az/commerce')

const app = express()
const port = process.env.PORT || 3000;

app.use(express.json())

const whitelist = ['http://localhost:8080', 'https://myapp.co'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'));
    }
  }
}
app.use(cors(options));
require('./utils/auth')

app.get('/', (req,res)=>{
  res.send('Hola, mi server en express')
})

app.get('/nueva-ruta', checkApiKey, (req, res) => {
  res.send('Hola, soy el nuevo endpoint');
});

routerApi(app);

app.use(logErrors)
app.use(ormErrorHandler)
app.use(boomErrorHandler)
app.use(errorHandler)

// app.get('/products', (req,res)=>{
//   const products = [];
//   const {size} = req.query
//   const limit = size || 10
//   for (let index = 0; index < limit; index++) {
//     products.push({
//       name: faker.commerce.productName(),
//       price: parseInt(faker.commerce.price(), 10),
//       image: faker.image.imageUrl()
//     })
// }
// res.json(products)
//   // res.json([
//   //   {
//   //     name: 'producto 1',
//   //     price : 1000
//   //   },
//   //   {
//   //     name: 'producto 2',
//   //     price : 2000
//   //   }
//   // ])
// })

//GET: Recibir parámetros
// app.get('/products/filter', (req, res)=>{
//   res.send('Soy un filter');
// }) // este endpoint va antes del products:id, que es dinamico, es decir el especifco antes del dinamico

// app.get('/products/:id', (req,res) =>{
//   const id= req.params.id // const {id}=req.params // y se devuelve en el res.json
//   res.json({
//     id,
//     name: 'producto 1',
//     price : 1000
//   })
// })

// app.get('/categories/:categoryId/products/:productId', (req,res)=>{
//   const {categoryId, productId} = req.params
//   res.json({
//     categoryId,
//     productId
//   })
// })

//GET: Query params
// app.get('/users', (req,res)=>{
//   const {limit, offset} = req.query
//   if(limit && offset){
//     res.json({
//       limit,
//       offset
//     })
//   } else{
//     res.send('No hay parametros')
//   }
// })

app.listen(port, ()=>{
  console.log('Escuchando en el puerto: ' + port);
})

