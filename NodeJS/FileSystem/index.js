const fs = require('fs');

fs.writeFile('example.txt', 'This is an example file.', (err) => {      // file name, text to write
    if(err){
        throw err;
    } else{
        console.log('File has been created!');
    }
})

fs.readFile('example.txt', 'utf8', (err, data) => {
    if(err){
        throw err;
    } else{
        console.log('File content:', data);
    }
})

fs.appendFile('example.txt', '\nThis is appended text.', (err) => {     // original file, text to append
    if(err){
        throw err;
    } else{
        console.log('Text has been appended!');
    }
})

fs.readFile('example.txt', 'utf8', (err, data) => {
    if(err){
        throw err;
    } else{
        console.log('File content:', data);
    }
})

fs.rename('example.txt', 'new_example.txt', (err) => {  // original file, new file name
    if(err){
        throw err;
    } else{
        console.log('File has been renamed!');
    }
})

fs.copyFile('new_example.txt', '../copy_example.txt', (err) => {   // original file, destination file (to save)
    if(err){
        throw err.message;
    } else{
        console.log('File has been copied!');
    }
})

fs.appendFile('new_example.txt', '\nThis new appended text.', (err) => {     // original file, text to append
    if(err){
        throw err;
    } else{
        console.log('Text has been appended!');
    }
})

// fs.unlink('new_example.txt', (err) => {   // file to delete
//     if(err){
//         throw err;
//     } else{
//         console.log('File has been deleted!');
//     }
// })


// Homework
// creating folder using fs
// reading directory using fs