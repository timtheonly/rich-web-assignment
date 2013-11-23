'use strict';

angular.module('assignmentApp')
  .controller('loginCtrl', function ($scope, $http) {
	$scope.login = function(){
		$http.post('/users', {username: $scope.username, password: $scope.password})
		.success(function(data,status,headers,config){
			if(data === 'ok')
			{
				//TODO:: redirect logged in user

			}else{
				$scope.message = data;
				$scope.password ='';
			}
		});
		console.log($scope.message);
	};
});
