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

const SavedColorConfigMap = workspace.getConfiguration('workbench').get('colorCustomizations') || {}

export function activate(context: ExtensionContext) {
    commands.registerCommand('extension.getRandomTheme', () => {
        // Map configuration string to random color string
        let colorConfigMap: { [option: string]: string } = {};
        configOptions.forEach(option => (colorConfigMap[option] = getRandHexColor()));

        // Update workspace configuration with new colors
        workspace.getConfiguration('workbench').update('colorCustomizations', colorConfigMap, ConfigurationTarget.Workspace);
    });

    commands.registerCommand('extension.removeRandomTheme', () => {
        if (!!intervalId) {
            clearInterval(intervalId);
            intervalId = undefined;
        }

        // Clear workspace color configuration
        workspace.getConfiguration('workbench').update('colorCustomizations', SavedColorConfigMap, ConfigurationTarget.Workspace);
    });

    commands.registerCommand('extension.togglePartyMode', () => {
        if (!!intervalId) {
            // End party mode
            commands.executeCommand('extension.removeRandomTheme');
        } else {
            // Begin party mode
            intervalId = setInterval(() => commands.executeCommand('extension.getRandomTheme'), 500);
        }
    });
}

export function deactivate() { }
