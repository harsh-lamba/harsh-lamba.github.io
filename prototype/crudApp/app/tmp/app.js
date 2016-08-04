(function(){
	'use strict';

	angular.module('app.module', [
		'common.module'
	]);
})();
(function(){
	'use strict';

	angular.module('common.module', []);
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

	appController.$inject = ['appService', '$timeout'];

	function appController(appService, $timeout){
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
	'use strict';

	angular.module('common.module')
		.directive("pagination", pagination);

	pagination.$inject = [];	

	function pagination(){
		var directive;

		directive = {
			restrict : 'AE',
			scope: true,
			template : '<h2>pagination</h2>',
			compile : compileFunction
		};

		return directive;

		//////////////////////

		function compileFunction(element, attributes){
			var linkFunction = linkFunction;

            return linkFunction;

            //////////////////

            function linkFunction(scope, element, attributes){
        		console.log(scope, element, attributes);
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
(function(){
	'use strict';

	angular.module('common.module')
		.service("commonService", commonService);

	commonService.$inject = [];

	function commonService(){
		
	}
})();