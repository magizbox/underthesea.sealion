app.controller("DetailDialogueCorpusCtrl", function ($scope, $stateParams, DialogueCorpus, Dialogue, $state, STATUSES, SENTIMENT_RESULT, QUALITIES, Params, $filter, $timeout, DialogueDocument) {
  $scope.id = $stateParams.id;
  $scope.loading = false;
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
    "sentiment": null,
    "sentiment_result": null
  });

  $scope.statuses = STATUSES;
  $scope.sentimentsResult = SENTIMENT_RESULT;
  $scope.quality = null;
  $scope.qualities = QUALITIES;

  $scope.showStatus = function () {
    var selected = $filter('filter')($scope.statuses,
      {value: $scope.params.status});
    return ($scope.params.status && selected.length) ? selected[0].text : 'All';
  };

  $scope.showSentimentResult = function () {
    var selected = $filter('filter')($scope.sentimentsResult, {value: $scope.params.sentiment_result});
    return ($scope.params.sentiment_result && selected.length ) ? selected[0].text : $scope.sentimentsResult[0].text;
  };

  $scope.filterSentiment = function () {
    var param = {
      sentiment_result: $scope.params.sentiment_result,
      limit: $stateParams.limit,
      offset: $stateParams.offset
    };
    $scope.loading = true;
    DialogueDocument.filterSentiment(param).then(function (data) {
      $scope.loading = false;
      $scope.documents = data.results;
      $scope.totalItems = data.count;
      $scope.itemsPerPage = 10;
    });
  };

  $scope.showQuality = function () {
    var selected = $filter('filter')($scope.qualities,
      {value: $scope.params.quality});
    return ($scope.params.quality && selected.length) ? selected[0].text : 'All';
  };

  $scope.getListDialogue = function () {
    $scope.loading = true;
    $timeout(function () {
      Dialogue.query($scope.params).then(function (dialogues) {
        $scope.dialogues = dialogues;
        $scope.loading = false;
      });
    }, 1000);

  };

  if ($stateParams.sentiment_result) {
    $scope.filterSentiment();
  }
  else {
    $scope.getListDialogue();
  }


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