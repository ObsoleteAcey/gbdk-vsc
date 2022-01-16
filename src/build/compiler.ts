import * as vscode from 'vscode';
import { FileHelper } from '../helpers/fileHelper';
import { Settings } from '../settings/settings';

/**
* Compiles the source C code to object files
*/
export class GBDKCompiler {

    constructor(private settings: Settings) {
        
    }

    public compileSouceFiles() {
        
    }

    private getCSourceFiles(): string[] {
        const workspaceFolders = vscode.workspace.workspaceFolders;

        if(workspaceFolders) {
            
        }

        return [];//FileHelper.getFilesFromDir()
    }
}