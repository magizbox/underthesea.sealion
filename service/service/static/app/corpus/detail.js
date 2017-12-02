app.controller("DetailCorpusCtrl", function ($scope, $stateParams, Corpus, $state, STATUSES, QUALITIES, Document, Params, $filter) {
  $scope.init = function () {
    $scope.id = $stateParams.id;
    var params = JSON.parse(JSON.stringify($stateParams));
    params["corpus"] = params["id"];
    $scope.params = Params(params, {
      "offset": 0,
      "limit": 10,
      "corpus": 1,
      "status": null,
      "quality": null,
      "search": null,
      "act": null,
      "category": null,
      "sentiment": null
    });
    $scope.statuses = STATUSES;
    $scope.quality = null;
    $scope.qualities = QUALITIES;

    $scope.getInfoCorpus();
    $scope.getListDocument();
  };


  $scope.showStatus = function () {
    var selected = $filter('filter')($scope.statuses,
      {value: $scope.params.status});
    return ($scope.params.status && selected.length) ? selected[0].text : 'All';
  };


  $scope.showQuality = function () {
    var selected = $filter('filter')($scope.qualities,
      {value: $scope.params.quality});
    return ($scope.params.quality && selected.length) ? selected[0].text : 'All';
  };

  $scope.getInfoCorpus = function () {
    Corpus.get({id: $scope.id}, function (corpus) {
      corpus.tasks = corpus.tasks.split(",");
      $scope.corpus = corpus;
    });
  };

  $scope.getListDocument = function () {
    Document.query($scope.params).then(function (documents) {
      $scope.documents = documents;
    });
    Document.pagination($scope.params).then(function (result) {
      $scope.totalItems = result["totalItems"];
      $scope.itemsPerPage = result["itemsPerPage"];
      $scope.currentPage = result["currentPage"];
    });
  };


  $scope.update = function () {
    return Corpus.update({id: $scope.id}, $scope.corpus);
  };

  $scope.deleteDocument = function (id) {
    Document.delete({id: id}).$promise.then(function () {
      $state.reload();
    })
  };

  $scope.pageChanged = function () {
    $scope.params["offset"] = $scope.params["limit"] * ($scope.currentPage - 1);
    $state.go(".", $scope.params);
  };

  $scope.filterChanged = function () {
    $state.go(".", $scope.params);
  };

  $scope.toggle = function (task) {
    var states = ["true", "false", null];
    var i = states.indexOf($scope.params[task]);
    var ni = (i + 1) % states.length;
    var nextState = states[ni];
    $scope.params[task] = nextState;
  };

});