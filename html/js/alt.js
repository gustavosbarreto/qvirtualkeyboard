window.onload = function() {
	var alternativeKeys = window.opener.alternativeKeys;

	var keyboardRow = $('<div class="keyboard-row"/>');

	for (var label in alternativeKeys) {
		var buttonKey = $('<button class="keyboard-key alphabetical-key"/>');
		buttonKey.data('code', alternativeKeys[label]);
		buttonKey.append($('<span>' + label + '</span>'));
		buttonKey.css('width', 30);
		keyboardRow.append(buttonKey);
	}

	$('#alternative-keys-keyboard').append(keyboardRow);

	webView.adjustSize($('#alternative-keys-keyboard').width(), $('#alternative-keys-keyboard').height());

	$('button').mouseup(function() {
		window.opener.alternativeKeyClicked($(this).data('code'));
	});
}

