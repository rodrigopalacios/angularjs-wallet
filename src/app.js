
var gifwalletApp = angular.module('gifwalletApp', ['ui.bootstrap']);
/*
gifwalletApp.controller('GifListController', function($scope)
{

	var images = [{
			name: 'Corgi Bailarín',
			url: 'http://media.giphy.com/media/12co3H23YQXLYk/giphy.gif',
			tags: ['corgi', 'baile', 'lol'],
			favorite: true
		}, {
			name: 'Michael Scott',
			url: 'http://media.giphy.com/media/zIPKUgO2Ln6XC/giphy.gif',
			tags: ['the office', 'michael scott', 'asap'],
			favorite: false
		}];    
		
	$scope.giflist = images;
	
});
*/

gifwalletApp.controller('GifListController', ['$scope', '$rootScope','Storage', 
	function($scope, $rootScope, Storage)
	{
		$scope.giflist = Storage.list();
		
		$rootScope.$on('StorageUpdatedEvent', 
			function(event, data)
			{
				$scope.giflist = Storage.list();
			}
		);
	}
]);

gifwalletApp.controller('MenuController', ['$scope', '$rootScope', '$modal', 'Storage',
    function($scope, $rootScope, $modal, Storage) 
	{
		/*
        $scope.add = function() 
		{
            var url = prompt('Ingrese una URL');
            if (url != null) 
			{
                var image = {
                    'name': 'Ejemplo',
                    'url': url,
                    'tags': [],
                    'favorite': false
                };
                Storage.save(image);
				
				 $rootScope.$broadcast('StorageUpdatedEvent');
            }
        };
		*/
		$scope.add = function() {
			$modal.open({
				templateUrl: 'add_gif.html',
				controller: function($scope, $modalInstance) 
				{
					$scope.Gif = {};

                    $scope.save = function() 
					{
                        var image = {
                            'name': $scope.Gif.name,
                            'url': $scope.Gif.url,
                            'tags': [],
                            'favorite': false
						};
                    
						Storage.save(image);
							
						$rootScope.$broadcast('StorageUpdatedEvent');
						$modalInstance.dismiss('cancel');
					},	
					
					$scope.cancel = function() 
					{
						$modalInstance.dismiss('cancel');
					};
				}
			});
		};
        
    }
]);

gifwalletApp.service('Storage', ['$window', 
	function($window) 
	{
        var images = [];
        
		if (!$window.localStorage) {
			alert('No tienes localStorage activado');
		} else {
			images = $window.localStorage.getItem('gifWallet');
		}

        this.save = function(image) 
		{
			if (images == null) {
				images = [];
			}
			else {
				images = angular.fromJson(images);    
			}
			images.push(image);
			imagesString = JSON.stringify(images);
			$window.localStorage.setItem('gifWallet', imagesString);
        }

        this.get = function(key) {

        }

        this.remove = function(key) {

        }

        this.list = function() {
            return angular.fromJson($window.localStorage.getItem('gifWallet'));
        }
    }
]);

gifwalletApp.directive('favorite', ['Storage', '$compile',
    function (Storage, $compile) {
        return {
            restrict: 'E',
            replace: true,
            link: function(scope, elem, attrs) 
			{
				html = '<a><span class="glyphicon"></span> Favorito</a>';
                elem.replaceWith($compile(html)(scope));
            },
            scope: true
        }
    }   
]);

