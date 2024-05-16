const express = require('express')
const app = express()
const port = 3000

app.get('/', (req,res)=>{
  res.send('Hola, mi server en express')
})

app.get('/nueva-ruta', (req,res)=>{
  res.send('Hola, soy el nuevo endpoint')
})

app.get('/products', (req,res)=>{
  res.json({
    name: 'producto 1',
    price : 1000
  })
})

app.listen(port, ()=>{
  console.log('Escuchando en el puerto: ' + port);
})

