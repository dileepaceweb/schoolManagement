const studentModel = require("../models/student.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerStudent = async (data) => {
  try {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    data.password = hashedPassword;
    const saved = await studentModel.create(data);
    return saved;
  } catch (error) {
    throw error;
  }
};

const getAllStudents = async () => {
  try {
    const getDetails = await studentModel.find();
    return getDetails;
  } catch (error) {
    throw error;
  }
};

const getStudentById = async (id) => {
  try {
    //console.log(id);
    const get = await studentModel.findById(id);
    return get;
  } catch (error) {
    throw error;
  }
};

const updateStudentById = async (id, data) => {
  try {
    const { name, classStudy, rollNo, password } = data;
    const updated = await studentModel.findByIdAndUpdate(
      id,
      {
        name: name,
        classStudy: classStudy,
        rollNo: rollNo,
        password: password,
      },
      { new: true }
    );
    return updated;
  } catch (error) {
    throw error;
  }
};

const deleteStudentById = async (id) => {
  try {
    const deleted = await studentModel.deleteOne({ _id: id });
    return deleted;
  } catch (error) {
    throw error;
  }
};

const login = async (name, password) => {
  try {
    const student = await studentModel.findOne({ name });

    if (!student) {
      throw new Error("Invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(password, student.password);
    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign(
      { name: student.name, userId: student._id },
      "my-secret-key",
      { expiresIn: "12h" }
    );

    return token;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  registerStudent,
  getAllStudents,
  getStudentById,
  updateStudentById,
  deleteStudentById,
  login,
};
