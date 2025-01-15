// Import database
const db = require("../config/database");

class Alumni {

  static all() {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM alumni";
      db.query(sql, (err, results) => {
        if (err) reject(new Error("Failed to search alumni: " + err.message));
        resolve(results);
      });
    });
  }

 
  static async create(data) {
    const id = await new Promise((resolve, reject) => {
      const sql = "INSERT INTO alumni SET ?";
      db.query(sql, data, (err, results) => {
        if (err) reject(new Error("Failed to search alumni: " + err.message));
        resolve(results.insertId);
      });
    });
    const alumni = await this.find(id);
    return alumni;
  }

 
  static async update(id, data) {
    await new Promise((resolve, reject) => {
      const sql = "UPDATE alumni SET ? WHERE id = ?";
      db.query(sql, [data, id], (err, results) => {
        if (err) reject(new Error("Failed to search alumni: " + err.message));
        resolve(results);
      });
    });
    const alumni = await this.find(id);
    return alumni;
  }

  
  static delete(id) {
    return new Promise((resolve, reject) => {
      const sql = "DELETE FROM alumni WHERE id = ?";
      db.query(sql, id, (err, results) => {
        if (err) reject(new Error("Failed to search alumni: " + err.message));
        resolve(results);
      });
    });
  }

  
  static find(id) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM alumni WHERE id = ?";
      db.query(sql, id, (err, results) => {
        if (err) reject(new Error("Failed to search alumni: " + err.message));
        const [alumni] = results;
        resolve(alumni);
      });
    });
  }

  static search(name) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM alumni WHERE name LIKE ?";
      db.query(sql, [`%${name}%`], (err, results) => {
        if (err) reject(new Error("Failed to search alumni: " + err.message)); 
        const [alumni] = results; 
        resolve(alumni); 
      });
    });
  }

  static findByStatus(status = "") {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM alumni WHERE status LIKE ?";
      db.query(sql, [`%${status}%`], (err, results) => {
        if (err) reject(new Error("Failed to search alumni: " + err.message)); 
        resolve(results); 
      });
    });
  }
  
}

module.exports = Alumni;
