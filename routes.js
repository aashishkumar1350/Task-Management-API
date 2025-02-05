const express = require("express");
const router = express.Router();
const User = require('../models/users');
const multer = require('multer');

// image upload 
var storage = multer .diskStorage({
    destination : function(req, file,cb){
        cb(null, './uploads');
    },
    filename : function(req, file, cb){
        cb(null, file.filename +"_"+ Date.now() +"_"+ file.originalname);
    },
});

var upload = multer({
    storage : storage,
}).single('image');

//insert an user into database
router.post('/add', upload, (req,res) =>{
    const user = new User({
        name : req.body.name,
        email : req.body.email,
        pnone : req.body.phone,
        image : req.file.filename,
    });
  
})


router.get("/", (req, res)=>{
    res.render("index", {title : "home page"});
});

router.get('/add', (req, res) =>{
    res.render("add_users",{title: "Add Users"});
});

module.exports = router;