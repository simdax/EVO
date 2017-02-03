define(function() {
    

    // we need to set tools and hexagons
    Light= function(tools,hexagons) {
        this.tools=tools; this.hexagons=hexagons
    };
    Light.prototype={
        highlight:function(point) {
            if (!point) {
                this.hexagons.setAll('alpha', 0.5);
            }else{
                var indices=this.tools.autour(point)[0]
                this.hexagons.setAll('alpha', 1)
                for(var i = 0; i < indices.length; i++) {
                    this.hexagons.getAt(indices[i]).alpha=0.5;
                }
            }
        },
        normal:function () {
            this.hexagons.setAll('alpha', 1)
        }
    };

    return Light
})
