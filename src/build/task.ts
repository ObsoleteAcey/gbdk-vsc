import { FileHelper } from "../helpers/fileHelper";
import { IFile } from "../interfaces/ifile";

export abstract class GBDKTask  {
    /**
     * Async Task runner method
     */
    public abstract runTask(): Promise<void>;


    /**
     * 
     * @param searchDir 
     * @param fileExtensions 
     * @returns 
     */
    protected async getSourceFiles(searchDir: string, fileExtensions: string[]): Promise<IFile[]> {
        return await FileHelper.getFilesFromDir(searchDir, (fileName: string) => {
            return fileExtensions.some((value: string, index: number, array: string[]) => {
                return fileName.endsWith(value);
            });
        });
    }
}