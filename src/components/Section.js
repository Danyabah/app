export class Section {
  constructor(object, containerSelector) {
    //this._items = object.items;
    this._renderer = object.renderer;
    this._container = document.querySelector(containerSelector);
  }
  render(data) {
    data.forEach((element) => {
      const card = this._renderer(element);
      this._container.append(card);
    });
  }
  addItem(htmlElement) {
    const card = this._renderer(htmlElement);
    this._container.prepend(card);
  }
}
