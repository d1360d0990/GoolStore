const fs = require("node:fs/promises");
const path = require("node:path");

const dataSource = {
  filePath: path.resolve(__dirname, "../data/products.json"),

  async load() {
    const jsonProducts = await fs.readFile(this.filePath, "");
    const products = JSON.parse(jsonProducts);
    return products;
  },
  async save(data) {
    const jsonData = JSON.stringify(data);
    await fs.writeFile(this.filePath, jsonData, "utf-8");
  },
  async removeFile(filePath) {
    const file = path.resolve(__dirname, "../public/", filePath);
    try {
      await fs.unlink(filePath);
      console.log(`file ${filePath} has been delete`);
    } catch (err) {
      console.error(err.message);
    }
  },
};
module.exports = dataSource;
