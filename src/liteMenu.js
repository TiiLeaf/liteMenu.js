class Menu {
  constructor() {
      document.body.appendChild(this.rootElt = this.initRoot());
      this.listElt = this.rootElt.firstChild;
  }

  initRoot() {
    let elt = createElt('div', 'menu');
    elt.append(createElt('ul', 'menuList'));
    return elt;
  }

  removeItem(index) {
    this.listElt.removeChild(this.listElt.childNodes[index]);
  }

  clear() {
    while (this.listElt.firstChild)
      this.listElt.removeChild(this.listElt.firstChild);
  }

  setIndex(index) {
    let elt = this.listElt.lastChild;
    this.listElt.insertBefore(elt, this.listElt.childNodes[index]);
  }

  setInputWidth(w, newLine) {
    this.listElt.lastChild.lastChild.style.width = w;
    if (newLine) {
      let fontHeight = getComputedStyle(document.documentElement).getPropertyValue('--m-font-size');
      let inputHeight = getComputedStyle(document.documentElement).getPropertyValue('--m-input-size');
      this.listElt.lastChild.style.height = (parseInt(fontHeight) + parseInt(inputHeight)) + "px";
    }
  }

  getInputValues() {
    let values = [];
    for (let i = 0; i < this.listElt.childNodes.length; i++) {
      if (this.listElt.childNodes[i].classList[1].includes("Container")) {
        values.push(this.listElt.childNodes[i].childNodes[1].value);
      }
    }
    return values;
  }

  setInputValues(values) {
    let j = 0;
    for (let i = 0; i < this.listElt.childNodes.length; i++) {
      if (this.listElt.childNodes[i].classList[1].includes("Container")) {
        this.listElt.childNodes[i].childNodes[1].value = values[j];
        j += 1;
      }
    }
  }

  getInputValue(index) {
    let j = 0;
    for (let i = 0; i < this.listElt.childNodes.length; i++) {
      if (this.listElt.childNodes[i].classList[1].includes("Container")) {
        if (j == index)
          return this.listElt.childNodes[i].childNodes[1].value;
        j += 1;
      }
    }
  }

  setInputValue(index, value) {
    let j = 0;
    for (let i = 0; i < this.listElt.childNodes.length; i++) {
      if (this.listElt.childNodes[i].classList[1].includes("Container")) {
        if (j == index)
          this.listElt.childNodes[i].childNodes[1].value = value;
        j += 1;
      }
    }
  }

  addHeader(title, subtitle) {
    let elt = createElt('div', 'menuHeader');
    let h1 = createElt('h1', 'menuTitle', title);
    elt.append(h1);

    if (subtitle) {
      let h2 = createElt('h2', 'menuSubtitle', subtitle);
      elt.append(h2);
    }

    this.rootElt.prepend(elt);
  }

  addSeparator(text) {
    let elt = createElt('li', ['menuItem', 'menuSeparator'], text);
    if (!text) {
      elt.innerHTML += "<br>";
      elt.style.padding = "0px";
    }

    elt.appendChild(createElt('div', 'menuSeparatorLine'));
    this.listElt.append(elt);
  }

  addButton(text, func) {
    let elt = createElt('li', ['menuItem', 'menuButton'], text);
    elt.onclick = func;
    this.listElt.append(elt);
  }

  addLabel(text) {
    let elt = createElt('li', ['menuItem', 'menuLabel'], text);
    this.listElt.append(elt);
  }

  addDropdown(text, options, func) {
    let elt = createElt('li', ['menuItem', 'menuDropdownContainer'], text);
    let select = createElt('select', 'menuDropdown');
    for (let i = 0; i < options.length; i++) {
      select.append(createElt('option', 'menuDropdownOption', options[i]));
    }

    select.onchange = func;

    elt.append(select);
    this.listElt.append(elt);
  }

  addSlider(text, min, max, step, value, func, readout = false) {
    let elt = createElt('li', ['menuItem', 'menuSliderContainer'], text);
    let slider = createElt('input', 'menuSlider');
    slider.setAttribute('type', 'range');
    slider.setAttribute('min', min);
    slider.setAttribute('max', max);
    slider.setAttribute('step', step);
    slider.setAttribute('value', value);

    if (!readout) {
      slider.onchange = func;
    } else {
      slider.onchange = (e) => {updateReadout(e, text, func)};
    }

    elt.append(slider);
    this.listElt.append(elt);
  }

  addInput(text, func) {
    let elt = createElt('li', ['menuItem', 'menuInputContainer'], text);
    let input = createElt('input', 'menuInput');
    input.placeholder = "Type Here...";
    input.onchange = func;

    elt.append(input);
    this.listElt.append(elt);
  }

  addColorPicker(text, value, func) {
    let elt = createElt('li', ['menuItem', 'menuColorPickerContainer'], text);
    let picker = createElt('input', 'menuColorPicker');
    picker.setAttribute('type', 'color');
    picker.setAttribute('value', value);
    picker.onchange = func;

    elt.append(picker);
    this.listElt.append(elt);
  }

  addLink(text, submenu) {
    let elt = createElt('li', ['menuItem', 'menuButton'], text);
    elt.append(createElt('div', 'menuLinkDecor', "&#10095;"));
    elt.onclick = () => {this.openSubmenu(submenu)};
    this.listElt.append(elt);
  }
}

