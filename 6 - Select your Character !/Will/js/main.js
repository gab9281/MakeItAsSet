let $ = (elementId) => document.getElementById(elementId);

const mainCanvas = $("mainCanvas");

let _drawContext = new DrawContext(mainCanvas, window.innerWidth, window.innerHeight);
_drawContext.clear();

let _grid = new Grid(_drawContext.size, _drawContext.numberOfCells, _drawContext.cellSize);
_grid.draw(_drawContext);

mainCanvas.addEventListener('mousemove', e => {
    _drawContext.clear();

    _grid.cursorPosition = {
        x: e.offsetX,
        y: e.offsetY
    };
    _grid.draw(_drawContext);
});
