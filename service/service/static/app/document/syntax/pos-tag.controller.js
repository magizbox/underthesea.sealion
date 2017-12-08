/**
 * Created by crawler on 07/12/2017.
 */
app.controller("PosTagController", function ($scope, $state, $stateParams, Document) {

  $scope.updateDocument = function (listAnnotation) {
    $scope.document.pos_tag = JSON.stringify(listAnnotation);
    Document.update({id: $scope.document.id}, $scope.document);
  };

  $scope.getInfoDocument = function () {
    Document.query({id: $stateParams.id}).then(function (doc) {
      $scope.document = angular.copy(doc);
      $scope.pos_tag = {
        "config": POSTagBratConfig,
        "doc": {
          "text": $scope.document.text,
          "entities": $scope.document.pos_tag
        }
      };
    });
  };

  $scope.getInfoDocument();

});