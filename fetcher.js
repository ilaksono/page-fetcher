const request = require('request');
const fs = require('fs');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const fetcher = str => {
  let fileBody;
  request(str, (error, response, body) => {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the HTML for the Google homepage.
    fileBody = body;
    write(fileBody, args[1])
  });

};

const write = (str, loc) => {
  if (fs.existsSync(loc)) {
    rl.question('File exists. Enter Y to overwrite file, otherwise exit app. > ', (input) => {
      if (input === 'Y' || input === 'y') {
        fs.writeFile(loc, str, (err) => {
          //const byteSize = str => new Blob([str]).size;
          if (err) throw err;
          console.log('Saved!');
          console.log(`Downloaded and saved ${str.length} bytes to ${loc}`)
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
      console.log(`Downloaded and saved ${str.length} bytes to ${loc}`)

      //can also use Buffer.byteLength(str) instead of str.length
      //can also check curl -I example.edu
    })
  }


}

const args = process.argv.splice(2);
const test = fetcher(args[0]);

//node fetcher.js http://example.edu ./dest/index2.html