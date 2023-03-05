// Here we deal with the crud operations related to the employee

const express = require('express')
var router = express.Router();
const mongoose = require('mongoose');
const Employee = mongoose.model('Employee'); // to store employee schema from mongoose 

//creating a router 
router.get('/',(req,res) =>{
    res.render("layouts/employee/addOrEdit", {
        viewTitle : "Insert Employee"
    });
});

router.post('/',(req,res) =>{
    if(req.body._id =='')
    {
        insertRecord(req,res);
    }
    else
    {
        updateRecord(req,res);
    }
})

function insertRecord(req,res){
    var employee = new Employee({
    name:req.body.fullName,
    email:req.body.email,
    contactNo:req.body.mobile,
    Qualification:req.body.city
    });
    employee.save((err,doc)=>{
        if(!err)
        {
            res.redirect('/employee/list');
        }
        else
        {
            if(err.name == 'ValidationError')
            {
                handleValidationError(err,req.body);
                res.render("layouts/employee/addOrEdit",{
                    viewTitle:"Insert Employee",
                    employee: req.body
                });
            }
            else
            {
                console.log('error during insertion' + err);
            }
        }
    });
    
}


function updateRecord(req,res)
{
    Employee.findOneAndUpdate({_id: req.body._id}, req.body , {new: true} , (err,body) =>{
        if(!err)
        {
            res.redirect('layouts/employee/list');
        }
        else
        {
            if(err.name == 'ValidationError')
            {
                handleValidationError(err,req.body);

                res.render("layouts/employee/addOrEdit",{
                    viewTitle:'Update Employee',
                    employee: req.body  
                });
            }
            else
            {
                  console.log('error during updating record :' + err);  
            }
        }
    });
}
//The difference between the router.post() and router.get() :-
//is that a GET request, is requesting data from a specified source
//and a POST request submits data to a specified resource to be processed.


//doubt - 


router.get('/list',(req,res) =>{
    Employee.find({}).lean().exec((err,body)=>{
        if(!err)
        {
             // console.log(docs);
             res.render("layouts/employee/list",{
                 list:body
             });
        }
        else{
         console.log('error in retrieving list :' + err)
        } 
    });
});

function handleValidationError(err,body){
    for(field in err.errors)
    {
        switch(err.errors[field].path)
        {
            case 'name':
                body['name'] = err.error[field].message;
                break;
            default:
                break;
        }
    }
}

//doubt -
// localhost:2000/employee/123
router.get('/:id',(req,res) =>{
    Employee.findById(req.params.id,(err,doc)=>{
        if(!err){
            res.render("layouts/employee/addOrEdit",{
                viewTitle:"update employee",
                employee:doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Employee.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('layouts/employee/list');
        }
        else { console.log('Error in employee delete :' + err); }
    });
});


module.exports = router;