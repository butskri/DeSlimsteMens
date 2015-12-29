'use strict';

function PuzzelRonde($scope) {
    this.id ='puzzel';
    this.title = 'Puzzelronde';
    this.puzzels = [];
    this.huidigePuzzel = null;
    this.startRonde = function() {
        this.puzzels = $scope.deSlimsteData.puzzels;
        for (var i=0;i < this.puzzels.length;i++) {
            if (this.puzzels[i].naam == null) {
                this.puzzels[i].naam = 'Puzzel ' + (i+1);
            }
        }
        this.terugNaarOverzicht();
    };
    this.isStartTimerEnabled = function() {
        return this.isInModusPuzzel();
    };
    this.vorigeRonde = function() {
        return $scope.openDeurRonde;
    };
    this.volgendeRonde = function() {
        return $scope.deGalerij;
    };
    this.isInModusOverzicht = function() {
        return this.huidigePuzzel == null;
    };
    this.isInModusPuzzel = function() {
        return this.huidigePuzzel != null;
    };
    this.terugNaarOverzicht = function() {
        this.huidigePuzzel = null;
        executeCommandInChildWindow('updatePuzzel', {});
    };
    this.startPuzzel = function(puzzel) {
        if (!$scope.spelers.isSpelerGeselecteerd()) {
            return;
        }
        var alleHints = [];
        var result = [];
        for (var i=0;i < puzzel.antwoorden.length;i++) {
            var antwoord = {omschrijving: puzzel.antwoorden[i].antwoord, gevonden: false, index: i+1, styleClass: 'puzzelAntwoord' + (i+1)};
            for (var j=0;j < puzzel.antwoorden[i].hints.length;j++) {
                var hint = {
                    omschrijving: puzzel.antwoorden[i].hints[j],
                    antwoord: antwoord,
                    styleClass: ''
                };
                alleHints.push(hint);
            }
            result.push(antwoord);
        }
        this.huidigePuzzel = {
            naam: puzzel.naam,
            antwoorden: result,
            alleHints: this.shuffle(this.shuffle(alleHints))
        };
        $scope.startTimer();
        executeCommandInChildWindow('updatePuzzel', this.huidigePuzzel);
    };
    this.toonAntwoord = function(antwoord) {
        antwoord.gevonden = !antwoord.gevonden;
        var aantalPunten = $scope.bepaalPuntenVoor(antwoord, 30);
        $scope.addSeconds(aantalPunten);
        if (this.alleAntwoordenGevonden()) {
            $scope.stopTimer();
        }
        this.updateHintsVoor(antwoord);
        executeCommandInChildWindow('updatePuzzel', this.huidigePuzzel);
    };
    this.toonAlleAntwoorden = function(antwoord) {
        for (var i=0;i < this.huidigePuzzel.antwoorden.length;i++) {
            var antwoord = this.huidigePuzzel.antwoorden[i];
            antwoord.gevonden = true;
            this.updateHintsVoor(antwoord);
        }
        executeCommandInChildWindow('updatePuzzel', this.huidigePuzzel);
    };
    this.updateHintsVoor = function(antwoord) {
        var hints = this.huidigePuzzel.alleHints;
        for (var i=0;i < hints.length;i++) {
            if (hints[i].antwoord == antwoord) {
                if (antwoord.gevonden) {
                    hints[i].styleClass=antwoord.styleClass;
                } else {
                    hints[i].styleClass='';
                }
            }
        }
    };
    this.alleAntwoordenGevonden = function() {
        for (var i=0;i < this.huidigePuzzel.antwoorden.length;i++) {
            if (!this.huidigePuzzel.antwoorden[i].gevonden) {
                return false;
            }
        }
        return true;
    };
    this.shuffle = function(array) {
        var counter = array.length, temp, index;

        // While there are elements in the array
        while (counter > 0) {
            // Pick a random index
            index = Math.floor(Math.random() * counter);

            // Decrease counter by 1
            counter--;

            // And swap the last element with it
            temp = array[counter];
            array[counter] = array[index];
            array[index] = temp;
        }

        return array;
    };
}
