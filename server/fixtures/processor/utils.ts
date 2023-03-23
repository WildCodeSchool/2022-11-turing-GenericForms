import * as dotenv from 'dotenv';
import * as fs from 'fs';

dotenv.config();
const path = 'fixtures/results/list';

export function writeToFile(email: string, password: string): void {
    const data = `${email}:${password}\n`;

    fs.createWriteStream(path, { flags: 'a+' }).write(data, function (err) {
        if (err != null) throw err;
    });
}