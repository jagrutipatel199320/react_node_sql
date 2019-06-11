const express = require('express');
const cors = require('cors');
const mysql = require('mysql');


const app = express();
app.use(cors());

const ALL_PRODUCTS = "select * from product";

const connection = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: 'root',
    database: 'react-node'
})

connection.connect(err=>{
    if(err){
        return err;
    }
});

console.log(connection);

app.get('/', (req,res)=>{
    res.send("hiiii")
})

app.get('/products', (req,res)=>{
    connection.query(ALL_PRODUCTS, (err, result)=>{
        if(err){
            return res.send(err);
        }else{
            res.json({
                data:result
            })
        }
    })
})


app.get('/products/add', (req,res)=>{
    const {name, price} = req.query;
    const INSERT_PRODUCT = `insert into product (name, price) values('${name}', '${price}')`;
    connection.query(INSERT_PRODUCT, (err, result)=>{
        if(err){
            return res.send(err);
        }else{
            res.send("added successfully");
        }
    })
})


app.listen(4000, ()=>{
    console.log("hii")
});