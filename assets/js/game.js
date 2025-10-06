class Drawable {
    constructor(game) {
        this.game = game;
        this.x = 0;
        this.y = 0;
        this.w = 0;
        this.h = 0;
        this.offsets = {
            x: 0,
            y: 0
        }
    }

    createElement() {
        this.element = document.createElement("div");
        this.element.className = "element " + this.constructor.name.toLowerCase();
        $('.elements').append(this.element);
    }

    draw() {
        this.element.style = `
            left: ${this.x}px;
            top: ${this.y}px;
            width: ${this.w}px;
            height: ${this.h}px;
        `;
    }
}

class Player extends Drawable {
    constructor(game) {
        super(game);
        this.w = 244;
        this.h = 109;
        this.x = window.innerWidth / 2 - this.w / 2;
        this.y = window.innerHeight - this.h;
        this.createElement();
    }
}

class Game {
    constructor() {
        this.name = name;
        this.elements = [];
        this.player = this.generate(Player);
    }

    start () {
        this.loop();
    }

    generate(className) {
        let element = new className(this);
        this.elements.push(element);
        return element;
    }

    loop() {
        requestAnimationFrame(() => {
            this.updateElements();
            this.setParams();
            this.loop();
        });
    }

    updateElements() {
        this.elements.forEach(element => {
            element.draw();
        })
    }

    setParams() {
        let params = ['name'];
        let values = [this.name];
        params.forEach((param, ind) => {
            $(`#${param}`).innerHTML = values[ind];
        });
    }
}