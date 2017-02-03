define(function() {
    
    
    var Gen=function (game,seed,map,groupes) {

        this.map=map;
        this.game=game;
        this.groupes=groupes;

        // here get a random seed
        this.rng = new RNG(seed);
        this.randomDigit=function (lo,hi) {
            this.rng.nextRange(lo,hi) ;
        };

        /**
         * Ancienne fonction de génération de carte
         */

        this.addSprite=function(x,y,texture) {
            return sp=this.game.add.sprite(x,y,texture);
        }
        
        this.genererClassique= function(hexagonX, hexagonY) {
            var hexagon;
            var x = (Math.floor(Math.random() * 2) == 0);

            if (x) {
                hexagon = this.addSprite(hexagonX,hexagonY,"hexMer")
            } else {
                hexagon = this.addSprite(hexagonX,hexagonY,"hexTerre")
            };
            this.groupes.hexagon.add(hexagon);
        };

        /**
         * Main entry function that generates the this.map
         * Creates a this.map of the needed gridSize and calls the generer() function
         */
        this.createHexs = function () {
            // TODO: vectoriser pour éviter les boucles for imbriquées
            for (var i = 0; i < this.map.gridSizeX / 2; i++) {
                for (var j = 0; j < this.map.gridSizeY; j++) {
                    if (this.map.gridSizeX % 2 == 0 || i + 1 < this.map.gridSizeX / 2 || j % 2 == 0) {
                        var hexagonX = this.map.hexagonWidth * i * 1.5 + (this.map.hexagonWidth / 4 * 3) * (j % 2);
                        var hexagonY = this.map.hexagonHeight * j / 2;
                        this.genererClassique(hexagonX,hexagonY)

                        //je commence par tout peupler par des hexa jaunes "neutres"
                        // var hexagon;
                        // hexagon = this.game.add.sprite(hexagonX, hexagonY, "hexagon");
                        // this.groupes.hexagon.add(hexagon);
                    }
                }
            }
            //  generer();
        }


        /**
         * Fonction qui retourne le nombre de terres dans la this.map
         */
        function nbTerres() {
            var res = 0;
            for (var i = 0; i < this.groupes.hexagon.length; i++) {
                if (this.groupes.hexagon.getAt(i).key == 'hexTerre') {
                    res += 1;
                }
            }
            return res;
        }

        /**
         * Genere la seed pour l'ago de génération de carte
         */
        function takeFirst() {
            // var x= Math.floor(Math.random() * gridSizeX)
            // var y= Math.floor(Math.random() * gridSizeY/2)
            var x = 10;
            y = 5;
            var h = this.groupes.hexagon.getAt(convert(x, y));
            if (h.key == 'hexagon') {
                h.loadTexture('hexTerre');
            }
            return [x, y];
        }

        /**
         * Fonction qui choisit une cell aléatoire autour de la cell courante
         */

        function chooseAutour(cells) {
            var i = randomDigit(0,cells.length)
            return (cells[i]);
        }


        /**
         * Changer la texture des hexa jaunes en hexa de terre ou mer
         */
        changeText = function(pos, texture) {
            this.groupes.hexagon.getAt(pos).loadTexture(texture);
        }

        /**
         * Retourne un boolean pour savoir si la piece pourra être un nouveau pt de depart
         */
        function chooseText(hex) {
            if ((randomDigit(0,1000)/1000) > 1 / (200 / nbTerres())) {
                changeText(hex, "hexTerre");
                return true;
            } else {
                changeText(hex, "hexMer");
                return false;
            }
        }



        /**
         * Fonction de callback qui génère les cases une par une pour voir le déroulé de l'algo
         */
        var cb = function(casesAutour, n) {
            setTimeout(() => {
                generer(chooseAutour(casesAutour), n + 1)
            }, 0);
        };

        // variables globales ???? =====> elles servent à rien je pense
        //var already=[] // les cases déja choisies

        // iter est juste là pour le nb d'iterations pour générer la this.map
        var iter = 300;

        /**
         * Fonction principale de génération de la this.map
         */
        function generer(c, nb) {
            var cell = c || takeFirst();
            //already.push(cell)
            var n = nb || 0;
            var tmp = autour(cell); // fonction pour choper les cases d'a côté
            var indices = tmp[1];
            var casesAutour = tmp[0];
            Light.normal();
            Light.highlight(cell)
            var goodcells = [];
            for (var i = 0; i < casesAutour.length; i++) {
                // si la case est neutre, colorie-la, et met la dans les next candidats si elle est "terre"
                if (this.groupes.hexagon.getAt(casesAutour[i]).key == 'hexagon') {
                    if (chooseText(casesAutour[i])) {
                        goodcells.push(trouvePos(cell, indices[i]))
                    }
                }
                // la case est déjà coloriée, et qu'elle est "terre," put la dans les possibilités
                else if (this.groupes.hexagon.getAt(casesAutour[i]).key == 'hexTerre') {
                    goodcells.push(trouvePos(cell, indices[i]))
                }
            };
            if (n < iter) {
                if (n != 0 && n % 100 == 0) // on génère un autre continent
                {

                    // on redémarre depuis une autre terre

                    //            console.log("choisit une nouvelle terre");
                    var y = randomDigit(0,gridSizeY / 2);
                    var x = randomDigit(0,gridSizeX);
                    generer(checkHex(this.groupes.hexagon.getAt(x).x, this.groupes.hexagon.getAt(y).y), n + 1);
                } else
                {
                    // sinon continue
                    cb(goodcells, n)
                }
            } else { // quand on a fini les hgénérations
                // on colorie le reste des hexagons en "mer"
                for (var i = 0; i < this.groupes.hexagon.length; i++) {
                    if (this.groupes.hexagon.getAt(i).key == "hexagon") {
                        this.groupes.hexagon.getAt(i).loadTexture("hexMer")
                    }
                }
            }
        }
    };
    
    return Gen

})
