window.nlpElements.directive('categories', function ($filter) {
    return {
        templateUrl: './static/app/directives/category/dom.html',
        restrict: 'AE',
        scope: {
            'ngModel': '=',
            "onaftersave": "&"
        },
        controller: function ($scope) {
            $scope.CATEGORIES = [
                {value: "ACCOUNT", text: 'ACCOUNT'},
                {value: "CARD", text: 'CARD'},
                {value: "CUSTOMER SUPPORT", text: 'CUSTOMER SUPPORT'},
                {value: "INTEREST RATE", text: 'INTEREST RATE'},
                {value: "INTERNET BANKING", text: 'INTERNET BANKING'},
                {value: "LOAN", text: 'LOAN'},
                {value: "MONEY TRANSFER", text: 'MONEY TRANSFER'},
                {value: "PAYMENT", text: 'PAYMENT'},
                {value: "DISCOUNT", text: 'DISCOUNT'},
                {value: "PROMOTION", text: 'PROMOTION'},
                {value: "SAVING", text: 'SAVING'},
                {value: "SECURITY", text: 'SECURITY'},
                {value: "TRADEMARK", text: 'TRADEMARK'},
                {value: "OTHER", text: 'OTHER'},
            ];


            $scope.save = function(){
                $scope.onaftersave();
            };

             $scope.validate = function(data){
                var isValid = !_.chain(this.ngModel).pluck("name").initial().contains(data).value();
                if(!isValid){
                    return "It is not allowed duplicated value.";
                }
            };

            $scope.showCategory = function (category) {
                var selected = [];
                if (category.name) {
                    selected = $filter('filter')($scope.CATEGORIES, {value: category.name});
                }
                return selected.length ? selected[0].text : 'Not set';
            };

            $scope.addCategory = function () {
                $scope.inserted = {
                    id: $scope.ngModel.length + 1,
                    name: ''
                };
                $scope.ngModel.push($scope.inserted);
            };

            $scope.remove = function (index) {
                $scope.ngModel.splice(index, 1);
                $scope.save();
            };
        }
    }
});
