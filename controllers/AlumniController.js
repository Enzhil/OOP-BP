const Alumni = require("../models/Alumni");

class AlumniController {
  async index(req, res) {
    const alumni = await Alumni.all();

    if (!alumni || alumni.length === 0) {
      return res.status(200).json({
        message: "Data is empty",
        data: [],
      });
    }

    const data = {
      message: "Get All Resource",
      data: alumni,
      status: 200,
    };

    res.json(data);
  }

  // fungsi untuk menambahkan data alumni
  async store(req, res) {
    const { name, phone, address, graduation_year, status, company_name, position } = req.body;

    if (!name || !phone || !address || !graduation_year || !status || !company_name || !position) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    try {
      const newAlumni = await Alumni.create({
        name,
        phone,
        address,
        graduation_year,
        status,
        company_name,
        position,
      });

      res.status(201).json({
        message: "Resource is added successfully",
        data: newAlumni,
      });
    } catch (error) {
      res.status(422).json({
        message: "All fields must be filled correctly",
        error: error.message,
      });
    }
  }

  async update(req, res) {
    const { id } = req.params;
    const alumni = await Alumni.find(id);

    if (alumni) {
      try {
        const updatedAlumni = await Alumni.update(id, req.body);
        res.status(200).json({
          message: "Resource is updated successfully",
          data: updatedAlumni,
        });
      } catch (error) {
        res.status(422).json({
          message: "Failed to update resource",
          error: error.message,
        });
      }
    } else {
      res.status(404).json({ message: "Alumni not found" });
    }
  }

  async destroy(req, res) {
    const { id } = req.params;
    const alumni = await Alumni.find(id);

    if (alumni) {
      await Alumni.delete(id);
      const data = { message: "Resource is deleted successfully" };
      res.status(200).json(data);
    } else {
      const data = { message: "Resource not found" };
      res.status(404).json(data);
    }
  }

  async show(req, res) {
    const { id } = req.params;
    const alumni = await Alumni.find(id);

    if (alumni) {
      const data = { message: "Get Detail Resource", data: alumni };
      res.status(200).json(data);
    } else {
      const data = { message: "Resource not found" };
      res.status(404).json(data);
    }
  }

  async search(req, res) {
    const { name } = req.params;
    const alumni = await Alumni.search(name);

    if (!alumni) {
      return res.status(404).json({
        message: "Resource not found",
        status: 404,
      });
    }

    return res.status(200).json({
      message: "Get Searched Resource",
      data: alumni,
      status: 200,
    });
  }
}

const object = new AlumniController();
module.exports = object;
