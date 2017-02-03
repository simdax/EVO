define(function () {

    var Map=function() {
        
    this.hexagonWidth = 80;
    this.hexagonHeight = 70;
    this.sectorWidth = this.hexagonWidth / 4 * 3;
    this.sectorHeight = this.hexagonHeight;
    this.gradient = (this.hexagonWidth / 4) / (this.hexagonHeight / 2);

    this.gridSizeX = 20;
    this.gridSizeY = 20;
    this.columns = [
        Math.ceil(this.gridSizeY / 2),
        Math.floor(this.gridSizeY / 2)
    ];

    this.calcBounds=function () {

        // pour l'instant j'hésite encore !
        return[1300,1500]
        
        return [
            this.gridSizeX * this.gridSizeY / 2,
            (this.hexagonWidth * 9 / 8) * (this.hexagonHeight * 10 / 8)
        ]
    }

    };

    return Map

})
