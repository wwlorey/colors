import {
    ExtensionContext,
    commands,
    window,
    workspace,
    ConfigurationTarget
} from 'vscode';

// Configuration options that will be updated with random colors
const configOptions: string[] = [
    'activityBar.background',
    'activityBar.foreground',
    'button.background',
    'button.foreground',
    'editor.background',
    'editor.findMatchBackground',
    'editor.findMatchBorder',
    'editor.findMatchHighlightBackground',
    'editor.findMatchHighlightBorder',
    'editor.findRangeHighlightBackground',
    'editor.findRangeHighlightBorder',
    'editor.foreground',
    'editor.hoverHighlightBackground',
    'editor.inactiveSelectionBackground',
    'editor.lineHighlightBackground',
    'editor.lineHighlightBorder',
    'editor.rangeHighlightBackground',
    'editor.rangeHighlightBorder',
    'editor.selectionBackground',
    'editor.selectionForeground',
    'editor.selectionHighlightBackground',
    'editor.selectionHighlightBorder',
    'editor.wordHighlightBackground',
    'editor.wordHighlightBorder',
    'editor.wordHighlightStrongBackground',
    'editor.wordHighlightStrongBorder',
    'editorCursor.background',
    'editorCursor.foreground',
    'editorGroupHeader.tabsBackground',
    'editorLineNumber.activeForeground',
    'editorLineNumber.foreground',
    'editorPane.background',
    'list.activeSelectionBackground',
    'list.activeSelectionForeground',
    'list.dropBackground',
    'list.focusBackground',
    'list.focusForeground',
    'list.highlightForeground',
    'list.hoverBackground',
    'list.hoverForeground',
    'list.inactiveSelectionBackground',
    'list.inactiveSelectionForeground',
    'menu.background',
    'menu.foreground',
    'menubar.selectionBackground',
    'menubar.selectionBorder',
    'menubar.selectionForeground',
    'notificationCenter.border',
    'notificationCenterHeader.background',
    'notificationCenterHeader.foreground',
    'notifications.background',
    'notifications.border',
    'notifications.foreground',
    'panel.background',
    'panel.border',
    'sideBar.background',
    'sideBar.border',
    'sideBar.foreground',
    'sideBarSectionHeader.background',
    'sideBarTitle.foreground',
    'statusBar.background',
    'statusBar.border',
    'statusBar.foreground',
    'tab.activeBackground',
    'tab.activeForeground',
    'tab.hoverBackground',
    'tab.inactiveBackground',
    'tab.unfocusedActiveBackground',
    'terminal.background',
    'terminal.foreground',
    'textBlockQuote.background',
    'textBlockQuote.border',
    'textCodeBlock.background',
    'textLink.activeForeground',
    'textLink.foreground',
    'textPreformat.foreground',
    'textSeparator.foreground',
    'titleBar.activeBackground',
    'titleBar.activeForeground',
    'titleBar.border'
];

// These digits are randomly chosen from when creating hex numbers
const hexDigits: string = '0123456789ABCDEF';

// Hex color string length
const colorLength: number = 6;

// Returns a random color in hex format
function getRandHexColor(): string {
    let color: string = '#';
    for (var l = colorLength; l > 0; --l) {
        color += hexDigits[Math.floor(Math.random() * hexDigits.length)];
    }
    return color;
}

export function activate(context: ExtensionContext) {
    let disposable = commands.registerCommand(
        'extension.getRandomTheme',
        () => {
            // Attempt to get a reference to the user's active editor
            let activeTextEditor = window.activeTextEditor;

            if (activeTextEditor === undefined) {
                // Not sure how to access configuration without an active text editor
                window.showErrorMessage('Open a file first.');
            } else {
                // Map configuration string to random color string
                let colorConfigMap: { [option: string]: string } = {};
                configOptions.forEach(
                    option => (colorConfigMap[option] = getRandHexColor())
                );

                // Get & update workspace configuration with new colors
                let workspaceConfig = workspace.getConfiguration(
                    'workbench',
                    activeTextEditor.document.uri
                );

                workspaceConfig.update(
                    'colorCustomizations',
                    colorConfigMap,
                    ConfigurationTarget.Workspace
                );

                window.showInformationMessage(
                    "Here's your random theme. Sorry."
                );
            }
        }
    );

    context.subscriptions.push(disposable);
}

export function deactivate() {}
