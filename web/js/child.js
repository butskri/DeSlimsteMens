'use strict';

window.addEventListener('message', function(event)  {
	executeCommand(event.data.command, event.data.data);
});

function executeCommand(command, data) {
	var scope = childScope();
	scope.$apply(function() {
		if (command == 'updateSpelers') {
			scope.spelers = data;
		} else if (command == 'updateTitel') {
			scope.titel = data;
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

	$scope.titel = 'De slimste quizzer';

	function initSpelers() {
		$scope.spelers = new Spelers();
		$scope.spelers.add(new Speler('Speler A'));
		$scope.spelers.add(new Speler('Speler B'));
		$scope.spelers.add(new Speler('Speler C'));
	}
	initSpelers();
});
