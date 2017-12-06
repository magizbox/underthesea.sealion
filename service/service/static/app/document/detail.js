app.controller("DetailAMRCtrl", function ($scope, $stateParams, Corpus, Document, $state, STATUSES, QUALITIES, $filter, $http, $window) {

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

    $scope.score = function(y1, y2){
        y1 = _.pluck(y1, "name");
        y2 = _.pluck(y2, "name");
        var n1 = y1.length;
        var n2 = y2.length;
        if(n1 == 0 && n2 == 0){
            return 100;
        }
        if(n1 == 0 || n2 == 0){
            return 0;
        }
        tp = _.intersection(y1, y2).length;
        p = tp  / n1;
        r = tp  / n2;
        if(p + r == 0){
            return 0;
        }
        f = 100 * (2 * p * r) / (p + r);
        return Math.round(f);
    };
    $scope.checkAct = function(act){
        var acts = _.pluck($scope.acts, "name");
        return _.contains(acts, act.name);
    };

    $scope.setAct = function(act){
        if(!$scope.checkAct(act)){
            $scope.inserted = {
                id: $scope.acts.length + 1,
                name: act.name
            };
            $scope.acts.push($scope.inserted);
            $scope.inserted = null;
        }
    };

    $scope.CATEGORIES = [
        {value: "ACCOUNT", text: 'ACCOUNT'},
        {value: "CARD", text: 'CARD'},
        {value: "CREDIT", text: 'CREDIT'},
        {value: "CUSTOMER SUPPORT", text: 'CUSTOMER SUPPORT'},
        {value: "INTEREST RATE", text: 'INTEREST RATE'},
        {value: "INTERNET BANKING", text: 'INTERNET BANKING'},
        {value: "LOAN", text: 'LOAN'},
        {value: "MONEY TRANSFER", text: 'MONEY TRANSFER'},
        {value: "PAYMENT", text: 'PAYMENT'},
        {value: "PROMOTION", text: 'PROMOTION'},
        {value: "SAVING", text: 'SAVING'},
        {value: "SECURITY", text: 'SECURITY'},
        {value: "TRADEMARK", text: 'TRADEMARK'},
        {value: "DISCOUNT", text: 'DISCOUNT'},
        {value: "CAREER", text: "CAREER"},
        {value: "OTHER", text: 'OTHER'}
    ];

    $scope.showCategory = function (category) {
        var selected = [];
        if (category.name) {
            selected = $filter('filter')($scope.CATEGORIES, {value: category.name});
        }
        return selected.length ? selected[0].text : 'Not set';
    };

    $scope.addCategory = function () {
        $scope.inserted = {
            id: $scope.categories.length + 1,
            name: ''
        };
        $scope.categories.push($scope.inserted);
    };

    $scope.removeCategory = function (index) {
        $scope.categories.splice(index, 1);
    };

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
            id: $scope.acts.length + 1,
            name: ''
        };
        $scope.acts.push($scope.inserted);
    };

    $scope.removeAct = function (index) {
        $scope.acts.splice(index, 1);
    };

    $scope.aspects = [
        {value: "ACCOUNT", text: 'ACCOUNT'},
        {value: "CARD", text: 'CARD'},
        {value: "CREDIT", text: 'CREDIT'},
        {value: "CUSTOMER SUPPORT", text: 'CUSTOMER SUPPORT'},
        {value: "INTEREST RATE", text: 'INTEREST RATE'},
        {value: "INTERNET BANKING", text: 'INTERNET BANKING'},
        {value: "LOAN", text: 'LOAN'},
        {value: "MONEY TRANSFER", text: 'MONEY TRANSFER'},
        {value: "OTHER", text: 'OTHER'},
        {value: "PAYMENT", text: 'PAYMENT'},
        {value: "PROMOTION", text: 'PROMOTION'},
        {value: "SAVING", text: 'SAVING'},
        {value: "SECURITY", text: 'SECURITY'},
        {value: "TRADEMARK", text: 'TRADEMARK'},
    ];

    $scope.showAspect = function (sentiment) {
        var selected = [];
        if (sentiment.aspect) {
            selected = $filter('filter')($scope.aspects, {value: sentiment.aspect});
        }
        return selected.length ? selected[0].text : 'Not set';
    };

    $scope.polarities = [
        {value: "POSITIVE", text: 'POSITIVE 👍'},
        {value: "NEUTRAL", text: 'NEUTRAL'},
        {value: "NEGATIVE", text: 'NEGATIVE 👎'}
    ];

    $scope.showPolarity = function (sentiment) {
        var selected = [];
        if (sentiment.polarity) {
            selected = $filter('filter')($scope.polarities, {value: sentiment.polarity});
        }
        return selected.length ? selected[0].text : 'Not set';
    };

    $scope.addSentiment = function () {
        $scope.inserted = {
            id: $scope.sentiments.length + 1,
            name: '',
            status: null,
            group: null
        };
        $scope.sentiments.push($scope.inserted);
    };

    $scope.removeSentiment = function (index) {
        $scope.sentiments.splice(index, 1);
    };

    $scope.STATUSES = STATUSES;
    $scope.QUALITIES = QUALITIES;

    $scope.hideMessages = function () {
        $scope.MESSAGES = {
            "SYNTAX_ERROR": false,
            "LOADING": false,
            "CREATE_SUCCESS": false
        };
    };

    $scope.hideMessages();

    $scope.save = function () {
        try {
            $scope.hideMessages();
            $scope.LOADING = true;
            $scope.doc.sentiment = angular.toJson($scope.sentiments);
            $scope.doc.category = angular.toJson($scope.categories);
            $scope.doc.act = angular.toJson($scope.acts);
            var action = Document.update({id: $scope.id}, $scope.doc);
            action.$promise.then(function () {
                $scope.MESSAGES.CREATE_SUCCESS = true;
                $scope.LOADING = false;
                setTimeout(function () {
                    $scope.MESSAGES.CREATE_SUCCESS = false;
                    $scope.$apply();
                }, 2000);
            });
        } catch (e) {
            $scope.MESSAGES.SYNTAX_ERROR = true;
            $scope.LOADING = false;
        }
    };

    $scope.delete = function () {
        Document.delete({id: $scope.id}).$promise.then(function () {
            $state.go('detailCorpus', {"id": $scope.corpusId});
        })
    }
});
