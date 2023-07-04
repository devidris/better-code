const vscode = require("vscode");
const { Configuration, OpenAIApi } = require("openai");

// Read eviroment files
require("dotenv").config({
  path: `${__dirname}/config.env`,
});

// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });

const configuration = new Configuration({
  apiKey: "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",
});

const openai = new OpenAIApi(configuration);

/**
 * @param {vscode.ExtensionContext} context
 */

const optimize = async function () {
  const editor = vscode.window.activeTextEditor;
  if (editor) {
    const selection = editor.selection;
    const currentFile = editor.document;
    const currentFileExtension = currentFile.fileName.split(".").pop();
    const highlightedCode = editor.document.getText(selection);

    const prompt =
      "return optimized faster code Performance optimization techniques to a programmatic command " +
      highlightedCode +
      "in" +
      currentFileExtension;

    try {
      await vscode.window.withProgress(
        {
          location: vscode.ProgressLocation.Notification,
          title: "Optimizing Code",
          cancellable: false,
        },
        async (progress) => {
          progress.report({ increment: 0 });

          const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt,
            temperature: 1,
            max_tokens: 4000,
          });

          editor.edit((editBuilder) => {
            editBuilder.replace(selection, completion.data.choices[0].text);
          });

          // Show a success message
          vscode.window.showInformationMessage("Code optimized successfully.");
        }
      );
    } catch (err) {
      console.log(err.response);
    }
  }
};

const comment = async function () {
  const editor = vscode.window.activeTextEditor;
  if (editor) {
    const selection = editor.selection;
    const currentFile = editor.document;
    const currentFileExtension = currentFile.fileName.split(".").pop();
    const highlightedCode = editor.document.getText(selection);

    const prompt =
      "return same code but with comments to a programmatic command " +
      highlightedCode +
      "in" +
      currentFileExtension;

    try {
      await vscode.window.withProgress(
        {
          location: vscode.ProgressLocation.Notification,
          title: "Optimizing Code",
          cancellable: false,
        },
        async (progress) => {
          progress.report({ increment: 0 });

          const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt,
            temperature: 0,
            max_tokens: 4000,
          });
          editor.edit((editBuilder) => {
            editBuilder.replace(selection, completion.data.choices[0].text);
            // console.log(completion.data.choices[0].text);
          });

          // Show a success message
          vscode.window.showInformationMessage("Code comment successfully.");
        }
      );
    } catch (err) {
      console.log(err.response);
    }
  }
};

const optimizeAndComment = async function () {
  const editor = vscode.window.activeTextEditor;
  if (editor) {
    const selection = editor.selection;
    const currentFile = editor.document;
    const currentFileExtension = currentFile.fileName.split(".").pop();
    const highlightedCode = editor.document.getText(selection);

    const prompt =
      "optimize code and return optimized code but with comments" +
      highlightedCode +
      "in" +
      currentFileExtension;
    try {
      await vscode.window.withProgress(
        {
          location: vscode.ProgressLocation.Notification,
          title: "Optimizing Code",
          cancellable: false,
        },
        async (progress) => {
          progress.report({ increment: 0 });

          const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt,
            temperature: 1,
            max_tokens: 4000,
          });
          editor.edit((editBuilder) => {
            editBuilder.replace(selection, completion.data.choices[0].text);
            // console.log(completion.data.choices[0].text)
          });

          // Show a success message
          vscode.window.showInformationMessage(
            "Code optimize and comment successfully."
          );
        }
      );
    } catch (err) {
      console.log(err.response);
    }
  }
};

const writeCode = async function () {
  const editor = vscode.window.activeTextEditor;
  if (editor) {
    const selection = editor.selection;
    const currentFile = editor.document;
    const currentFileExtension = currentFile.fileName.split(".").pop();
    const highlightedCode = editor.document.getText(selection);

    const prompt =
      "Convert this text to a programmatic command" +
      highlightedCode +
      "in" +
      currentFileExtension;

    try {
      await vscode.window.withProgress(
        {
          location: vscode.ProgressLocation.Notification,
          title: "Optimizing Code",
          cancellable: false,
        },
        async (progress) => {
          progress.report({ increment: 0 });

          const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt,
            temperature: 1,
            max_tokens: 4000,
            top_p: 1.0,
            frequency_penalty: 0.2,
            presence_penalty: 0.0,
          });
          editor.edit((editBuilder) => {
            editBuilder.replace(selection, completion.data.choices[0].text);
            // console.log(completion.data.choices[0].text)
          });
          // Show a success message
          vscode.window.showInformationMessage(
            "Code generated successfully."
          );
        }
      );
    } catch (err) {
      console.log(err.response);
    }
  }
};

const debugAndFixCode = async function () {
  const editor = vscode.window.activeTextEditor;
  if (editor) {
    const selection = editor.selection;
    const currentFile = editor.document;
    const currentFileExtension = currentFile.fileName.split(".").pop();
    const highlightedCode = editor.document.getText(selection);

    const prompt =
      "Fix bugs in the below code" +
      highlightedCode +
      "in" +
      currentFileExtension;

    try {
      await vscode.window.withProgress(
        {
          location: vscode.ProgressLocation.Notification,
          title: "Optimizing Code",
          cancellable: false,
        },
        async (progress) => {
          progress.report({ increment: 0 });

          const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt,
            temperature: 1,
            max_tokens: 4000,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
          });

          editor.edit((editBuilder) => {
            editBuilder.replace(selection, completion.data.choices[0].text);
            // console.log(completion.data.choices[0].text)
          });
          // Show a success message
          vscode.window.showInformationMessage(
            "Code fixed."
          );
        }
      );
    } catch (err) {
      console.log(err.response);
    }
  }
};
async function activate(context) {
  console.log('Congratulations, your extension "better-code" is now active!');

  let disposableOptimize = vscode.commands.registerCommand(
    "better-code.optimize",
    optimize
  );

  let disposableComment = vscode.commands.registerCommand(
    "better-code.comment",
    comment
  );

  let disposableOptimizeAndComment = vscode.commands.registerCommand(
    "better-code.optimizeandcomment",
    optimizeAndComment
  );

  let disposableWriteCode = vscode.commands.registerCommand(
    "better-code.write",
    writeCode
  );

  let disposableDebugCode = vscode.commands.registerCommand(
    "better-code.debug",
    debugAndFixCode
  );

  context.subscriptions.push(disposableOptimize);
  context.subscriptions.push(disposableComment);
  context.subscriptions.push(disposableOptimizeAndComment);
  context.subscriptions.push(disposableWriteCode);
  context.subscriptions.push(disposableDebugCode);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
