app.config(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
  $stateProvider
    .state({
      url: '/',
      name: 'main',
      templateUrl: "./static/app/common/main.html"
    })
    .state({
      url: '/corpora?status&quality',
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
      url: '/corpora/:id?status&quality&search&act&category&sentiment',
      name: 'detailCorpus',
      nested: 'listCorpus',
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
      url: '/documents/:id/syntax',
      name: 'detailDocument',
      templateUrl: "./static/app/document/detail-document.html",
      controller: 'DetailDocumentCtrl'
    })
    .state({
      url: '/ws',
      name: 'detailDocument.ws',
      controller: 'WordSentController',
      templateUrl: "./static/app/document/syntax/word-sent.html"
    })
    .state({
      url: '/po',
      name: 'detailDocument.po',
      controller: 'PosTagController',
      templateUrl: "./static/app/document/syntax/pos-tag.html"
    })
    .state({
      url: '/ch',
      name: 'detailDocument.ch',
      controller: 'ChunkingController',
      templateUrl: "./static/app/document/syntax/chunking.html"
    })
    .state({
      url: '/ner',
      name: 'detailDocument.ner',
      controller: 'NerController',
      templateUrl: "./static/app/document/syntax/ner.html"
    })
    .state({
      url: '/documents/:id/classification',
      name: 'detailDocument.classification',
      controller: 'ClassificationController',
      templateUrl: "./static/app/document/classification/classification.html"
    })
    .state({
      url: '/dialogue-corpus/:dialogueId/documents/:documentId',
      name: 'detailTagDialogueCorpus',
      templateUrl: "./static/app/document/detail-document.html",
      controller: 'DetailDocumentCtrl'
    })
    .state({
      url: '/syntax/ws',
      name: 'detailTagDialogueCorpus.ws',
      controller: 'WordSentController',
      templateUrl: "./static/app/document/syntax/word-sent.html"
    })
    .state({
      url: '/syntax/po',
      name: 'detailTagDialogueCorpus.po',
      controller: 'PosTagController',
      templateUrl: "./static/app/document/syntax/pos-tag.html"
    })
    .state({
      url: '/syntax/ch',
      name: 'detailTagDialogueCorpus.ch',
      controller: 'ChunkingController',
      templateUrl: "./static/app/document/syntax/chunking.html"
    })
    .state({
      url: '/syntax/ner',
      name: 'detailTagDialogueCorpus.ner',
      controller: 'NerController',
      templateUrl: "./static/app/document/syntax/ner.html"
    })
    .state({
      url: '/classification',
      name: 'detailTagDialogueCorpus.classification',
      controller: 'ClassificationController',
      templateUrl: "./static/app/document/classification/classification.html"
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
      url: '/dialogue_corpora/:id?limit&offset&status&quality&search&act&category&sentiment',
      name: 'detailDialogueCorpus',
      nested: 'listDialogueCorpus',
      controller: 'DetailDialogueCorpusCtrl',
      templateUrl: "./static/app/dialogue/detail_corpus.html"
    })
    .state({
      url: '/dialogues/:id',
      name: 'detailDialogue',
      nested: 'listDialogueCorpus',
      controller: 'DetailDialogueCtrl',
      templateUrl: "./static/app/dialogue/detail_dialogue.html"
    });

});