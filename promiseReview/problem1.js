// const fs = require("fs");
// const path = require("path");

// function createDirectory(dirPath, callback) {
//   fs.mkdir(dirPath, { recursive: true }, (err) => {
//     if (err) {
//       console.error(`Error in creating Directory: ${err}`);
//     } else {
//       console.log(`Directory is created successfully at: ${dirPath}`);
//       callback(dirPath);
//     }
//   });
// }

// function createFilesSequentially(dirPath, fileCount, index = 1, callback) {
//   if (index > fileCount) {
//     callback(dirPath);
//     return;
//   }

//   const filename = `file${index}.json`;
//   const filePath = path.join(dirPath, filename);
//   fs.writeFile(filePath, "FileData", (err) => {
//     if (err) {
//       console.log(`Error in creating file:${err}`);
//     } else {
//       console.log(`${filename} is created successfully `);
//       createFilesSequentially(dirPath, fileCount, index + 1, callback);
//     }
//   });
// }

// function deleteAllFiles(dirPath, callback) {
//   fs.readdir(dirPath, "utf-8", (err, files) => {
//     if (err) {
//       console.error(`Error in reading directory: ${err}`);
//     } else {
//       console.log("Directory read successfully");
//       let deletedFiles = 0;
//       files.forEach((file) => {
//         let filePath = path.join(dirPath, file);
//         fs.unlink(filePath, (err) => {
//           if (err) {
//             console.error(`Error in deleting: ${file}`);
//           } else {
//             console.log(`${file} deleted successfully`);
//             deletedFiles++;
//             if (deletedFiles === files.length) {
//               callback();
//             }
//           }
//         });
//       });
//     }
//   });
// }

// module.exports = { createDirectory, createFilesSequentially, deleteAllFiles };

// const fs = require("node:fs");
// const path = require("path");
// function createDirectoryAddFiles(directoryName) {
//   const newPath = path.join(__dirname, directoryName);
//   fs.mkdir(newPath, (err) => {
//     if (err) {
//       console.log("directory already created");
//     }
//   });
//   for (let index = 1; index <= 10; index++) {
//     const file = `file${index}.json`;
//     const pathFile = path.join(newPath, file);
//     const data = { filename: file };
//     fs.writeFile(pathFile, JSON.stringify(data), (err) => {
//       if (err) {
//         console.log("error while creating file");
//         return;
//       }
//       console.log("file created" + pathFile + "Succesfully");
//     });
//   }
// }

// function deleteFilesSimultaneously(directory) {
//   const pathDir = path.join(__dirname, directory);
//   fs.readdir(pathDir, (err, files) => {
//     if (err) {
//       throw new Error(err);
//     } else {
//       files.forEach((file) => {
//         console.log(file);
//         const filePath = path.join(pathDir, file);
//         fs.unlink(filePath, (err) => {
//           if (err) {
//             console.log("Error in deleting");
//             return;
//           }
//           console.log("File" + filePath + "Deleted");
//         });
//       });
//     }
//   });
// }
// fileManagement.js

const fs = require("fs");
const path = require("path");

// Function to create a directory
function createDirectory(dirPath) {
  return new Promise((resolve, reject) => {
    fs.mkdir(dirPath, { recursive: true }, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve("Directory created successfully");
      }
    });
  });
}

// Function to create multiple files
function createFiles(dirPath, numberOfFiles) {
  const filePromises = [];
  for (let index = 1; index <= numberOfFiles; index++) {
    const fileName = `file${index}.json`;
    const filePath = path.join(dirPath, fileName);
    const filePromise = new Promise((resolve, reject) => {
      fs.writeFile(filePath, "file data", (err) => {
        if (err) {
          console.error("Error in creating file", err);
          reject(err);
        } else {
          console.log(`${fileName} created successfully`);
          resolve();
        }
      });
    });
    filePromises.push(filePromise);
  }
  return Promise.all(filePromises)
    .then(() => {
      console.log("All files created successfully");
    })
    .catch((err) => {
      console.error("Error in creating files", err);
    });
}

// Function to delete all files in a directory
function deleteFiles(dirPath) {
  return new Promise((resolve, reject) => {
    fs.readdir(dirPath, (err, files) => {
      if (err) {
        console.error("Error reading directory", err);
        reject(err);
        return;
      }
      if (files.length === 0) {
        console.log("No files to delete");
        resolve();
        return;
      }

      const deletePromises = files.map((file) => {
        return new Promise((resolve, reject) => {
          const filePath = path.join(dirPath, file);
          fs.unlink(filePath, (err) => {
            if (err) {
              console.error(`Error deleting file ${file}`, err);
              reject(err);
            } else {
              console.log(`${file} deleted successfully`);
              resolve();
            }
          });
        });
      });

      Promise.all(deletePromises)
        .then(() => {
          console.log("All files deleted successfully");
          resolve();
        })
        .catch((err) => {
          console.error("Error deleting files", err);
          reject(err);
        });
    });
  });
}

module.exports = { createDirectory, createFiles, deleteFiles };
