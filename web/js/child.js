window.addEventListener('message', function(event)  {
	eventHappened(event.data.eventType, event.data.data);
});

function eventHappened(eventType, data) {
	var scope = childScope();
	scope.$apply(function() {
		if (eventType == 'spelersUpdated') {
			scope.spelersUpdated(data);
		}
	});
}

function childScope() {
	var body = document.getElementById('childBody');
	var angularBody = angular.element(body);
	return angularBody.scope();
}

var childApp = angular.module('childApp', []);

childApp.controller('ChildCtrl', function ($scope,$timeout,$http) {

	$scope.spelersUpdated = function(spelers) {
		$scope.spelers = spelers;
	};

	function initSpelers() {
		$scope.spelers = new Spelers();
		$scope.spelers.add(new Speler('Speler A'));
		$scope.spelers.add(new Speler('Speler B'));
		$scope.spelers.add(new Speler('Speler C'));
	}
	initSpelers();
});
