import { ChildProcess, execFile, ExecFileException } from 'child_process';
import path = require('path');
import * as vscode from 'vscode';
import { FileHelper } from '../helpers/fileHelper';
import { IFile } from '../interfaces/ifile';
import { Settings } from "../settings/settings";
import { GBDKTask } from './task';

/**
* Links the object files to an output
*/
export class GBDKLinkerTask extends GBDKTask {

    constructor(private settings: Settings) {
        super();
    }

    public async runTask(): Promise<void> {
        return this.linkObjects();
    }

    private async linkObjects(): Promise<void> {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        
        if(!workspaceFolders || !workspaceFolders[0]) {
            return;
        }

        const objectDir = path.join(workspaceFolders[0].uri.fsPath, this.settings.objectFolder);

        const filesToLink = await FileHelper.getFilesWithSpecificExtensions(objectDir, { recursive: true }, ['.o']);

        this.linkObjectFiles(filesToLink);
    }

    /**
    * Compiles a source file in a syncronouse fashion
    * @param files the IFile array containing information about the files to be linked
    * @returns 
    */
    private linkObjectFiles(files: IFile[]): ChildProcess | null
    {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        
        if(!workspaceFolders || !workspaceFolders[0]) {
            return null;
        }
   
        const compiler = this.settings.gbdkPath;
        const linkerOptions = this.settings.linkerOptions;
        const outFolder = path.join(workspaceFolders[0].uri.fsPath, this.settings.outputBinFolder, '\\');
           
        const args: ReadonlyArray<string> = [linkerOptions, outFolder + this.settings.romFilename, 
            files.map((value: IFile, index: number, aray: IFile[]) => {
                        return value.path + value.file;
                    }).join(' ')          
            ];
   
        const childProcess = execFile(compiler, args, { windowsVerbatimArguments: true}, (error: ExecFileException | null, stdout: string | Buffer, stderr: string | Buffer) => {
            if(error) {
                throw error;
            }
        });
   
        return childProcess;
    }
}