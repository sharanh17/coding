// const {
//   createDirectory,
//   createFilesSequentially,
//   deleteAllFiles,
//   createFiles,
//   deleteFiles,
// } = require("./problem1.js");
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

// createDirectory("./promiseCreateDir")
//   .then(() => createFiles("./promiseCreateDir", 3))
//   .then(() => deleteFiles("./promiseCreateDir"))
//   .catch((err) => console.error(err));

// Using async await

const { createDirectory, deleteFiles } = require("./problem1.js");
const path = require("path");

const dirPath = path.join(__dirname, "asyncAwaitDir");
const numberOfFiles = 5;

async function testFileOperations() {
  try {
    await createDirectory(dirPath, numberOfFiles);
    console.log("Directory and files created.");

    await deleteFiles(dirPath);
  } catch (error) {
    console.error("An error occurred during the file operations:", error);
  }
}

testFileOperations();
