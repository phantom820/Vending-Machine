describe('Testing vending machine app', function(){

    var scope,ctrl,service;
    var q;
    var products_mock = [{"code": 1, "name": "COKE", "price": 10, "count": 0},
    {"code": 1, "name": "COKE", "price": 10, "count": 0},
    {"code": 1, "name": "COKE", "price": 10, "count": 0},
    {"code": 1, "name": "COKE", "price": 10, "count": 0},
    {"code": 1, "name": "COKE", "price": 10, "count": 0},
    {"code": 1, "name": "COKE", "price": 10, "count": 0}]

    beforeEach(module('mainApp'));
    
    beforeEach(inject(function($controller,$rootScope,$q){
        scope = $rootScope.$new();
      
        service = jasmine.createSpyObj('dataService', ['getProducts','getCoins','updateCoins','purchaseProduct']);
        q = $q;
        service.getProducts.and.returnValue(q.when( {data:products_mock}));
        service.getCoins.and.returnValue(q.when( {data:[]}));
        scope.$apply();
        ctr = $controller('VendingController',{$scope:scope,dataService:service});
        
    }));

    describe('Testing VendingController', function(){
     
        beforeEach(function () {
            // service.getProducts.and.returnValue(q.when({ result: [] }));
           
            scope.$apply();
            // ctrl = ('VendingController',{$scope:scope,dataService:service})

        });
        
        it('should have correct initial state values', function(){
            q.defer().resolve();

            expect(scope.balance).toBe(0);
            expect(scope.product_available).toBe(true);
            expect(scope.coin_denominations).toEqual([1, 2, 5, 10]);
            expect(scope.product_available).toBe(true);
            expect(scope.sufficient_balance).toBe(true);
        })

        it('should have correct formating of data', function(){
            q.defer().resolve();
            var formated_data = scope.formatData(products_mock)

            expect(scope.products).toEqual(formated_data);
            
        })
    });
});
