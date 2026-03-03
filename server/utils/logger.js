import fs from "fs";
import path from "path";

export const logToFile = (message) => {
    try {
        const logPath = path.join(process.cwd(), "debug_log.txt");
        fs.appendFileSync(logPath, `${new Date().toISOString()} - ${message}\n`);
    } catch (e) {
        console.error("Failed to write to log file:", e);
    }
};
