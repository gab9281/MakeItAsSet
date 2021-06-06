class Cell {
    get characterData() {
        return this._characterData;
    }

    set selected(isSelected) {
        this._selected = isSelected;
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    get isInitialized() {
        return this._characterData !== undefined;
    }

    constructor(x, y, characterData) {
        console.assert(x >= 0, "width must be greater than 0");
        console.assert(y >= 0, "height must be greater than 0");

        this._x = x;
        this._y = y;
        this._characterData = characterData;
        this._selected = false;
    }

    draw(drawContext) {
        console.assert(drawContext instanceof DrawContext, "drawContext must be a DrawContext");

        if (this.isInitialized) {
            if (this._selected) {
                drawContext.drawBackground(this._x, this._y, this._characterData["color"]);
            }

            drawContext.drawPreview(this._x, this._y, this._characterData["thumbnail"]);
        }
    }
}