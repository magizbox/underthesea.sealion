window.nlpElements.directive('acts', function ($filter) {
  return {
    templateUrl: './static/app/directives/act/dom.html',
    restrict: 'AE',
    scope: {
      'ngModel': '=',
      'suggestions': '=',
      'onaftersave': '&'
    },
    controller: function ($scope) {
      $scope.ACTS = [
        {value: "GREETING", text: 'GREETING'},
        {value: "SELFDISCLOSURE", text: 'SELFDISCLOSURE'},
        {value: "ORDER", text: 'ORDER'},
        {value: "QUESTION", text: 'QUESTION'},
        {value: "ANSWER", text: 'ANSWER'},
        {value: "INVITATION", text: 'INVITATION'},
        {value: "INFORMATION", text: 'INFORMATION'},
        {value: "THANKS", text: 'THANKS'},
        {value: "CURSE", text: 'CURSE'},
        {value: "APOLOGY", text: 'APOLOGY'},
        {value: "INTERJECTION", text: 'INTERJECTION'},
        {value: "CONGRATULATION", text: 'CONGRATULATION'},
        {value: "MISC", text: 'MISC'}
      ];

      $scope.showAct = function (act) {
        var selected = [];
        if (act.name) {
          selected = $filter('filter')($scope.ACTS, {value: act.name});
        }
        return selected.length ? selected[0].text : 'Not set';
      };

      $scope.save = function () {
        $scope.onaftersave();
      };

      $scope.addAct = function () {
        $scope.inserted = {
          id: $scope.ngModel.length + 1,
          name: ''
        };
        $scope.ngModel.push($scope.inserted);
      };

      $scope.removeAct = function (index) {
        $scope.ngModel.splice(index, 1);
        $scope.save();
      };

      $scope.score = function (y1, y2) {
        y1 = _.pluck(y1, "name");
        y2 = _.pluck(y2, "name");
        var n1 = y1.length;
        var n2 = y2.length;
        if (n1 == 0 && n2 == 0) {
          return 100;
        }
        if (n1 == 0 || n2 == 0) {
          return 0;
        }
        tp = _.intersection(y1, y2).length;
        p = tp / n1;
        r = tp / n2;
        if (p + r == 0) {
          return 0;
        }
        f = 100 * (2 * p * r) / (p + r);
        return Math.round(f);
      };

      $scope.validate = function (data) {
        var isValid = !_.chain(this.ngModel).pluck("name").initial().contains(data).value();
        if (!isValid) {
          return "It is not allowed duplicated value.";
        }
      };
      $scope.has = function (act) {
        var acts = _.pluck($scope.ngModel, "name");
        return _.contains(acts, act.name);
      };

      $scope.set = function (item) {
        if (!$scope.has(item)) {
          $scope.inserted = {
            id: $scope.ngModel.length + 1,
            name: item.name
          };
          $scope.ngModel.push($scope.inserted);
          $scope.inserted = null;
          $scope.save();
        }
      };

    }
  }
});
