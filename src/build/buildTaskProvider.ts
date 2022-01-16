import { CancellationToken, ProviderResult, Task, TaskProvider } from "vscode";

export class BuldTaskProvider implements TaskProvider {

    public async provideTasks(token: CancellationToken): Promise<Task[]> {
        throw new Error("Method not implemented.");
    }

    public async resolveTask(task: Task, token: CancellationToken): Promise<Task|undefined> {
        throw new Error("Method not implemented.");
    }
    
}