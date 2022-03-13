export interface ISettings {
    gdbkPath?: string;
    compilerOptions?: string;
    linkerOptions?: string;
    romFilename?: string;
    sourceFileExtensions?: string[];
    includeFolders?: string[];
    srcFolder?: string;
    objectFolder: string;
    mapsFolder?: string;
    spritesFolder?: string;
    tilesFolder?: string;
    backgroundsFolder?: string;
    soundFolder?: string;
    outputBinFolde?: string;
}
