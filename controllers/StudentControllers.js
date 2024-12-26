import students from "../data/students.js"; // Menggunakan import dengan ES6 syntax

class StudentController {
  // Menampilkan data students
  async index(req, res) {
    try {
      res.json({
        message: "Menampilkan data students",
        data: students,
      });
    } catch (err) {
      res.status(500).json({
        message: "Terjadi kesalahan saat mengambil data",
        error: err.message,
      });
    }
  }

  // Menambahkan data student
  async store(req, res) {
    const { nama } = req.body;

    if (!nama) {
      return res.status(400).json({
        message: "Nama student harus diisi",
      });
    }

    try {
      const newStudent = {
        id: students.length + 1,
        nama,
      };
      students.push(newStudent);
      res.json({
        message: `Menambahkan data student ${nama}`,
        data: newStudent,
      });
    } catch (err) {
      res.status(500).json({
        message: "Terjadi kesalahan saat menambahkan data",
        error: err.message,
      });
    }
  }


  async destroy(req, res) {
    const { id } = req.params;

    try {
      const index = parseInt(id) - 1;
      const deletedStudent = students.splice(index, 1);
      res.json({
        message: `Menghapus data student dengan ID ${id}, dengan nama ${deletedStudent[0].nama}`,
        data: students,
      });
    } catch (err) {
      res.status(404).json({
        message: err.message,
      });
    }
  }

  // Memperbarui data student berdasarkan ID
  async update(req, res) {
    const { id } = req.params;
    const { nama } = req.body;

    if (!nama) {
      return res.status(400).json({
        message: "Nama student harus diisi",  
      });
    }

    try {
      const index = parseInt(id) - 1;
      const oldName = students[index].nama;
      students[index].nama = nama;
      res.json({
        message: `Memperbarui data student dengan ID ${id}, dari nama ${oldName} menjadi ${nama}`,
        data: students[index],
      });
    } catch (err) {
      res.status(404).json({
        message: err.message,
      });
    }
  }
}

const studentController = new StudentController();
export default studentController;
