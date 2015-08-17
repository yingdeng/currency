// create the module and name it scotchApp
var app = angular.module('app', ['ngRoute', 'inputAmount', 'demo']);

// configure our routes
app.config(function($routeProvider) {
	$routeProvider

		// route for the home page
		.when('/', {
			templateUrl : 'pages/exchange.html',
			controller  : 'exchController'
		})

		// route for the about page
		.when('/news', {
			templateUrl : 'pages/news.html',
			controller  : 'newsController'
		})

		// otherwise
		.otherwise({
            redirectTo: 'pages/exchange.html'
        });
});

// create the controller and inject Angular's $scope
app.controller('exchController', function($scope) {
	// create a message to display in our view
	$scope.amountNo = {number: 10000, validity: true};

	$scope.title = "exchange";
	//$scope.message = 'Everyone come and see how good I look!';
	$scope.exchangePackage = [

	    {exchType: "USD / RMB", base:1.25},
	    {exchType: "EUR / GBP", base:2.25},
	    {exchType: "USD / CAD", base:3.25},
	    {exchType: "AUD / JPY", base:4.25},
	    {exchType: "AUD / USD", base:5.25},
	    {exchType: "GBP / JPY", base:6.25}
	]                         

});

app.controller('newsController', function($scope) {
	$scope.message = 'Look! I am the news page.';
});

var inputAmount = angular.module('inputAmount', []);
inputAmount.directive('isNumber', function(){
	return {
		require: 'ngModel',
		link: function(scope){
			scope.$watch('amountNo.number', function(newValue, oldValue){
				var arr = String(newValue).split("");
				if (arr.length === 0) return;
				if (arr.length === 1 && (arr[0] == '-' || arr[0] === '.')) return;
				if (arr.length === 2 && newValue === '-.') return; 
				if (isNaN(newValue)) {
					scope.amountNo.number = oldValue;
				}
			});
		}
	}
});

var demo = angular.module('demo', []);
demo.directive('tradeBoard', function ($timeout) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            exchange: '=exchange',
            alert: '=alert',
        },
        templateUrl: 'pages/template.html',
        link: function (scope, element, attrs, controller) {
            
            console.log(scope.exchange);
            console.log(scope.exchange.base);

            var getRandomInt = function (min, max) {
            	return (Math.ceil((Math.random() * (max - min + 1)) * 10)) / 10+ min;
            };

            scope.generator = function(){
            	scope.ask = getRandomInt(1, 99);
                scope.bid = getRandomInt(1, scope.ask - 1);
            };
            
            // Initial update time as 10 sec
            var updateTime = 10000;
            (function update() {
                $timeout(update, updateTime);
                scope.generator();
            }());

            // Push data in to table
            scope.alerts = [];
            scope.pushAlerts = function(action, volume, type, value) {
            	scope.alerts.push({
            		 action: $action,
                     volume: $volume,
                       type: $type,
                      value: $value
            	});
            };


            scope.bid = (Math.ceil((Math.random() * (scope.exchange.base) + 1) * 100)) / 100;
            scope.bidAction = function () {
                console.log('Buy', scope.amountNo, scope.exchange.exchType, scope.bid);
                scope.pushAlerts('Buy', scope.amountNo, scope.exchange, scope.bid);
            };
           
            scope.ask = (Math.ceil((Math.random() * (scope.exchange.base) + 1) * 100)) / 100;
            scope.askAction = function () {
                console.log('Sell', scope.amountNo, scope.exchange.exchType, scope.ask);
                scope.pushAlerts('Sell', scope.amountNo, scope.exchange, scope.ask);
            };

        }
    }
});
