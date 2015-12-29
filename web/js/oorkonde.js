function Oorkonde($scope) {
    this.id =  'oorkonde';
    this.title = 'Oorkonde';
    this.naamWinnaar = 'Volledige naam winnaar';
    this.oorkondeModus =  false;
    this.slimsteTitel;
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
        this.slimsteTitel = $scope.deSlimsteData.titel;
        this.oorkondeModus = true;
        this.updateOorkondeInChildWindow();
    };
    this.isNaamModus = function() {
        return !this.oorkondeModus;
    };
    this.isOorkondeModus = function() {
        return this.oorkondeModus;
    };
    this.updateOorkondeInChildWindow = function() {
        executeCommandInChildWindow('updateOorkonde', {
            oorkondeModus: this.oorkondeModus,
            naamWinnaar: this.naamWinnaar,
            slimsteTitel: this.slimsteTitel
        } );
    };
}
