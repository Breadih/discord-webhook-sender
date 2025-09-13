import { intro, outro, select, text } from "@clack/prompts";
import chalk from "chalk";
import consola from "consola";
import * as fs from "fs";
import * as path from "path";
import { login } from "./Webhook_Management";

export async function MainMenu() {
    const projectType = await select({
        message: 'Pick an option.',
        options: [
            { value: 'seebinds', label: 'See binds' },
            { value: 'login', label: 'Webhook login' },
            { value: 'messagebinds', label: 'View message binds' },
            { value: 'leave', label: 'Leave'}
        ],
    });

    switch (projectType) {
    case "login": {
        const webhookURL = await text({ message: "Enter your Discord webhook URL:" });
        if (webhookURL) {
            await login(webhookURL.toString());
        } else {
            consola.warn("No webhook provided.");
        }
        break;
    }
    case "seebinds":
    case "messagebinds":
        consola.info(chalk.yellow("Feature not implemented yet."));
        break;
    case "leave":
        outro('Bye!');
        process.exit(0);
    default:
        consola.info(chalk.yellow('Option not recognized.'));
}

}
