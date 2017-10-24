app.controller("DetailDialogueCtrl", function ($scope, $stateParams, DialogueDocument, $state, STATUSES, QUALITIES, Dialogue, Params, $filter) {
    $scope.id = $stateParams.id;

    Dialogue.get({id: $scope.id}, function (dialogue) {
        $scope.dialogue = dialogue;
        console.log(dialogue);
    });

    function transformDocumentLevel(documents, level){
        var output = [];
        var childLevel = level + 1;
        for(var i = 0; i < documents.length; i++){
            if(i != 0){
                level = childLevel;
            }
            if(_.isArray(documents[i])){
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

    $scope.select = function(doc){

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
    };

    $scope.MESSAGES = {
        "SYNTAX_ERROR": false,
        "LOADING": false,
        "CREATE_SUCCESS": false
    };

    $scope.save = function(){
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
})
;