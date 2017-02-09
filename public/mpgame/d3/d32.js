
(function(){
    'use strict'

    evo.app.controller('d3',function ($scope) {

        evo.table={}; // mega a l'arrache...
        
        evo.tools.addOnAndEmit($scope,evo.socket)

        $scope.log="";
        $scope.xp=2;//evo.game.board.mdj.toi.xp;

        $scope.acheter=function(espece) {
            var log= evo.game.board.mdj.toi.acheter(espece);
            $scope.log=log;
            // if (log) {
            //     table[espece].forEach(function(element) {
            //         element.attr("bgColor","yellow")  
            //     })
            // }
            $scope.xp=evo.game.board.mdj.toi.xp;
            return log;
        };

    });


    
}())



