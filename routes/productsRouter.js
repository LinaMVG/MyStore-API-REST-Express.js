const express = require('express')
// const {faker} = require('@faker-js/faker')
const ProductsService = require('./../services/productService')

const router = express.Router();
const service = new ProductsService();

router.get('/', async (req,res)=>{
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
const products = await service.find();
res.json(products)
})


router.get('/filter', (req, res)=>{
  res.send('Soy un filter');
})

router.get('/:id', async (req,res) =>{
  const id= req.params.id // const {id}=req.params // y se devuelve en el res.json
  const product = await service.findOne(id)
  res.json(product)
  // if(id == '999'){
  //   res.status(404).json({
  //     message: 'Not Found'
  //   })
  // } else{
  //   res.status(200).json({
  //     id,
  //     name: 'producto 1',
  //     price : 1000
  //   })
  // }

})

router.post('/', async (req,res) =>{
  const body = req.body;
  const newProduct = await service.create(body);
  res.status(201).json(newProduct)
  // res.status(201).json({
  //   message: 'created',
  //   data: body
  // })
})

router.put('/:id', (req,res) =>{
  const {id} = req.params;
  const body = req.body;
  res.json({
    message: 'updated',
    data: body,
    id
  })
})

router.patch('/:id', async (req,res) =>{
  try {
    const {id} = req.params;
    const body = req.body;
    const product = await service.update(id, body)
    res.json(product)
  } catch (error) {
    res.status(404).json({
      message:error.message
    })

  }

  // res.json({
  //   message: 'updated partial',
  //   data: body,
  //   id
  // })
})

router.delete('/:id',async (req,res) =>{
  const {id} = req.params;
  const rta = await service.delete(id)
  res.json(rta)
  // res.json({
  //   message: 'deleted',
  //   id
  // })
})

module.exports = router
