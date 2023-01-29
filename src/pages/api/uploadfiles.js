import { IncomingForm } from "formidable";
import { promises as fs } from "fs";
import dbConnect from "../../utils/db";

var mv = require("mv");

export const config = {
  api: {
    bodyParser: false,
  },
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  const data = await new Promise((resolve, reject) => {
    const form = new IncomingForm();
    dbConnect();

    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      console.log(fields, files);
      console.log(files.file.filepath);
      var oldPath = files.file.filepath;
      const fileName = `${
        parseInt(Math.random() * 100).toString() + files.file.originalFilename
      }`;
      var newPath = `${process.env.UPLOAD_PATH}/${fileName}`;

      mv(oldPath, newPath, function (err) {});
      console.log(newPath);

      res.status(200).json({ fields, files, fileName });
    });
  });
};
