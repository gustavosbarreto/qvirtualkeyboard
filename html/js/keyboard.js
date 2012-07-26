var capsLock = false;

function isSpecialKey(key) {
	return !/^[a-z\u00C0-\u00ff]+$/.test(key);
}

window.onload = function() {
	var layoutWidth = 10;
	var keyboardWidth = $('#keyboard').width();
	var placeHolderWidth = keyboardWidth / layoutWidth;

	Keyboards['pt_BR'].mainLayout.forEach(function(row, i) {
		var keyboardRow = $('<div class="keyboard-row"/>');
		row.forEach(function(key, x) {
			var buttonKey = $('<button class="keyboard-key' + (!isSpecialKey(key.code) ? ' alphabetical-key' : '') + '"/>');
			buttonKey.data('key', key);
			buttonKey.append($('<span>' + key.label + '</span>'));
			buttonKey.css('width', placeHolderWidth * (key.ratio || 1));
			keyboardRow.append(buttonKey);
		});
		$('#keyboard').append(keyboardRow);
	});

	$('button').click(function() {
		var key = $(this).data('key');
		var keyCode = key.code || key.label;

		if (key.changeLayoutKey) {
			return;
		}

		if (keyCode == "Caps_Lock")
			$('#keyboard').find('button.alphabetical-key').find('span').css('text-transform', ((capsLock = !capsLock) ? 'uppercase' : 'lowercase'));

		x11.sendKey(keyCode);
	});
}
