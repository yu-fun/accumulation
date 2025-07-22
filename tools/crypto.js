import fs from "node:fs";
import crypto from "node:crypto";
import { pipeline } from "node:stream";
import { Buffer } from "node:buffer";

const algorithm = "aes-256-cbc";
const password = "Password used to generate key";
// const key = Buffer.from(new Uint32Array(Array(32).fill(2)));
// const iv = Buffer.from(new Uint16Array(Array(16).fill(1)));
const key = crypto.scryptSync(password, "salt", 32);
const iv = Buffer.alloc(16, 110);

console.log(key, iv);

// const cipher = crypto.createCipheriv(algorithm, key, iv);

// const input = fs.createReadStream("./chat.zip");
// const output = fs.createWriteStream("./cc");

// pipeline(input, cipher, output, (err) => {
//   if (err) throw err;
// });

const cipher = crypto.createDecipheriv(algorithm, key, iv);
const input = fs.createReadStream("../essays/cc");
const output = fs.createWriteStream("./cc.zip");

pipeline(input, cipher, output, (err) => {
  if (err) throw err;
});
