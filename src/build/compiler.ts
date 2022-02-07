import path = require('path');
import {execFile, ExecFileException} from 'child_process';
import * as vscode from 'vscode';
import { FileHelper } from '../helpers/fileHelper';
import { Settings } from '../settings/settings';
import { IFile } from '../interfaces/ifile';

/**
* Compiles the source C code to object files
*/
export class GBDKCompiler {
    
    constructor(private settings: Settings) {
        
    }

    public async compileSouceFiles(): Promise<void> {
        const filesToCompile = await this.getCSourceFiles();

        for(let file of filesToCompile) {
            this.compileSourceFile(file);
        }
    }

    private async getCSourceFiles(): Promise<IFile[]> {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        
        if(!workspaceFolders || !workspaceFolders[0]) {
            return [];
        }

        const sourceDir = path.join(workspaceFolders[0].uri.fsPath, this.settings.srcFolder);
        
        return await FileHelper.getFilesFromDir(sourceDir, (fileName: string) => {
            return fileName.endsWith('.c');
        });
    }

    private compileSourceFile(file: IFile): void
    {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        
        if(!workspaceFolders || !workspaceFolders[0]) {
            return;
        }

        const compiler = this.settings.gbdkPath || '';
        const compilerOptions = this.settings.compilerOptions || '';
        const objFolder = path.join(workspaceFolders[0].uri.fsPath, this.settings.objectFolder, '\\');

        const args: ReadonlyArray<string> = [compilerOptions, objFolder + 'main.o', file.file];

        execFile(compiler, args, null, (error: ExecFileException | null, stdout: string | Buffer, stderr: string | Buffer) => {
            
        });
    }
}