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
        {value: "CAREER", text: 'CAREER'},
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


      $scope.save = function () {
        $scope.onaftersave();
      };

      $scope.validate = function (data) {
        var isValid = !_.chain(this.ngModel).pluck("name").initial().contains(data).value();
        if (!isValid) {
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
          confirm: null,
          name: ''
        };
        $scope.ngModel.push($scope.inserted);
      };

      $scope.remove = function (index) {
        $scope.ngModel.splice(index, 1);
        $scope.save();
      };

      $scope.confirmData = function (category, type) {
        if (type == 'correct') {
          if (category.confirm == true) {
            category.confirm = null;
          }
          else {
            category.confirm = true;
          }
        }
        else if (type == 'incorrect') {
          if (category.confirm == false) {
            category.confirm = null;
          }
          else {
            category.confirm = false;
          }
        }

        _.map($scope.ngModel, function (item) {
          if(item.name == category.name){
            item.confirm = category.confirm;
          }
        });

        $scope.save();
      }
    }
  }
});
