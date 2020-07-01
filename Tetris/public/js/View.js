import Toolkit from "./Toolkit.js"
const {$} = Toolkit;

class View {
    constructor() {
        // game scene
        this.scene = [
            {
                name:"start",
                component:$("#start")
            },
            {
                name:"game",
                component: $("#game")
            },
            {
                name:"over",
                component: $("#over")
            }
        ]

        // panel
        this.panel = $(".panel")
    }

    updateView(scene){
        this.scene.forEach(v =>{
            if (v.name === scene){
                v.name === "game" ? this.addClass(this.panel) : this.removeClass(this.panel);
                this.addClass(v.component)
            }else{
                this.removeClass(v.component)
            }
        })
    }


    addClass(Element){
        Element.classList.add("active");
    }

    removeClass(Element){
        Element.classList.remove("active");
    }
}

export default new View