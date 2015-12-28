'use strict';

function executeCommandInChildWindow(command, data) {
}

var deSlimsteMensApp = angular.module('deSlimsteMensApp', []);

var slimsteQuizen = {};
slimsteQuizen['voorbeeldQuiz.txt'] = voorbeeldQuiz;
slimsteQuizen['deSlimsteMensVan2014.txt'] = dataDeSlimsteMensVan2014Data;
slimsteQuizen['hetSlimsteKindVan2014.txt'] = dataHetSlimsteKindVan2014;

deSlimsteMensApp.controller('DeSlimsteMensCtrl', function ($scope,$timeout,$http) {
  $scope.mogelijkeQuizzen = [
	{naam: 'Voorbeeld quiz' , url:'voorbeeldQuiz.txt'},
	{naam: 'De slimste mens van 2014' , url:'deSlimsteMensVan2014.txt'},
	{naam: 'Het slimste kind van 2014', url:'hetSlimsteKindVan2014.txt'}
  ];
  $scope.geselecteerdeQuiz = null;
  $scope.deSlimsteData = null;
  $scope.spelers;
  $scope.spelersTonen = function() {
	if ($scope.huidigeRonde.spelersTonen == null) {
		return true;
	}
	return $scope.huidigeRonde.spelersTonen();
  };
  $scope.titelTonen = function() {
	if (!$scope.huidigeRonde.titelTonen) {
		return true;
	}
	return $scope.huidigeRonde.titelTonen();
  };
  $scope.deSlimsteMensBegin = new DeSlimsteMensBegin($scope);
  $scope.drieZesNegenRonde = new DrieZesNegenRonde($scope);
  $scope.openDeurRonde = new OpenDeurRonde($scope);
  $scope.puzzelRonde = new PuzzelRonde($scope);
  $scope.deGalerij  = new DeGalerij($scope);
  $scope.collectiefGeheugen  = new CollectiefGeheugen($scope);
  $scope.deFinale  = new DeFinale($scope);
  $scope.oorkonde  = new Oorkonde($scope);
  
  $scope.startSpel = function() {
	$scope.setHuidigeRonde($scope.deSlimsteMensBegin);
	$scope.spelers = new Spelers()
	$scope.spelers.add(new Speler('Speler 1'));
	$scope.spelers.add(new Speler('Speler 2'));
	$scope.spelers.add(new Speler('Speler 3'));
  }
  $scope.startQuiz = function() {
	if ($scope.geselecteerdeQuiz == null) {
		return ;
	}
	$scope.deSlimsteData = slimsteQuizen[$scope.geselecteerdeQuiz.url];
	$scope.volgendeRonde();
  }
  $scope.volgendeRonde = function() {
	$scope.setHuidigeRonde($scope.huidigeRonde.volgendeRonde());
  }
  $scope.vorigeRonde= function() {
	$scope.setHuidigeRonde($scope.huidigeRonde.vorigeRonde());
  }
  $scope.setHuidigeRonde = function(nieuweRonde) {
	$scope.huidigeRonde = nieuweRonde;
	if ($scope.huidigeRonde.startRonde) {
		$scope.huidigeRonde.startRonde();
	}
  }
  
  $scope.startSpel();
  $scope.menuHidden = true;
  
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
  
  $scope.toAntwoorden = function(antwoorden) {
	var result = [];
	for (var i =0;i < antwoorden.length;i++) {
		var antwoord = {omschrijving: antwoorden[i], gevonden: false};
		result.push(antwoord);
	}
	return result;
  }
  $scope.bepaalPuntenVoor = function(antwoord, aantalPuntenVoorGevondenAntwoord) {
	if (antwoord.gevonden) {
		return aantalPuntenVoorGevondenAntwoord;
	} else {
		return -aantalPuntenVoorGevondenAntwoord;
	}
  }
  
  $scope.isSwitchSpelerEnabled = function() {
	return $scope.huidigeRonde != $scope.deSlimsteMensBegin;
  }
  $scope.switchSpeler = function() {
	if (!$scope.isSwitchSpelerEnabled()) {
		return;
	}
	$scope.spelers.switchSpeler();
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

});