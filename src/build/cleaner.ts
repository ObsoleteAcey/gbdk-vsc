import * as vscode from 'vscode';
import path = require('path');
import { Settings } from "../settings/settings";
import { GBDKTask } from "./task";
import { FileHelper } from '../helpers/fileHelper';

export class GBDKCleanerTask extends GBDKTask {
    constructor(private settings: Settings) {
        super();
    }

    public async runTask(): Promise<void> {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        
        if(!workspaceFolders || !workspaceFolders[0]) {
            return;
        }
   
        let deleteTasks: Promise<void>[] = [];
        deleteTasks.push(this.cleanObjFolders(workspaceFolders[0].uri.fsPath));

        await Promise.all(deleteTasks);
    }

    private async cleanObjFolders(baseFolder: string): Promise<void> {
        var baseCleanFolder = path.join(baseFolder, 'obj', '\\');

        const files = await FileHelper.getFilesFromDir(baseCleanFolder, { recursive: true },  () => {return true;});
        return FileHelper.deleteFiles(files);
    }
}