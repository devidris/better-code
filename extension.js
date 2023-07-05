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
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

/**
 * @param {vscode.ExtensionContext} context
 */

const handleError = function (err, msg = false) {
  if (msg) {
    return msg;
  }
  const Max_Content = err.response.data.error.message.includes(
    "maximum context length is 4097 tokens"
  );
  if (Max_Content) {
    return "The maximum code length 2000 characters, reduce the length of the code";
  }
  return "Something went wrong";
};
const optimize = async function () {
  const editor = vscode.window.activeTextEditor;
  if (editor) {
    const selection = editor.selection;
    const currentFile = editor.document;
    const currentFileExtension = currentFile.fileName.split(".").pop();
    const highlightedCode = editor.document.getText(selection);
    if (highlightedCode.length > 2000) {
      vscode.window.showErrorMessage(
        handleError(
          "_",
          "The maximum code length 2000 characters, reduce the length of the code"
        )
      );

      return;
    }
    const prompt =
      "optimize and make code run faster using Performance optimization techniques" +
      highlightedCode +
      "in" +
      currentFileExtension +
      "return a programmatic command";

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
            max_tokens: 4097,
          });

          editor.edit((editBuilder) => {
            editBuilder.replace(selection, completion.data.choices[0].text);
          });

          // Show a success message
          vscode.window.showInformationMessage("Code optimized successfully.");
        }
      );
    } catch (err) {
      vscode.window.showErrorMessage(handleError(err));
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
    if (highlightedCode.length > 2000) {
      vscode.window.showErrorMessage(
        handleError(
          "_",
          "The maximum code length 2000 characters, reduce the length of the code"
        )
      );

      return;
    }
    const prompt =
      "return same code but with comments to a programmatic command " +
      highlightedCode +
      "in" +
      currentFileExtension;

    try {
      await vscode.window.withProgress(
        {
          location: vscode.ProgressLocation.Notification,
          title: "Commenting Code",
          cancellable: false,
        },
        async (progress) => {
          progress.report({ increment: 0 });

          const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt,
            temperature: 0,
            max_tokens: 4097,
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
      vscode.window.showErrorMessage(handleError(err));
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
    if (highlightedCode.length > 2000) {
      vscode.window.showErrorMessage(
        handleError(
          "_",
          "The maximum code length 2000 characters, reduce the length of the code"
        )
      );
      return;
    }
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
            max_tokens: 4097,
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
      vscode.window.showErrorMessage(handleError(err));
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
    if (highlightedCode.length > 2000) {
      vscode.window.showErrorMessage(
        handleError(
          "_",
          "The maximum code length 2000 characters, reduce the length of the code"
        )
      );

      return;
    }
    const prompt =
      "Convert this text to a programmatic command" +
      highlightedCode +
      "in" +
      currentFileExtension;

    try {
      await vscode.window.withProgress(
        {
          location: vscode.ProgressLocation.Notification,
          title: "Writing Code",
          cancellable: false,
        },
        async (progress) => {
          progress.report({ increment: 0 });

          const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt,
            temperature: 1,
            max_tokens: 4097,
            top_p: 1.0,
            frequency_penalty: 0.2,
            presence_penalty: 0.0,
          });
          editor.edit((editBuilder) => {
            editBuilder.replace(selection, completion.data.choices[0].text);
            // console.log(completion.data.choices[0].text)
          });
          // Show a success message
          vscode.window.showInformationMessage("Code generated successfully.");
        }
      );
    } catch (err) {
      vscode.window.showErrorMessage(handleError(err));
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
    if (highlightedCode.length > 2000) {
      vscode.window.showErrorMessage(
        handleError(
          "_",
          "The maximum code length 2000 characters, reduce the length of the code"
        )
      );

      return;
    }
    const prompt =
      "Fix bugs in the below code" +
      highlightedCode +
      "in" +
      currentFileExtension;

    try {
      await vscode.window.withProgress(
        {
          location: vscode.ProgressLocation.Notification,
          title: "Debuging and Fixing Code",
          cancellable: false,
        },
        async (progress) => {
          progress.report({ increment: 0 });

          const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt,
            temperature: 1,
            max_tokens: 4097,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
          });

          editor.edit((editBuilder) => {
            editBuilder.replace(selection, completion.data.choices[0].text);
            // console.log(completion.data.choices[0].text)
          });
          // Show a success message
          vscode.window.showInformationMessage("Code fixed.");
        }
      );
    } catch (err) {
      vscode.window.showErrorMessage(handleError(err));
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
