window.nlpElements.directive('sentiments', function ($filter) {
  return {
    templateUrl: './static/app/directives/sentiment/dom.html',
    restrict: 'AE',
    scope: {
      'ngModel': '=',
      'suggestions': '=',
      "onaftersave": "&"
    },
    controller: function ($scope) {
      $scope.aspects = [
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

      $scope.save = function () {
        $scope.onaftersave();
      };

      $scope.validate = function (field, data) {
        if (field == "aspect") {
          if (!data) {
            return "Blank is not valid value.";
          }
          var isValid = !_.chain(this.ngModel).pluck("aspect").initial().contains(data).value();
          if (!isValid) {
            return "It is not allowed duplicated value.";
          }
        }

        if (field == "polarity") {
          if (!data) {
            return "Blank is not valid value.";
          }
        }
      };
      $scope.showAspect = function (sentiment) {
        var selected = [];
        if (sentiment.aspect) {
          selected = $filter('filter')($scope.aspects, {value: sentiment.aspect});
        }
        return selected.length ? selected[0].text : 'Not set';
      };

      $scope.polarities = [
        {value: "POSITIVE", text: 'POSITIVE'},
        {value: "NEUTRAL", text: 'NEUTRAL'},
        {value: "NEGATIVE", text: 'NEGATIVE'}
      ];

      $scope.showPolarity = function (sentiment) {
        var selected = [];
        if (sentiment.polarity) {
          selected = $filter('filter')($scope.polarities, {value: sentiment.polarity});
        }
        return selected.length ? selected[0].text : 'Not set';
      };

      $scope.add = function () {
        $scope.inserted = {
          confirm: null,
          aspect: null,
          polarity: null
        };
        $scope.ngModel.push($scope.inserted);
      };

      $scope.delete = function (index) {
        $scope.ngModel.splice(index, 1);
        $scope.save();
      };

      $scope.has = function (sentiment) {
        var sentimentItem = _.find($scope.ngModel, function (item) {
          return sentiment.aspect == item.aspect && sentiment.polarity == item.polarity;
        });
        if(sentimentItem){
          return true;
        }
        else{
          return false;
        }
      };

      $scope.set = function (sentiment) {
        if(!$scope.has(sentiment)){
          var sentimentItem = {
            aspect: sentiment.aspect,
            polarity: sentiment.polarity,
            confirm: true
          };
          $scope.ngModel.push(sentimentItem);
          $scope.save();
        }
      };

      $scope.confirmData = function (sentiment, type) {
        if (type == 'correct') {
          if (sentiment.confirm == true) {
            sentiment.confirm = null;
          }
          else {
            sentiment.confirm = true;
          }
        }
        else if (type == 'incorrect') {
          if (sentiment.confirm == false) {
            sentiment.confirm = null;
          }
          else {
            sentiment.confirm = false;
          }
        }

        _.map($scope.ngModel, function (item) {
          if(item.aspect == sentiment.aspect){
            item.confirm = sentiment.confirm;
          }
        });

        $scope.save();

      };
    }
  }
});
