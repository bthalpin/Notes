const fs = require('fs');


const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 2), (err) =>
    err ? console.error(err) : console.log(`\nNote added to file`)
  );

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

const deleteNote = (file,idToDelete) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      console.log(data)
      let parsedData = JSON.parse(data);
      parsedData = parsedData.filter(note=>note.id!==idToDelete)
      writeToFile(file, parsedData);
    }
  });
};

module.exports = { writeToFile, deleteNote,addNote };
