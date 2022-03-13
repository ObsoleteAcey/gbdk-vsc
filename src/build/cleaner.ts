import { Settings } from "../settings/settings";
import { BuildTask } from "./buildTask";

export class GBDKCleaner extends BuildTask {
    constructor(private settings: Settings) {
        super();
    }
}