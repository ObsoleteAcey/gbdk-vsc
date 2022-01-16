import * as vscode from 'vscode';
import { SettingDefaultValueConstants, SettingNameConstants } from '../constants';

export interface ISettings {
    gdbkPath?: string;
    compilerOptions?: string;
    linkerOptions?: string;
    romFilename?: string;
    includeFolders?: string[];
    srcFolder?: string;
    mapsFolder?: string;
    spritesFolder?: string;
    tilesFolder?: string;
    backgroundsFolder?: string;
    soundFolder?: string;
}

export class Settings {
    private readonly settings: vscode.WorkspaceConfiguration;

    constructor(resource?: vscode.Uri) {
        this.settings = vscode.workspace.getConfiguration('gbdk', resource ? resource : null);
        
        // possibly use config changes and push new config to listeners
        //vscode.workspace.onDidChangeConfiguration()
    }


    public getSettings(): ISettings {
        return {
            gdbkPath: this.gbdkPath,
            compilerOptions: this.compilerOptions,
            linkerOptions: this.linkerOptions,
            romFilename: this.romFilename,
            includeFolders: this.includeFolders,
            srcFolder: this.srcFolder,
            mapsFolder: this.mapsFolder,
            spritesFolder: this.spritesFolder,
            tilesFolder: this.tilesFolder,
            backgroundsFolder: this.backgroundsFolder,
            soundFolder: this.soundFolder
        };
    }

    public get gbdkPath(): string|undefined { 
        return this.settings.get<string>(SettingNameConstants.gdbkPath, SettingDefaultValueConstants.gdbkPath); 
    }

    public get compilerOptions(): string|undefined { 
        return this.settings.get<string>(SettingNameConstants.compilerOptions, SettingDefaultValueConstants.compilerOptions); 
    }

    public get linkerOptions(): string|undefined { 
        return this.settings.get<string>(SettingNameConstants.linkerOptions, SettingDefaultValueConstants.linkerOptions); 
    }

    public get romFilename(): string|undefined {
        return this.settings.get<string>(SettingNameConstants.romFilename, SettingDefaultValueConstants.romFilename);
    }

    public get includeFolders(): string[]|undefined {
        return this.settings.get<string[]>(SettingNameConstants.includeFolders, SettingDefaultValueConstants.includeFolders);
    }

    public get srcFolder(): string {
        return this.settings.get<string>(SettingNameConstants.srcFolder, SettingDefaultValueConstants.srcFolder);
    }

    public get mapsFolder(): string {
        return this.settings.get<string>(SettingNameConstants.mapsFolder, SettingDefaultValueConstants.mapsFolder);
    }

    public get spritesFolder(): string|undefined {
        return this.settings.get<string>(SettingNameConstants.spritesFolder, SettingDefaultValueConstants.spritesFolder);
    }

    public get tilesFolder(): string|undefined {
        return this.settings.get<string>(SettingNameConstants.tilesFolder, SettingDefaultValueConstants.tilesFolder);
    }

    public get backgroundsFolder(): string|undefined {
        return this.settings.get<string>(SettingNameConstants.backgroundsFolder, SettingDefaultValueConstants.backgroundsFolder);
    }

    public get soundFolder(): string|undefined {
        return this.settings.get<string>(SettingNameConstants.soundFolder, SettingDefaultValueConstants.soundFolder);
    }
}