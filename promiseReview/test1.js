const {
  createDirectory,
  createFilesSequentially,
  deleteAllFiles,
  createFiles,
  deleteFiles,
} = require("./problem1.js");
// const path = require("path");
// const dirPath = path.join(__dirname, "jsonFolder");
// let numberOfFiles = 3;

// createDirectory(dirPath, () => {
//   createFilesSequentially(dirPath, numberOfFiles, 1, () => {
//     console.log("All files are created in order. Now Deleting....");
//     deleteAllFiles(dirPath, () => {
//       console.log("All Files are deleted successfully");
//     });
//   });
// });

createDirectory("./promiseCreateDir")
  .then(() => createFiles("./promiseCreateDir", 3))
  .then(() => deleteFiles("./promiseCreateDir"))
  .catch((err) => console.error(err));
