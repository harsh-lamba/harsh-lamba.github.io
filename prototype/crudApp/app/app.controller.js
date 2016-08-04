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