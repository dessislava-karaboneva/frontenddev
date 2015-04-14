'use strict';

/**
 * @ngdoc function
 * @name frontenddevApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the frontenddevApp
 */
angular.module('frontenddevApp')
  .controller('MainCtrl', function ($scope, $http) { 	
  	$scope.question = 'Would you buy a smartwatch?';
    $scope.choices = ['Yes', 'No', 'Neutral'];

    $scope.getInclude = function() {    	
    	if($scope.response){
	        return 'views/response.html';
	    }
	    return 'views/main.html';
	};
    
    $scope.getResults = function() {
        var response = $http.get('/response.json');
		response.success(function (data) {
			$scope.data = data;
			$scope.response = true;
  			
  			// calculate percent value for each answer
  			var totalVotes = data.results.distribution[0] + data.results.distribution[1] + data.results.distribution[2];
			$scope.result0 =  Math.round(data.results.distribution[0] / totalVotes * 100);
			$scope.result1 =  Math.round(data.results.distribution[1] / totalVotes * 100);
			$scope.result2 =  Math.round(data.results.distribution[2] / totalVotes * 100);
		});
		response.error(function () {
			throw new Error('Something went wrong...');
		});
	};
  });
