function Oorkonde($scope) {
    this.id =  'oorkonde';
    this.title = 'Oorkonde';
    this.naamWinnaar = 'Volledige naam winnaar';
    this.oorkondeModus =  false;
    this.spelersTonen = function() {
        return true;
    };
    this.vorigeRonde = function() {
        return $scope.deFinale;
    };
    this.volgendeRonde = function() {
        return $scope.oorkonde;
    };
    this.naarOorkonde = function() {
        this.oorkondeModus = true;
    };
    this.isNaamModus = function() {
        return !this.oorkondeModus;
    };
    this.isOorkondeModus = function() {
        return this.oorkondeModus;
    };
}
