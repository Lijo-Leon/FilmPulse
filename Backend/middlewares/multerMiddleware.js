const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './uploads/videos'); // folder location
    },

    filename: (req, file, callback) => {
        callback(null, `${Date.now()}-${file.originalname}`);
    }
});

const fileFilter = (req, file, callback) => {
    if (file.mimetype.startsWith("video/")) {
        callback(null, true);
    } else {
        callback(new Error("Only video files allowed"), false);
    }
};

const upload = multer({
    storage,
    fileFilter
});

module.exports = upload;
