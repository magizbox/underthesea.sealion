app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state({
            url: '/?status&quality',
            name: 'listCorpus',
            controller: 'ListCorpusCtrl',
            templateUrl: "./static/app/corpus/list.html"
        })
        .state({
            url: '/newCorpus',
            name: 'newCorpus',
            controller: 'NewCorpusCtrl',
            templateUrl: "./static/app/corpus/new.html"
        })
        .state({
            url: '/corpora/:id?limit&offset&status&quality&search',
            name: 'detailCorpus',
            controller: 'DetailCorpusCtrl',
            templateUrl: "./static/app/corpus/detail.html"
        })
        .state({
            url: '/documents?status&quality',
            name: 'amrList',
            controller: 'ListAMRCtrl',
            templateUrl: "./static/app/amr/list.html"
        })
        .state({
            url: '/documents/newDocument?corpusId',
            name: 'newDocument',
            controller: 'NewDocumentCtrl',
            templateUrl: "./static/app/document/new.html"
        })
        .state({
            url: '/documents/:id',
            name: 'detailDocument',
            controller: 'DetailAMRCtrl',
            templateUrl: "./static/app/document/detail.html"
        });
});