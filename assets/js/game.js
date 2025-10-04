class Game {
    constructor() {
        this.name = name;
    }
    start () {
        this.loop()
    }

    loop() {
        requestAnimationFrame(() => {
            this.setParams();
            this.loop()
        });
    }

    setParams() {
        let params = ['name'];
        let values = [this.name];
        params.forEach((param,ind) => {
            $(`#${param}`).innerHTML = values[ind];
        })
    }
}