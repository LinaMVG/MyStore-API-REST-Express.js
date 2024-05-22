const express = require('express')
// const {faker} = require('@faker-js/faker')
const ProductsService = require('./../services/productService')
const validatorHandler = require('./../middleware/validatorHandler')
const {createProductSchema, updateProductSchema, getProductSchema} = require('./../schemas/productSchema')


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
try {
  const products = await service.find();
  res.json(products);
} catch (error) {
  next(error);
}
})


router.get('/filter', (req, res)=>{
  res.send('Soy un filter');
})

router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req,res, next) =>{
    try {
      const id= req.params.id // const {id}=req.params // y se devuelve en el res.json
      const product = await service.findOne(id)
      res.json(product)
    } catch (error) {
      next(error);
    }

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

router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (req,res) =>{
    try {
      const body = req.body;
      const newProduct = await service.create(body);
      res.status(201).json(newProduct);
    } catch (error) {
      next(error);
    }
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

router.patch('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req,res,next) =>{
    try {
      const {id} = req.params;
      const body = req.body;
      const product = await service.update(id, body)
      res.json(product)
    } catch (error) {
      next(error);
      // res.status(404).json({
      //   message:error.message
      // })

    }

    // res.json({
    //   message: 'updated partial',
    //   data: body,
    //   id
    // })
})

router.delete('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req,res) =>{
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(201).json({id});
    } catch (error) {
      next(error);
    }
  // res.json({
  //   message: 'deleted',
  //   id
  // })
})

module.exports = router
