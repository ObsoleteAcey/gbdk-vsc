import * as fs from 'fs';
import * as path from 'path';

export class FileHelper {

    public static getFilesFromDir(path: string, filterFunction: (fileName: string, index: number, array: string[]) => boolean): string[] {
        return fs.readdirSync(path).filter(filterFunction);
    }
}