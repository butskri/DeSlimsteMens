'use strict';

var slimsteQuizen = {};
slimsteQuizen['voorbeeldQuiz.txt'] = voorbeeldQuiz;
slimsteQuizen['deSlimsteMensVan2014.txt'] = dataDeSlimsteMensVan2014Data;
slimsteQuizen['hetSlimsteKindVan2014.txt'] = dataHetSlimsteKindVan2014;

var parentApp = angular.module('parentApp', []);
var childWindow = window.open("child.html", 'slimste_child');

function executeCommandInChildWindow(command, data) {
  childWindow.postMessage( { command: command, data: data }, '*');
}

parentApp.controller('ParentCtrl', function ($scope,$timeout,$http) {

  $scope.mogelijkeQuizzen = [
    {naam: 'Voorbeeld quiz' , url:'voorbeeldQuiz.txt'},
    {naam: 'De slimste mens van 2014' , url:'deSlimsteMensVan2014.txt'},
    {naam: 'Het slimste kind van 2014', url:'hetSlimsteKindVan2014.txt'}
  ];
  $scope.geselecteerdeQuiz = null;
  $scope.menuHidden = true;
  $scope.spelers;
  // rondes
  $scope.deSlimsteMensBegin = new DeSlimsteMensBegin($scope);
  $scope.drieZesNegenRonde = new DrieZesNegenRonde($scope);

  $scope.startQuiz = function() {
    if ($scope.geselecteerdeQuiz == null) {
      return ;
    }
    $scope.deSlimsteData = slimsteQuizen[$scope.geselecteerdeQuiz.url];
    $scope.volgendeRonde();
    updateSpelersInChildWindow();
    $scope.menuHidden = false;
  }
  $scope.volgendeRonde = function() {
    setHuidigeRonde($scope.huidigeRonde.volgendeRonde());
  }
  $scope.vorigeRonde = function() {
    setHuidigeRonde($scope.huidigeRonde.vorigeRonde());
  }

  // menu items
  $scope.vorige = function() {
    if (this.isVorigeEnabled()) {
      $scope.huidigeRonde.vorige();
    }
  }
  $scope.volgende = function() {
    if (this.isVolgendeEnabled()) {
      $scope.huidigeRonde.volgende();
    }
  }
  $scope.isVorigeEnabled = function() {
    if (!$scope.huidigeRonde.vorige) {
      return false;
    }
    if ($scope.huidigeRonde.isVorigeEnabled) {
      return $scope.huidigeRonde.isVorigeEnabled();
    }
    return true;
  }
  $scope.isVolgendeEnabled = function() {
    if (!$scope.huidigeRonde.volgende) {
      return false;
    }
    if ($scope.huidigeRonde.isVolgendeEnabled) {
      return $scope.huidigeRonde.isVolgendeEnabled();
    }
    return true;
  }

  $scope.isAddSecondEnabled = function() {
    return $scope.spelers.isSpelerGeselecteerd();
  }
  $scope.isMinusSecondEnabled = function() {
    return $scope.spelers.isSpelerGeselecteerd();
  }
  $scope.addSecond = function() {
    $scope.addSeconds(1);
  }
  $scope.minusSecond = function() {
    $scope.addSeconds(-1);
  }
  $scope.addSeconds = function(punten) {
    $scope.spelers.voegPuntenToeVoorGeselecteerdeSpeler(punten);
    updateSpelersInChildWindow();
  }

  var geselecteerdeSpelerCountdown = null;
  $scope.isStartTimerEnabled = function() {
    if (geselecteerdeSpelerCountdown != null) {
      return false;
    }
    if (!$scope.spelers.isSpelerGeselecteerd()) {
      return false;
    }
    if ($scope.huidigeRonde.isStartTimerEnabled) {
      return $scope.huidigeRonde.isStartTimerEnabled();
    }
    return true;
  }
  $scope.startTimer = function() {
    if (!$scope.isStartTimerEnabled()) {
      return;
    }
    geselecteerdeSpelerCountdown = $timeout($scope.countDown,1000);
  }
  $scope.stopTimer = function(){
    if (geselecteerdeSpelerCountdown) {
      $timeout.cancel(geselecteerdeSpelerCountdown);
      geselecteerdeSpelerCountdown = null;
    }
  }
  $scope.countDown = function(){
    if ($scope.spelers.istGebeurd() || !$scope.spelers.isSpelerGeselecteerd()) {
      $scope.stopTimer();
    } else {
      $scope.addSeconds(-1);
      geselecteerdeSpelerCountdown = $timeout($scope.countDown,1000);
    }
  }
  $scope.timerIsRunning = function(){
    return geselecteerdeSpelerCountdown != null;
  }

  $scope.spelerHeeftJuistGeantwoordIsEnabled = function() {
    return $scope.spelers.isSpelerGeselecteerd() && $scope.huidigeRonde.aantalSecondenVoorJuisteVraag != null;
  }
  $scope.spelerHeeftJuistGeantwoord = function() {
    if (!$scope.spelerHeeftJuistGeantwoordIsEnabled()) {
      return;
    }
    $scope.addSeconds($scope.huidigeRonde.aantalSecondenVoorJuisteVraag);
    if ($scope.huidigeRonde.juisteAntwoordGegeven) {
      $scope.huidigeRonde.juisteAntwoordGegeven();
    }
    $scope.huidigeRonde.volgende();
  }

  $scope.isSwitchSpelerEnabled = function() {
    return $scope.huidigeRonde != $scope.deSlimsteMensBegin;
  }
  $scope.switchSpeler = function() {
    if (!$scope.isSwitchSpelerEnabled()) {
      return;
    }
    $scope.spelers.switchSpeler();
    updateSpelersInChildWindow();
  }

  $scope.isLinkEnabled = function() {
    if ($scope.huidigeRonde.getLink == null) {
      return false;
    }
    return $scope.huidigeRonde.getLink() != null;
  }
  $scope.openLink = function() {
    if (!$scope.isLinkEnabled()) {
      return;
    }
    window.open($scope.huidigeRonde.getLink());
  }

  // private methods
  function initializeerSpel() {
    setHuidigeRonde($scope.deSlimsteMensBegin);
    $scope.spelers = new Spelers()
    $scope.spelers.add(new Speler('Speler 1'));
    $scope.spelers.add(new Speler('Speler 2'));
    $scope.spelers.add(new Speler('Speler 3'));

    $scope.$watch('drieZesNegenRonde.huidigeVraag', function(newValue, oldValue) {
      executeCommandInChildWindow('updateDrieZesNegenVraag', newValue);
    });
  }

  function setHuidigeRonde(nieuweRonde) {
    $scope.huidigeRonde = nieuweRonde;
    executeCommandInChildWindow('updateRonde', { id: $scope.huidigeRonde.id, title: $scope.huidigeRonde.title } );
    if ($scope.huidigeRonde.startRonde) {
      $scope.huidigeRonde.startRonde();
    }
  }

  function updateSpelersInChildWindow() {
    executeCommandInChildWindow('updateSpelers', $scope.spelers);
  }

  initializeerSpel();

});