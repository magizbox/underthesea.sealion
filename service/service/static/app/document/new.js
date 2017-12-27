app.controller("NewDocumentCtrl", function ($scope, $stateParams, Document, $state, Corpus, $uibModalInstance) {

  $scope.showStatus = function () {
    var selected = $filter('filter')($scope.statuses, {value: $scope.user.status});
    return ($scope.user.status && selected.length) ? selected[0].text : 'Not set';
  };
  $scope.corpusId = $stateParams["id"];
  $scope.doc = {
    "text": "",
    "status": "NEW",
    "quality": "POOR",
    "corpus": $scope.corpusId
  };

  $scope.hideMessages = function () {
    $scope.MESSAGES = {
      "TEXT_MISSING": false,
      "AMR_MISSING": false
    };
  };
  Corpus.get({"id": $scope.corpusId}, function (corpus) {
    $scope.corpus = corpus;
  });

  $scope.hideMessages();

  $scope.save = function () {
    if (!$scope.doc.text) {
      $scope.checkNull = true;
    } else {
      Document.save($scope.doc).$promise.then(function (doc) {
        $uibModalInstance.close();
        $state.go("detailDocument", {"idDocument": doc.id, "idCorpus": $scope.corpusId});
      })
    }
  };

  $scope.saveAndCreateNew = function () {
    if (!$scope.doc.text) {
      $scope.checkNull = true;
    } else {
      Document.save($scope.doc).$promise.then(function (doc) {
        $uibModalInstance.close();
        $state.go("newDocument",
          {"corpusId": $scope.corpusId},
          {reload: true});
      })
    }
  }

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});