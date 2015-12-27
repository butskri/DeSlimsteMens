function OpenDeurRonde($scope) {
    this.id = 'openDeur';
    this.title = 'Open deur';
    this.huidigeVraag = null;
    this.antwoorden = null;
    this.isStartTimerEnabled = function() {
        return this.isInModusAntwoord();
    };
    this.vorigeRonde = function() {
        return $scope.drieZesNegenRonde;
    };
    this.volgendeRonde = function() {
        return $scope.puzzelRonde;
    };
    this.toonAntwoorden = function(vraag) {
        if (!$scope.spelers.isSpelerGeselecteerd()) {
            return;
        }
        this.huidigeVraag = vraag;
        this.antwoorden = $scope.toAntwoorden(vraag.antwoorden);
        $scope.startTimer();
    };
    this.toonAntwoord = function(antwoord) {
        antwoord.gevonden = !antwoord.gevonden;
        var aantalPunten = $scope.bepaalPuntenVoor(antwoord, 20);
        $scope.addSeconds(aantalPunten);
        if (this.alleAntwoordenGevonden()) {
            $scope.stopTimer();
        }
    };
    this.isInModusOverzicht = function() {
        return this.huidigeVraag == null;
    };
    this.isInModusAntwoord = function() {
        return this.huidigeVraag != null;
    };
    this.terugNaarOverzicht = function() {
        this.huidigeVraag = null;
        this.antwoorden = null;
    };
    this.alleAntwoordenGevonden = function() {
        for (i=0;i < this.antwoorden.length;i++) {
            if (!this.antwoorden[i].gevonden) {
                return false;
            }
        }
        return true;
    };
    this.getLink = function() {
        if (this.huidigeVraag == null) {
            return null;
        }
        return this.huidigeVraag.link;
    };
}
