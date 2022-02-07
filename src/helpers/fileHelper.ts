import * as fs from 'fs';
import { IFile } from '../interfaces/ifile';

export class FileHelper {

    public static async getFilesFromDir(filePath: string, 
        filterFunction: (fileName: string, index: number, array: string[]) => boolean): Promise<IFile[]> {
        
        const allFiles = fs.readdirSync(filePath);

        return  allFiles.filter(filterFunction).map<IFile>((value: string) => {
                return {
                path: filePath.endsWith('\\') ? filePath : filePath + '\\',
                file: value
            };
        });
    }
}
