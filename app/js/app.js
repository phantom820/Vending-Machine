var mainApp = angular.module("mainApp",['ngAnimate']);

mainApp.controller( "VendingController", function( $scope ){

    $scope.products;
    $scope.coin_denominations = [1, 2, 5, 10]

    $scope.init_products = (n)=>{
        var n_cols = 3;
        var n_rows = n/n_cols;

        $scope.products = [];
        for(var i=0; i<n_rows; i++){
            row = [];
            for(var j=0; j<n_cols; j++){
                row.push({name: "item"+i*n_cols+j, price: j*10});
            }
            $scope.products.push(row);
        }
    }

    $scope.init_products(12);

    console.log($scope.products)

});