const express = require('express')
const {faker} = require('@faker-js/faker')

const router = express.Router();

router.get('/', (req,res)=>{
  const products = [];
  const {size} = req.query
  const limit = size || 10
  for (let index = 0; index < limit; index++) {
    products.push({
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price(), 10),
      image: faker.image.imageUrl()
    })
}
res.json(products)
})


router.get('/filter', (req, res)=>{
  res.send('Soy un filter');
})

router.get('/:id', (req,res) =>{
  const id= req.params.id // const {id}=req.params // y se devuelve en el res.json
  res.json({
    id,
    name: 'producto 1',
    price : 1000
  })
})

module.exports = router
