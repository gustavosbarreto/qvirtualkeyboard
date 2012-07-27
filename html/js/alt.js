window.onload = function() {
	var alternativeKeys = window.opener.alternativeKeys;

	var keyboardRow = $('<div class="keyboard-row"/>');

	for (var label in alternativeKeys) {
		var buttonKey = $('<button class="keyboard-key alphabetical-key"/>');
		buttonKey.append($('<span>' + label + '</span>'));
		//buttonKey.css('width', placeHolderWidth * (key.ratio || 1));
		keyboardRow.append(buttonKey);
	}

	$('#alternative-keys-keyboard').append(keyboardRow);

	window.resizeTo($('#alternative-keys-keyboard').width(), $('#alternative-keys-keyboard').height());
}

