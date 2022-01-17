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

    public compileSouceFiles(): void {
        const filesToCompile = this.getCSourceFiles();

        for(let file in filesToCompile) {

        }
    }

    private getCSourceFiles(): string[] {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        
        if(!workspaceFolders || !workspaceFolders[0]) {
            return [];
        }

        const sourceDir = path.join(workspaceFolders[0].uri.fsPath, this.settings.srcFolder);
        
        return [];//FileHelper.getFilesFromDir()
    }
}