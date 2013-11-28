'use strict';

angular.module('assignmentApp')
  	.controller('loginCtrl', function ($scope, $http, $modal, $window) {
	$scope.login = function(){
		$http.post('/users/login', {username: $scope.username, password: $scope.password})
		.success(function(data,status,headers,config){
			if(data !== 'ok')
			{
				$scope.message = data;
				$scope.password ='';
			}else{
				$window.location.href = '/chat';
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
	
}).controller('ModalCtrl', function($scope, $http, $modalInstance){
	$scope.input ={};
	$scope.ok = function(){
		console.log($scope);
		$http.post('/users',$scope.input)
			.success(function(data,status,headers,config){
				if(data === 'ok'){
					$scope.createdAccount = true;
					setTimeout(function(){
						$modalInstance.close();
					}, 3000);

				}else if(data ==='user exsits'){
					$scope.usernameExists = true;
				}else{
					$scope.errorHappened = true;
				}
			})
			.error(function(){
				$scope.errorHappened = true;
			});
		
	};

	$scope.cancel = function(){
		$modalInstance.close('canceled');
	};
});
