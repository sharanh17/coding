const fs = require("fs");
const path = require("path");

function fileOperations() {
  fs.readFile("./lipsum.txt", "utf-8", (err, data) => {
    if (err) {
      console.error("Error reading file", err);
      return;
    }

    // Create uppercase.txt
    fs.writeFile("uppercase.txt", data.toUpperCase(), (err) => {
      if (err) {
        console.error("Error writing to uppercase.txt", err);
        return;
      }
      console.log("File 'uppercase.txt' created successfully");

      // Read uppercase.txt and convert to lowercase.txt
      fs.readFile("uppercase.txt", "utf-8", (err, upperdata) => {
        if (err) {
          console.error("Error reading uppercase.txt", err);
          return;
        }

        // Create lowercase.txt by converting the uppercase data to lowercase
        const lowerData = upperdata.toLowerCase();
        fs.writeFile("lowercase.txt", lowerData, (err) => {
          if (err) {
            console.error("Error writing to lowercase.txt", err);
            return;
          }
          console.log("File 'lowercase.txt' created successfully");

          // Write filenames.txt with references to both files
          fs.writeFile(
            "filenames.txt",
            "uppercase.txt\nlowercase.txt\n",
            (err) => {
              if (err) {
                console.error("Error writing to filenames.txt", err);
                return;
              }

              // Split lowercase data by sentence (using punctuation marks like '.', '!', '?')
              const sentences = lowerData
                .split(/[.?!]+/)
                .map((s) => s.trim())
                .filter((s) => s);

              // Sort sentences
              const sortedSentences = sentences.slice().sort();

              // Write the sorted sentences into sortedData.txt
              fs.writeFile(
                "sortedData.txt",
                sortedSentences.join(". ") + ".",
                (err) => {
                  if (err) {
                    console.error("Error writing to sortedData.txt", err);
                    return;
                  }

                  // Append sortedData.txt to filenames.txt
                  fs.appendFile("filenames.txt", "sortedData.txt\n", (err) => {
                    if (err) {
                      console.error("Error writing to filenames.txt", err);
                      return;
                    }

                    console.log(
                      "File operations completed. Now deleting unnecessary files."
                    );
                    const filenamesPath = path.join(__dirname, "filenames.txt");

                    fs.readFile(filenamesPath, "utf-8", (err, data) => {
                      if (err) {
                        console.error("Error reading filenames.txt", err);
                        return;
                      }
                      const files = data
                        .split("\n")
                        .filter(
                          (file, index, arr) =>
                            file.trim() !== "" && arr.indexOf(file) === index
                        );

                      console.log(files);

                      const filesToDelete = files.filter(
                        (file) =>
                          file !== "uppercase.txt" &&
                          file !== "sortedData.txt" &&
                          file !== "lowercase.txt"
                      );

                      filesToDelete.forEach((file) => {
                        const deleteFile = path.join(__dirname, file);
                        fs.unlink(deleteFile, (err) => {
                          if (err) {
                            console.error(
                              `Error deleting ${deleteFile}`,
                              err.message
                            );
                            return;
                          }
                          console.log(
                            `File ${deleteFile} deleted successfully`
                          );
                        });
                      });
                    });
                  });
                }
              );
            }
          );
        });
      });
    });
  });
}

module.exports = {
  fileOperations,
};
