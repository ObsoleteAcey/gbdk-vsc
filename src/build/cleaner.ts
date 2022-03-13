import { Settings } from "../settings/settings";
import { GBDKTask } from "./task";

export class GBDKCleanerTask extends GBDKTask {
    constructor(private settings: Settings) {
        super();
    }

    public async runTask(): Promise<void> {
        
    }
}