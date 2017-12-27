app.controller("DetailDialogueCorpusCtrl", function ($scope, $stateParams, DialogueCorpus, Dialogue, $state, STATUSES, QUALITIES, Params, $filter) {
  $scope.id = $stateParams.id;
  $scope.STATUSES = STATUSES;
  $scope.QUALITIES = QUALITIES;
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
  $scope.status = $stateParams.status ? $stateParams.status : 'ALL';
  $scope.quality = $stateParams.quality ? $stateParams.quality : 'ALL';
  $scope.statuses = STATUSES;
  $scope.updateStatus = function (value) {
    $scope.status = value;
  };

  $scope.updateQuality = function (value) {
    $scope.quality = value;
  };
  $scope.showStatus = function () {
    var selected = $filter('filter')($scope.statuses,
      {value: $scope.params.status});
    return ($scope.params.status && selected.length) ? selected[0].text : 'All';
  };
  $scope.quality = null;
  $scope.qualities = QUALITIES;

  $scope.showQuality = function () {
    var selected = $filter('filter')($scope.qualities,
      {value: $scope.params.quality});
    return ($scope.params.quality && selected.length) ? selected[0].text : 'All';
  };

  Dialogue.query($scope.params).then(function (dialogues) {
    $scope.dialogues = dialogues;
  });

  DialogueCorpus.get({id: $scope.id}, function (corpus) {
    corpus.tasks = corpus.tasks.split(",");
    $scope.corpus = corpus;
  });

  Dialogue.pagination($scope.params).then(function (result) {
    $scope.totalItems = result["totalItems"];
    $scope.itemsPerPage = result["itemsPerPage"];
    $scope.currentPage = result["currentPage"];
  });

  $scope.update = function () {
    return Corpus.update({id: $scope.id}, $scope.corpus);
  };

  $scope.deleteDocument = function (id) {
    Dialogue.delete({id: id}).$promise.then(function () {
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
  $scope.tasks = [
    {
      "name": "act",
      "label": "DA"
    },
    {
      "name": "category",
      "label": "CA"
    },
    {
      "name": "sentiment",
      "label": "SA"
    },
  ];
  $scope.toggle = function (task) {
    var states = ["true", "false", null];
    var i = states.indexOf($scope.params[task.name]);
    var ni = (i + 1) % states.length;
    var nextState = states[ni];
    $scope.params[task.name] = nextState;
    console.log(params);
  };
})
;