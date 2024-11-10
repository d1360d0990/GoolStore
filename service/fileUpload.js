const path = require("path");
const multer = require("multer");
const crypto = require("crypto");
const allowedExtensions = [".jpg", ".jpeg", ".png", ".gif"];
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = path.resolve(__dirname, "../public/images/products");
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    const randomString = crypto.randomBytes(8).toString("hex");
    const extension = path.extname(file.originalname);
    const imagen = "image-" + randomString + extension;
    cb(null, imagen);
  },
});
const fileFilter = (req, file, cb) => {
  const extension = path.extname(file.originalname).toLowerCase();

  if (allowedExtensions.includes(extension)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Extensión de archivo no permitida. Solo se aceptan imágenes (.jpg, .jpeg, .png, .gif)"
      ),
      false
    );
  }
};
const fileUpload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 },
});
module.exports = fileUpload;
