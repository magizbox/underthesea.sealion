app.controller("DetailAMRCtrl", function ($scope, $stateParams, Corpus, Document) {

    $scope.id = $stateParams.id;

    Document.get({id: $scope.id}, function (doc) {
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

});
