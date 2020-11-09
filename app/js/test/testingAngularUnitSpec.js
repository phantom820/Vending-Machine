describe('Testing vending machine app', function(){

    var scope,ctrl,service;
    var q;

    beforeEach(module('mainApp'));
    
    beforeEach(inject(function($controller,$rootScope,$q){
        scope = $rootScope.$new();
      
        service = jasmine.createSpyObj('dataService', ['getProducts','getCoins','updateCoins','purchaseProduct']);
        q = $q;
        service.getProducts.and.returnValue(q.when( {data:[]}));
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
    });
});
