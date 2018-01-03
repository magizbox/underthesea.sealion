window.app = angular.module("myApp", ['ui.router', 'ngResource', 'xeditable', 'ui.bootstrap', 'nlp.elements', 'ui-notification', 'cfp.hotkeys']);

app.value('AppConfig', window.AppConfig);
app.config(function ($resourceProvider) {
  $resourceProvider.defaults.stripTrailingSlashes = false;
  window.AppConfig = {
    ActReview: true,
    CategoryReview: true,
    SentimentReview: true
  };

});
app.directive('myEnter', function () {
  return function (scope, element, attrs) {
    element.bind("keydown keypress", function (event) {
      if (event.which === 13) {
        scope.$apply(function () {
          scope.$eval(attrs.myEnter);
        });
        event.preventDefault();
      }
    });
  };
});


window.nlpElements = angular.module('nlp.elements', ['xeditable']);

app.constant("SERVICE_URL", "http://localhost:8000/api/");
app.constant("TASKS", [
  {
    name: 'Word Segmentation',
    value: 'WS',
    data: 'word_sent',
    type: 'SYNTAX'
  },
  {
    name: 'POS Tagging',
    value: 'PO',
    data: 'pos_tag',
    type: 'SYNTAX'
  },
  {
    name: 'Chunking',
    value: 'CH',
    data: 'chunking',
    type: 'SYNTAX'
  },
  {
    name: 'Named Entity Recognition',
    value: 'NER',
    data: 'ner',
    type: 'SYNTAX'
  },
  {
    name: 'Dialog Acts',
    value: 'DA',
    data: 'act',
    type: 'TC'
  },

  {
    name: 'Category',
    value: 'CA',
    data: 'category',
    type: 'TC'
  },

  {
    name: 'Sentiment',
    value: 'SA',
    data: 'sentiment',
    type: 'TC'
  }
]);

app.constant("SENTIMENT_RESULT", [
  {
    "text": "All",
    "value": ""
  },
  {
    "text": "Correct",
    "value": "true"
  },
  {
    "text": "Incorrect",
    "value": "false"
  }
]);

app.constant("STATUSES", [
  {
    "text": "New",
    "value": "NEW"
  },
  {
    "text": "Annotating",
    "value": "ANNOTATING"
  },
  {
    "text": "Annotated",
    "value": "ANNOTATED"
  },
  {
    "text": "Reviewing",
    "value": "REVIEWING"
  },
  {
    "text": "Reviewed",
    "value": "REVIEWED"
  }
]);

app.constant("QUALITIES", [
  {
    "text": "Poor",
    "value": "POOR"
  },
  {
    "text": "Acceptable",
    "value": "ACCEPTABLE"
  },
  {
    "text": "Perfect!",
    "value": "PERFECT"
  }
]);

app.directive("mwConfirmClick", [
  function () {
    return {
      priority: -1,
      restrict: 'A',
      scope: {confirmFunction: "&mwConfirmClick"},
      link: function (scope, element, attrs) {
        element.bind('click', function (e) {
          // message defaults to "Are you sure?"
          var message = attrs.mwConfirmClickMessage ? attrs.mwConfirmClickMessage : "Are you sure?";
          // confirm() requires jQuery
          if (confirm(message)) {
            scope.confirmFunction();
          }
        });
      }
    }
  }
]);

app.run(function (editableOptions) {
  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});

