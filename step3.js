const fs = require("fs");
const process = require("process");
const axios = require("axios");
console.log(process.argv);
let out = process.argv[2];
if (out == "--out") {
  let newFilePath = process.argv[3];
  let path = process.argv[4];
  if (path.includes("http")) {
    webCat(path, newFilePath);
  } else {
    cat(path, newFilePath);
  }
} else {
  let path = process.argv[2];

  if (path.includes("http")) {
    webCat(path);
  } else {
    cat(path);
  }
}

/** read file at path and print it out. */

function cat(path, out = false) {
  fs.readFile(path, "utf8", function (err, data) {
    if (err) {
      console.error(`Error reading ${path}: ${err}`);
      process.exit(1);
    } else {
      handleOutput(data, out);
    }
  });
}

/** read page at URL and print it out. */

async function webCat(url, out = false) {
  try {
    let resp = await axios.get(url);
    handleOutput(resp.data, out);
  } catch (err) {
    console.error(`Error fetching ${url}: ${err}`);
    process.exit(1);
  }
}
function handleOutput(text, out) {
  if (out) {
    fs.writeFile(out, text, "utf8", function (err) {
      if (err) {
        console.error(`Couldn't write ${out}: ${err}`);
        process.exit(1);
      }
    });
  } else {
    console.log(text);
  }
}
