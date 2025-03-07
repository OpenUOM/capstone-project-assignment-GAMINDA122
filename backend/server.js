const express = require("express");

const {
  readTeachers,
  readStudents,
  addStudent,
  addTeacher,
  deleteTeacher,
  deleteStudent,
  readStudentInfo,
  readTeacherInfo,
  updateStudent,
  updateTeacher,
  dbinitialize
} = require("./database.js");

const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// ============== Database Initialization ==============
app.get("/dbinitialize", async function (req, res) {
  try {
    console.log("DB is getting initialized");
    let data = await dbinitialize();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error initializing DB:", error);
    res.status(500).json({ error: "Database initialization failed" });
  }
});

// ============== Teacher Related Endpoints ==============
app.get("/listTeachers", async function (req, res) {
  try {
    console.log("Request received to list teachers");
    let data = await readTeachers();

    if (!Array.isArray(data)) {
      throw new Error("Invalid data format");
    }

    res.status(200).json({ teachers: data });
  } catch (error) {
    console.error("Error fetching teachers:", error);
    res.status(500).json({ error: "Failed to retrieve teachers" });
  }
});

app.post("/getTeacherInfo", async function (req, res) {
  try {
    let { id } = req.body;
    if (!id) return res.status(400).json({ error: "Teacher ID is required" });

    console.log("Request received to get Teacher Info");
    let data = await readTeacherInfo(id);
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching teacher info:", error);
    res.status(500).json({ error: "Failed to retrieve teacher information" });
  }
});

app.post("/addTeacher", async function (req, res) {
  try {
    let { id, name, age } = req.body;
    if (!id || !name || !age)
      return res.status(400).json({ error: "Missing required fields" });

    console.log("Adding teacher:", req.body);
    let data = await addTeacher(id, name, age);
    res.status(201).json(data);
  } catch (error) {
    console.error("Error adding teacher:", error);
    res.status(500).json({ error: "Failed to add teacher" });
  }
});

app.post("/editTeacher", async function (req, res) {
  try {
    let { id, name, age } = req.body;
    if (!id || !name || !age)
      return res.status(400).json({ error: "Missing required fields" });

    console.log("Updating teacher:", req.body);
    let data = await updateTeacher(name, age, id);
    res.status(200).json(data);
  } catch (error) {
    console.error("Error updating teacher:", error);
    res.status(500).json({ error: "Failed to update teacher" });
  }
});

app.post("/deleteTeacher", async function (req, res) {
  try {
    let { id } = req.body;
    if (!id) return res.status(400).json({ error: "Teacher ID is required" });

    console.log("Deleting teacher:", id);
    let data = await deleteTeacher(id);
    res.status(200).json(data);
  } catch (error) {
    console.error("Error deleting teacher:", error);
    res.status(500).json({ error: "Failed to delete teacher" });
  }
});

// ============== Student Related Endpoints ==============
app.get("/listStudents", async function (req, res) {
  try {
    console.log("Request received to list students");
    let data = await readStudents();

    if (!Array.isArray(data)) {
      throw new Error("Invalid data format");
    }

    res.status(200).json({ students: data });
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ error: "Failed to retrieve students" });
  }
});

app.post("/getStudentInfo", async function (req, res) {
  try {
    let { id } = req.body;
    if (!id) return res.status(400).json({ error: "Student ID is required" });

    console.log("Request received to get Student Info");
    let data = await readStudentInfo(id);
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching student info:", error);
    res.status(500).json({ error: "Failed to retrieve student information" });
  }
});

app.post("/addStudent", async function (req, res) {
  try {
    let { id, name, age, hometown } = req.body;
    if (!id || !name || !age || !hometown)
      return res.status(400).json({ error: "Missing required fields" });

    console.log("Adding student:", req.body);
    let data = await addStudent(id, name, age, hometown);
    res.status(201).json(data);
  } catch (error) {
    console.error("Error adding student:", error);
    res.status(500).json({ error: "Failed to add student" });
  }
});

app.post("/editStudent", async function (req, res) {
  try {
    let { id, name, age, hometown } = req.body;
    if (!id || !name || !age || !hometown)
      return res.status(400).json({ error: "Missing required fields" });

    console.log("Updating student:", req.body);
    let data = await updateStudent(name, age, hometown, id);
    res.status(200).json(data);
  } catch (error) {
    console.error("Error updating student:", error);
    res.status(500).json({ error: "Failed to update student" });
  }
});

app.post("/deleteStudent", async function (req, res) {
  try {
    let { id } = req.body;
    if (!id) return res.status(400).json({ error: "Student ID is required" });

    console.log("Deleting student:", id);
    let data = await deleteStudent(id);
    res.status(200).json(data);
  } catch (error) {
    console.error("Error deleting student:", error);
    res.status(500).json({ error: "Failed to delete student" });
  }
});

module.exports = app;
