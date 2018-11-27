var STATE_GAME_NONE = 0;
var STATE_GAME_LOADING = 1;
var STATE_GAME_PLAYING = 2;
var STATE_GAME_GAME_OVER = 3;
var STATE_GAME_WIN = 4;
var STATE_GAME_MENU = 5;
var STATE_GAME_LEVEL1 = 6;
var STATE_GAME_LEVEL2 = 7;
var stateGame = STATE_GAME_NONE;


GamePlayCiudad = {
    init: function() {
        // game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        this.numero = 0;
    },
    preload: function() {
        stateGame = STATE_GAME_LOADING;
        //#region Funciones especificas
        game.load.image("logoJuego", 'assets/img/recolectaBasura/logo001.png');
        game.load.image('inicioFondo', 'assets/img/recolectaBasura/FondoStartNormales.jpg');
        game.load.image('scoreFondo', 'assets/img/recolectaBasura/score.png');
        game.load.image('tiempo', 'assets/img/recolectaBasura/time.png');
        game.load.image('barraTiempo', 'assets/img/recolectaBasura/timeBar.png');
        game.load.image('statsFinal', 'assets/img/recolectaBasura/stats.png');
        game.load.image('estrella', 'assets/img/recolectaBasura/estrella.png');
        game.load.image('estrellaVacia', 'assets/img/recolectaBasura/estrellaVacia.png');
        game.load.image('estrellaLlena', 'assets/img/recolectaBasura/estrella.png');
        //#endregion 
    },
    create: function() {
        this.personasRe = [];
        this.personasMuertas = [];

        this.fondoInicio = game.add.sprite(0, 0, 'inicioFondo');
        this.fondoInicio.anchor.setTo(0);
        this.fondoInicio.width = window.innerWidth;
        this.fondoInicio.height = window.innerHeight;
        this.logo = game.add.sprite(window.innerWidth / 2, window.innerHeight / 7.5, 'logoJuego');
        this.logo.anchor.setTo(0.5);

        this.estrellasMenuVacia = game.add.group();
        console.log(this.estrellasMenuVacia.length);

        // this.estrellasMenuVacia.anchor.setTo(0.5);
        // this.estrellasMenuVacia.scale.setTo(0.5);
        this.estrellasMenuLlena = game.add.group();
        PuntajeLvl1 = localStorage.getItem("PuntajeLvl1");



        this.nivel1 = game.add.button(window.innerWidth / 3.5, window.innerHeight / 2.2, 'nivelDesbloqueado', this.level1, this, 'desbloqueado001', 'desbloqueado001', 'desbloqueado002');
        this.nivel1.scale.setTo(0.8);
        this.nivel1.anchor.setTo(0.5);
        if (PuntajeLvl1 >= 100 && PuntajeLvl1 < 400) {
            this.estrellaMenuLlena = this.estrellasMenuLlena.create(window.innerWidth / 6, window.innerHeight / 1.7, 'estrellaLlena');
            this.estrellaMenuVacia = this.estrellasMenuVacia.create(window.innerWidth / 3.4, window.innerHeight / 1.7, 'estrellaVacia');
            this.estrellaMenuVacia = this.estrellasMenuVacia.create(window.innerWidth / 2.4, window.innerHeight / 1.7, 'estrellaVacia');

        } else if (PuntajeLvl1 >= 400 && PuntajeLvl1 < 700) {
            this.estrellaMenuLlena = this.estrellasMenuLlena.create(window.innerWidth / 6, window.innerHeight / 1.7, 'estrellaLlena');
            this.estrellaMenuLlena = this.estrellasMenuLlena.create(window.innerWidth / 3.4, window.innerHeight / 1.7, 'estrellaLlena');
            this.estrellaMenuVacia = this.estrellasMenuVacia.create(window.innerWidth / 2.4, window.innerHeight / 1.7, 'estrellaVacia');

        } else if (PuntajeLvl1 >= 700) {
            this.estrellaMenuLlena = this.estrellasMenuLlena.create(window.innerWidth / 6, window.innerHeight / 1.7, 'estrellaLlena');
            this.estrellaMenuLlena = this.estrellasMenuLlena.create(window.innerWidth / 3.4, window.innerHeight / 1.7, 'estrellaLlena');
            this.estrellaMenuLlena = this.estrellasMenuLlena.create(window.innerWidth / 2.4, window.innerHeight / 1.7, 'estrellaLlena');

        } else {
            this.estrellaMenuVacia = this.estrellasMenuVacia.create(window.innerWidth / 6, window.innerHeight / 1.7, 'estrellaVacia');
            this.estrellaMenuVacia = this.estrellasMenuVacia.create(window.innerWidth / 3.4, window.innerHeight / 1.7, 'estrellaVacia');
            this.estrellaMenuVacia = this.estrellasMenuVacia.create(window.innerWidth / 2.4, window.innerHeight / 1.7, 'estrellaVacia');

        }

        if (PuntajeLvl1 >= 700) {
            this.nivel2 = game.add.button(window.innerWidth / 1.4, window.innerHeight / 2.2, 'nivelDesbloqueado', this.level2, this, 'desbloqueado001', 'desbloqueado001', 'desbloqueado002');
            this.nivel2.inputEnabled = true;
            this.nivel2.scale.setTo(0.8);
            this.nivel2.anchor.setTo(0.5);
        } else {
            this.nivel2 = game.add.button(window.innerWidth / 1.4, window.innerHeight / 2.2, 'nivelBloqueado', this.level2, this, 'bloqueado001', 'bloqueado001', 'bloqueado002-13');
            this.nivel2.inputEnabled = false;
            this.nivel2.scale.setTo(0.8);
            this.nivel2.anchor.setTo(0.5);
        }

        this.estrellaMenuVacia = this.estrellasMenuVacia.create(window.innerWidth / 1.4, window.innerHeight / 1.7, 'estrellaVacia');
        // this.estrellasMenuVacia.children[3].anchor.setTo(0.5);
        // this.estrellasMenuVacia.children[3].scale.setTo(0.5);
        this.estrellaMenuVacia = this.estrellasMenuVacia.create(window.innerWidth / 1.7, window.innerHeight / 1.7, 'estrellaVacia');
        // this.estrellasMenuVacia.children[4].anchor.setTo(0.5);
        // this.estrellasMenuVacia.children[4].scale.setTo(0.5);
        this.estrellaMenuVacia = this.estrellasMenuVacia.create(window.innerWidth / 1.2, window.innerHeight / 1.7, 'estrellaVacia');
        // this.estrellasMenuVacia.children[5].anchor.setTo(0.5);
        // this.estrellasMenuVacia.children[5].scale.setTo(0.5);

        this.nivel3 = game.add.button(window.innerWidth / 3.5, window.innerHeight / 1.3, 'nivelBloqueado', this.level2, this, 'bloqueado001', 'bloqueado001', 'bloqueado002-13');
        this.nivel3.inputEnabled = false;
        this.nivel3.scale.setTo(0.8);
        this.nivel3.anchor.setTo(0.5);
        this.estrellaMenuVacia = this.estrellasMenuVacia.create(window.innerWidth / 3.4, window.innerHeight / 1.1, 'estrellaVacia');
        // this.estrellasMenuVacia.children[6].anchor.setTo(0.5);
        // this.estrellasMenuVacia.children[6].scale.setTo(0.5);
        this.estrellaMenuVacia = this.estrellasMenuVacia.create(window.innerWidth / 6, window.innerHeight / 1.1, 'estrellaVacia');
        // this.estrellasMenuVacia.children[7].anchor.setTo(0.5);
        // this.estrellasMenuVacia.children[7].scale.setTo(0.5);
        this.estrellaMenuVacia = this.estrellasMenuVacia.create(window.innerWidth / 2.4, window.innerHeight / 1.1, 'estrellaVacia');
        // this.estrellasMenuVacia.children[8].anchor.setTo(0.5);
        // this.estrellasMenuVacia.children[8].scale.setTo(0.5);

        this.nivel4 = game.add.button(window.innerWidth / 1.4, window.innerHeight / 1.3, 'nivelBloqueado', this.level2, this, 'bloqueado001', 'bloqueado001', 'bloqueado002-13');
        this.nivel4.inputEnabled = false;
        this.nivel4.scale.setTo(0.8);
        this.nivel4.anchor.setTo(0.5);
        this.estrellaMenuVacia = this.estrellasMenuVacia.create(window.innerWidth / 1.4, window.innerHeight / 1.1, 'estrellaVacia');
        // this.estrellasMenuVacia.children[9].anchor.setTo(0.5);
        // this.estrellasMenuVacia.children[9].scale.setTo(0.5);
        this.estrellaMenuVacia = this.estrellasMenuVacia.create(window.innerWidth / 1.7, window.innerHeight / 1.1, 'estrellaVacia');
        // this.estrellasMenuVacia.children[10].anchor.setTo(0.5);
        // this.estrellasMenuVacia.children[10].scale.setTo(0.5);
        this.estrellaMenuVacia = this.estrellasMenuVacia.create(window.innerWidth / 1.2, window.innerHeight / 1.1, 'estrellaVacia');
        // this.estrellasMenuVacia.children[11].anchor.setTo(0.5);
        // this.estrellasMenuVacia.children[11].scale.setTo(0.5);
        for (x = 0; x < this.estrellasMenuVacia.length; x++) {
            this.estrellasMenuVacia.children[x].anchor.setTo(0.5);
            this.estrellasMenuVacia.children[x].scale.setTo(0.5);
        }
        for (x = 0; x < this.estrellasMenuLlena.length; x++) {
            this.estrellasMenuLlena.children[x].anchor.setTo(0.5);
            this.estrellasMenuLlena.children[x].scale.setTo(0.5);
        }

        this.botonAtras = game.add.button(window.innerWidth / 13, window.innerHeight / 22, 'botonAtras', this.salir, this, '001-02', '001-02', '002-02');
        this.botonAtras.scale.setTo(0.22);
        this.botonAtras.anchor.setTo(0.5);
        // Crear musica y sfx
        this.sfxGameOver = game.add.audio('aplausos');
        this.loopMusic = game.add.audio('loopMusic');
        this.audioA = game.add.button(window.innerWidth / 1.1, window.innerHeight / 9, 'audio', this.audio, this, 'audioActivo1', 'audioActivo1', 'audioActivo2');
        this.audioA.anchor.setTo(0.5);
        this.audioA.scale.setTo(0.8);
        this.audioA.visible = false;
        this.audioM = game.add.button(window.innerWidth / 1.1, window.innerHeight / 9, 'audio', this.audio, this, 'audioMute1', 'audioMute1', 'audioMute2');
        this.audioM.anchor.setTo(0.5);
        this.audioM.scale.setTo(0.8);
        this.audioM.visible = false;
        this.ajustes = game.add.button(window.innerWidth / 1.1, window.innerHeight / 25, 'ajustes',

            function() {

                if (!menu) {
                    this.instrucciones.visible = true;
                    menu = true;
                    if (sonido) {
                        this.audioA.visible = true;

                    } else {
                        this.audioM.visible = true;


                    }

                    console.log(stateGame);
                } else {
                    this.instrucciones.visible = false;
                    menu = false;
                    if (sonido) {
                        this.audioA.visible = false;

                    } else {
                        this.audioM.visible = false;


                    }
                    console.log(stateGame);
                }

            }, this, 'ajustes1', 'ajustes1', 'ajustes2');
        this.ajustes.scale.setTo(0.8);
        this.ajustes.anchor.setTo(0.5);
        this.instrucciones = game.add.button(window.innerWidth / 1.1, window.innerHeight / 5.5, 'instrucciones',
            function() {
                this.fondoInstrucciones = game.add.sprite(0, 0, 'inicioFondo');
                this.fondoInstrucciones.anchor.setTo(0);
                this.fondoInstrucciones.width = window.innerWidth;
                this.fondoInstrucciones.height = window.innerHeight;
                this.nivel1.visible = false;
                this.nivel2.visible = false;
                this.nivel3.visible = false;
                this.nivel4.visible = false;
                this.instruccionesJuego = game.add.sprite(window.innerWidth / 2, window.innerHeight / 2, 'instruccionesJuego');
                this.instruccionesJuego.anchor.setTo(0.5);
                this.botonAtrasMenu = game.add.button(window.innerWidth / 2, window.innerHeight / 1.1, 'botonAtras', function() {
                    this.fondoInstrucciones.visible = false;
                    this.nivel1.visible = true;
                    this.nivel2.visible = true;
                    this.nivel3.visible = true;
                    this.nivel4.visible = true;
                    this.botonAtrasMenu.visible = false;
                    this.instruccionesJuego.visible = false;
                }, this, '001-02', '001-02', '002-02');
                this.botonAtrasMenu.scale.setTo(0.22);
                this.botonAtrasMenu.anchor.setTo(0.5);
            }, this, 'instrucciones1', 'instrucciones1', 'instrucciones2');
        this.instrucciones.scale.setTo(0.8);
        this.instrucciones.anchor.setTo(0.5);
        this.instrucciones.visible = false;
    },

    //#region Metodos de funcionamiento del juego
    salir: function() { //Metodo para salir del juego y volver a la seleccion de juego

        game.state.start("PlanetasMenu");
    },

    restart: function() { // Metodo para reiniciar el juego
        game.state.start('gameplayCiudad');

    },

    gameOver: function() { // Metodo que termian el juego
        stateGame = STATE_GAME_GAME_OVER;
        PuntajeLvl1 = this.currentScore;
        localStorage.setItem("PuntajeLvl1", PuntajeLvl1);
        this.desecho.kill();
        this.persona.kill();
        this.tiempo.kill();
        this.scoreF.kill();
        this.loopMusic.stop();
        this.fondoInicio.alpha = 0.5;

        // se reproduce el efecto de aplausos
        this.sfxGameOver.play();
        this.textfield.destroy();
        this.fondo.alpha = 0;
        this.statsFinal = game.add.sprite(window.innerWidth / 2, (window.innerHeight / 2) - 30, 'statsFinal');
        this.statsFinal.alpha = 0;

        game.add.tween(this.statsFinal).to({ alpha: 1 }, 2000, Phaser.Easing.Linear.None, true);
        this.statsFinal.anchor.setTo(0.5);
        this.statsFinal.scale.setTo(0.5);
        this.desecho.scale.setTo(0.8);
        this.estrella = game.add.group();

        this.estrella.scale.setTo(0.63);

        var style = {
            font: 'bold 25pt Arial',
            fill: 'white',
            align: 'center'
        }
        this.textfield = game.add.text(85, 475, "Puntaje: " + this.currentScore.toString(), style);
        this.estrella.alpha = 0;
        game.add.tween(this.estrella).to({ alpha: 5 }, 2000, Phaser.Easing.Linear.None, true);
        if (this.currentScore >= 100 && this.currentScore <= 300) {
            this.estrellas = this.estrella.create(window.innerWidth / 2.14, window.innerHeight / 1.37, 'estrella');
            this.estrella.children[0].anchor.setTo(0.5);
        } else if (this.currentScore >= 400 && this.currentScore <= 600) {
            this.estrellas = this.estrella.create(window.innerWidth / 2.14, window.innerHeight / 1.37, 'estrella');
            this.estrellas = this.estrella.create(window.innerWidth / 1.26, window.innerHeight / 1.45, 'estrella');
            this.estrella.children[0].anchor.setTo(0.5);
            this.estrella.children[1].anchor.setTo(0.5);
            // this.estrella.children[1].scale.setTo(1.1);
        } else if (this.currentScore >= 700) {
            this.estrellas = this.estrella.create(window.innerWidth / 2.14, window.innerHeight / 1.37, 'estrella');
            this.estrellas = this.estrella.create(window.innerWidth / 1.26, window.innerHeight / 1.45, 'estrella');
            // this.estrella.children[1].scale.setTo(1.1);
            this.estrellas = this.estrella.create(window.innerWidth / 0.9, window.innerHeight / 1.37, 'estrella');
            this.estrella.children[0].anchor.setTo(0.5);
            this.estrella.children[1].anchor.setTo(0.5);
            this.estrella.children[1].scale.setTo(1.1);
            this.estrella.children[2].anchor.setTo(0.5);
        }
        this.restarB = game.add.button(window.innerWidth / 1.9, window.innerHeight / 3.5, 'botonRecargar', this.level1, this, 1, 0, 1, 1);
        this.restarB.scale.setTo(0.22);
        this.restarB.anchor.setTo(0.5);


    },
    //#endregion

    //#region Metodos controladores de tiempo y puntaje
    increaseScore: function(nombre) { // Metodo para incrementar el puntaje
        if (nombre == "manzana") {
            this.currentScore += 50;
            this.textfield.text = this.currentScore.toString();
        } else {
            this.currentScore += 100;
            this.textfield.text = this.currentScore.toString();
        }

    },

    barraTiempo: function(value) { // Metodo de la barra de tiempo
        // calcular el nuevo tamaÃ±o de la barra (tamaÃ±o actual + valor que entra por parametro)
        var newWidth = this.bar.width + value;
        // si la barra se pasa del ancho de la pantalla se le asigna el ancho de la pantalla
        if (newWidth > window.innerWidth / 2.6) {
            newWidth = window.innerWidth / 2.6;
        }
        // si la barra es menor que 0 se le asigna el valor de 0 y se acaba el juego
        if (newWidth <= 0) {
            newWidth = 0;
            this.gameOver();

        }
        // actualizar el tamaÃ±o de la barra con el nuevo tamaÃ±o
        this.bar.width = newWidth;
    },
    //#endregion

    //#region Metodos de los personajes: Crear, Caminar, Mover

    crearPersona: function(cantPersonas) { // Crea la cantidad de personas dependiendo del nivel
        numeroPersonas = cantPersonas;
        this.distancia = 50;
        // lvl1
        if (cantPersonas <= 8) {
            for (var i = 0; i < numeroPersonas; i++) {
                let rumbo = game.rnd.integerInRange(0, 1);
                // let numberX = game.rnd.integerInRange(200, 500);
                var personas = this.persona.create(window.innerWidth / 2.25, window.innerHeight + window.innerHeight / 64 + this.distancia, 'personajeCaminandoArriba');
                this.distancia += 50;
                personas.name = "persona" + i;
                personas.caminando = false;
                personas.direccion = 0;
                personas.rumbo = rumbo;
                personas.aumentarY = 0;
                personas.aumentarX = 0;
                personas.anchor.setTo(0.5, 1);
                console.log('lvl 1');
            }
        }
        // lvl1
        else if (cantPersonas <= 12) {
            for (var i = 0; i < numeroPersonas; i++) {
                let rumbo = game.rnd.integerInRange(0, 1);
                // let numberX = game.rnd.integerInRange(200, 500);
                var personas = this.persona.create(window.innerWidth / 1.68, window.innerHeight + window.innerHeight / 64 + this.distancia, 'personajeCaminandoArriba');
                this.distancia += 50;
                personas.name = "persona" + i;
                personas.caminando = false;
                personas.direccion = 0;
                personas.rumbo = rumbo;
                personas.aumentarY = 0;
                personas.aumentarX = 0;
                personas.anchor.setTo(0.5, 1);

            }
            console.log('lvl 2');
        } else if (cantPersonas <= 16) {
            console.log('lvl3');

        } else {
            console.log('lvl4');

        }
    },

    moverPersonajeArriba: function(personaje) { // Metodo que anima para que el personaje camine hacia arriba
        this.persona.children[personaje].loadTexture("personajeCaminandoArriba");
        this.persona.children[personaje].animations.add('personajeCaminandoArriba', Phaser.Animation.generateFrameNames('personajeCaminandoArriba', ['A1', 'A2', 'A4', 'A1']), 4, true);
        this.persona.children[personaje].animations.play('personajeCaminandoArriba');
    },
    moverPersonajeDerecha: function(personaje) { // Metodo que anima para que el personaje camine hacia abajo
        this.persona.children[personaje].loadTexture("personajeCaminandoDerecha");
        this.persona.children[personaje].animations.add('personajeCaminandoDerecha', Phaser.Animation.generateFrameNames('personajeCaminandoDerecha', ['D1', 'D2', 'D4', 'D1']), 4, true);
        this.persona.children[personaje].animations.play('personajeCaminandoDerecha');
    },
    moverPersonajeIzquierda: function(personaje) { // Metodo que anima para que el personaje camine hacia abajo

        this.persona.children[personaje].loadTexture("personajeCaminandoIzquierda");

        this.persona.children[personaje].animations.add('personajeCaminandoIzquierda', Phaser.Animation.generateFrameNames('personajeCaminandoDerecha', ['I1', 'I2', 'I4', 'I1']), 4, true);
        this.persona.children[personaje].animations.play('personajeCaminandoIzquierda');

    },

    caminar: function() { // Metodo que hace caminar los personajes

        for (i = 0; i < numeroPersonas; i++) {
            if (!this.persona.children[i].caminando) {
                numeroY = Math.random() * (1 - 0.7) + 0.7;
                numeroX = Math.random() * (1 - 0) + 0;
                this.persona.children[i].aumentarX = 1;
                this.persona.children[i].aumentarY = 0.7;
                this.persona.children[i].caminando = true;
            } else {
                console.log('esta caminando');
                console.log(numeroY);
            }
        }



    },
    //#endregion

    //#region Metodos de los desechos

    crearDesecho: function() { // Crea los desechos
        // lvl1
        if (numeroPersonas <= 8) {
            for (var i = 0; i < numeroPersonas; i++) {
                this.randomDesecho = game.rnd.integerInRange(0, 1);
                if (this.randomDesecho == 0) {
                    this.desechos = this.desecho.create(0, 0, 'manzana');
                    this.desechos.name = "manzana";
                    this.desechos.vida = 1;
                    this.desechos.vidaInicial = 1;
                    this.desechos.anchor.setTo(1);
                    this.desechos.scale.setTo(0.08);
                    this.desechos.kill();
                } else {
                    this.desechos = this.desecho.create(0, 0, 'vasoCarton');
                    this.desechos.name = "vasoCarton";
                    this.desechos.vida = 2;
                    this.desechos.vidaInicial = 2;
                    this.desechos.anchor.setTo(1);
                    this.desechos.scale.setTo(0.08);
                    this.desechos.kill();
                }

            }
        }
        // lvl1
        else if (numeroPersonas <= 12) {
            console.log('lvl 2');
        } else if (numeroPersonas <= 16) {
            console.log('lvl3');

        } else {
            console.log('lvl4');

        }






    },

    pintarDesecho: function() { // Pinta en pantalla los desechos
        this.crearDesecho();

        this.desechoP = this.desecho.getFirstDead();
        // console.log("numero de personas: " +this.persona.length);

        this.numeroP = game.rnd.integerInRange(0, 7);
        // console.log(this.numeroP);
        this.desechoP.reset(this.persona.children[this.numeroP].x, this.persona.children[this.numeroP].y);



    },

    quitarvida: function() { // Metodo que le quita vida a los desechos
        this.desecho.onChildInputDown.add(function onDown(sprite) {
            console.log(sprite.name + " vida:" + sprite.vida);
            if (sprite.vida > 1) {
                sprite.vida -= 1;
            } else {
                sprite.kill();
                sprite.vida = sprite.vidaInicial;
                this.increaseScore(sprite.name);
            }
        }, this);
    },
    //#endregion

    //#region Nivel 1
    audio: function() {
        if (sonido) {
            this.audioA.visible = false;
            this.audioM.visible = true;
            this.loopMusic.stop();
            reproducir = false;
            sonido = false;
        } else {
            this.audioM.visible = false;
            this.audioA.visible = true;
            sonido = true;
            reproducir = true;

        }
    },
    level1: function() {

        this.fondo = game.add.sprite(0, 0, 'mapaLVL1');
        this.fondo.anchor.setTo(0);
        this.fondo.width = window.innerWidth;
        this.fondo.height = window.innerHeight;

        this.persona = game.add.group();
        this.crearPersona(8);
        this.desecho = game.add.group();
        this.desecho.inputEnableChildren = true;
        this.scoreF = game.add.sprite(window.innerWidth / 10, window.innerWidth / 6, 'scoreFondo');
        this.scoreF.scale.setTo(0.8);
        this.tiempo = game.add.sprite(window.innerWidth / 180, window.innerWidth / 36, 'tiempo');
        this.tiempo.scale.setTo(0.8);
        var style = {
            font: 'bold 20pt Arial',
            fill: 'white',
            align: 'center'
        }
        this.currentScore = 0;
        this.textfield = game.add.text(window.innerWidth / 3, window.innerHeight / 7.3, this.currentScore.toString(), style);
        this.textfield.anchor.setTo(0.5)
        this.bar = game.add.sprite(window.innerWidth / 6.8, window.innerHeight / 29, 'barraTiempo');
        this.bar.scale.setTo(0.8);
        this.bar.anchor.setTo(0);
        // darle tamaÃ±o a la barra
        this.bar.width = window.innerWidth / 2.6;
        // this.bar.height = 20;

        this.startLevel1();
    },

    startLevel1: function() { // Inicia el nivel 1
        stateGame = STATE_GAME_LEVEL1;
        if (reproducir) {
            this.loopMusic.loop = true;
            this.loopMusic.play();
        }

        this.bar.width = game.width;
        this.personasRe = [];
        this.personasMuertas = [];

        game.time.events.loop(Phaser.Timer.SECOND, this.pintarDesecho, this);
        for (i = 0; i < numeroPersonas; i++) {
            if (this.persona.children[i].rumbo == 0) {
                console.log("rumbo Arriba = 0 : " + this.persona.children[i].rumbo + " nombre : " + this.persona.children[i].name);
                this.moverPersonajeArriba(i);
            } else {
                console.log("rumbo derecha = 1 : " + this.persona.children[i].rumbo + " nombre : " + this.persona.children[i].name);
                this.persona.children[i].reset(-50 - this.distancia, 226, 'personajeCaminandoDerecha');
                this.distancia -= 50;
            }

        }

        this.caminar();
        this.quitarvida();
        this.nivel1.visible = false;
        this.nivel2.visible = false;
        this.botonAtras.visible = false;
    },
    //#endregion

    //#region Nivel 2
    level2: function() {
        this.fondolvl2 = game.add.sprite(0, 0, 'mapaLVL2');
        this.fondolvl2.anchor.setTo(0);
        this.fondolvl2.width = window.innerWidth;
        this.fondolvl2.height = window.innerHeight;
        this.persona = game.add.group();
        this.crearPersona(12);
        this.desecho = game.add.group();
        this.desecho.inputEnableChildren = true;
        this.scoreF = game.add.sprite(window.innerWidth / 10, window.innerWidth / 6, 'scoreFondo');
        this.scoreF.scale.setTo(0.8);
        this.tiempo = game.add.sprite(window.innerWidth / 180, window.innerWidth / 36, 'tiempo');
        this.tiempo.scale.setTo(0.8);
        var style = {
            font: 'bold 20pt Arial',
            fill: 'white',
            align: 'center'
        }
        this.currentScore = 0;
        this.textfield = game.add.text(window.innerWidth / 3, window.innerHeight / 7.3, this.currentScore.toString(), style);
        this.textfield.anchor.setTo(0.5)
        this.bar = game.add.sprite(window.innerWidth / 6.8, window.innerHeight / 29, 'barraTiempo');
        this.bar.scale.setTo(0.8);
        this.bar.anchor.setTo(0);
        // darle tamaÃ±o a la barra
        this.bar.width = window.innerWidth / 2.6;
        // this.bar.height = 20;

        this.startLevel2();
    },
    startLevel2: function() {
        stateGame = STATE_GAME_LEVEL2;

        if (reproducir) {
            this.loopMusic.loop = true;
            this.loopMusic.play();
        }

        this.bar.width = game.width;
        this.personasRe = [];
        this.personasMuertas = [];
        // game.time.events.loop(Phaser.Timer.SECOND, this.pintarDesecho, this);
        for (i = 0; i < numeroPersonas; i++) {
            if (this.persona.children[i].rumbo == 0) {
                console.log("rumbo Arriba = 0 : " + this.persona.children[i].rumbo + " nombre : " + this.persona.children[i].name);
                this.moverPersonajeArriba(i);
            } else {
                console.log("rumbo derecha = 1 : " + this.persona.children[i].rumbo + " nombre : " + this.persona.children[i].name);
                this.persona.children[i].reset(-50 - this.distancia, 226, 'personajeCaminandoIzquierda');
                this.persona.children[i].scale.setTo(0.5);
                this.distancia -= 50;
            }

        }

        this.caminar();
        this.quitarvida();
        this.nivel1.visible = false;
        this.nivel2.visible = false;

    },

    //#endregion

    update: function() {

        switch (stateGame) {
            case STATE_GAME_NONE:

                break;

            case STATE_GAME_LOADING:

                break;

            case STATE_GAME_PLAYING:

                break;

            case STATE_GAME_GAME_OVER:

                break;

            case STATE_GAME_WIN:

                break;
            case STATE_GAME_MENU:

                break;
            case STATE_GAME_LEVEL1:
                this.barraTiempo(-0.1);
                //#region Mover personajes y cambiar orientacion
                for (i = 0; i < numeroPersonas; i++) {
                    if (this.persona.children[i].caminando && this.persona.children[i].y >= window.innerHeight / 1.4 && this.persona.children[i].rumbo == 0) {
                        this.persona.children[i].y -= this.persona.children[i].aumentarY;
                    } else if (this.persona.children[i].caminando && this.persona.children[i].x >= window.innerWidth / 1.68 && this.persona.children[i].rumbo == 1) {
                        if (this.persona.children[i].direccion == 1) {
                            this.moverPersonajeArriba(i);
                            this.persona.children[i].direccion = 0;
                        }
                        this.persona.children[i].y -= this.persona.children[i].aumentarY;
                    } else {
                        if (this.persona.children[i].direccion == 0) {
                            this.moverPersonajeDerecha(i);

                        }
                        this.persona.children[i].direccion = 1;
                        direccion = 1;
                        this.persona.children[i].x += this.persona.children[i].aumentarY;
                    }
                }
                //#endregion
                break;
            case STATE_GAME_LEVEL2:
                this.barraTiempo(-0.2);
                for (i = 0; i < numeroPersonas; i++) {
                    if (this.persona.children[i].caminando && this.persona.children[i].y >= window.innerHeight / 1.5 && this.persona.children[i].rumbo == 0) {
                        this.persona.children[i].y -= this.persona.children[i].aumentarY;
                    } else if (this.persona.children[i].caminando && this.persona.children[i].x >= window.innerWidth / 1.68 && this.persona.children[i].rumbo == 1) {
                        if (this.persona.children[i].direccion == 1) {
                            this.moverPersonajeArriba(i);
                            this.persona.children[i].direccion = 0;
                        }
                        this.persona.children[i].y -= this.persona.children[i].aumentarY;
                    } else {
                        if (this.persona.children[i].direccion == 0) {
                            this.moverPersonajeIzquierda(i);
                        }
                        this.persona.children[i].direccion = 1;
                        direccion = 1;
                        this.persona.children[i].x -= this.persona.children[i].aumentarY;
                    }
                }
                break;
        }





    },
    // render: function() {

    //     // Input debug info
    //     game.debug.inputInfo(32, 32);
    //     // game.debug.spriteInputInfo(sprite, 32, 130);
    //     game.debug.pointer( game.input.activePointer );


    // }
}

// Variables Globales
var numeroX = 0;
var numeroY = 0;
var desecho;
var personas;
var numeroPersonas;
var direccion = 0;
var sonido = true;
var menu = false;
var reproducir = true;
var PuntajeLvl1;
// Variables Globales

game.state.add("gameplayCiudad", GamePlayCiudad);