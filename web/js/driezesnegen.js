'use strict';

function DrieZesNegenRonde($scope){
    this.id = 'drieZesNegen';
    this.title = '3 - 6 - 9';
    this.aantalSecondenVoorJuisteVraag = 0;
    this.huidigeVraag = 1;
    this.isStartTimerEnabled = function() {
        return false;
    };
    this.vorigeRonde = function() {
        return $scope.deSlimsteMensBegin;
    };
    this.volgendeRonde = function() {
        return $scope.openDeurRonde;
    };
    this.isVorigeEnabled = function() {
        return this.huidigeVraag > 1;
    };
    this.isVolgendeEnabled = function() {
        return this.huidigeVraag < 15;
    };
    this.vorige = function() {
        if (this.isVorigeEnabled()) {
            this.huidigeVraag--;
        }
        this.recalculateAantalSecondenVoorVraag();
    };
    this.volgende = function() {
        if (this.isVolgendeEnabled()) {
            this.huidigeVraag++;
        }
        this.recalculateAantalSecondenVoorVraag();
    };
    this.recalculateAantalSecondenVoorVraag = function() {
        if (this.huidigeVraag%3 == 0) {
            this.aantalSecondenVoorJuisteVraag = 10;
        } else {
            this.aantalSecondenVoorJuisteVraag = 0;
        }
    };
    this.styleClassVoorVraag = function(vraagNr) {
        var nr = vraagNr % 3;
        if (nr == 0) {
            nr = 3;
        }
        var result = 'drieZesNegen' + nr;
        if (vraagNr == this.huidigeVraag) {
            result += " selected";
        }
        return  result;
    };
    this.getLink = function() {
        return this.getHuidigeVraag().link;
    };

    this.getHuidigeVraag = function() {
        if (!$scope.deSlimsteData) {
            return {};
        }
        if (!$scope.deSlimsteData.drieZesNegen) {
            return {};
        }
        var result = $scope.deSlimsteData.drieZesNegen['vraag' + this.huidigeVraag];
        if (!result) {
            return {
                vraag: 'Geen vraag gekend voor ' + this.huidigeVraag,
                antwoord: 'Geen antwoord gekend voor ' + this.huidigeVraag
            };
        }
        return result;
    };
}
