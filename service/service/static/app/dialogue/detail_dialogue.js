app.controller("DetailDialogueCtrl", function ($scope, $stateParams, DialogueDocument, $state, STATUSES, QUALITIES, Dialogue, Params, $filter) {
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

    Dialogue.get({id: $scope.id}, function (dialogue) {
        $scope.dialogue = dialogue;
        $scope.corpus = dialogue.corpus;
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
    $scope.update = function () {
        return Corpus.update({id: $scope.id}, $scope.corpus);
    };

    $scope.deleteDocument = function (id) {
        Dialogue.delete({id: id}).$promise.then(function () {
            $state.reload();
        })
    };

    $scope.select = function (doc) {

        $scope.auto_acts = [{
            "name": "INFORMATION"
        }];
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
        try {
            $scope.meta = JSON.parse(doc.meta);
        } catch (e) {

        }
    };

    $scope.MESSAGES = {
        "SYNTAX_ERROR": false,
        "LOADING": false,
        "CREATE_SUCCESS": false
    };

    $scope.save = function () {
        $scope.doc.sentiment = angular.toJson($scope.sentiments);
        $scope.doc.category = angular.toJson($scope.categories);
        $scope.doc.act = angular.toJson($scope.acts);
        var action = DialogueDocument.update({id: $scope.doc.id}, $scope.doc);
        action.$promise.then(function () {
            $scope.MESSAGES.CREATE_SUCCESS = true;
            setTimeout(function () {
                $scope.MESSAGES.CREATE_SUCCESS = false;
                $scope.$apply();
            }, 2000);
        });
    }

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

    $scope.isShow = function(document){
        for(var i = 0; i < $scope.tasks.length; i++){
            var task = $scope.tasks[i];
            if($scope.params[task.name] == 'true'){
                if(!document["is_valid_" + task.name]){
                    return false;
                }
            }
            if($scope.params[task.name] == 'false'){
                if(document["is_valid_" + task.name]){
                    return false;
                }
            }
        }
        return true;
    }
});