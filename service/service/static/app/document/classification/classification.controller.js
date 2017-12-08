/**
 * Created by crawler on 07/12/2017.
 */
app.controller("ClassificationController", function ($scope, $state, $stateParams, Document) {

  $scope.updateDocument = function (listAnnotation) {
    Document.update({id: $scope.document.id}, $scope.document, function (data) {
      data.act = $.parseJSON(data.act);
      console.log(data);
    });
  };

  $scope.getInfoDocument = function () {
    Document.query({id: $stateParams.id}).then(function (doc) {
      $scope.document = angular.copy(doc);
      $scope.chunking = {
        "config": ChunkingBratConfig,
        "doc": {
          "text": $scope.document.text,
          "entities": $scope.document.chunking
        }
      };
    });
  };

  $scope.getInfoDocument();
});