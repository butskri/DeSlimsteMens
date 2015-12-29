'use strict';

function DeFinale($scope) {
    this.id = 'deFinale';
    this.title = 'De Finale';
    this.indexHuidigeVraag = 0;
    this.huidigeVraag = null;
    this.spelersTonen = function() {
        return !this.isSelecteerFinaleSpelersModus();
    };
    this.teVeelSpelers = function() {
        return $scope.spelers.aantalSpelers() > 2;
    };
    this.startFinale = function() {
        this.volgende();
    };
    this.getVragen = function() {
        if ($scope.deSlimsteData == null) {
            return [];
        }
        return $scope.deSlimsteData.finale;
    };
    this.isStartTimerEnabled = function() {
        return this.huidigeVraag != null && this.huidigeVraag.vraagTonen;
    };
    this.vorigeRonde = function() {
        return $scope.collectiefGeheugen;
    };
    this.volgendeRonde = function() {
        if (!$scope.spelers.istGebeurd()) {
            return $scope.deFinale;
        }
        return $scope.oorkonde;
    };
    this.initHuidigeVraag = function() {
        if (this.indexHuidigeVraag == 0) {
            this.huidigeVraag = null;
            return ;
        }
        var vraag = this.getVragen()[this.indexHuidigeVraag -1];
        this.huidigeVraag = {
            nummer: this.indexHuidigeVraag,
            vraag: vraag.vraag,
            antwoorden: $scope.toAntwoorden(vraag.antwoorden),
            vraagTonen: false
        };
        this.updateFinaleInChildWindow();
    };
    this.toonHuidigeVraag = function() {
        if (!$scope.spelers.isSpelerGeselecteerd()) {
            return;
        }
        this.huidigeVraag.vraagTonen = true;
        $scope.startTimer();
        this.updateFinaleInChildWindow();
    };
    this.isVorigeEnabled = function() {
        return this.isVragenModus() && this.indexHuidigeVraag != 0;
    };
    this.isVolgendeEnabled = function() {
        return this.isVragenModus() && (this.indexHuidigeVraag < this.getVragen().length);
    };
    this.volgende = function() {
        if (this.teVeelSpelers()) {
            return;
        }
        this.indexHuidigeVraag++;
        this.initHuidigeVraag();
    };
    this.vorige = function() {
        if (this.indexHuidigeVraag != 0) {
            this.indexHuidigeVraag--;
            this.initHuidigeVraag();
        }
    };
    this.isVragenModus = function() {
        return !this.istGebeurd() && !this.isSelecteerFinaleSpelersModus();
    };
    this.isSelecteerFinaleSpelersModus = function() {
        return !this.istGebeurd() && (this.indexHuidigeVraag == 0 || this.teVeelSpelers());
    };
    this.istGebeurd = function() {
        return $scope.spelers.istGebeurd();
    };
    this.toonAntwoord = function(antwoord) {
        antwoord.gevonden = !antwoord.gevonden;
        var aantalPunten = $scope.bepaalPuntenVoor(antwoord, -20);
        $scope.spelers.voegPuntenToeVoorNietGeselecteerdeSpelers(aantalPunten);
        if (this.alleAntwoordenGevonden()) {
            $scope.stopTimer();
        }
        this.updateFinaleInChildWindow();
    };
    this.alleAntwoordenGevonden = function() {
        for (var i=0;i < this.huidigeVraag.antwoorden.length;i++) {
            if (!this.huidigeVraag.antwoorden[i].gevonden) {
                return false;
            }
        }
        return true;
    };
    this.updateFinaleInChildWindow = function() {
        if (this.istGebeurd()) {
            executeCommandInChildWindow('updateFinale', { tisGebeurd: true } );
        } else if (this.isVragenModus()) {
            executeCommandInChildWindow('updateFinale', { tisGebeurd: false, huidigeVraag: this.huidigeVraag } );
        } else {
            executeCommandInChildWindow('updateFinale', { tisGebeurd: false } );
        }
    };
}
