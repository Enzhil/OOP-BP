// import Model Alumni
const Alumni = require("../models/Alumni");

// buat class AlumniController
class AlumniController {

  // fungsi-fungsi
  async index(req, res) {
    const alumni = await Alumni.all();

    if (!alumni || alumni.length === 0) {
      return res.status(200).json({
        message: `Data is empty`, // Jika data kosong
        data: [],
      });
    }

    const data = {
      message: `Get All Resource`, // mendapatkan semua data
      data: alumni,
      status: 200,
    };

    res.json(data);
  }

  // fungsi untuk menambahkan data alumni
  async store(req, res) {
    const { name, phone, address, graduation_year, status, company_name, position } = req.body;
  // kondisi menggunakan ternary operator
    !name || !phone || !address || !graduation_year || !status || !company_name || !position
      ? res.status(400).json({ message: `All fields are required!` })
      : await Alumni.create({
          name,
          phone,
          address,
          graduation_year,
          status,
          company_name,
          position,
        })
          .then((newAlumni) =>
            res.status(201).json({
              message: `Resource is added successfully`,
              data: newAlumni,
            })
          )
          .catch((error) =>
            res.status(422).json({
              message: `All fields must be filled correctly`,
              error: error.message,
            })
          );
  }

  // fungsi untuk update data alumni
  async update(req, res) {
    const { id } = req.params;
    const alumni = await Alumni.find(id);

    alumni
      ? await Alumni.update(id, req.body)
          .then((updatedAlumni) =>
            res.status(200).json({
              message: `Resource is updated successfully`,
              data: updatedAlumni,
            })
          )
          .catch((error) =>
            res.status(422).json({
              message: `Failed to update resource`,
              error: error.message,
            })
          )
      : res.status(404).json({ message: `Alumni not found` });
  }

  // fungsi untuk menghapus data alumni
  async destroy(req, res) {
    const { id } = req.params;
    const alumni = await Alumni.find(id);

    if (alumni) {
      await Alumni.delete(id);
      const data = { message: `Resource is deleted successfully` };
      res.status(200).json(data);
    } else {
      const data = { message: `Resource not found` };
      res.status(404).json(data);
    }
  }

  async show(req, res) {
    const { id } = req.params;
    const alumni = await Alumni.find(id);

    if (alumni) {
      const data = { message: `Get Detail Resource`, data: alumni };
      res.status(200).json(data);
    } else {
      const data = { message: `Resource not found` };
      res.status(404).json(data);
    }
  }

  async search(req, res) {
    const { name } = req.params;
    const alumni = await Alumni.search(name);

    if (!alumni) {
      return res.status(404).json({
        message: `Resource not found`,
        status: 404,
      });
    }

    return res.status(200).json({
      message: `Get Searched Resource`,
      data: alumni,
      status: 200,
    });
  }

  async freshGraduate(req, res) {
    const status = "freshGraduate";
    const alumni = await Alumni.findByStatus(status);

    if (!alumni || alumni.length === 0) {
      return res.status(404).json({
        message: `Resource not found`,
        status: 404,
      });
    }

    return res.status(200).json({
      message: `Get Fresh Graduate Resource`,
      data: alumni,
      status: 200,
    });
  }

  async employed(req, res) {
    const status = `employed`;
    const alumni = await Alumni.findByStatus(status);

    if (!alumni) {
      return res.status(404).json({
        message: `Resource not found`,
        status: 404,
      });
    }

    return res.status(200).json({
      message: `Get Employed Resource`,
      data: alumni,
      status: 200,
    });
  }

  async unemployed(req, res) {
    const status = `unemployed`;
    const alumni = await Alumni.findByStatus(status);

    if (!alumni) {
      return res.status(404).json({
        message: `Resource not found`,
        status: 404,
      });
    }

    return res.status(200).json({
      message: `Get Unemployed Resource`,
      data: alumni,
      status: 200,
    });
  }
}

// membuat object AlumniController
const object = new AlumniController();

// export object AlumniController
module.exports = object;