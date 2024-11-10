const fs = require("node:fs/promises");
const path = require("node:path");

const dataSource = {
  filePath: path.resolve(__dirname, "../data/users.json"),

  async load() {
    const jsonUsers = await fs.readFile(this.filePath, "");
    const users = JSON.parse(jsonUsers);
    return users;
  },
  async save(data) {
    const jsonData = JSON.stringify(data);
    await fs.writeFile(this.filePath, jsonData, "utf-8");
  },
  async removeFile(filePath) {
    const file = path.resolve(__dirname, "../public/", filePath);
    try {
      await fs.unlink(filePath);
      console.log(` El archivo ${filePath} ha sido eliminada `);
    } catch (err) {
      console.error(err.message);
    }
  },
};
module.exports = dataSource;