class MainMenu extends Menu {
  constructor(options) {
    super();
  }

  styling(styleOptions) {
    let style = document.documentElement.style;

    if (styleOptions.hasOwnProperty('theme')) {
      switch (styleOptions.theme) {
        case "card-dark":
          this.styling({
            'position': 'top-left',
            'offset-x': '10px',
            'offset-y': '10px',
            'width': '275px',

            'cell-spacing': '8px',
            'padding': '8px 0px 8px 0px',
            'input-size': '18px',

            'bg-color': '#181818',
            'text-color': 'white',
            'fg-color': '#AAAAAA',
            'slider-color': '#005086',
            'header-color': '#AAAAAA',
            'highlight-color': 'rgba(255, 255, 255, 0.25)',

            'font': "'Roboto', sans-serif",
            'font-size': '16px',
            'header-align': 'left',
            'separator-align': 'right',
            'link-decoration': 'visible',
            'border': 'none',
            'border-radius': '8px',
            'shadow': '4px 4px 5px #666'
          });
          break;
          case "card-light":
            this.styling({
              'position': 'top-left',
              'offset-x': '10px',
              'offset-y': '10px',
              'width': '275px',

              'cell-spacing': '8px',
              'padding': '8px 0px 8px 0px',
              'input-size': '18px',

              'bg-color': '#ECEFF1',
              'text-color': '#263238',
              'fg-color': '#78909C',
              'slider-color': '#546E7A',
              'header-color': '#78909C',
              'highlight-color': 'rgba(84, 110, 122, 0.25)',

              'font': "'Roboto', sans-serif",
              'font-size': '1em',
              'header-align': 'left',
              'separator-align': 'right',
              'link-decoration': 'visible',

              'border': 'none',
              'border-radius': '8px',
              'shadow': '4px 4px 5px #777'
            });
            break;
        default:
          this.styling({
            'offset-x': '0px',
            'offset-y': '0px',
            'width': '250px',

            'cell-spacing': '2px 0px 2px 0px',
            'padding': '2px 10px 10px 10px',
            'input-size': '18px',

            'bg-color': 'black',
            'text-color': 'white',
            'fg-color': 'white',
            'slider-color': '#005086',
            'header-color': 'white',
            'highlight-color': 'rgba(255, 255, 255, 0.25)',

            'font': 'sans-serif',
            'font-size': '1em',
            'header-align': 'center',
            'separator-align': 'center',
            'link-decoration': 'visible',

            'border': 'none',
            'border-radius': '0px',
            'shadow': 'none'
          });
      }
    }

    for (let key in styleOptions) {
      if (key == 'position' || key == 'theme')
        continue;
      style.setProperty('--m-'+key, styleOptions[key]);
    }

    if (styleOptions.position == 'top-left') {
      style.setProperty('--m-top', '0px');
      style.setProperty('--m-bottom', 'auto');
      style.setProperty('--m-left', '0px');
      style.setProperty('--m-right', 'auto');
    } else if (styleOptions.position == 'bottom-left') {
      style.setProperty('--m-top', 'auto');
      style.setProperty('--m-bottom', '0px');
      style.setProperty('--m-left', '0px');
      style.setProperty('--m-right', 'auto');
    } else if (styleOptions.position == 'bottom-right') {
      style.setProperty('--m-top', 'auto');
      style.setProperty('--m-bottom', '0px');
      style.setProperty('--m-left', 'auto');
      style.setProperty('--m-right', '0px');
    } else if (styleOptions.position == 'center') {
      style.setProperty('--m-top', '50%');
      style.setProperty('--m-bottom', 'auto');
      style.setProperty('--m-left', '50%');
      style.setProperty('--m-right', 'auto');
      style.setProperty('--m-offset-x', '-50%');
      style.setProperty('--m-offset-y', '-50%');
    } else if (styleOptions.position) {
      style.setProperty('--m-top', '0px');
      style.setProperty('--m-bottom', 'auto');
      style.setProperty('--m-left', 'auto');
      style.setProperty('--m-right', '0px');
    }
  }

  openSubmenu(submenu) {
    this.hide();
    submenu.rootElt.style.display = 'block';
  }

  hide() {
    let menus = document.getElementsByClassName('menu');
    for (let i = 0; i < menus.length; i++) {
      menus[i].style.display = "none";
    }
  }

  show() {
    this.rootElt.style.display = 'block';
  }
}

class SubMenu extends Menu {
  constructor(mainMenu) {
    super();
    this.rootElt.style.display = "none";
    this.mainMenu = mainMenu;
  }

  copyHeader() {
    let elt = this.mainMenu.rootElt.firstChild.cloneNode(true);
    this.rootElt.prepend(elt);
  }

  openSubmenu(submenu) {
    this.mainMenu.hide();
    submenu.rootElt.style.display = 'block';
  }
}

function updateReadout(e, text, func) {
  e.target.parentNode.firstChild.innerHTML = text + " (" + e.target.value + ")";
  if (func)
    func(e);
}

function createElt(type, classes = null, text = null) {
  let elt = document.createElement(type);

  if (classes && typeof classes == 'object') {
    for (let i = 0; i < classes.length; i++) {
      elt.classList.add(classes[i]);
    }
  } else {
    elt.className += classes;
  }

  if (text)
    elt.innerHTML = "<span>" + text + "</span>";
  return elt;
}
