const fs = require("fs");
const path = require("path");

function createDirectory(dirPath, callback) {
  fs.mkdir(dirPath, { recursive: true }, (err) => {
    if (err) {
      console.error(`Error in creating Directory: ${err}`);
    } else {
      console.log(`Directory is created successfully at: ${dirPath}`);
      callback(dirPath);
    }
  });
}

function createFilesSequentially(dirPath, fileCount, index = 1, callback) {
  if (index > fileCount) {
    callback(dirPath);
    return;
  }

  const filename = `file${index}.json`;
  const filePath = path.join(dirPath, filename);
  fs.writeFile(filePath, "FileData", (err) => {
    if (err) {
      console.log(`Error in creating file:${err}`);
    } else {
      console.log(`${filename} is created successfully `);
      createFilesSequentially(dirPath, fileCount, index + 1, callback);
    }
  });
}

function deleteAllFiles(dirPath, callback) {
  fs.readdir(dirPath, "utf-8", (err, files) => {
    if (err) {
      console.error(`Error in reading directory: ${err}`);
    } else {
      console.log("Directory read successfully");
      let deletedFiles = 0;
      files.forEach((file) => {
        let filePath = path.join(dirPath, file);
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error(`Error in deleting: ${file}`);
          } else {
            console.log(`${file} deleted successfully`);
            deletedFiles++;
            if (deletedFiles === files.length) {
              callback();
            }
          }
        });
      });
    }
  });
}

// module.exports = { createDirectory, createFilesSequentially, deleteAllFiles };

const fs = require("node:fs");
const path = require("path");
function createDirectoryAddFiles(directoryName) {
  const newPath = path.join(__dirname, directoryName);
  fs.mkdir(newPath, (err) => {
    if (err) {
      console.log("directory already created");
    }
  });
  for (let index = 1; index <= 10; index++) {
    const file = `file${index}.json`;
    const pathFile = path.join(newPath, file);
    const data = { filename: file };
    fs.writeFile(pathFile, JSON.stringify(data), (err) => {
      if (err) {
        console.log("error while creating file");
        return;
      }
      console.log("file created" + pathFile + "Succesfully");
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
            console.log("Error in deleting");
            return;
          }
          console.log("File" + filePath + "Deleted");
        });
      });
    }
  });
}
