const {
  createDirectoryAddFiles,
  deleteFilesSimultaneously,
} = require("./../problem1.cjs");

createDirectoryAddFiles("./randomJsonFiles");


deleteFilesSimultaneously('./randomJsonFiles')
