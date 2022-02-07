export class SettingNameConstants {
    static gdbkPath: string = 'gdbkPath';
    static compilerOptions: string = 'compilerOptions';
    static linkerOptions: string = 'linkerOptions';
    static romFilename: string = 'romFilename';
    static includeFolders: string = 'includeFolders';
    static srcFolder: string = 'srcFolder';
    static objectFolder: string = 'objectFolder';
    static mapsFolder: string = 'mapsFolder';
    static spritesFolder: string = 'spritesFolder';
    static tilesFolder: string = 'tilesFolder';
    static backgroundsFolder: string = 'backgroundsFolder';
    static soundFolder: string = 'soundFolder';
}

export class SettingDefaultValueConstants {
    static gdbkPath: string = 'C:\\gbdk\\bin\\lcc.exe';
    static compilerOptions: string = '-Wa-l -Wl-m -Wl-j -DUSE_SFR_FOR_REG -c -o';
    static linkerOptions: string = '-Wa-l -Wl-m -Wl-j -DUSE_SFR_FOR_REG -o';
    static romFilename: string = '';
    static includeFolders: string[] = [];
    static srcFolder: string = 'src';
    static objectFolder: string = 'obj';
    static mapsFolder: string = 'maps';
    static spritesFolder: string = 'sprites';
    static tilesFolder: string = 'tiles';
    static backgroundsFolder: string = 'backgrounds';
    static soundFolder: string = 'sound';
}

export class InitialFileScaffolding {
    static fileName: string = 'main.c';
    static fileContent: string = `#include <gb/gb.h>
    #include <stdio.h>
    
    void main(){
        printf("Hello world!");
    }`;
}

export class ExtensionCommands {
    static compile: string = 'gbdk.compile';
    static link: string = 'gbdk.link';
    static build: string = 'gbdk.build';
    static scaffold: string = 'gbdk.scaffold';
}