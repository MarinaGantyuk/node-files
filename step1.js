const fs = require("fs");
let path = process.argv[2];
fs.readFile(path, "utf8", function (err, data) {
  if (err) {
    console.error(`Error reading ${path}: ${err}`);
    process.exit(1);
  } else {
    console.log(data);
  }
});
