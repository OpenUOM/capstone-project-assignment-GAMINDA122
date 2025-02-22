const dbConnection = require("./sqlite");

dbConnection
  .getDbConnection()
  .then((db) => {
    init(db);
  })
  .catch((err) => {
    console.log(err);
    throw err;
  });

let _db;

function init(db) {
    _db = db;
}

const knex_db = require("./db-config");

// Read all teachers
const readTeachers = async () => {
    const sql = `SELECT * FROM teachers`;
    return new Promise((resolve, reject) => {
        knex_db
            .raw(sql)
            .then((data) => {
                resolve(data.rows);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

// Read a specific teacher's information
const readTeacherInfo = async (id) => {
    const sql = `SELECT * FROM teachers WHERE id = ?`;
    return new Promise((resolve, reject) => {
        knex_db
            .raw(sql, [id])
            .then((data) => {
                resolve(data.rows[0]);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

// Add a new teacher
const addTeacher = async (id, name, age) => {
    const sql = `INSERT INTO teachers (id, name, age) VALUES (?, ?, ?)`;
    return new Promise((resolve, reject) => {
        knex_db
            .raw(sql, [id, name, age])
            .then(() => {
                resolve({ message: "Teacher added successfully" });
            })
            .catch((error) => {
                reject(error);
            });
    });
};

// Update an existing teacher
const updateTeacher = async (name, age, id) => {
    const sql = `UPDATE teachers SET name = ?, age = ? WHERE id = ?`;
    return new Promise((resolve, reject) => {
        knex_db
            .raw(sql, [name, age, id])
            .then(() => {
                resolve({ message: "Teacher updated successfully" });
            })
            .catch((error) => {
                reject(error);
            });
    });
};

// Delete a teacher
const deleteTeacher = async (id) => {
    const sql = `DELETE FROM teachers WHERE id = ?`;
    return new Promise((resolve, reject) => {
        knex_db
            .raw(sql, [id])
            .then(() => {
                resolve({ message: "Teacher deleted successfully" });
            })
            .catch((error) => {
                reject(error);
            });
    });
};

// Read all students
const readStudents = async () => {
    const sql = `SELECT * FROM students`;
    return new Promise((resolve, reject) => {
        knex_db
            .raw(sql)
            .then((data) => {
                resolve(data.rows);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

// Read a specific student's information
const readStudentInfo = async (id) => {
    const sql = `SELECT * FROM students WHERE id = ?`;
    return new Promise((resolve, reject) => {
        knex_db
            .raw(sql, [id])
            .then((data) => {
                resolve(data.rows[0]);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

// Add a new student
const addStudent = async (id, name, age, religion) => {
    const sql = `INSERT INTO students (id, name, age, religion) VALUES (?, ?, ?, ?)`;
    return new Promise((resolve, reject) => {
        knex_db
            .raw(sql, [id, name, age, religion])
            .then(() => {
                resolve({ message: "Student added successfully" });
            })
            .catch((error) => {
                reject(error);
            });
    });
};

// Update an existing student
const updateStudent = async (name, age, religion, id) => {
    const sql = `UPDATE students SET name = ?, age = ?, religion = ? WHERE id = ?`;
    return new Promise((resolve, reject) => {
        knex_db
            .raw(sql, [name, age, religion, id])
            .then(() => {
                resolve({ message: "Student updated successfully" });
            })
            .catch((error) => {
                reject(error);
            });
    });
};

// Delete a student
const deleteStudent = async (id) => {
    const sql = `DELETE FROM students WHERE id = ?`;
    return new Promise((resolve, reject) => {
        knex_db
            .raw(sql, [id])
            .then(() => {
                resolve({ message: "Student deleted successfully" });
            })
            .catch((error) => {
                reject(error);
            });
    });
};

module.exports = {
    readTeachers,
    readTeacherInfo,
    addTeacher,
    updateTeacher,
    deleteTeacher,
    readStudents,
    readStudentInfo,
    addStudent,
    updateStudent,
    deleteStudent
};
