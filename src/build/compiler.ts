import path = require('path');
import {ChildProcess, execFile, ExecFileException} from 'child_process';
import * as vscode from 'vscode';
import { FileHelper } from '../helpers/fileHelper';
import { Settings } from '../settings/settings';
import { IFile } from '../interfaces/ifile';
import { BuildTask } from './buildTask';

/**
* Compiles the source C code to object files
*/
export class GBDKCompiler extends BuildTask {
    
    constructor(private settings: Settings) {
        super();
    }

    /**
     * Compiles all the source files it can find
     */
    public async compileSouceFiles(): Promise<void> {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        
        if(!workspaceFolders || !workspaceFolders[0]) {
            return;
        }

        const sourceDir = path.join(workspaceFolders[0].uri.fsPath, this.settings.srcFolder);
        // use stored extensions OR just default to '.c'
        const fileExtensions = this.settings.sourceFileExtensions || ['.c'];

        const filesToCompile = await this.getSourceFiles(sourceDir, fileExtensions);

        for(let file of filesToCompile) {
            this.compileSourceFile(file);
        }
    }
      /**
     * Compiles a source file in a syncronouse fashion
     * @param file the IFile instance containing information about the file
     * @returns 
     */
    private compileSourceFile(file: IFile): ChildProcess | null
    {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        
        if(!workspaceFolders || !workspaceFolders[0]) {
            return null;
        }

        const compiler = this.settings.gbdkPath || '';
        const compilerOptions = this.settings.compilerOptions || '';
        const objFolder = path.join(workspaceFolders[0].uri.fsPath, this.settings.objectFolder, '\\');
        const objectFilename = FileHelper.replaceFileExtension(file.file, ".o");

        const args: ReadonlyArray<string> = [compilerOptions, objFolder + objectFilename, file.path + file.file];

        const childProcess = execFile(compiler, args, { windowsVerbatimArguments: true}, (error: ExecFileException | null, stdout: string | Buffer, stderr: string | Buffer) => {
            if(error) {
                throw error;
            }
        });

        return childProcess;
    }
}