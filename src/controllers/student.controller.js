const studentService = require("../services/student.service");
// const validation=require("../validations/student.validation")
const  {nameRegex, rollNoRegex, strongPasswordRegex}=require("../validations/regex")

const registration = async (req, res) => {
  try {
    const data = req.body;
    const {name,rollNo,classStudy,password}=data

    if(!name){return res.status(401).send({message:"Name is required"})};
    if(!name.match(nameRegex)){return res.status(401).send({message:"Name should contain only alphabets"})}
    if(!rollNo){return res.status(401).send({message:"rollNo is required"})};
    if(!rollNo.match(rollNoRegex)){return res.status(401).send({message:"Roll number should be alphanumeric"})}
    if(!classStudy){return res.status(401).send({message:"classStudy is required"})};
    if(!password){return res.status(401).send({message:"Password  is required"})};
    if(!password.match(strongPasswordRegex)){return res.status(401).send({message:"Password must be at least 8 characters, include one lowercase letter, one uppercase letter, one digit, and one special character"})}

    const saved = await  studentService.registerStudent(data);
    res.status(201).send({ message: "Registration Successfully", saved });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

const getAll = async (req, res) => {
  try {
    const getDetails = await studentService.getAllStudents();
    res.status(200).send({ message: "Fetched All Details", getDetails });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal Server error" });
  }
};

const getById = async (req, res) => {
  try {
    const id = req.params.id;
    const get = await studentService.getStudentById(id);
    res.status(200).send({ message: "Fetched Data by Id", get });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

const update = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const {name,rollNo,classStudy,password}=data
    
    if(!name){return res.status(401).send({message:"Name is required"})};
    if(!name.match(nameRegex)){return res.status(401).send({message:"Name should contain only alphabets"})}
    if(!rollNo){return res.status(401).send({message:"rollNo is required"})};
    if(!rollNo.match(rollNoRegex)){return res.status(401).send({message:"Roll number should be alphanumeric"})}
    if(!classStudy){return res.status(401).send({message:"classStudy is required"})};
    if(!password){return res.status(401).send({message:"Password  is required"})};
    if(!password.match(strongPasswordRegex)){return res.status(401).send({message:"Password must be at least 8 characters, include one lowercase letter, one uppercase letter, one digit, and one special character"})}

    const updated = await studentService.updateStudentById(id, data);
    res.status(200).send({ message: "Updated successfully", updated });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const deleteById = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await studentService.deleteStudentById(id);

    if (deleted.deletedCount === 1) {
      res.status(200).send({ message: "Deleted Successfully", deleted });
    } else {
      res.status(404).send({ message: "No document found for deletion" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  try {
    const { name, password } = req.body;
    const token = await studentService.login(name, password);
    res.setHeader("token", token);
    res.status(200).send({ message: "Login Successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

module.exports = { registration, getAll, getById, update, deleteById, login };



