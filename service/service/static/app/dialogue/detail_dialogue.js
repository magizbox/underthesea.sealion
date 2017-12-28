app.controller("DetailDialogueCtrl", function ($scope, $stateParams, DialogueDocument, DialogueCorpus, $state, TASKS, STATUSES, QUALITIES, Dialogue, Params, $filter, Notification) {
  $scope.id = $stateParams.id;
  var params = JSON.parse(JSON.stringify($stateParams));
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


  Dialogue.query({id: $scope.id}, function (dialogue) {
    $scope.dialogue = dialogue;
    $scope.corpus = dialogue.corpus;
    DialogueCorpus.get({id: dialogue.corpus}, function (corpus) {
      corpus.tasks = corpus.tasks.split(",");
      $scope.corpusInfo = corpus;

      $scope.listSyntaxTask = _.chain($scope.listTask)
        .filter(function (task) {
          return task.type == 'SYNTAX';
        })
        .pluck('value')
        .intersection($scope.corpusInfo.tasks)
        .value();
    });
  });

  function transformDocumentLevel(documents, level) {
    var output = [];
    var childLevel = level + 1;
    for (var i = 0; i < documents.length; i++) {
      if (i != 0) {
        level = childLevel;
      }
      if (_.isArray(documents[i])) {
        output.push(transformDocumentLevel(documents[i], level))
      } else {
        var document = documents[i];
        document["level"] = level;
        output.push(document);
      }
    }
    return output;
  }

  function transformDocument(documents) {
    var output = transformDocumentLevel(documents, 1);
    return _.flatten(output);
  };

  Dialogue.getDocuments({id: $scope.id}).then(function (documents) {
    $scope.documents = transformDocument(documents);
    $scope.select($scope.documents[0]);
  });

  $scope.getUisrefSyntaxTag = function (document, task) {
    return "detailTagDialogueCorpus." + task.toLowerCase() + "({dialogueId:" + $scope.id + ", documentId:" + document.id + "})";
  };

  $scope.update = function () {
    var action = Dialogue.update({id: $scope.id}, $scope.dialogue);
    action.$promise.then(function () {
      Notification.success({
        message: 'Dialogue is updated successfully.',
        delay: 1000,
        positionX: 'right',
        positionY: 'bottom'
      });
    })
      .catch(function (err) {
        Notification.error({
          message: 'AMR Syntax Error',
          delay: 1000,
          positionX: 'right',
          positionY: 'bottom'
        });
      });
  };

  $scope.deleteDocument = function (id) {
    Dialogue.delete({id: id}).$promise.then(function () {
      $state.reload();
    })
  };

  $scope.select = function (doc) {
    $scope.doc = doc;
    $scope.sentiments = doc.sentiment;
    $scope.categories = doc.category;
    $scope.acts = doc.act;
    $scope.meta = doc.meta;
    $scope.auto_act = doc.auto_act;
  };


  $scope.save = function () {
    $scope.doc.sentiment = angular.toJson($scope.sentiments);
    $scope.doc.category = angular.toJson($scope.categories);
    $scope.doc.act = angular.toJson($scope.acts);
    $scope.doc.auto_act = angular.toJson($scope.auto_act);
    DialogueDocument.update({id: $scope.doc.id}, $scope.doc,
      function (data) {
        Notification.success({
          message: 'Document is saved successfully.',
          delay: 1000,
          positionX: 'right',
          positionY: 'bottom'
        });
      }, function (err) {
        Notification.error({
          message: 'AMR Syntax Error',
          delay: 1000,
          positionX: 'right',
          positionY: 'bottom'
        });
      });

  };

  $scope.toggleIgnore = function () {
    if ($scope.doc.ignore == "") {
      $scope.doc.ignore = "true"
    } else {
      $scope.doc.ignore = ""
    }
    $scope.save();
  };

  $scope.toggle = function (task) {
    var states = ["true", "false", null];
    var i = states.indexOf($scope.params[task]);
    var ni = (i + 1) % states.length;
    var nextState = states[ni];
    $scope.params[task] = nextState;
  };


  $scope.STATUSES = STATUSES;
  $scope.QUALITIES = QUALITIES;
  $scope.listTask = TASKS;

  $scope.isShow = function (document) {
    for (var i = 0; i < $scope.corpusInfo.tasks.length; i++) {
      var task = $scope.corpusInfo.tasks[i];
      var taskData = _.find($scope.listTask, function (item) {
        return item.value == task;
      });

      if ($scope.params[task] == 'true') {
        if (!document[taskData.data] || document[taskData.data].length <= 0) {
          return false;
        }
      }
      if ($scope.params[task] == 'false') {
        if (document[taskData.data] && document[taskData.data].length > 0) {
          return false;
        }
      }
    }
    return true;
  };

  $scope.isExistData = function (task, document) {
    var taskData = _.find($scope.listTask, function (item) {
      return item.value == task;
    });

    if (document[taskData.data] && document[taskData.data].length > 0) {
      return true;
    }
    else {
      return false;
    }
  }

  $scope.checkExistTask = function (task) {
    if ($scope.corpusInfo) {
      return _.contains($scope.corpusInfo.tasks, task);
    }

  };
});