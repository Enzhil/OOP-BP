// Import database
const db = require("../config/database");

class Alumni {
  /**
   * Mendapatkan semua data alumni
   */
  static all() {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM alumni";
      db.query(sql, (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  /**
   * Membuat data alumni baru
   */
  static async create(data) {
    const id = await new Promise((resolve, reject) => {
      const sql = "INSERT INTO alumni SET ?";
      db.query(sql, data, (err, results) => {
        if (err) reject(err);
        resolve(results.insertId);
      });
    });
    const alumni = await this.find(id);
    return alumni;
  }

  /**
   * Memperbarui data alumni berdasarkan ID
   */
  static async update(id, data) {
    await new Promise((resolve, reject) => {
      const sql = "UPDATE alumni SET ? WHERE id = ?";
      db.query(sql, [data, id], (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
    const alumni = await this.find(id);
    return alumni;
  }

  /**
   * Menghapus data alumni berdasarkan ID
   */
  static delete(id) {
    return new Promise((resolve, reject) => {
      const sql = "DELETE FROM alumni WHERE id = ?";
      db.query(sql, id, (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  /**
   * Menemukan alumni berdasarkan ID
   */
  static find(id) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM alumni WHERE id = ?";
      db.query(sql, id, (err, results) => {
        if (err) reject(err);
        const [alumni] = results;
        resolve(alumni);
      });
    });
  }
}

module.exports = Alumni;
