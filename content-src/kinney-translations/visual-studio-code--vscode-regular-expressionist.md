---
title: "بناء إضافة بعرض ويب"
---

لدينا بعض الشيفرة القالبية الجاهزة في مجلد `regular-expressionist` في مستودع `vscode-examples`. ومهمّتنا هي تشغيل عرض ويب (web view) لتحميل واجهة مستخدم مخصّصة.

سنجرّب ما يلي:

```javascript
function openRegularExpressionist(context) {
  const panel = vscode.window.createWebviewPanel(
    'regularExpressionist', // Identifies the type of the webview
    'Regular Expressionist', // Title of the panel
    vscode.ViewColumn.One, // Editor column to show the new webview panel in
    {
      enableScripts: true, // We want to enable JS in the webview
    },
  );

  // Set the HTML content for the webview
  panel.webview.html = getWebviewContent();

  // Listen for messages from the webview
  panel.webview.onDidReceiveMessage(
    (message) => {
      if (message.command === 'evaluateRegex') {
        const { pattern, text, flags } = message;
        const response = evaluateRegularExpression(pattern, text, flags);
        // Send the results back to the webview
        panel.webview.postMessage({ command: 'updateResult', data: response });
      }
    },
    undefined,
    context.subscriptions,
  );
}
```
