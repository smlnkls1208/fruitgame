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

    update() {
        this.x += this.offsets.x;
        this.y += this.offsets.y;
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

    removeElement() {
        this.element.remove();
    }

    isCollision(element) {
        let a = {
            x1: this.x,
            y1: this.y,
            x2: this.x + this.w,
            y2: this.y + this.h
        };
        let b = {
            x1: element.x,
            y1: element.y,
            x2: element.x + element.w,
            y2: element.y + element.h
        }
        return a.x1 < b.x2 && b.x1 < a.x2 && a.y1 < b.y2 && b.y1 < a.y2;
    }

}

class Fruit extends Drawable {
    constructor(game) {
        super(game);
        this.w = 70;
        this.h = 70;
        this.y = 60;
        this.x = random(0, window.innerWidth - this.w);
        this.offsets.y = 3;
        this.createElement();
    }

    update(){
        if(this.isCollision(this.game.player)) this.takePoint();
        if(this.y > window.innerHeight) this.takeDamage();
        super.update();
    }

    takePoint() {
        if(this.game.remove(this)){
            this.removeElement();
            this.game.points++;
        }
    }

    takeDamage() {
        if(this.game.remove(this)){
            this.removeElement();
            this.game.hp--;
        }
    }

}

class Banana extends Fruit {
    constructor(game) {
        super(game);
    }
}

class Apple extends Fruit {
    constructor(game) {
        super(game);
        this.offsets.y = 5;
    }
}

class Orange extends Fruit {
    constructor(game) {
        super(game);
        this.offsets.y = 7;
    }
}

class Player extends Drawable {
    constructor(game) {
        super(game);
        this.w = 244;
        this.h = 109;
        this.x = window.innerWidth / 2 - this.w / 2;
        this.y = window.innerHeight - this.h;
        this.speedPerFrame = 20 ;
        this.keys ={
            ArrowLeft: false,
            ArrowRight: false
        }
        this.createElement();
        this.bindKeyEvents();
    }
    bindKeyEvents() {
        document.addEventListener('keydown', ev => this.changeKeyStatus(ev.code, true))
        document.addEventListener('keyup', ev => this.changeKeyStatus(ev.code, false))

    }

    changeKeyStatus(code, value) {

        if(code in this.keys) this.keys[code] = value;
    }

    update() {
        if(this.keys.ArrowLeft && this.x > 0) this.offsets.x = -this.speedPerFrame;
        else if(this.keys.ArrowRight && this.x < window.innerWidth - this.w) this.offsets.x = this.speedPerFrame;
        else this.offsets.x = 0;
        super.update();

    }
}

class Game {
    constructor() {
        this.name = name;
        this.elements = [];
        this.player = this.generate(Player);
        this.counterForTimer = 0;
        this.fruits = [Apple, Banana, Orange];
        this.hp = 3;
        this.points = 0;
        this.time= {
          m1: 0,
          m2: 0,
          s1: 0,
          s2: 0
        };
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
            this.counterForTimer++;
            if (this.counterForTimer % 60 === 0) {
                this.timer();
                this.randomFruitGenerate();
            }
            this.updateElements();
            this.setParams();
            this.loop();
        });
    }

    randomFruitGenerate() {
        this.generate(this.fruits[random(0, 2)]);
    }

    updateElements() {
        this.elements.forEach(element => {
            element.update();
            element.draw();
        })
    }

    setParams() {
        let params = ['name', 'points', 'hp'];
        let values = [this.name, this.points, this.hp];
        params.forEach((param, ind) => {
            $(`#${param}`).innerHTML = values[ind];
        });


    }

    remove(el) {
        let idx = this.elements.indexOf(el);
        if(idx !== -1){
            this.elements.splice(idx, 1);
            return true;
        }
        return false;
    }

    timer() {
        let time = this.time;
        time.s2++;
        if(time.s2 >= 10){
            time.s2 = 0;
            time.s1++;
        }
        if(time.s1 >= 6){
            time.s1 = 0;
            time.m2++;
        }
        if(time.m2 >= 10){
            time.m2 = 0;
            time.m1++;
        }
        $('#timer').innerHTML = `${time.m1}${time.m2}:${time.s1}${time.s2}`;
    }
}