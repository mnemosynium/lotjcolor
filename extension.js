const vscode = require("vscode");

function activate(context) {
  let panel = null;

  let disposable = vscode.commands.registerCommand(
    "extension.lotjColor",
    function () {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        return;
      }

      if (!panel) {
        panel = vscode.window.createWebviewPanel(
          "lotjColorPreview",
          "LotJ Color Preview",
          vscode.ViewColumn.Beside,
          {
            enableScripts: true,
          }
        );

        panel.onDidDispose(
          () => {
            panel = null;
          },
          null,
          context.subscriptions
        );
      }

      updatePreview(editor.document.getText(), panel);

      vscode.workspace.onDidChangeTextDocument((event) => {
        if (event.document === editor.document) {
          updatePreview(editor.document.getText(), panel);
        }
      });

      vscode.window.onDidChangeTextEditorSelection((event) => {
        if (event.textEditor === editor) {
          updatePreview(editor.document.getText(), panel);
        }
      });
    }
  );

  context.subscriptions.push(disposable);
}

function updatePreview(fullText, panel) {
  const colorMapping = {
    "&001": { color: "#800000", highlight: "#ff0000" },
    "&002": { color: "#008000", highlight: "#00ff00" },
    "&003": { color: "#808000", highlight: "#ffff00" },
    "&004": { color: "#000080", highlight: "#0000ff" },
    "&005": { color: "#800080", highlight: "#ff00ff" },
    "&006": { color: "#008080", highlight: "#00ffff" },
    "&007": { color: "#c0c0c0", highlight: "#00ffff" },
    "&008": { color: "#808080", highlight: "#ffffff" },
    "&009": { color: "#ff0000", highlight: "#ffff00" },
    "&010": { color: "#00ff00", highlight: "#ffff00" },
    "&011": { color: "#ffff00", highlight: "#ff0000" },
    "&012": { color: "#0000ff", highlight: "#00ffff" },
    "&013": { color: "#ff00ff", highlight: "#ffffff" },
    "&014": { color: "#00ffff", highlight: "#ffffff" },
    "&015": { color: "#ffffff", highlight: "#00ffff" },
    "&016": { color: "#000000", highlight: "#ffffff" },
    "&017": { color: "#00005f", highlight: "#ffffd7" },
    "&018": { color: "#000087", highlight: "#ffffaf" },
    "&019": { color: "#0000af", highlight: "#ffff87" },
    "&020": { color: "#0000d7", highlight: "#ffff5f" },
    "&021": { color: "#0000ff", highlight: "#ffff00" },
    "&022": { color: "#005f00", highlight: "#ffd7ff" },
    "&023": { color: "#005f5f", highlight: "#ffd7d7" },
    "&024": { color: "#005f87", highlight: "#ffd7af" },
    "&025": { color: "#005faf", highlight: "#ffd787" },
    "&026": { color: "#005fd7", highlight: "#ffd75f" },
    "&027": { color: "#005fff", highlight: "#ffd700" },
    "&028": { color: "#008700", highlight: "#ffafff" },
    "&029": { color: "#00875f", highlight: "#ffafd7" },
    "&030": { color: "#008787", highlight: "#ffafaf" },
    "&031": { color: "#0087af", highlight: "#ffaf87" },
    "&032": { color: "#0087d7", highlight: "#ffaf5f" },
    "&033": { color: "#0087ff", highlight: "#ffaf00" },
    "&034": { color: "#00af00", highlight: "#ff87ff" },
    "&035": { color: "#00af5f", highlight: "#ff87d7" },
    "&036": { color: "#00af87", highlight: "#ff87af" },
    "&037": { color: "#00afaf", highlight: "#ff8787" },
    "&038": { color: "#00afd7", highlight: "#ff875f" },
    "&039": { color: "#00afff", highlight: "#ff8700" },
    "&040": { color: "#00d700", highlight: "#ff5fff" },
    "&041": { color: "#00d75f", highlight: "#ff5fd7" },
    "&042": { color: "#00d787", highlight: "#ff5faf" },
    "&043": { color: "#00d7af", highlight: "#ff5f87" },
    "&044": { color: "#00d7d7", highlight: "#ff5f5f" },
    "&045": { color: "#00d7ff", highlight: "#ff5f00" },
    "&046": { color: "#00ff00", highlight: "#ff00ff" },
    "&047": { color: "#00ff5f", highlight: "#ff00d7" },
    "&048": { color: "#00ff87", highlight: "#ff00af" },
    "&049": { color: "#00ffaf", highlight: "#ff0087" },
    "&050": { color: "#00ffd7", highlight: "#ff005f" },
    "&051": { color: "#00ffff", highlight: "#ff0000" },
    "&052": { color: "#5f0000", highlight: "#d7ffff" },
    "&053": { color: "#5f005f", highlight: "#d7ffd7" },
    "&054": { color: "#5f0087", highlight: "#d7ffaf" },
    "&055": { color: "#5f00af", highlight: "#d7ff87" },
    "&056": { color: "#5f00d7", highlight: "#d7ff5f" },
    "&057": { color: "#5f00ff", highlight: "#d7ff00" },
    "&058": { color: "#5f5f00", highlight: "#d7d7ff" },
    "&059": { color: "#5f5f5f", highlight: "#d7d7d7" },
    "&060": { color: "#5f5f87", highlight: "#d7d7af" },
    "&061": { color: "#5f5faf", highlight: "#d7d787" },
    "&062": { color: "#5f5fd7", highlight: "#d7d75f" },
    "&063": { color: "#5f5fff", highlight: "#d7d700" },
    "&064": { color: "#5f8700", highlight: "#d7afff" },
    "&065": { color: "#5f875f", highlight: "#d7afd7" },
    "&066": { color: "#5f8787", highlight: "#d7afaf" },
    "&067": { color: "#5f87af", highlight: "#d7af87" },
    "&068": { color: "#5f87d7", highlight: "#d7af5f" },
    "&069": { color: "#5f87ff", highlight: "#d7af00" },
    "&070": { color: "#5faf00", highlight: "#d787ff" },
    "&071": { color: "#5faf5f", highlight: "#d787d7" },
    "&072": { color: "#5faf87", highlight: "#d787af" },
    "&073": { color: "#5fafaf", highlight: "#d78787" },
    "&074": { color: "#5fafd7", highlight: "#d7875f" },
    "&075": { color: "#5fafff", highlight: "#d78700" },
    "&076": { color: "#5fd700", highlight: "#d75fff" },
    "&077": { color: "#5fd75f", highlight: "#d75fd7" },
    "&078": { color: "#5fd787", highlight: "#d75faf" },
    "&079": { color: "#5fd7af", highlight: "#d75f87" },
    "&080": { color: "#5fd7d7", highlight: "#d75f5f" },
    "&081": { color: "#5fd7ff", highlight: "#d75f00" },
    "&082": { color: "#5fff00", highlight: "#d700ff" },
    "&083": { color: "#5fff5f", highlight: "#d700d7" },
    "&084": { color: "#5fff87", highlight: "#d700af" },
    "&085": { color: "#5fffaf", highlight: "#d70087" },
    "&086": { color: "#5fffd7", highlight: "#d7005f" },
    "&087": { color: "#5fffff", highlight: "#d70000" },
    "&088": { color: "#870000", highlight: "#afffff" },
    "&089": { color: "#87005f", highlight: "#afffd7" },
    "&090": { color: "#870087", highlight: "#afffaf" },
    "&091": { color: "#8700af", highlight: "#afff87" },
    "&092": { color: "#8700d7", highlight: "#afff5f" },
    "&093": { color: "#8700ff", highlight: "#afff00" },
    "&094": { color: "#875f00", highlight: "#afd7ff" },
    "&095": { color: "#875f5f", highlight: "#afd7d7" },
    "&096": { color: "#875f87", highlight: "#afd7af" },
    "&097": { color: "#875faf", highlight: "#afd787" },
    "&098": { color: "#875fd7", highlight: "#afd75f" },
    "&099": { color: "#875fff", highlight: "#afd700" },
    "&100": { color: "#878700", highlight: "#afafff" },
    "&101": { color: "#87875f", highlight: "#afafd7" },
    "&102": { color: "#878787", highlight: "#afafaf" },
    "&103": { color: "#8787af", highlight: "#afaf87" },
    "&104": { color: "#8787d7", highlight: "#afaf5f" },
    "&105": { color: "#8787ff", highlight: "#afaf00" },
    "&106": { color: "#87af00", highlight: "#af87ff" },
    "&107": { color: "#87af5f", highlight: "#af87d7" },
    "&108": { color: "#87af87", highlight: "#af87af" },
    "&109": { color: "#87afaf", highlight: "#af8787" },
    "&110": { color: "#87afd7", highlight: "#af875f" },
    "&111": { color: "#87afff", highlight: "#af8700" },
    "&112": { color: "#87d700", highlight: "#af5fff" },
    "&113": { color: "#87d75f", highlight: "#af5fd7" },
    "&114": { color: "#87d787", highlight: "#af5faf" },
    "&115": { color: "#87d7af", highlight: "#af5f87" },
    "&116": { color: "#87d7d7", highlight: "#af5f5f" },
    "&117": { color: "#87d7ff", highlight: "#af5f00" },
    "&118": { color: "#87ff00", highlight: "#af00ff" },
    "&119": { color: "#87ff5f", highlight: "#af00d7" },
    "&120": { color: "#87ff87", highlight: "#af00af" },
    "&121": { color: "#87ffaf", highlight: "#af0087" },
    "&122": { color: "#87ffd7", highlight: "#af005f" },
    "&123": { color: "#87ffff", highlight: "#af0000" },
    "&124": { color: "#af0000", highlight: "#87ffff" },
    "&125": { color: "#af005f", highlight: "#87ffd7" },
    "&126": { color: "#af0087", highlight: "#87ffaf" },
    "&127": { color: "#af00af", highlight: "#87ff87" },
    "&128": { color: "#af00d7", highlight: "#87ff5f" },
    "&129": { color: "#af00ff", highlight: "#87ff00" },
    "&130": { color: "#af5f00", highlight: "#87d7ff" },
    "&131": { color: "#af5f5f", highlight: "#87d7d7" },
    "&132": { color: "#af5f87", highlight: "#87d7af" },
    "&133": { color: "#af5faf", highlight: "#87d787" },
    "&134": { color: "#af5fd7", highlight: "#87d75f" },
    "&135": { color: "#af5fff", highlight: "#87d700" },
    "&136": { color: "#af8700", highlight: "#87afff" },
    "&137": { color: "#af875f", highlight: "#87afd7" },
    "&138": { color: "#af8787", highlight: "#87afaf" },
    "&139": { color: "#af87af", highlight: "#87af87" },
    "&140": { color: "#af87d7", highlight: "#87af5f" },
    "&141": { color: "#af87ff", highlight: "#87af00" },
    "&142": { color: "#afaf00", highlight: "#8787ff" },
    "&143": { color: "#afaf5f", highlight: "#8787d7" },
    "&144": { color: "#afaf87", highlight: "#8787af" },
    "&145": { color: "#afafaf", highlight: "#878787" },
    "&146": { color: "#afafd7", highlight: "#87875f" },
    "&147": { color: "#afafff", highlight: "#878700" },
    "&148": { color: "#afd700", highlight: "#875fff" },
    "&149": { color: "#afd75f", highlight: "#875fd7" },
    "&150": { color: "#afd787", highlight: "#875faf" },
    "&151": { color: "#afd7af", highlight: "#875f87" },
    "&152": { color: "#afd7d7", highlight: "#875f5f" },
    "&153": { color: "#afd7ff", highlight: "#875f00" },
    "&154": { color: "#afff00", highlight: "#8700ff" },
    "&155": { color: "#afff5f", highlight: "#8700d7" },
    "&156": { color: "#afff87", highlight: "#8700af" },
    "&157": { color: "#afffaf", highlight: "#870087" },
    "&158": { color: "#afffd7", highlight: "#87005f" },
    "&159": { color: "#afffff", highlight: "#870000" },
    "&160": { color: "#d70000", highlight: "#5fffff" },
    "&161": { color: "#d7005f", highlight: "#5fffd7" },
    "&162": { color: "#d70087", highlight: "#5fffaf" },
    "&163": { color: "#d700af", highlight: "#5fff87" },
    "&164": { color: "#d700d7", highlight: "#5fff5f" },
    "&165": { color: "#d700ff", highlight: "#5fff00" },
    "&166": { color: "#d75f00", highlight: "#5fd7ff" },
    "&167": { color: "#d75f5f", highlight: "#5fd7d7" },
    "&168": { color: "#d75f87", highlight: "#5fd7af" },
    "&169": { color: "#d75faf", highlight: "#5fd787" },
    "&170": { color: "#d75fd7", highlight: "#5fd75f" },
    "&171": { color: "#d75fff", highlight: "#5fd700" },
    "&172": { color: "#d78700", highlight: "#5fafff" },
    "&173": { color: "#d7875f", highlight: "#5fafd7" },
    "&174": { color: "#d78787", highlight: "#5fafaf" },
    "&175": { color: "#d787af", highlight: "#5faf87" },
    "&176": { color: "#d787d7", highlight: "#5faf5f" },
    "&177": { color: "#d787ff", highlight: "#5faf00" },
    "&178": { color: "#d7af00", highlight: "#5f87ff" },
    "&179": { color: "#d7af5f", highlight: "#5f87d7" },
    "&180": { color: "#d7af87", highlight: "#5f87af" },
    "&181": { color: "#d7afaf", highlight: "#5f8787" },
    "&182": { color: "#d7afd7", highlight: "#5f875f" },
    "&183": { color: "#d7afff", highlight: "#5f8700" },
    "&184": { color: "#d7d700", highlight: "#5f5fff" },
    "&185": { color: "#d7d75f", highlight: "#5f5fd7" },
    "&186": { color: "#d7d787", highlight: "#5f5faf" },
    "&187": { color: "#d7d7af", highlight: "#5f5f87" },
    "&188": { color: "#d7d7d7", highlight: "#5f5f5f" },
    "&189": { color: "#d7d7ff", highlight: "#5f5f00" },
    "&190": { color: "#d7ff00", highlight: "#5f00ff" },
    "&191": { color: "#d7ff5f", highlight: "#5f00d7" },
    "&192": { color: "#d7ff87", highlight: "#5f00af" },
    "&193": { color: "#d7ffaf", highlight: "#5f0087" },
    "&194": { color: "#d7ffd7", highlight: "#5f005f" },
    "&195": { color: "#d7ffff", highlight: "#5f0000" },
    "&196": { color: "#ff0000", highlight: "#00ffff" },
    "&197": { color: "#ff005f", highlight: "#00ffd7" },
    "&198": { color: "#ff0087", highlight: "#00ffaf" },
    "&199": { color: "#ff00af", highlight: "#00ff87" },
    "&200": { color: "#ff00d7", highlight: "#00ff5f" },
    "&201": { color: "#ff00ff", highlight: "#00ff00" },
    "&202": { color: "#ff5f00", highlight: "#00d7ff" },
    "&203": { color: "#ff5f5f", highlight: "#00d7d7" },
    "&204": { color: "#ff5f87", highlight: "#00d7af" },
    "&205": { color: "#ff5faf", highlight: "#00d787" },
    "&206": { color: "#ff5fd7", highlight: "#00d75f" },
    "&207": { color: "#ff5fff", highlight: "#00d700" },
    "&208": { color: "#ff8700", highlight: "#00afff" },
    "&209": { color: "#ff875f", highlight: "#00afd7" },
    "&210": { color: "#ff8787", highlight: "#00afaf" },
    "&211": { color: "#ff87af", highlight: "#00af87" },
    "&212": { color: "#ff87d7", highlight: "#00af5f" },
    "&213": { color: "#ff87ff", highlight: "#00af00" },
    "&214": { color: "#ffaf00", highlight: "#0087ff" },
    "&215": { color: "#ffaf5f", highlight: "#0087d7" },
    "&216": { color: "#ffaf87", highlight: "#0087af" },
    "&217": { color: "#ffafaf", highlight: "#008787" },
    "&218": { color: "#ffafd7", highlight: "#00875f" },
    "&219": { color: "#ffafff", highlight: "#008700" },
    "&220": { color: "#ffd700", highlight: "#005fff" },
    "&221": { color: "#ffd75f", highlight: "#005fd7" },
    "&222": { color: "#ffd787", highlight: "#005faf" },
    "&223": { color: "#ffd7af", highlight: "#005f87" },
    "&224": { color: "#ffd7d7", highlight: "#005f5f" },
    "&225": { color: "#ffd7ff", highlight: "#005f00" },
    "&226": { color: "#ffff00", highlight: "#0000ff" },
    "&227": { color: "#ffff5f", highlight: "#0000d7" },
    "&228": { color: "#ffff87", highlight: "#0000af" },
    "&229": { color: "#ffffaf", highlight: "#000087" },
    "&230": { color: "#ffffd7", highlight: "#00005f" },
    "&231": { color: "#ffffff", highlight: "#000000" },
    "&232": { color: "#080808", highlight: "#c0c0c0" },
    "&233": { color: "#121212", highlight: "#c0c0c0" },
    "&234": { color: "#1c1c1c", highlight: "#c0c0c0" },
    "&235": { color: "#262626", highlight: "#c0c0c0" },
    "&236": { color: "#303030", highlight: "#c0c0c0" },
    "&237": { color: "#3a3a3a", highlight: "#c0c0c0" },
    "&238": { color: "#444444", highlight: "#c0c0c0" },
    "&239": { color: "#4e4e4e", highlight: "#c0c0c0" },
    "&240": { color: "#585858", highlight: "#c0c0c0" },
    "&241": { color: "#626262", highlight: "#c0c0c0" },
    "&242": { color: "#6c6c6c", highlight: "#c0c0c0" },
    "&243": { color: "#767676", highlight: "#c0c0c0" },
    "&244": { color: "#808080", highlight: "#c0c0c0" },
    "&245": { color: "#8a8a8a", highlight: "#c0c0c0" },
    "&246": { color: "#949494", highlight: "#c0c0c0" },
    "&247": { color: "#9e9e9e", highlight: "#c0c0c0" },
    "&248": { color: "#a8a8a8", highlight: "#c0c0c0" },
    "&249": { color: "#b2b2b2", highlight: "#c0c0c0" },
    "&250": { color: "#bcbcbc", highlight: "#c0c0c0" },
    "&251": { color: "#c6c6c6", highlight: "#c0c0c0" },
    "&252": { color: "#d0d0d0", highlight: "#c0c0c0" },
    "&253": { color: "#dadada", highlight: "#c0c0c0" },
    "&254": { color: "#e4e4e4", highlight: "#c0c0c0" },
    "&255": { color: "#eeeeee", highlight: "#c0c0c0" },
    "&r": { color: "#800000", highlight: "#ff0000" },
    "&g": { color: "#008000", highlight: "#00ff00" },
    "&O": { color: "#808000", highlight: "#ffff00" },
    "&b": { color: "#000080", highlight: "#0000ff" },
    "&p": { color: "#800080", highlight: "#ff00ff" },
    "&c": { color: "#008080", highlight: "#00ffff" },
    "&w": { color: "#c0c0c0", highlight: "#00ffff" },
    "&z": { color: "#808080", highlight: "#ffffff" },
    "&R": { color: "#ff0000", highlight: "#ffff00" },
    "&G": { color: "#00ff00", highlight: "#ffff00" },
    "&Y": { color: "#ffff00", highlight: "#ff0000" },
    "&B": { color: "#0000ff", highlight: "#00ffff" },
    "&P": { color: "#ff00ff", highlight: "#ffffff" },
    "&C": { color: "#00ffff", highlight: "#ffffff" },
    "&W": { color: "#ffffff", highlight: "#00ffff" },
    "&D": { color: "#c0c0c0", highlight: "#00ffff" },
  };

  const defaultStyle = {
    color: "#c0c0c0",
    isItalic: false,
    isUnderline: false,
    isHighlighted: false,
  };

  let currentStyle = { ...defaultStyle };
  let lastColorCode = null;
  let formattedText = "";

  const lines = fullText.split("\n");

  lines.forEach((line) => {
    const segments = line.split(/(&\d{3}|&[rgObpcwzRGYBPWCkDIUw])/g);

    segments.forEach((segment) => {
      if (segment in colorMapping) {
        currentStyle.color = colorMapping[segment].color;
        lastColorCode = segment;
        currentStyle.isItalic = false;
        currentStyle.isUnderline = false;
        currentStyle.isHighlighted = false;
      } else if (segment === "&k") {
        currentStyle.isHighlighted = !currentStyle.isHighlighted;
        currentStyle.color =
          currentStyle.isHighlighted && lastColorCode
            ? colorMapping[lastColorCode].highlight
            : lastColorCode
            ? colorMapping[lastColorCode].color
            : defaultStyle.color;
      } else if (segment === "&I") {
        currentStyle.isItalic = true;
      } else if (segment === "&U") {
        currentStyle.isUnderline = true;
      } else if (segment === "&w" || segment === "&D") {
        currentStyle = { ...defaultStyle };
        lastColorCode = null;
      } else {
        formattedText += `<span style="color: ${currentStyle.color};${
          currentStyle.isItalic ? "font-style: italic;" : ""
        }${
          currentStyle.isUnderline ? "text-decoration: underline;" : ""
        }">${segment}</span>`;
      }
    });

    formattedText += `<br>`;
  });

  panel.webview.html = `
    <html>
      <body style="font-family: 'Courier New', Courier, monospace; white-space: pre;">
        ${formattedText}
      </body>
    </html>
  `;
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
