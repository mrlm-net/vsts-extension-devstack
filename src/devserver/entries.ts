import fs from "fs";
import * as path from "path";

export const DEFAULT_SRC_DIR = "src";

export function fetchEntries(root: string): any {
    const entries: any = {};
    fs.readdirSync(root).filter((entry) => {
        if (fs.statSync(path.join(root, entry)).isDirectory()) {
            entries[entry] = "./" + path.relative(process.cwd(), path.join(root, entry, entry));
        }
    });

    return entries;
}
