// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { ExtensionContext, commands, window, workspace, ConfigurationTarget, Color } from 'vscode';
// import { getVSCodeDownloadUrl } from 'vscode-test/out/util';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "colors" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = commands.registerCommand('extension.getRandomTheme', () => {
		// The code you place here will be executed every time your command is executed

		let activeTextEditor = window.activeTextEditor;

		if (activeTextEditor === undefined) {
			window.showErrorMessage('Open a file first.');
		} else {
			let colorConfig = workspace.getConfiguration('workbench', activeTextEditor.document.uri);

			colorConfig.update('colorCustomizations', {"editor.background": "#123"}, ConfigurationTarget.Workspace);

			window.showInformationMessage('Here\'s your random theme');

			console.log(colorConfig);
		}

		// let c = new Color(0.2, 0.4, 0.6, 1);

		// // vscode.workspace.getConfiguration('editor').update('background', c, vscode.ConfigurationTarget.Workspace);
		// // let config = vscode.workspace.getConfiguration('editor').get('background');
		
		// //.update('editor.background', '#ABCABC', vscode.ConfigurationTarget.Workspace);//.update('tree.indent', 9, vscode.ConfigurationTarget.Workspace);

		// console.log(config);
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }
