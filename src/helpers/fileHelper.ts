import * as fs from 'fs';
import * as path from 'path';

export class FileHelper {

    public static async getFilesFromDir(path: string, filterFunction: (fileName: string, index: number, array: string[]) => boolean): Promise<string[]> {
        
        const allFiles = fs.readdirSync(path);

        const filteredFiles =  allFiles.filter(filterFunction).map((fileName: string) => (path.endsWith('\\') ? path : path + '\\') + fileName);

        return filteredFiles;
    }
}