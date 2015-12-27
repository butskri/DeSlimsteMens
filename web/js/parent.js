var parentApp = angular.module('parentApp', []);

var childWindow = window.open("child.html", 'slimste_child');
function eventHappened(eventType, data) {
  childWindow.postMessage( { eventType: eventType, data: data }, '*');
}

parentApp.controller('ParentCtrl', function ($scope,$timeout,$http) {

  $scope.spelers;
  
  $scope.startSpel = function() {
	$scope.spelers = new Spelers()
	$scope.spelers.add(new Speler('Speler 1'));
	$scope.spelers.add(new Speler('Speler 2'));
	$scope.spelers.add(new Speler('Speler 3'));
  }
  
  $scope.startSpel();
  $scope.menuHidden = true;
  
  $scope.addSecond = function() {
	$scope.addSeconds(1);
  }
  $scope.minusSecond = function() {
	$scope.addSeconds(-1);
  }
  $scope.addSeconds = function(punten) {
	$scope.spelers.voegPuntenToeVoorGeselecteerdeSpeler(punten);
    spelersUpdated();
  }
  
  $scope.switchSpeler = function() {
	$scope.spelers.switchSpeler();
    spelersUpdated();
  }

  function spelersUpdated() {
    eventHappened('spelersUpdated', $scope.spelers);
  }

});