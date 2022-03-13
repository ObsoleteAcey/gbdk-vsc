import { TreeItem, Uri, window, workspace } from 'vscode';
import { Settings } from "./settings/settings";
import * as fs from 'fs';
import * as path from 'path';
import { InitialFileScaffolding } from './constants';

export class ProjectScaffolder {

    constructor(private settings: Settings) {

    }

    public async scaffoldNewProject(projectLocation: string, projectName: string): Promise<void> {

        let projLocation: string  = projectLocation;
        let projName: string = projectName;

        if(!projLocation) {
            const tempProjLocation = await this.askForProjectLocation();
            if(!tempProjLocation) {
                return;
            }
            projLocation = tempProjLocation;
        }

        if(!projName) {
            const tempProjName = await this.askForProjectName();
            if(!tempProjName) {
                return;
            }
            projName = tempProjName;
        }

        const baseProjectPath = path.join(projLocation, projName);
        if(this.createProjectDirs(baseProjectPath)) {
            this.createInitialFile(baseProjectPath);
        } else {
            window.showInformationMessage('Error creating project directories (maybe they already exist?)');
        }
        
        workspace.updateWorkspaceFolders(workspace.workspaceFolders ? workspace.workspaceFolders.length : 0, null, { uri: Uri.file(baseProjectPath)});
    }

    private async askForProjectLocation(): Promise<string|undefined> {
        return await window.showInputBox({
            title: "Project location (must exist)",
            validateInput: (value: string): string|null|undefined => {
                if(fs.existsSync(value))
                {
                    return null;
                }
                return "Not a valid path";
            }
        });
    }

    private async askForProjectName(): Promise<string|undefined> {
        return await window.showInputBox({
            title: "Project name (folder will be created)",
            validateInput: (value: string): string|null|undefined => {
                return null;
                //return "Not a valid project name";
            }
        });
    }

    private createProjectDirs(baseProjectPath: string) : boolean {
        const objDir = 'obj';
        const binDir = 'bin';
        const vscodeDir = '.vscode';

        try {
            // make base project path
            fs.mkdirSync(baseProjectPath);

            // make the src dirs
            fs.mkdirSync(path.join(baseProjectPath, this.settings.srcFolder!));
            fs.mkdirSync(path.join(baseProjectPath, this.settings.srcFolder!, this.settings.mapsFolder!));
            fs.mkdirSync(path.join(baseProjectPath, this.settings.srcFolder!, this.settings.spritesFolder!));
            fs.mkdirSync(path.join(baseProjectPath, this.settings.srcFolder!, this.settings.tilesFolder!));
            fs.mkdirSync(path.join(baseProjectPath, this.settings.srcFolder!, this.settings.backgroundsFolder!));
            fs.mkdirSync(path.join(baseProjectPath, this.settings.srcFolder!, this.settings.soundFolder!));

            // make the obj output dirs
            fs.mkdirSync(path.join(baseProjectPath, objDir));
            fs.mkdirSync(path.join(baseProjectPath, objDir, this.settings.mapsFolder!));
            fs.mkdirSync(path.join(baseProjectPath, objDir, this.settings.spritesFolder!));
            fs.mkdirSync(path.join(baseProjectPath, objDir, this.settings.tilesFolder!));
            fs.mkdirSync(path.join(baseProjectPath, objDir, this.settings.backgroundsFolder!));
            fs.mkdirSync(path.join(baseProjectPath, objDir, this.settings.soundFolder!));

            // make the bin dir
            fs.mkdirSync(path.join(baseProjectPath, binDir));

            // make the .vscode dir
            fs.mkdirSync(path.join(baseProjectPath, vscodeDir));
            return true;
        } catch {
            return false;
        }
    }

    private createInitialFile(baseProjectPath: string) {
        fs.writeFileSync(path.join(baseProjectPath, this.settings.srcFolder!, InitialFileScaffolding.fileName), InitialFileScaffolding.fileContent);
    }
}