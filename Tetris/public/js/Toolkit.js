const Toolkit = {
    /**
     * @param el {string}
     * @returns {Element}
     */
    $(el) {
        return document.querySelector(el)
    },
    /**
     * @param el {String}
     * @returns {NodeListOf<*>}
     */
    $all(el) {
        return document.querySelectorAll(el)
    },
    /**
     * @param tagName {string}
     * @returns {*}
     */
    createElement(tagName) {
        return document.createElement(tagName)
    },
    /**
     * @param DocumentElement {Document}
     * @param Element {Element}
     */
    append(DocumentElement, Element) {
        return DocumentElement.append(Element)
    },
    /**
     * @param defaultOptions {Object}
     * @param options {Object}
     * @returns {Object}
     */
    mergeDeduplication(defaultOptions, options) {
        return Object.assign({}, defaultOptions, options)
    },
    arrayDeepCopy(arr) {
        let array = [];
        for (let i = 0; i < arr.length; i++){
            let itemArr = arr[i].slice(0,arr[i].length)
            array.push(itemArr)
        }
        return array;
    },
    /**
     * @param canvas {CanvasRenderingContext2D}
     * @param color {string}
     * @param x {number}
     * @param y {number}
     * @param width {number}
     * @param height {number}
     */
    drawSquare({ctx, color, x, y, width, height}) {
        ctx.fillStyle = color
        ctx.fillRect(x, y, width, height)
    },
    /**
     * @param string
     */
    error(string) {
        throw new Error(string)
    }
}

export default Toolkit