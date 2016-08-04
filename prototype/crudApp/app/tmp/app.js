(function(){
	'use strict';

	angular.module('app.module', []);
})();
(function(){
	'use strict';

	angular.module("app.module")
		.config(configManager);

	configManager.$inject = [];

	function configManager(){

	}
})();
(function(){
	"use strict";

	angular.module("app.module")
		.controller("appController", appController);

	appController.$inject = ['appService'];

	function appController(appService){
		var vm = this;

		vm.posts = [];

		activate();

		//////////////////////

		function activate(){
			appService.getPost().then(successPost, errorPost);

			function successPost(data){
				vm.posts = data;
			}

			function errorPost(error){
				console.log(error);
			}
		}
	}
})();
(function(){
	"use strict";

	angular.module("app.module")
		.service("appService", appService);

	appService.$inject = ['$http', '$q'];

	function appService($http, $q){
		var vm = this;

		vm.http = $http;
		vm.queue = $q;
		vm.url = "http://jsonplaceholder.typicode.com";
	}

	appService.prototype.getPost = getPost;

	function getPost() {
		var deffered = this.queue.defer();

		this.http({
			url: this.url + '/posts',
			method: 'GET'
		})
		.success(function(data){
			deffered.resolve(data);
		})
		.error(function(error){
			deffered.reject(error);
		})

		return deffered.promise;
	};
})();