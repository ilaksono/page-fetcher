const request = require('request');
const fs = require('fs');
const readline = require('readline');
const path = require('path');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const fetcher = str => {
  request(str, (error, response, body) => {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    // console.log('body:', body); // Print the HTML for the Google homepage.
    if(!error) write(body, args[1]);
    else  {
      console.log(`${str} is Invalid URL, Exiting...`); 
      return process.exit(-1);
    }
  });
};

const write = (str, loc) => {
  try {
    fs.realpathSync.native(path.dirname(loc));
  } catch (err) {
    console.log('Error, invalid path. Exiting...');
    if (err) {
      return process.exit(0);      
    }
  }
  if (fs.existsSync(loc)) {
    rl.question('File exists. Enter Y to overwrite file, otherwise exit app. > ', (input) => {
      if (input === 'Y' || input === 'y') {
        fs.writeFile(loc, str, (err) => {
          //const byteSize = str => new Blob([str]).size;
          if (err) throw err;
          console.log('Saved!');
          console.log(`Downloaded and saved ${Buffer.byteLength(str)} bytes to ${loc}`)
          rl.close();
        })
      } else {
        rl.close();
        return process.exit(22)
      }
    })
  }
  else {
    fs.writeFile(loc, str, (err) => {
      //const byteSize = str => new Blob([str]).size;
      if (err) throw err;
      console.log('Saved!');
      console.log(`Downloaded and saved ${Buffer.byteLength(str)} bytes to ${loc}`)
      return process.exit(0);
      //can also use Buffer.byteLength(str) instead of str.length
      //can also check curl -I example.edu
    })
  }
}

const args = process.argv.splice(2);
fetcher(args[0]);

//node fetcher.js http://example.edu ./dest/index2.html