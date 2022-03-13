// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { BuildTreeView } from './buildTreeView';
import { GBDKCompiler } from './build/compiler';
import { GBDKLinker } from './build/linker';
import { Settings } from './settings/settings';
import { ProjectScaffolder } from './projectScaffolder';
import { ExtensionCommands } from './constants';

class GBDKVSCodeExtension {
	private settings: Settings;
	private compiler: GBDKCompiler;
	private linker: GBDKLinker;

	constructor() {
		this.settings = new Settings();
		this.compiler = new GBDKCompiler(this.settings);
		this.linker = new GBDKLinker(this.settings);
	}

	// this method is called when your extension is activated
	// your extension is activated the very first time the command is executed
	activate(context: vscode.ExtensionContext) {
	
		// Use the console to output diagnostic information (console.log) and errors (console.error)
		// This line of code will only be executed once when your extension is activated
		console.log('Congratulations, your extension "gbdl-vsc" is now active!');

		const scaffolder = new ProjectScaffolder(this.settings);
		
		context.subscriptions.push(
			vscode.commands.registerCommand(ExtensionCommands.compile, () => this.compiler.compileSouceFiles()),
			vscode.commands.registerCommand(ExtensionCommands.link, () => this.linker.linkObjects()),
			vscode.commands.registerCommand(ExtensionCommands.build, () => {
				this.compiler.compileSouceFiles();
				this.linker.linkObjects();
			}),
			// register the scaffold command.  It takes the project location and name as strings
			vscode.commands.registerCommand(ExtensionCommands.scaffold, (projectLocation: string, projectName: string) => scaffolder.scaffoldNewProject(projectLocation, projectName)));

		vscode.window.registerTreeDataProvider(
			'gbdk-build',
				new BuildTreeView(context, 
					vscode.workspace.workspaceFolders ?  vscode.workspace.workspaceFolders[0].name : undefined)
			 );
	}

	// this method is called when your extension is deactivated
	deactivate() {

	}
}

export const extension = new GBDKVSCodeExtension(); 

export function activate(context: vscode.ExtensionContext): void {
	extension.activate(context);
}
  
export function deactivate(): void {
	extension.deactivate();
}
