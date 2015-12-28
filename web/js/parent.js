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
  }
  $scope.volgendeRonde = function() {
    setHuidigeRonde($scope.huidigeRonde.volgendeRonde());
  }
  $scope.vorigeRonde= function() {
    setHuidigeRonde($scope.huidigeRonde.vorigeRonde());
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
  
  $scope.switchSpeler = function() {
	$scope.spelers.switchSpeler();
    updateSpelersInChildWindow();
  }

  // private methods
  function initializeerSpel() {
    setHuidigeRonde($scope.deSlimsteMensBegin);
    $scope.spelers = new Spelers()
    $scope.spelers.add(new Speler('Speler 1'));
    $scope.spelers.add(new Speler('Speler 2'));
    $scope.spelers.add(new Speler('Speler 3'));
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