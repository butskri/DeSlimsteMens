'use strict';

window.addEventListener('message', function(event)  {
	executeCommand(event.data.command, event.data.data);
});

function executeCommand(command, data) {
	var scope = childScope();
	scope.$apply(function() {
		if (command == 'updateSpelers') {
			scope.spelers = data;
		} else if (command == 'updateRonde') {
			scope.setHuidigeRonde(data);
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

	$scope.huidigeRonde = {
		id: 'begin',
		title: 'De slimste quizzer'
	};

	$scope.setHuidigeRonde = function(nieuweRonde) {
		$scope.huidigeRonde = nieuweRonde;
	}

	$scope.spelersTonen = function() {
		return $scope.huidigeRonde.id != 'begin';
	}

	function initSpelers() {
		$scope.spelers = new Spelers();
	}
	initSpelers();
});
