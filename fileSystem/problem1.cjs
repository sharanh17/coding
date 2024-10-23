const fs = require("node:fs");
const path = require("path");

function createDirectoryAddFiles(directoryName) {
  const newPath = path.join(__dirname, directoryName);
  fs.mkdir(newPath, (err) => {
    if (err) {
      console.error("Directory already created");
    }
  });

  for (let index = 1; index <= 10; index++) {
    const file = `file${index}.json`;
    const pathFile = path.join(newPath, file);
    const data = { filename: file };
    fs.writeFile(pathFile, JSON.stringify(data), (err) => {
      if (err) {
        console.log("Error while creating and writing to file");
        return;
      }
      console.log("File created" + pathFile + "successfully");
    });
  }
}

function deleteFilesSimultaneously(directory) {
  const pathDir = path.join(__dirname, directory);
  fs.readdir(pathDir, (err, files) => {
    if (err) {
      throw new Error(err);
    } else {
      files.forEach((file) => {
        console.log(file);
        const filePath = path.join(pathDir, file);
        fs.unlink(filePath, (err) => {
          if (err) {
            console.log("error in deleting");
            return;
          }
          console.log("File" + filePath + "deleted succesfully");
        });
      });
    }
  });
}

module.exports = {
  createDirectoryAddFiles,
  deleteFilesSimultaneously,
};
