# LotJ Color Preview - VSCode Extension

This VSCode extension provides a live preview of color-coded text for the Legends of the Jedi (LotJ) MUD. It allows you to see how the text will appear in the game as you type, making it easier to create, edit, and visualize color codes in real-time.

## Installation

### 1. Download the Latest `.vsix` File

1. Go to the [Releases](https://github.com/your-repo/releases) section of this repository.
2. Download the latest `.vsix` file.

### 2. Install the Extension Manually

1. Open VSCode.
2. Navigate to the Extensions view by clicking on the Extensions icon in the Activity Bar on the side of the window or by pressing `Ctrl+Shift+X`.
3. Click on the three-dot menu in the Extensions view.
4. Select "Install from VSIX..." from the dropdown.
5. Locate the downloaded `.vsix` file and select it.
6. The extension will be installed.

### 3. Reload VSCode

After installing the extension, you need to reload VSCode for the extension to be activated. You can do this by:

- Closing and reopening VSCode, or
- Pressing `Ctrl+Shift+P` to open the Command Palette, typing `Reload Window`, and selecting the `Developer: Reload Window` option.

Once VSCode is reloaded, the extension will be ready for use.

## Usage

1. Open or create a text file containing LotJ color codes.
2. Run the command `LotJ Color Preview` from the command palette (`Ctrl+Shift+P`).
3. A new preview panel will open beside your text editor, displaying the color-coded text as it would appear in the Legends of the Jedi MUD.
4. The preview will update automatically as you type or modify the text in the active editor.

## Settings

- `lotjcolor.breakbetweenlines` (default: `true`):

  Controls whether a blank line break is inserted between lines of text. This can improve readability for those who prefer spaced-out text.

- `lotjcolor.displayfont` (default: `'Courier New', Courier, monospace`):

  Specifies the font family used in the preview panel.

- `lotjcolor.displayfontsize` (default: `0.8125`):

  Defines the font size in em units for the preview panel.

To modify these settings:

1. Open the settings in VSCode (Ctrl+,).
2. Search for "Lotj Color" to find the related settings.

## Supported Color Codes

The extension supports all LotJ color codes, including:

- `&001` to `&255` - Colors and highlights
- `&r`, `&g`, `&b`, `&p`, `&c`, `&w`, `&z` - Standard 16 color codes
- `&k` - Toggles highlighting
- `&I` - Italicizes text
- `&U` - Underlines text

## Credits

This extension is inspired by and based on the original LotJ Color Checker created by Xerakon. You can find the original tool at [LotJ Color Checker](https://xerakon.com/lotj/colorcheck.php).
