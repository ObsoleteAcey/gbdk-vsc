import { FileHelper } from "../helpers/fileHelper";
import { IFile } from "../interfaces/ifile";

export abstract class GBDKTask  {
    /**
     * Async Task runner method
     */
    public abstract runTask(): Promise<void>;


    
}