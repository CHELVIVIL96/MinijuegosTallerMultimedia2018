var botonVolver;
var xInicial, xFinal;
var PlanetasMenu = function() {};
var bloquearClick = true;
var estado = "1";

PlanetasMenu.prototype = {

    init: function() {},
    create: function() {
        this.rectangles = [];

        this.FondoInicio = game.add.sprite(0, 0, 'fondoEstrellado');
        this.FondoInicio2 = game.add.sprite(window.innerWidth, 0, 'fondoEstrellado');
        this.FondoInicio3 = game.add.sprite(window.innerWidth * 2, 0, 'fondoEstrellado');
        this.FondoInicio4 = game.add.sprite(window.innerWidth * 3, 0, 'fondoEstrellado');
        this.FondoInicio.width = window.innerWidth;
        this.FondoInicio.height = window.innerHeight;

        this.FondoInicio2.width = window.innerWidth;
        this.FondoInicio2.height = window.innerHeight;

        this.FondoInicio3.width = window.innerWidth;
        this.FondoInicio3.height = window.innerHeight;

        this.FondoInicio4.width = window.innerWidth;
        this.FondoInicio4.height = window.innerHeight;

        var PrimerPlaneta = (window.innerWidth / 2) - 130;

        this.rectangles.push(game.add.button(planetas(1), this.game.world.centerY - 150, 'mundo1', clickMundo01, this));
        this.rectangles.push(game.add.button(planetas(2) + window.innerWidth / 2, this.game.world.centerY - 75, 'mundo2', clickMundo02, this));
        this.rectangles.push(game.add.button(planetas(3) + window.innerWidth, this.game.world.centerY - 120, 'mundo3', clickMundo03, this));
        this.rectangles.push(game.add.button(planetas(4) + window.innerWidth + window.innerWidth / 2, this.game.world.centerY - 150, 'mundo4', clickMundo04, this));

        this.game.world.setBounds(0, 0, window.innerWidth * 4, this.game.height);

        this.dragging = false;
        this.game.input.onDown.add(this.beginMove, this);
        this.game.input.onUp.add(this.endMove, this);
        this.game.input.addMoveCallback(this.moveCamera, this);

        botonVolver = game.add.button(20, window.innerHeight - 70, 'volverPrincipalPlanetas', volverMenuPrincipalClick, this, 0);
        botonVolver.fixedToCamera = true;
    },
    update: function() {

    },
    beginMove: function() {
        this.startX = this.game.input.x;
        this.xInicial = this.game.input.x;
        this.dragging = true;
    },
    endMove: function() {
        this.dragging = false;
        this.xFinal = this.game.input.x;
        calcularMov(this.xInicial, this.xFinal);
    },
    moveCamera: function(pointer, x, y) {
        if (this.dragging) {
            var delta = x - this.startX;
            this.game.camera.x -= delta;
            this.startX = x;

        }
    },
    render: function() {
        for (var i = 0; i < this.rectangles.length; i++) {
            var rectangle = this.rectangles[i];
            this.game.debug.geom(rectangle.sprite, rectangle.tint);
        }
    },


};

function calcularMov(i, j) {
    if (i > j && this.estado == "1") //Corre derecha
    {
        //console.log(j + " " + window.innerWidth);
        this.game.camera.x = window.innerWidth + 10;
        this.estado = "2";
        return 0;
    }

    if (i > j && this.estado == "2") {
        this.game.camera.x = window.innerWidth * 2;
        this.estado = "3";
        return 0;
    }

    if (i < j && this.estado == "2") {
        this.game.camera.x = 0;
        this.estado = "1";
        return 0;
    }

    if (i > j && this.estado == "3") {
        this.game.camera.x = window.innerWidth * 3;
        this.estado = "4";
        return 0;
    }

    if (i < j && this.estado == "3") {
        this.game.camera.x = window.innerWidth + 10;
        this.estado = "2";
        return 0;
    }
    if (i < j && this.estado == "4") //Corre derecha
    {
        this.game.camera.x = window.innerWidth * 2;
        this.estado = "3";
        return 0;
    }
}

function planetas(i) {
    return (window.innerWidth * i / 2) - 130;
}

function volverMenuPrincipalClick() {
    game.state.start("MenuPrincipal");
    bloquearClick = true;
}

function clickMundo01() {
    if (this.xInicial == this.xFinal) {
        game.state.start("GamePlayCiudad");
        game.state.start("gameplayCiudad");
    }
}

function clickMundo02() {
    if (this.xInicial == this.xFinal) {
        game.state.start("GamePlayPlaya");
        game.state.start("gameplayPlaya");
    }
}

function clickMundo03() {
    if (this.xInicial == this.xFinal) {
        game.state.start("GamePlayManglar");
        //game.state.start('inicio');
    }
}

function clickMundo04() {
    if (this.xInicial == this.xFinal) {
        game.state.start("GamePlayParque");
        //game.state.start("InicioParque");
    }
}

//Phaser.Utils.mixinPrototype(MenuPrincipal.prototype);