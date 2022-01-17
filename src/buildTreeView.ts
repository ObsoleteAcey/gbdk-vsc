import * as vscode from 'vscode';
import { ExtensionCommands } from './constants';

export class BuildTreeView implements vscode.TreeDataProvider<BuildStep> {
    constructor(private context: vscode.ExtensionContext,
        private workspaceRoot: string | undefined) {
            const sub = vscode.workspace.onDidChangeWorkspaceFolders(() => {
                this.refresh();
            });
        }

    private _onDidChangeTreeData: vscode.EventEmitter<BuildStep | undefined | null | void> = new vscode.EventEmitter<BuildStep | undefined | null | void>();
    
    readonly onDidChangeTreeData: vscode.Event<BuildStep | undefined | null | void> = this._onDidChangeTreeData.event;
      
    refresh(): void {
        this._onDidChangeTreeData.fire();
    }
    
    getTreeItem(element: BuildStep): vscode.TreeItem | Thenable<vscode.TreeItem> {
       return element;
    }
    
    getChildren(element?: BuildStep): vscode.ProviderResult<BuildStep[]> {
        if (!this.workspaceRoot) {
            vscode.window.showInformationMessage('No dependency in empty workspace');
            return Promise.resolve([]);
        }

        if(element) {
            return Promise.resolve([]);
        } else {
            return Promise.resolve([
                new BuildStep('compile', 'Compile source', 'Compile source', vscode.TreeItemCollapsibleState.None, ExtensionCommands.compile),
                new BuildStep('link', 'Link objects', 'Link object files', vscode.TreeItemCollapsibleState.None, ExtensionCommands.link),
                new BuildStep('build', 'Build ROM', 'Build ROM file', vscode.TreeItemCollapsibleState.None, ExtensionCommands.build)
            ]);
        }
    }
}

class BuildStep extends vscode.TreeItem {

    constructor(
        public readonly label: string,
        public readonly description: string,
        public readonly toolTip: string,
        public readonly collapsibleState: vscode.TreeItemCollapsibleState,
        readonly commandString: string
      ) {
        super(label, collapsibleState);
        this.tooltip = toolTip;
        this.description = description;
        this.contextValue = label;
        this.command = { 
            title: label,
            tooltip: toolTip,
            command: commandString
        };
      }
}
