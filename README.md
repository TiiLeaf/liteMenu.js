# liteMenu.js
liteMenu.js is a lightweight JavaScript library for creating GUI controllers to easily add interaction to your JavaScript project.

## Description
liteMenu.js is a lightweight JavaScript library for creating GUI controllers to easily add interaction to your JavaScript program. It prioritizes being simple to use and quick to implement into any project whenever the need for GUI or user interaction comes up. It's menus are highly customizable, support infinitely nested submenus / folders, and the inputs controls on each menu are easy to hook into the rest of your JavaScript code.

## Getting Started

### Installing
To use liteMenu.js in your project simply load `liteMenu.min.js` and `liteMenu.min.css` in your `<head>` tag using basic `script` and `link` tags. i.e. If you place the built source files from `/build/` directly into your project directory, then use:
```html
<script type="text/javascript" src="liteMenu.min.js"></script>
<link rel="stylesheet" href="liteMenu.min.css"/>
```

### Using
Get started with liteMenu.js by reading the [tutorial](/docs/tutorial.md) at `/docs/tutorial.md`. You will need to create an instance of the `MainMenu` class to begin. You can also use the [example](/example/) at `/example/` to see some of the methods in use.
```javascript
//example JavaScript that will create a very basic menu
var menu = new MainMenu();
menu.styling({'theme': 'card-dark'});
menu.addHeader('Example Menu', 'This is an example menu with a button in it.');
menu.addButton('Click Me!', ()=>{console.log('Button pressed!')});
```

## Repository Contents
```
├── build 	- Minified source ready to include in your project!
├── src 	- Source files.
├── example 	- An example html file which includes the library and creates a simple menu.
└── docs 	- Documentation.
```

## License
This project is licensed under the GNU GPLv3 license. See [LICENSE](LICENSE) for more information.

## Acknowledgments
Inspired by the want for a more customizable version of dataarts' amazing project [dat.gui](https://github.com/dataarts/dat.gui).
