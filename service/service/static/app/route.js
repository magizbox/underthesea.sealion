app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state({
            url: '/',
            name: 'main',
            templateUrl: "./static/app/common/main.html"
        })
        .state({
            url: '/corpora/?status&quality',
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
            url: '/corpora/:id?limit&offset&status&quality&search&act&category&sentiment',
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
        })
        .state({
            url: '/dialogue_corpora/?status&quality',
            name: 'listDialogueCorpus',
            controller: 'ListDialogueCorpusCtrl',
            templateUrl: "./static/app/dialogue/list_corpus.html"
        })
        .state({
            url: '/newDialogueCorpus',
            name: 'newDialogueCorpus',
            controller: 'NewDialogueCorpusCtrl',
            templateUrl: "./static/app/dialogue/new.html"
        })
        .state({
            url: '/dialogue_corpora/:id?status&quality',
            name: 'detailDialogueCorpus',
            controller: 'DetailDialogueCorpusCtrl',
            templateUrl: "./static/app/dialogue/detail_corpus.html"
        })
        .state({
            url: '/dialogues/:id',
            name: 'detailDialogue',
            controller: 'DetailDialogueCtrl',
            templateUrl: "./static/app/dialogue/detail_dialogue.html"
        })
    ;
});