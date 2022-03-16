const fs = require('fs');

// Writes the completed file to the database
const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 2), (err) =>
    err ? console.error(err) : console.log(`\nNote added to file`)
  );

// Reads file, appends the new note and calls the writeToFile function to store the data
const addNote = (file,content) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      writeToFile(file, parsedData);
    }
  });
}

// Reads file and checks for a note with the corresponding id and deletes it
const deleteNote = (file,idToDelete) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      let parsedData = JSON.parse(data);
      parsedData = parsedData.filter(note=>note.id!==idToDelete)
      writeToFile(file, parsedData);
    }
  });
};

module.exports = { writeToFile, deleteNote,addNote };
