window.nlpElements.directive('acts', function ($filter) {
    return {
        templateUrl: './static/app/directives/act/dom.html',
        restrict: 'AE',
        scope: {
            'ngModel': '=',
            'suggestions': '='
        },
        controller: function ($scope) {
            $scope.ACTS = [
                {value: "GREETING", text: 'GREETING'},
                {value: "SELFDISCLOSURE", text: 'SELFDISCLOSURE'},
                {value: "ORDER", text: 'ORDER'},
                {value: "QUESTION", text: 'QUESTION'},
                {value: "INVITATION", text: 'INVITATION'},
                {value: "INFORMATION", text: 'INFORMATION'},
                {value: "THANKS", text: 'THANKS'},
                {value: "CURSE", text: 'CURSE'},
                {value: "APOLOGY", text: 'APOLOGY'},
                {value: "INTERJECTION", text: 'INTERJECTION'},
                {value: "MISC", text: 'MISC'}
            ];

            $scope.showAct = function (act) {
                var selected = [];
                if (act.name) {
                    selected = $filter('filter')($scope.ACTS, {value: act.name});
                    console.log(selected);
                }
                return selected.length ? selected[0].text : 'Not set';
            };

            $scope.addAct = function () {
                $scope.inserted = {
                    id: $scope.ngModel.length + 1,
                    name: ''
                };
                $scope.ngModel.push($scope.inserted);
            };

            $scope.removeAct = function (index) {
                $scope.ngModel.splice(index, 1);
            };

            $scope.score = function (y1, y2) {
                y1 = _.pluck(y1, "name");
                y2 = _.pluck(y2, "name");
                var n1 = y1.length;
                var n2 = y2.length;
                if (n1 == 0 && n2 == 0) {
                    return 100;
                }
                if (n1 == 0 || n2 == 0) {
                    return 0;
                }
                tp = _.intersection(y1, y2).length;
                p = tp / n1;
                r = tp / n2;
                if (p + r == 0) {
                    return 0;
                }
                f = 100 * (2 * p * r) / (p + r);
                return Math.round(f);
            };
            $scope.checkAct = function (act) {
                var acts = _.pluck($scope.ngModel, "name");
                return _.contains(acts, act.name);
            };

            $scope.setAct = function (act) {
                if (!$scope.checkAct(act)) {
                    $scope.inserted = {
                        id: $scope.ngModel.length + 1,
                        name: act.name
                    };
                    $scope.ngModel.push($scope.inserted);
                    $scope.inserted = null;
                }
            };
        }
    }
});
