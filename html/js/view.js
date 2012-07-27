var View = {
	showKeyboard: function(language, layout) {
		var layoutWidth = 10;
		var keyboardWidth = $('#keyboard').width();
		var placeHolderWidth = keyboardWidth / layoutWidth;

		Keyboards[language][layout].forEach(function(row, i) {
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

		x11.resizeWindow(keyboardWidth, $('#keyboard').height());
	}
};

global.View = View;
