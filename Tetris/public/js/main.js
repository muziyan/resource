import Toolkit from "./Toolkit.js"
import Logo from "./Logo.js";
import view from "./View.js";

const {$,append,arrayDeepCopy} = Toolkit;


class Game {
    constructor(tagName) {
        // game container
        this.container = $(tagName);
        // game status
        this.status = false;

        // square
        this.square = [
            [[1, 1, 1, 1]],
            [[1, 1], [1, 1]],
            [[1, 1, 0], [0, 1, 1]],
            [[0, 1, 1], [1, 1, 0]],
            [[1, 0, 0], [1, 1, 1]],
            [[0, 0, 1], [1, 1, 1]]
        ]
        // data 40 * 25
        this.map = (new Array(40).fill(0)).map(v => new Array(25).fill(0))

        // x-axis offset
        this.x = 3;
    }

    init() {
        let _this = this;
        // generate logo
        Logo({
            document: $("#start .logo")
        })

        view.updateView("start");

        $("#start .start-btn").addEventListener("click", function () {
            _this.status = true;
            _this.startGame();
        }, false)

    }

    startGame(){
        view.updateView("game")
        this.drawGame();
        this.squareMove();
    }

    drawGame(){
        let game = $("canvas");
        game.width = this.container.offsetWidth;
        game.height = this.container.offsetHeight;
        this.gameCtx = game.getContext("2d")
        append($("#game"),game)
        this.render(this.map)
    }

    squareMove(){
        clearInterval(this.timer)
        let _this = this;
        let moveY = 0;
        let square = this.randomSquare();
        this.timer = setInterval(()=>{
            if (!_this.status){
                clearInterval(_this.timer)
            }
            _this.drawSquare(square,moveY)
            moveY += square.length;
        },1000 / 60)
    }

    drawSquare(square,moveY = 0){
        let data = arrayDeepCopy(this.map)
        let arrXY = [];
        square.forEach((y,i)=>{
            square[0].forEach((x,j)=>{
                data[i + moveY][j + this.x] = square[i][j]
                arrXY.push({
                    y:i + moveY,
                    x:j + this.x,
                    val:square[i][j]
                })
            })
        })
        if (moveY >= 38){
            arrXY.forEach(v =>{
                this.map[v.y][v.x] = v.val;
            })
            this.squareMove()
        }
        this.render(data)
    }

    randomSquare(){
        let randomNumber = Math.floor(Math.random()*6);
        return this.square[randomNumber]
    }

    render(data){
        let w = Math.ceil(this.container.offsetWidth / data[0].length) - 1
        let h = Math.ceil(this.container.offsetHeight / data.length) - 1
        data.forEach((r,i) =>{
            data[0].forEach((c,j) =>{
                this.gameCtx.fillStyle = data[i][j] === 1 ? "#DCDDDD" : "#898989";
                this.gameCtx.fillRect(
                    (w + 1) * j + 2,
                    (h + 1) * i + 2,
                    w,
                    h
                )
            })
        })
    }
}


let game = new Game("#tetris")
game.init();
console.log(game)