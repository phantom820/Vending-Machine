mainApp.factory('dataFactory', function($http) {
        var factory={};

        factory.getProducts = function() {
            return $http({
                method : "GET",
                    url : "http://0.0.0.0:5000/products",
                    headers: {
                        "Content-Type": "application/json"
                    }
            });
        }

        factory.purchaseProduct = function(code) {
            return $http({
                method : "PATCH",
                    url : "http://0.0.0.0:5000/products/purchase",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    data: {"code":code}
            });
        }
        factory.getCoins = function() {
            return $http({
                method : "GET",
                    url : "http://0.0.0.0:5000/coins",
                    headers: {
                        "Content-Type": "application/json"
                    },
            });
        }

        factory.updateCoins = function(change){
            return $http({
                method : "PATCH",
                    url : "http://0.0.0.0:5000/coins/update",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    data : change
            });
        }

        
        return factory;
    });

mainApp.service('dataService', function(dataFactory) {

        this.getProducts = function(){
            return dataFactory.getProducts();
        }

        this.purchaseProduct = function(code) {
            return dataFactory.purchaseProduct(code);
        }

        this.getCoins = function() {
            return dataFactory.getCoins();
        }

        this.updateCoins = function(change){
            return dataFactory.updateCoins(change)
        }
    });

