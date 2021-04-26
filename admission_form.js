const express = require('express')
const mysql = require('mysql')
const bodyParser = require('body-parser')
const Joi = require('joi')

const app = express()
const port = process.env.PORT || 3000
app.listen(port , ()=> console.log(`Listening on port ${port}`))

app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json())


var conn = mysql.createConnection({

host : "localhost",
user : "root",
password : "",
database : "gmc"

});

conn.connect(function(err) {
    if (err) throw err;
    console.log("Database Connected....");
});


app.get('/admission_form' , (req , res)=>{

    conn.query("SELECT * FROM admission_form", function (err,rows) {
        if (!err){
            res.send(rows)
        }
        else{
            console.log(err)
        }
    })
})

app.get('/admission_form/:id' , (req , res)=>{

    conn.query("SELECT * FROM admission_form WHERE id = ?",[req.params.id], function (err,rows) {
        if (!err){
            res.send(rows)
        }
        else{
            console.log(err)
        }
    })
})

app.post('/admission_form/add' , (req , res)=>{

    params = req.body

    conn.query("INSERT INTO admission_form SET ? ",params,()=> {

      const schema = Joi.object({

        id : Joi.number().required(),
        Full_Name : Joi.string().required(),
        Father_Name : Joi.string().required(),
        Gender : Joi.string().required(),
        CNIC : Joi.string().required(),
        DOB : Joi.string().required(),
        Email : Joi.string().email().required(),
        Phone : Joi.string().required(),
        Address : Joi.string().required(),
        Department : Joi.string().required(),
        Matric_Roll : Joi.number().required(),
        Matric_Total : Joi.number().required(), 
        Matric_Obtained_Marks : Joi.number().required(), 
        Matric_Year : Joi.number().required(),
        Matric_Board : Joi.string().required(), 
        Inter_Roll : Joi.number().required(),
        Inter_Total : Joi.number().required(), 
        Inter_Obtained_Marks : Joi.number().required(), 
        Inter_Year : Joi.number().required(), 
        Inter_Board : Joi.string().required()

      });
      const validation = schema.validate(params);
      res.send(validation);

    })
})

app.put('/admission_form/update' , (req ,res)=>{

    const params = req.body
    const id = params.id
    const Full_Name = params.Full_Name
    const Father_Name = params.Father_Name
    const Gender = params.Gender
    const CNIC = params.CNIC
    const DOB = params.DOB
    const Email = params.Email
    const Phone = params.Phone
    const Address = params.Address
    const Department = params.Department
    const Matric_Roll = params.Matric_Roll
    const Matric_Total = params.Matric_Total
    const Matric_Obtained_Marks = params.Matric_Obtained_Marks 
    const Matric_Year = params.Matric_Year
    const Matric_Board = params.Matric_Board 
    const Inter_Roll = params.Inter_Roll
    const Inter_Total = params.Inter_Total 
    const Inter_Obtained_Marks = params.Inter_Obtained_Marks 
    const Inter_Year = params.Inter_Year 
    const Inter_Board = params.Inter_Board 


    conn.query("UPDATE admission_form SET Full_Name = ? , Father_Name = ? , Gender = ? , CNIC = ? , DOB = ? , Email = ? , Phone = ? , Address = ? , Department = ? , Matric_Roll = ? , Matric_Total = ? , Matric_Obtained_Marks = ? , Matric_Year = ? , Matric_Board = ? , Inter_Roll = ? , Inter_Total = ? , Inter_Obtained_Marks = ? , Inter_Year = ? , Inter_Board = ? WHERE id = ?" , [Full_Name , Father_Name , Gender , CNIC , DOB , Email , Phone , Address , Department , Matric_Roll , Matric_Total , Matric_Obtained_Marks , Matric_Year , Matric_Board , Inter_Roll , Inter_Total , Inter_Obtained_Marks , Inter_Year , Inter_Board , id ] ,(err)=>{

        const schema = Joi.object({

            id : Joi.number().required(),
            Full_Name : Joi.string().required(),
            Father_Name : Joi.string().required(),
            Gender : Joi.string().required(),
            CNIC : Joi.string().required(),
            DOB : Joi.string().required(),
            Email : Joi.string().email().required(),
            Phone : Joi.string().required(),
            Address : Joi.string().required(),
            Department : Joi.string().required(),
            Matric_Roll : Joi.number().required(),
            Matric_Total : Joi.number().required(), 
            Matric_Obtained_Marks : Joi.number().required(), 
            Matric_Year : Joi.number().required(),
            Matric_Board : Joi.string().required(), 
            Inter_Roll : Joi.number().required(),
            Inter_Total : Joi.number().required(), 
            Inter_Obtained_Marks : Joi.number().required(), 
            Inter_Year : Joi.number().required(), 
            Inter_Board : Joi.string().required()


        })
        const validation = schema.validate(id , Full_Name , Father_Name , Gender , CNIC , DOB , Email , Phone , Address , Department , Matric_Roll , Matric_Total , Matric_Obtained_Marks , Matric_Year , Matric_Board , Inter_Roll , Inter_Total , Inter_Obtained_Marks , Inter_Year , Inter_Board )
       if(!err){
           res.send(validation)
           console.log(`New data has been updated successfully at id : ${id}`)
       }
       else{
           console.log(err)
       }
    })
})


app.delete('/admission_form/delete/:id' , (req ,res)=>{

    conn.query("DELETE FROM admission_form WHERE id = ?",[req.params.id] , (err)=>{
        if(!err){
            res.send(`Admission with record id : ${[req.params.id]} has been removed successfully...`)
        }
        else{
            console.log(err)
        }
    })
})