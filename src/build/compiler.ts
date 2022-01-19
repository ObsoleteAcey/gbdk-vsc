import path = require('path');
import * as vscode from 'vscode';
import { FileHelper } from '../helpers/fileHelper';
import { Settings } from '../settings/settings';

/**
* Compiles the source C code to object files
*/
export class GBDKCompiler {

    constructor(private settings: Settings) {
        
    }

    public async compileSouceFiles(): Promise<void> {
        const filesToCompile = await this.getCSourceFiles();

        for(let file in filesToCompile) {

        }
    }

    private async getCSourceFiles(): Promise<string[]> {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        
        if(!workspaceFolders || !workspaceFolders[0]) {
            return [];
        }

        const sourceDir = path.join(workspaceFolders[0].uri.fsPath, this.settings.srcFolder);
        
        return await FileHelper.getFilesFromDir(sourceDir, (fileName: string) => {
            return fileName.endsWith('.c');
        });
    }
}