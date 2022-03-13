import * as vscode from 'vscode';
import { SettingDefaultValueConstants, SettingNameConstants } from '../constants';
import { ISettings } from '../interfaces/isettings';

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
            sourceFileExtensions: this.sourceFileExtensions,
            includeFolders: this.includeFolders,
            srcFolder: this.srcFolder,
            mapsFolder: this.mapsFolder,
            spritesFolder: this.spritesFolder,
            tilesFolder: this.tilesFolder,
            backgroundsFolder: this.backgroundsFolder,
            soundFolder: this.soundFolder,
            objectFolder: this.objectFolder,
            outputBinFolde: this.outputBinFolder
        };
    }

    public get gbdkPath(): string { 
        return this.settings.get<string>(SettingNameConstants.gdbkPath, SettingDefaultValueConstants.gdbkPath); 
    }

    public get compilerOptions(): string { 
        return this.settings.get<string>(SettingNameConstants.compilerOptions, SettingDefaultValueConstants.compilerOptions); 
    }

    public get linkerOptions(): string { 
        return this.settings.get<string>(SettingNameConstants.linkerOptions, SettingDefaultValueConstants.linkerOptions); 
    }

    public get romFilename(): string {
        return this.settings.get<string>(SettingNameConstants.romFilename, SettingDefaultValueConstants.romFilename);
    }

    public get sourceFileExtensions(): string[] {
        return this.settings.get<string[]>(SettingNameConstants.sourceFileExtensions, SettingDefaultValueConstants.sourceFileExtensions);
    }

    public get includeFolders(): string[] {
        return this.settings.get<string[]>(SettingNameConstants.includeFolders, SettingDefaultValueConstants.includeFolders);
    }

    public get srcFolder(): string {
        return this.settings.get<string>(SettingNameConstants.srcFolder, SettingDefaultValueConstants.srcFolder);
    }

    public get objectFolder(): string {
        return this.settings.get<string>(SettingNameConstants.objectFolder, SettingDefaultValueConstants.objectFolder);
    }

    public get mapsFolder(): string {
        return this.settings.get<string>(SettingNameConstants.mapsFolder, SettingDefaultValueConstants.mapsFolder);
    }

    public get spritesFolder(): string {
        return this.settings.get<string>(SettingNameConstants.spritesFolder, SettingDefaultValueConstants.spritesFolder);
    }

    public get tilesFolder(): string {
        return this.settings.get<string>(SettingNameConstants.tilesFolder, SettingDefaultValueConstants.tilesFolder);
    }

    public get backgroundsFolder(): string {
        return this.settings.get<string>(SettingNameConstants.backgroundsFolder, SettingDefaultValueConstants.backgroundsFolder);
    }

    public get soundFolder(): string {
        return this.settings.get<string>(SettingNameConstants.soundFolder, SettingDefaultValueConstants.soundFolder);
    }

    public get outputBinFolder(): string {
        return this.settings.get<string>(SettingNameConstants.outputBinFolder, SettingDefaultValueConstants.outputBinFolder);
    }
}