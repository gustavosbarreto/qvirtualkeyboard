function isSpecialKey(key) {
	return !/^[a-z\u00C0-\u00ff]+$/.test(key);
}

const View = function(el) {
	var layoutWidth = 10;
	var placeHolderWidth = parseInt(el.width() / layoutWidth);
	var keyboardWidth = placeHolderWidth * layoutWidth - 6;

    return {
	    showKeyboard: function(layout) {
		    el.children('div').remove();

            if (typeof layout == 'object') {
			    var keyboardRow = $('<div class="keyboard-row"/>');
                for (var key in layout) {
				    var buttonKey = $('<button class="keyboard-key' + (!isSpecialKey(key.code) && !key.isLayoutSwitcher ? ' alphabetical-key' : '') + '"/>');
				    buttonKey.data('code', layout[key]);
				    buttonKey.append($('<span>' + key + '</span>'));
				    keyboardRow.append(buttonKey);
			    }
    
			    el.append(keyboardRow);
            }
            else {
		        Keyboards[Keyboard.language()][layout].forEach(function(row, i) {
			        var keyboardRow = $('<div class="keyboard-row"/>');
			        row.forEach(function(key, x) {
				        var buttonKey = $('<button class="keyboard-key' + (!isSpecialKey(key.code) && !key.isLayoutSwitcher ? ' alphabetical-key' : ' special-key') + '"/>');
				        buttonKey.data('key', key);
				        buttonKey.append($('<span>' + key.label + '</span>'));
						if (key.ratio)
				        	buttonKey.css('width', (placeHolderWidth * key.ratio) - 6);
						else
							buttonKey.css('width', placeHolderWidth - 6);

				        keyboardRow.append(buttonKey);
			        });
                    
			        el.append(keyboardRow);
		        });
            }

			el.css('width', keyboardWidth);

            if (!window.opener)
		        x11.resizeWindow(el.outerWidth(), el.outerHeight());

		    this.updateLabelCase();
	    },

	    updateLabelCase: function() {
            var capsLocked = (!window.opener ? Keyboard.isCapsLocked() : window.opener.isCapsLocked);
		    el.find('button.alphabetical-key').find('span').css('text-transform', (capsLocked ? 'uppercase' : 'lowercase'));
	    }
    }
}
