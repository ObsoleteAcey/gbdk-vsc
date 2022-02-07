export interface ISettings {
    gdbkPath?: string;
    compilerOptions?: string;
    linkerOptions?: string;
    romFilename?: string;
    includeFolders?: string[];
    srcFolder?: string;
    objectFolder: string;
    mapsFolder?: string;
    spritesFolder?: string;
    tilesFolder?: string;
    backgroundsFolder?: string;
    soundFolder?: string;
}
