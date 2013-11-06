window.onload = function() {
    var view = new View($('#alternative-keys-keyboard'));
    var alternativeKeys = window.opener.alternativeKeys;
    view.showKeyboard(window.opener.alternativeKeys);

    webView.adjustSize($('#alternative-keys-keyboard').width(), $('#alternative-keys-keyboard').height());
    webView.adjustSize(document.body.scrollWidth, document.body.scrollHeight);

    $('button').mouseup(function() {
        window.opener.alternativeKeyClicked($(this).data('code'));
        window.close();
    });
}
