import * as fs from 'fs';
import path = require('path');
import { IFile } from '../interfaces/ifile';
import { IGetFileOptions } from '../interfaces/igetFileOptions';

export class FileHelper {

    /**
     * Gets a list of files from the specific path
     * @param filePath The path to get the filenames from
     * @param filterFunction A filter function that can be applied to the filenames.
     * This allows removal of files that are of no interest to the caller.
     * @returns A promise that once fulfilled, will return a list of all the files
     */
    public static async getFilesFromDir(filePath: string, fileOptions: IGetFileOptions,
        filterFunction: (fileName: string, index: number, array: string[]) => boolean): Promise<IFile[]> {
        
        const allFsEntries = fs.readdirSync(filePath, { withFileTypes: true });
        let subFiles: IFile[] = [];
        if(fileOptions?.recursive) {
            const subDirs = allFsEntries.filter((value: fs.Dirent, index: number, array: fs.Dirent[]) => {
                return value.isDirectory();
            });

            // more of less the base case is there will be nothing to
            // iterate through here, and this no more recursive calls
            for(const subDir of subDirs) {
                // recurse through the subdirs.  This will look for more dirs,
                // then the files in those dirs
                const fullSubDir = path.join(filePath, subDir.name, '\\');
                subFiles = subFiles.concat(await FileHelper.getFilesFromDir(fullSubDir, fileOptions, filterFunction));
            }
        }

        // filter out any directories.  We only want files
        const allFiles = allFsEntries
                    .filter((value: fs.Dirent, index: number, array: fs.Dirent[]) => {
                        return value.isFile();
                    }).map<string>((file: fs.Dirent) => {
                        console.log(file.name);
                        return file.name;
                    });

        return  allFiles.filter(filterFunction).map<IFile>((value: string) => {
                    return {
                        path: filePath.endsWith('\\') ? filePath : filePath + '\\',
                        file: value
                    };
        }).concat(subFiles);
    }

    /**
     * 
     * @param filename The filename to remove the extension from
     * @returns The filename, less any extension
     * @throws Error when the filename contains no extension or is empty
     */
    public static removeExtensionFromFilename(filename: string): string {
        const fileParts = filename.split(".");

        if(fileParts.length === 1) {
            throw new Error("Filename contains no extension");
        }

        return fileParts.slice(0, fileParts.length - 1).join(".");
    }

    /**
     * Replaces an existing file extension with a new one
     * @param filename The filename to replace the extension on
     * @param newExtension The new extension.  eg ".o" or "o"
     * @returns The filename with a new extension
     */
    public static replaceFileExtension(filename: string, newExtension: string) : string {
        return this.removeExtensionFromFilename(filename) + (newExtension.includes(".") ? newExtension : "." + newExtension);
    }

    /**
     * Gets files from a specific director that have any of the extensions contained
     * in fileExtensions.  If no extensions are secified, all files are returned.
     * @param searchDir The directory to search for files
     * @param fileExtensions 
     * @returns 
     */
     public static async getFilesWithSpecificExtensions(searchDir: string, fileOptions: IGetFileOptions, fileExtensions: string[]): Promise<IFile[]> {
        return await FileHelper.getFilesFromDir(searchDir, fileOptions, (fileName: string) => {
            return !fileExtensions.length || fileExtensions.some((value: string, index: number, array: string[]) => {
                return fileName.endsWith(value);
            });
        });
    }

    /**
     * 
     * @param files 
     */
    public static async deleteFiles(files: IFile[]): Promise<void> {
        let promises: Promise<void>[] = [];
        for(let file of files) {
            promises.push(FileHelper.deleteFile(file));
        }

        await Promise.all(promises);
    }

    /**
     * 
     * @param file 
     * @returns 
     */
    public static deleteFile(file: IFile): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            fs.rm(file.path + file.file, (error) => {
                if(error) {
                    reject(error);
                } else {
                    resolve();
                }
            });
        });
    }
}
