var admin = require("firebase-admin");

var serviceAccount = require("../config/firebase_key.json");

const BUCKET_URL = "pn-clique-streaming.appspot.com";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: BUCKET_URL,
});

const bucket = admin.storage().bucket();

const uploadFile = (req, res, next) => {
  if (!req.file) return next();

    const file = req.file;
    const nameFile = Date.now() + "." + file.originalname.split(".").pop();

    const file_bucket = bucket.file(nameFile);

    const stream = file_bucket.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    stream.on("error", (e) => {
      console.error("error in firebase.js : ", e);
    });

    stream.on("finish", async () => {
      // tornar o arquivo publico
      await file_bucket.makePublic();

      // obter a url publico do arquivo
      req.file.firebaseUrl = `https://storage.googleapis.com/${BUCKET_URL}/${nameFile}`;
      next();
    });

    stream.end(file.buffer);
};

module.exports = uploadFile;
