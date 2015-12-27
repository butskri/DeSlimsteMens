'use strict';

function CollectiefGeheugen($scope) {
    this.id = 'collectiefGeheugen';
    this.title = 'Collectief Geheugen';
    this.huidigeVideo = null;
    this.startRonde = function() {
        var videos = this.getVideos();
        for (var i=0;i < videos.length;i++) {
            if (!videos[i].naam) {
                videos[i].naam = 'Video ' + (i+1);
            }
        }
    };
    this.isStartTimerEnabled = function() {
        return this.isAntwoordModus();
    };
    this.vorigeRonde = function() {
        return $scope.deGalerij;
    };
    this.volgendeRonde = function() {
        return $scope.deFinale;
    };
    this.getVideos = function() {
        if ($scope.deSlimsteData == null) {
            return [];
        }
        return $scope.deSlimsteData.collectiefGeheugen.videos;
    };
    this.startVideo = function(video) {
        window.open(video.urlVideo);
    };
    this.toonAntwoorden = function(video) {
        if (!$scope.spelers.isSpelerGeselecteerd()) {
            return;
        }
        this.huidigeVideo = {
            antwoorden: $scope.toAntwoorden(video.antwoorden)
        };
        $scope.startTimer();
    };
    this.isOverzichtModus = function() {
        return this.huidigeVideo == null;
    };
    this.isAntwoordModus = function() {
        return this.huidigeVideo != null;
    };
    this.toonAntwoord = function(antwoord) {
        antwoord.gevonden = !antwoord.gevonden;
        var aantalPunten = this.bepaalPuntenVoorAntwoord(antwoord);
        $scope.addSeconds(aantalPunten);
        if (this.alleAntwoordenGevonden()) {
            $scope.stopTimer();
        }
    };
    this.bepaalPuntenVoorAntwoord = function(antwoord) {
        var aantalJuisteAntwoorden = this.telAantalJuisteAntwoorden();
        if (antwoord.gevonden) {
            return aantalJuisteAntwoorden * 10;
        } else {
            return - (aantalJuisteAntwoorden + 1) * 10;
        }
    };
    this.telAantalJuisteAntwoorden = function() {
        var aantal = 0;
        for (var i=0;i < this.huidigeVideo.antwoorden.length;i++) {
            if (this.huidigeVideo.antwoorden[i].gevonden) {
                aantal++;
            }
        }
        return aantal;
    };
    this.alleAntwoordenGevonden = function() {
        for (var i=0;i < this.huidigeVideo.antwoorden.length;i++) {
            if (!this.huidigeVideo.antwoorden[i].gevonden) {
                return false;
            }
        }
        return true;
    };
    this.terugNaarOverzicht = function() {
        this.huidigeVideo = null;
    };
}
