const express=require('express')
const app=express()

app.all('/',(req,res)=>{
  res.send('Bot is running')
})

const runBot=()=>{
  app.listen(3000,()=>{
    console.log('Server is ready')
  })
} 

module.exports={runBot}