class DrawContext {
    SIZE = {
        x: 1280,
        y: 720
    };

    NUMBER_OF_CELLS = {
        x: 16,
        y: 9
    };

    get size() {
        return this.SIZE;
    }

    get numberOfCells() {
        return this.NUMBER_OF_CELLS;
    }

    get cellSize() {
        return this._cellSize;
    }

    constructor(canvasHTMLElement) {
        this._htmlElement = canvasHTMLElement;
        this._htmlElement.width = this.SIZE.x;
        this._htmlElement.height = this.SIZE.y;

        this._images = [];

        this._cellSize = {
            x: Math.floor(this.SIZE.x / this.NUMBER_OF_CELLS.x),
            y: Math.floor(this.SIZE.y / this.NUMBER_OF_CELLS.y)
        };

        this._context = this._htmlElement.getContext("2d");
    }

    clear() {
        this._context.fillStyle = "#FFFFFF";
        this._context.fillRect(0, 0, this._htmlElement.width, this._htmlElement.height);
    }

    drawText(text, x, y, color) {
        console.assert(text !== undefined, "text must exist");
        console.assert(x >= 0 && x < this.NUMBER_OF_CELLS.x, "x is out of range");
        console.assert(y >= 0 && y < this.NUMBER_OF_CELLS.y, "y is out of range");
        console.assert(/^#[0-9A-F]{6}$/i.test(color), "color must be a valid HEX color");

        let indexOfWord = 0;
        for (const partOfText of text.split("\n")) {
            this._context.textBaseline = 'middle';
            this._context.textAlign = "center";
            this._context.fillStyle = color;
            this._context.strokeStyle = color;
            this._context.font = "72px Cocogoose";

            this._context.strokeText(partOfText, this._cellSize.x * x, this._cellSize.y * y + 75 * indexOfWord);
            this._context.fillText(partOfText, this._cellSize.x * x, this._cellSize.y * y + 75 * indexOfWord);

            indexOfWord++;
        }
    }

    drawBackground(x, y, color) {
        console.assert(x >= 0 && x < this.NUMBER_OF_CELLS.x, "x is out of range");
        console.assert(y >= 0 && y < this.NUMBER_OF_CELLS.y, "y is out of range");
        console.assert(/^#[0-9A-F]{6}$/i.test(color), "color must be a valid HEX color");

        this._context.strokeStyle = color;
        this._context.beginPath();
        this._context.rect(this._cellSize.x * x, this._cellSize.y * y, this._cellSize.x, this._cellSize.y);
        this._context.fill();
    }

    drawPreview(x, y, imagePath) {
        console.assert(x >= 0 && x < this.NUMBER_OF_CELLS.x, "x is out of range");
        console.assert(y >= 0 && y < this.NUMBER_OF_CELLS.y, "y is out of range");

        if (imagePath !== undefined) {
            this.drawImage(imagePath, x, y, 1, 1);
        }

        this._context.strokeStyle = "#424242";
        this._context.beginPath();
        this._context.rect(this._cellSize.x * x, this._cellSize.y * y, this._cellSize.x, this._cellSize.y);
        this._context.stroke();
    }

    drawImage(imagePath, x, y, cellsInX, cellsInY) {
        console.assert(x >= 0 && x < this.NUMBER_OF_CELLS.x, "x is out of range");
        console.assert(y >= 0 && y < this.NUMBER_OF_CELLS.y, "y is out of range");
        console.assert(cellsInX > 0 && cellsInX <= this.NUMBER_OF_CELLS.y, "cellsInX is out of range");
        console.assert(cellsInY > 0 && cellsInY <= this.NUMBER_OF_CELLS.y, "cellsInY is out of range");
        console.assert(imagePath !== undefined, "imagePath must be specified");

        if (this._images[imagePath] === undefined) {
            const image = new Image();
            image.onload = () => {
                this._context.drawImage(image, this._cellSize.x * x, this._cellSize.y * y, this._cellSize.x * cellsInX, this._cellSize.y * cellsInY);
            };
            image.src = imagePath;
            this._images[imagePath] = image;
        } else {
            this._context.drawImage(this._images[imagePath], this._cellSize.x * x, this._cellSize.y * y, this._cellSize.x * cellsInX, this._cellSize.y * cellsInY);
        }
    }
}