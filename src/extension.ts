// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { NodeDependenciesProvider } from './NodeDependenciesProvider';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	const rootPath = (vscode.workspace.workspaceFolders && (vscode.workspace.workspaceFolders.length > 0))
		? vscode.workspace.workspaceFolders[0].uri.fsPath : '';

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "helloworld" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('helloworld.helloworld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		const message = "Hello VS Code!";
		vscode.window.showErrorMessage(message);
	});

	context.subscriptions.push(disposable);

	let currentTime = vscode.commands.registerCommand('helloworld.currentTime', () => {
		vscode.window.showInformationMessage(new Date().toLocaleTimeString());
	});
	context.subscriptions.push(currentTime);

	// create a new `NodeDependenciesProvider` and register it with the extension
	const nodeDependenciesProvider = new NodeDependenciesProvider(rootPath);
	vscode.window.registerTreeDataProvider('nodeDependencies', nodeDependenciesProvider);
}

// This method is called when your extension is deactivated
export function deactivate() {}
