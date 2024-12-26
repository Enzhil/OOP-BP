const students = require("../data/students");

class StudentController {
  // Menampilkan data  students
  index(req, res) {
    const data = {
      message: "Menampilkan data students",
      data: students,
    };

    res.json(data);
  }

  // Menambahkan data student baru
  store(req, res) {
    const { nama } = req.body;

    if (!nama) {
      return res.status(400).json({
        message: "Nama student harus diisi",
      });
    }

    const newStudent = {
      id: students.length + 1,
      nama,
    };

    students.push(newStudent); 

    const data = {
      message: `Menambahkan data student ${nama}`,
      data: newStudent,
    };

    res.json(data);
  }

  destroy(req, res) {
    const { id } = req.params;
    const index = parseInt(id) - 1; 

    if (index < 0 || index >= students.length) {
      return res.status(404).json({
        message: `Student dengan ID ${id} tidak ditemukan`,
      });
    }

    const deletedStudent = students.splice(index, 1);

    const data = {
      message: `Menghapus data student dengan ID ${id}, dengan nama ${deletedStudent[0].nama}`,
      data: students,
    };

    res.json(data);
  }


  update(req, res) {
    const { id } = req.params;
    const { nama } = req.body;

    if (!nama) {
      return res.status(400).json({
        message: "Nama student harus diisi",
      });
    }

    const index = parseInt(id) - 1; 

  
    if (index < 0 || index >= students.length) {
      return res.status(404).json({
        message: `Student dengan ID ${id} tidak ditemukan`,
      });
    }

    const oldName = students[index].nama;
    students[index].nama = nama; 

    const data = {
      message: `Memperbarui data student dengan ID ${id}, dari nama ${oldName} menjadi ${nama}`,
      data: students[index],
    };

    res.json(data);
  }
}

const studentController = new StudentController();
module.exports = studentController;
