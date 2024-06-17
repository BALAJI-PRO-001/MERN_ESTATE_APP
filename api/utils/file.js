import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const FILE_PATH = path.join(__dirname, "../../data/userRecords.csv");

export const appendAsync = (path, data) => {
  fs.appendFile(path, data, (err) => {
    if (err) throw err;
  });
}

