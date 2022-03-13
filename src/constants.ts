export class SettingNameConstants {
    static gdbkPath: string = 'gdbkPath';
    static compilerOptions: string = 'compilerOptions';
    static linkerOptions: string = 'linkerOptions';
    static romFilename: string = 'romFilename';
    static sourceFileExtensions: string = 'sourceFileExtensions';
    static includeFolders: string = 'includeFolders';
    static srcFolder: string = 'srcFolder';
    static objectFolder: string = 'objectFolder';
    static mapsFolder: string = 'mapsFolder';
    static spritesFolder: string = 'spritesFolder';
    static tilesFolder: string = 'tilesFolder';
    static backgroundsFolder: string = 'backgroundsFolder';
    static soundFolder: string = 'soundFolder';
    static outputBinFolder: string = 'outputBinFolder';
}

export class SettingDefaultValueConstants {
    static gdbkPath: string = 'C:\\gbdk\\bin\\lcc.exe';
    static compilerOptions: string = '-Wa-l -Wl-m -Wl-j -DUSE_SFR_FOR_REG -c -o';
    static linkerOptions: string = '-Wa-l -Wl-m -Wl-j -DUSE_SFR_FOR_REG -Wl-yt1 -Wl-yo4 -Wl-ya0 -o';
    static romFilename: string = 'main.gb';
    static sourceFileExtensions: string[] = ['.c', '.s'];
    static includeFolders: string[] = [];
    static srcFolder: string = 'src';
    static objectFolder: string = 'obj';
    static mapsFolder: string = 'maps';
    static spritesFolder: string = 'sprites';
    static tilesFolder: string = 'tiles';
    static backgroundsFolder: string = 'backgrounds';
    static soundFolder: string = 'sound';
    static outputBinFolder: string = 'bin';
}

export class InitialFileScaffolding {
    static fileName: string = 'main.c';
    static fileContent: string = `#include <gb/gb.h>
    #include <stdio.h>
    
    void main(){
        printf("Hello world!");
    }`;

    static cCppProperties: string = `{
        "env": {
          "myDefaultIncludePath": ["#{workspaceFolder}", "#{workspaceFolder}/include"],
          "myCompilerPath": "#{compilerPath}"
        },
        "configurations": [
          {
            "name": "Gameboy",
            "intelliSenseMode": "clang-x64",
            "includePath": ["#{myDefaultIncludePath}", "#{weorkspaceFolder}/include/"],
            "defines": [],
            "forcedInclude": ["#{workspaceFolder}/include/config.h"],
            "compilerPath": "/usr/bin/clang",
            "cStandard": "c11",
            "cppStandard": "c++17",
            "compileCommands": "/path/to/compile_commands.json",
            "browse": {
              "path": ["#{workspaceFolder}"],
              "limitSymbolsToIncludedHeaders": true,
              "databaseFilename": ""
            }
          }
        ],
        "version": 4
      }`;
}

export class ExtensionCommands {
    static clean: string = 'gbdk.clean';
    static compile: string = 'gbdk.compile';
    static link: string = 'gbdk.link';
    static build: string = 'gbdk.build';
    static scaffold: string = 'gbdk.scaffold';
}