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