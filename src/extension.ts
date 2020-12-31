import { ExtensionContext, commands, window, workspace, ConfigurationTarget } from 'vscode';
import { hexDigits, configOptions, colorLength } from './constants';

let intervalId: NodeJS.Timeout;

// Returns a random color in hex format
function getRandHexColor(): string {
    let color: string = '#';
    for (var l = colorLength; l > 0; --l) {
        color += hexDigits[Math.floor(Math.random() * hexDigits.length)];
    }
    return color;
}

// Returns the user's workspace configuration scoped to 'workbench'
// Informs the user if unsuccessful
function getWorkspaceConfiguration(): any {
    // Attempt to get a reference to the user's active editor
    let activeTextEditor = window.activeTextEditor;

    if (activeTextEditor === undefined) {
        // Not sure how to access configuration without an active text editor
        window.showErrorMessage('Open a file first.');
        return null;
    } else {
        // Configuration can be found
        return workspace.getConfiguration('workbench', activeTextEditor.document.uri);
    }
}

export function activate(context: ExtensionContext) {
    commands.registerCommand('extension.getRandomTheme', () => {
        let workspaceConfiguration = getWorkspaceConfiguration();

        if (workspaceConfiguration !== null) {
            // Map configuration string to random color string
            let colorConfigMap: { [option: string]: string } = {};
            configOptions.forEach(option => (colorConfigMap[option] = getRandHexColor()));

            // Update workspace configuration with new colors
            workspaceConfiguration.update('colorCustomizations', colorConfigMap, ConfigurationTarget.Workspace);
        }
    });

    commands.registerCommand('extension.removeRandomTheme', () => {
        clearInterval(intervalId);

        let workspaceConfiguration = getWorkspaceConfiguration();
        if (workspaceConfiguration !== null) {
            // Clear workspace color configuration
            workspaceConfiguration.update('colorCustomizations', {}, ConfigurationTarget.Workspace);
        }
    });

    commands.registerCommand('extension.partyModeOn', () => {
        intervalId = setInterval(() => commands.executeCommand('extension.getRandomTheme'), 500);
    });

    commands.registerCommand('extension.partyModeOff', () => {
        commands.executeCommand('extension.removeRandomTheme');
    });
}

export function deactivate() {}
