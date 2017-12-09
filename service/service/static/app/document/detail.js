app.controller("DetailDocumentCtrl", function ($scope, $stateParams, Corpus, Document, $state, STATUSES, QUALITIES, $filter, $http, $window, Notification) {

  $scope.id = $stateParams.id;

  Document.query({id: $scope.id}, {}).then(function (doc) {
    $scope.doc = doc;

    try {
      $scope.sentiments = JSON.parse(doc.sentiment);
    } catch (e) {
      $scope.sentiments = [];
    }
    try {
      $scope.categories = JSON.parse(doc.category);
    } catch (e) {
      $scope.categories = [];
    }
    try {
      $scope.acts = JSON.parse(doc.act);
    } catch (e) {
      $scope.acts = [];
    }
    $scope.auto_acts = [{
      "name": "INFORMATION"
    }];
    $scope.corpusId = doc.corpus;
    Corpus.get({id: doc.corpus}, function (corpus) {
      $scope.corpus = corpus;
    })
  });

  $scope.STATUSES = STATUSES;
  $scope.QUALITIES = QUALITIES;

  $scope.save = function () {
    try {
      $scope.LOADING = true;
      $scope.doc.sentiment = angular.toJson($scope.sentiments);
      $scope.doc.category = angular.toJson($scope.categories);

      Document.update({id: $scope.id}, $scope.doc,
        function (data) {
          $scope.LOADING = false;

          Notification.success({
            message: 'Document is saved successfully.',
            delay: 1000,
            positionX: 'right',
            positionY: 'bottom'
          });
        }, function (err) {
          Notification.error({
            message: 'ABC',
            delay: 1000,
            positionX: 'right',
            positionY: 'bottom'
          });
          $scope.LOADING = false;
        });
    } catch (e) {
      Notification.error({
        message: 'AMR Syntax Error',
        delay: 1000,
        positionX: 'right',
        positionY: 'bottom'
      });
      $scope.LOADING = false;
    }
  };

  $scope.delete = function () {
    Document.delete({id: $scope.id}).$promise.then(function () {
      $state.go('detailCorpus', {"id": $scope.corpusId});
    })
  }
});
