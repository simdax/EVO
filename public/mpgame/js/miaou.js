(function () {
  'use strict'

  evo.app.controller('miaou',function ($scope) {

    evo.tools.addOnAndEmit($scope,evo.socket);
    $scope.blabla="";
    $scope.phrases=[];

    evo.caca=function(event) {
      if (event.keyCode==13) {
          $scope.sendPhrase($scope.blabla)
      }
  }
    $scope.sendPhrase=function () {
        $scope.$emit('new-phrase',$scope.blabla)
        //clean all
        $scope.blabla=""
        document.getElementById("chat").value = "";
    };
    // et on reçoit
    $scope.$on('updateChat',function (phrases) {
        $scope.phrases=phrases;
    });

  })

}())
