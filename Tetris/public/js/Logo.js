import Toolkit from "./Toolkit.js"

const {createElement, append, error, log, mergeDeduplication, drawSquare} = Toolkit;

/**
 * @param options {Object}
 */
export default function Logo(options) {
    let defaultOptions = {
        width: 100,
        height: 100
    }
    options = mergeDeduplication(defaultOptions, options)
    DocumentError(options.document)

    let logo = createElement("canvas");
    logo.width = options.width;
    logo.height = options.height;
    let ctx = logo.getContext("2d");

    let coordinate = [
        [0, 0],
        [0, 1],
        [1, 0],
        [1, 1]
    ]

    coordinate.map((v,i) =>{
        let x = Math.ceil(options.width / 2);
        let y = Math.ceil(options.height / 2);
        let bool = Math.ceil(i / 2) === 1;
        drawSquare({
            ctx,
            color: bool ? "#898989" : "#DCDDDD",
            x: v[0] * x,
            y: v[1] * y,
            width: Math.ceil(options.width / 2),
            height: Math.ceil(options.height / 2)
        })
    })

    append(options.document, logo)
}

function DocumentError(document) {
    if (!document) {
        error("document is a must!")
    }
    if (document.__proto__.__proto__ !== HTMLElement.prototype) {
        error("document must is a HTMLElement")
    }
}