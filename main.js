const express=require('express');
const mongoose=require('mongoose');
const path=require('path');
const fs=require('fs');
const main=express();
const port=80;

//Mongoose
mongoose.connect('mongodb://127.0.0.1:27017/form');  //This will create a db of form name
var xyz=mongoose.connection;
xyz.once('open',()=>{
    console.log("We are connected to MongoDB Successfully.")
})

const formSchema=new mongoose.Schema({
    name:String,
    email:String,
    mobile:String,
    message:String
})

const form_data=new mongoose.model('form_data',formSchema);  //This will create a collection with form_data plural 


//PUG
main.set('view engine','pug');
main.set('views',path.join('views'));

//Express
main.use('/static',express.static('static'))
main.use(express.urlencoded());

const parameters={'title':'Divyesh Computer Academy','msg':'Your form submitted successfuly'}
main.get('/',(req,res)=>{
    res.render('index.pug',parameters);
})
main.get('/home',(req,res)=>{
    res.render('index.pug',parameters);
})

// main.post('/',(req,res)=>{   //Saves data in txt file
//     Name=req.body.name;
//     Email=req.body.email;
//     Phone=req.body.phone;
//     Message=req.body.message;
//     let output=`
//     Name:${Name}
//     Email:${Email}
//     Phone:${Phone}
//     Message:${Message}`
//     const parameters={'title':'Divyesh Computer Academy','msg':'Your form submitted successfuly'};
//     fs.writeFileSync("output.txt",output);
//     res.status(200).render('index.pug',parameters);
// })


//This will save data in mongoDB
main.post('/',(req,res)=>{
    var data= new form_data(req.body);
    data.save().then(()=>{
        res.render('index.pug');
    }).catch(()=>{
        res.status(400).send(`Items are saved in ${form_data}.`)
        console.log(res);
    })
})

//Endpoints
main.listen(port,()=>{
    console.log(`Server is running successfuly on port ${port}`);
})