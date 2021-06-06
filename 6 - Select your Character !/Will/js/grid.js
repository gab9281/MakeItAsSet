class Grid {
    COLUMNS_FOR_PREVIEW = {
        min: 5,
        max: 10
    };

    set cursorPosition(position) {
        console.assert(position.x && position.x >= 0, "x is out of range");
        console.assert(position.y && position.y >= 0, "y is out of range");

        this._cursorPosition = position;
    }

    constructor(size, numberOfCells, cellSize) {
        console.assert(size !== undefined && size.x !== undefined && size.y !== undefined);
        console.assert(numberOfCells !== undefined && numberOfCells.x !== undefined && numberOfCells.y !== undefined);
        console.assert(cellSize !== undefined && cellSize.x !== undefined && cellSize.y !== undefined);

        this._size = size;
        this._numberOfCells = numberOfCells;
        this._cellSize = cellSize;

        this._lastCellSelected = null;

        this._internalGrid = [];
        this._initInternalGrid();
    }

    _initInternalGrid() {
        let currentCharacterIndex = 0;
        for (let i = 0; i < this._numberOfCells.x; i++ ) {
            this._internalGrid.push([]);

            this._internalGrid[i].length = this._numberOfCells.y;
            for (let j = 0; j < this._numberOfCells.y; j++) {
                if ((i < this.COLUMNS_FOR_PREVIEW.min || i > this.COLUMNS_FOR_PREVIEW.max) && currentCharacterIndex < characterData.length) {
                    this._internalGrid[i][j] = new Cell(i, j, characterData[currentCharacterIndex]);
                    ++currentCharacterIndex;
                } else {
                    this._internalGrid[i][j] = new Cell(i, j);
                }
            }
        }
    }

    _cellAtCursor() {
        if (this._cursorPosition === undefined)
            return null;

        let cellToReturn = null;

        for (let i = 0; i < this._internalGrid.length; ++i) {
            if (this._internalGrid[0].length === undefined)
                continue;

            for (let j = 0; j < this._internalGrid[0].length; ++j) {
                this._internalGrid[i][j].selected = false;

                if (this._cursorPosition.x >= this._internalGrid[i][j].x * this._cellSize.x && this._cursorPosition.x < (this._internalGrid[i][j].x + 1) * this._cellSize.x &&
                    this._cursorPosition.y >= this._internalGrid[i][j].y * this._cellSize.y && this._cursorPosition.y < (this._internalGrid[i][j].y + 1) * this._cellSize.y) {

                    this._internalGrid[i][j].selected = true;
                    cellToReturn = this._internalGrid[i][j];
                }
            }
        }

        return cellToReturn;
    }

    draw(drawContext) {
        console.assert(drawContext instanceof DrawContext, "drawContext must be a DrawContext");

        let selectedCell = this._cellAtCursor();
        if ((selectedCell === null || !selectedCell.isInitialized) && this._lastCellSelected !== null) {
            selectedCell = this._lastCellSelected;
            selectedCell.selected = true;
        }

        if (selectedCell !== null && selectedCell.isInitialized) {
            this._lastCellSelected = selectedCell;

            drawContext.drawImage(selectedCell.characterData["image"], this.COLUMNS_FOR_PREVIEW.min, 0, this.COLUMNS_FOR_PREVIEW.max - this.COLUMNS_FOR_PREVIEW.min + 1, this._numberOfCells.y);
            drawContext.drawText(selectedCell.characterData["name"], 8, 1, selectedCell.characterData["color"]);
        }

        for (let i = 0; i < this._numberOfCells.x; i++) {
            for (let j = 0; j < this._numberOfCells.y; j++) {
                this._internalGrid[i][j].draw(drawContext);
            }
        }
    }
}