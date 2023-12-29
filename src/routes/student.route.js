const express=require("express");
const router=express.Router()
const controller=require('../controllers/student.controller');
const authentication=require('../middleware/authentication');
const  authorization  = require("../middleware/authorization");

router.post("/register",controller.registration);
router.get("/getAll",authentication,controller.getAll);
router.get("/getBy/:id",authentication, controller.getById);
router.put("/update/:id",authentication,controller.update);
router.delete("/delete/:id",authentication,authorization,controller.deleteById);

router.post("/login",controller.login);


module.exports=router

