export class Section {
    constructor(renderer, selector) {
        this._items = []
        this._renderer = renderer
        this._container = document.querySelector(selector)
    }

    setItems = (items) => {
        this._items = items
    }

    addItem = (item) => {
        this._container.prepend(item)
    }

    render = () => {
        this._items.reverse().forEach(item => {
            this._renderer(item)
        })
    }
}