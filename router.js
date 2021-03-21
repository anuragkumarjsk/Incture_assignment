const express = require('express');
const router = express.Router()

const model = require('./schema')

router.get('/test',(req,res)=>{
    res.send('test successful')
 })

 router.post('/add',(req,res)=>{
    let payload =  req.body;

    const new_inst = new model(payload);  
    new_inst.save().then((data)=>{console.log('saved :',data)}).catch((e)=>{console.log(e)});
 })

 router.get('/show',(req,res)=>{
     console.log('router file')
    let payload =  model.find().then((data)=>{
        res.send(data)
        .catch((e)=>{
            console.log(e)
        })
    })
 })

 router.put('/update/:Name',async(req,res)=>{
     let Name = req.params.Name;
     let newdata = req.body;
    await model.findOneAndUpdate({ "name" :Name},newdata)
    .then(()=>{console.log('updated one record')})
    .catch((e)=>{console.log(e)})
})

 router.delete('/delete/:Name',async(req,res)=>{
     let Name = req.params.Name
   await model.deleteOne({name:Name})
    .then(() =>{console.log('deleted successfully')} )
    .catch(e=>console.log(e))
 })

 router.get('/find/:Name',async(req,res)=>{
     let Name = req.params.Name;
     await model.findOne({name:Name}).then((data)=>{
        res.json(data)
        .catch((e)=>{
            console.log(e)
        })
 })
})

module.exports =  router;