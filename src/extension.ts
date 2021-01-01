import { ExtensionContext, commands, window, workspace, ConfigurationTarget } from 'vscode';
import { hexDigits, configOptions, colorLength } from './constants';

let intervalId: NodeJS.Timeout | undefined;

// Returns a random color in hex format
function getRandHexColor(): string {
    let color: string = '#';
    for (var l = colorLength; l > 0; --l) {
        color += hexDigits[Math.floor(Math.random() * hexDigits.length)];
    }
    return color;
}

export function activate(context: ExtensionContext) {
    commands.registerCommand('extension.getRandomTheme', () => {
        // Map configuration string to random color string
        let colorConfigMap: { [option: string]: string } = {};
        configOptions.forEach(option => (colorConfigMap[option] = getRandHexColor()));

        // Update workspace configuration with new colors
        workspace.getConfiguration('workbench').update('colorCustomizations', colorConfigMap, ConfigurationTarget.Workspace);
    });

    commands.registerCommand('extension.removeRandomTheme', () => {
        if (intervalId !== undefined) {
            clearInterval(intervalId);
            intervalId = undefined;
        }

        // Clear workspace color configuration
        workspace.getConfiguration('workbench').update('colorCustomizations', {}, ConfigurationTarget.Workspace);
    });

    commands.registerCommand('extension.partyModeOn', () => {
        if (intervalId === undefined) {
            // Only set the interval if it's not set already
            // Otherwise unstoppable party mode is a reality 😬
            intervalId = setInterval(() => commands.executeCommand('extension.getRandomTheme'), 500);
        }
    });

    commands.registerCommand('extension.partyModeOff', () => {
        commands.executeCommand('extension.removeRandomTheme');
    });
}

export function deactivate() {}
