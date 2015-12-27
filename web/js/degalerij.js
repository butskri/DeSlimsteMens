'use strict';

function DeGalerij($scope) {
    this.id = 'deGalerij';
    this.title = 'De galerij';
    this.indexHuidigeFoto = 0;
    this.galerijenIndex = 0;
    this.aantalSecondenVoorJuisteVraag = null;
    this.huidigeGalerij = null;
    this.overzichtAntwoordenScherm = false;
    this.antwoorden = [];
    this.startRonde = function() {
        var galerijen = this.getGalerijen();
        for (var i=0;i < galerijen.length;i++) {
            if (!galerijen[i].naam) {
                galerijen[i].naam = 'Galerij ' + (i+1);
            }
        }
    };
    this.isStartTimerEnabled = function() {
        return this.isGalerijModus() || (this.isOverzichtAntwoordenModus() && !this.alleAntwoordenGevonden());
    };
    this.vorigeRonde = function() {
        return $scope.puzzelRonde;
    };
    this.volgendeRonde = function() {
        return $scope.collectiefGeheugen;
    };
    this.getGalerijen = function() {
        if ($scope.deSlimsteData == null) {
            return [];
        }
        return $scope.deSlimsteData.galerijen;
    };
    this.maxGalerijenIndex = function() {
        return Math.floor(this.getGalerijen().length / 3);
    };
    this.getHuidigeGalerijen = function() {
        var galerijen = this.getGalerijen();
        var result = [];
        var indexFrom = this.galerijenIndex * 3;
        var indexTo = indexFrom + 2;
        if (indexTo >= galerijen.length -1) {
            indexTo = galerijen.length -1;
        }
        for (var i=indexFrom;i <= indexTo;i++) {
            result.push(galerijen[i]);
        }
        return result;
    };
    this.startGalerij = function(galerij) {
        if (!$scope.spelers.isSpelerGeselecteerd()) {
            return;
        }
        this.huidigeGalerij = galerij;
        this.indexHuidigeFoto = 1;
        this.antwoorden = [];
        this.aantalSecondenVoorJuisteVraag = 15;
        for (var i=0;i < galerij.fotos.length;i++) {
            this.antwoorden[i] = {omschrijving: 'Foto ' + (i+1), gevonden: false};
        }
        $scope.startTimer();
    };
    this.toonAntwoord = function(antwoord) {
        antwoord.gevonden = !antwoord.gevonden;
        if (antwoord.gevonden) {
            $scope.addSeconds(15);
            if (this.alleAntwoordenGevonden()) {
                $scope.stopTimer();
            }
        } else {
            $scope.addSeconds(-15);
        }
    };
    this.alleAntwoordenGevonden = function() {
        for (var i=0;i < this.antwoorden.length;i++) {
            if (!this.antwoorden[i].gevonden) {
                return false;
            }
        }
        return true;
    };
    this.overloopGalerij = function(galerij) {
        this.huidigeGalerij = galerij;
        this.indexHuidigeFoto = 1;
    };
    this.isButtonModus = function() {
        return !this.isGalerijModus() && !this.isOverzichtAntwoordenModus();
    };
    this.isGalerijModus = function() {
        return this.huidigeGalerij != null && !this.isOverzichtAntwoordenModus();
    };
    this.isOverzichtAntwoordenModus = function() {
        return this.overzichtAntwoordenScherm;
    };
    this.isVorigeEnabled = function() {
        return this.isGalerijModus() || this.isOverzichtAntwoordenModus() || (this.isButtonModus() && this.galerijenIndex > 0);
    };
    this.isVolgendeEnabled = function() {
        return this.isGalerijModus() || this.isOverzichtAntwoordenModus() || (this.isButtonModus() && this.galerijenIndex < this.maxGalerijenIndex());
    };
    this.juisteAntwoordGegeven = function() {
        this.antwoorden[this.indexHuidigeFoto-1].gevonden = true;
    };
    this.volgende = function() {
        if (this.isButtonModus()) {
            this.galerijenIndex++;
        } else if (this.isOverzichtAntwoordenModus()) {
            this.stopHuidigeGalerij();
        } else if (this.indexHuidigeFoto == this.huidigeGalerij.fotos.length) {
            this.naarOverzichtAntwoorden();
        } else {
            this.indexHuidigeFoto++;
        }
    };
    this.vorige = function() {
        if (this.isButtonModus()) {
            this.galerijenIndex--;
        } else if (this.isOverzichtAntwoordenModus()) {
            this.overzichtAntwoordenScherm = false;
        } else if (this.indexHuidigeFoto == 1) {
            this.stopHuidigeGalerij();
        } else {
            this.indexHuidigeFoto--;
        }
    };
    this.naarOverzichtAntwoorden = function() {
        $scope.stopTimer();
        this.overzichtAntwoordenScherm = true;
    };
    this.stopHuidigeGalerij = function() {
        $scope.stopTimer();
        this.huidigeGalerij = null;
        this.aantalSecondenVoorJuisteVraag = null;
        this.overzichtAntwoordenScherm = false;
        this.indexHuidigeFoto = 0;
    };
    this.urlHuidigeFoto = function() {
        if (!this.huidigeGalerij) {
            return '#';
        }
        var baseUrl = this.huidigeGalerij.baseUrl;
        return baseUrl + this.huidigeFoto().url;
    };
    this.styleClassHuidigeFoto = function() {
        if (this.huidigeFoto() == null) {
            return '';
        }
        if (this.huidigeFoto().verticaleFoto) {
            return 'galerijFoto verticaleFoto';
        }
        return 'galerijFoto horizontaleFoto';
    };
    this.huidigeFoto = function() {
        if (this.huidigeGalerij == null) {
            return null;
        }
        return this.huidigeGalerij.fotos[this.indexHuidigeFoto-1];
    };
    this.titelTonen = function() {
        return !this.isGalerijModus();
    };
    this.getLink = function() {
        if (!this.isOverzichtAntwoordenModus()) {
            return null;
        }
        return this.huidigeGalerij.link;
    };
}
