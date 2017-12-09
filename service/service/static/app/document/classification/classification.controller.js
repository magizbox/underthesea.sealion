/**
 * Created by crawler on 07/12/2017.
 */
app.controller("ClassificationController", function ($scope, $state, $stateParams, Document) {

  $scope.updateDocument = function (listAnnotation) {
    Document.update({id: $scope.document.id}, angular.copy($scope.document));
  };

  $scope.getInfoDocument = function () {
    Document.query({id: $stateParams.id}).then(function (doc) {
      $scope.document = angular.copy(doc);
    });
  };

  $scope.getInfoDocument();
});

