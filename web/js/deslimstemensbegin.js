'use strict';

function DeSlimsteMensBegin($scope) {
    this.id = 'begin';
    this.title = 'De SLIMSTE MENS ter wereld';
    this.vorigeRonde = function() {
        return $scope.deSlimsteMensBegin;
    };
    this.volgendeRonde = function() {
        return $scope.drieZesNegenRonde;
    };
    this.spelersTonen = function() {
        return false;
    };
}
