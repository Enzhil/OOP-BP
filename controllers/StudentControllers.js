const students = require("../data/students");

class StudentController {
  // Menampilkan data student
  index(req, res) {
    const data = {
      message: "Daftar data student",
      data: students,
    };

    res.json(data);
  }

  // Menambahkan data student
  store(req, res) {
    const { nama } = req.body;

    if (!nama) {
      return res.status(400).json({
        message: "Nama student harus diisi",
      });
    }

    const newStudent = {
      id: students.length + 1,
      nama: nama,
    };

    students.push(newStudent);

    const data = {
      message: `Student baru dengan nama ${nama} berhasil ditambahkan`,
      data: newStudent,
    };

    res.json(data);
  }

  // Menghapus data student berdasarkan ID
  destroy(req, res) {
    const { id } = req.params;

    const studentIndex = students.findIndex((student) => student.id === parseInt(id));

    if (studentIndex === -1) {
      return res.status(404).json({
        message: `Student dengan ID ${id} tidak ditemukan`,
      });
    }

    const deletedStudent = students.splice(studentIndex, 1);

    const data = {
      message: `Student dengan ID ${id} berhasil dihapus`,
      data: deletedStudent,
    };

    res.json(data);
  }

  // Memperbarui data student berdasarkan ID
  update(req, res) {
    const { id } = req.params;
    const { nama } = req.body;

    const studentIndex = students.findIndex((student) => student.id === parseInt(id));

    if (studentIndex === -1) {
      return res.status(404).json({
        message: `Student dengan ID ${id} tidak ditemukan`,
      });
    }

    if (!nama) {
      return res.status(400).json({
        message: "Nama baru tidak boleh kosong!",
      });
    }

    const oldStudent = students[studentIndex];
    students[studentIndex] = { id: oldStudent.id, nama: nama };

    const data = {
      message: `Data student dengan ID ${id} berhasil diperbarui`,
      data: students[studentIndex],
    };

    res.json(data);
  }
}

const studentController = new StudentController();
module.exports = studentController;
