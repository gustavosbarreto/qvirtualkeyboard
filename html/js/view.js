const View = function(el) {
    return {
	    showKeyboard: function(layout) {
		    el.children('div').remove();

		    var layoutWidth = 10;
		    var keyboardWidth = el.width();
		    var placeHolderWidth = keyboardWidth / layoutWidth;

		    Keyboards[Keyboard.language()][layout].forEach(function(row, i) {
			    var keyboardRow = $('<div class="keyboard-row"/>');
			    row.forEach(function(key, x) {
				    var buttonKey = $('<button class="keyboard-key' + (!isSpecialKey(key.code) && !key.isLayoutSwitcher ? ' alphabetical-key' : '') + '"/>');
				    buttonKey.data('key', key);
				    buttonKey.append($('<span>' + key.label + '</span>'));
				    buttonKey.css('width', placeHolderWidth * (key.ratio || 1));
				    keyboardRow.append(buttonKey);
			    });

			    el.append(keyboardRow);
		    });

		    x11.resizeWindow(keyboardWidth + 40, el.height() + 40);

		    this.updateLabelCase();
	    },

	    updateLabelCase: function() {
		    el.find('button.alphabetical-key').find('span').css('text-transform', (Keyboard.isCapsLocked() ? 'uppercase' : 'lowercase'));
	    }
    }
}
