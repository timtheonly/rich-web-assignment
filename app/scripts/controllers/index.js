'use strict';

angular.module('assignmentApp')
  	.controller('loginCtrl', function ($scope, $http, $modal) {
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
	};
	
	$scope.open = function () {

    var modalInstance = $modal.open({
      templateUrl: 'partials/signUpModal.html',
      controller: 'ModalCtrl',
      keyboard: false,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });
	};
	
}).controller('ModalCtrl', function($scope, $modalInstance){
	$scope.ok = function(){
		$modalInstance.close();
	};

	$scope.cancel = function(){
		$modalInstance.close('canceled');
	};
});
