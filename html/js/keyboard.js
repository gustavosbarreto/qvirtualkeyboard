function isSpecialKey(key) {
	return !/^[a-z\u00C0-\u00ff]+$/.test(key);
}

const Keyboard = (function() {
	var capsLocked = false;
	var alternativesPopup = 0;
	var altPopupTimeout = 0;
	var backSpaceInterval = 0;
	var backSpaceTimeout = 0;
	var currentKey = null;
    var currentKeyCode = null;
    var language = "";
    var view = null;

	function showAlternativeKeys(key) {
		window.alternativeKeys = key.alt;
		alternativesPopup = window.open('qrc:///html/alt.html');
	}

    function sendKey(key) {
        var keyCode = ((typeof key == 'object') ? currentKeyCode : key);
        var shift = Keyboards[language].shift.indexOf(keyCode) != -1;

        var deadKey = currentKeyCode != keyCode;

        if (!deadKey) {
            if (!shift)
                x11.sendKey(keyCode);
            else
                x11.sendKey(keyCode, true);
        }
        else {
            if (!shift)
			    x11.sendComposedKey(currentKeyCode, keyCode);
            else
			    x11.sendComposedKey(currentKeyCode, keyCode, true);
        }
    }

    // public methods
	return {
		bindKeys: function() {
			$('button').mousedown(function() {
				clearTimeout(backSpaceTimeout);
				clearTimeout(altPopupTimeout);
				clearInterval(backSpaceInterval);

				if (alternativesPopup) {
					alternativesPopup.close();
					alternativesPopup = null;
				}

				currentKey = $(this).data('key');
				var isPressing = true;
				currentKeyCode = currentKey.code || currentKey.label;

				altPopupTimeout = setTimeout(function() {
					if (currentKey.alt)
						showAlternativeKeys(currentKey);
				}, 600);

				if (currentKeyCode == 'BackSpace') {
					sendKey(currentKey);

					backSpaceTimeout = setTimeout(function() {
						backSpaceInterval = setInterval(function() {
							sendKey(currentKey);
						}, 100);
					}, 600);
				}
			});

			$('button').mouseup(function() {
				clearTimeout(backSpaceTimeout);
				clearTimeout(altPopupTimeout);
				clearInterval(backSpaceInterval);

				if (alternativesPopup)
					return;

				if (currentKey.isLayoutSwitcher) {
					view.showKeyboard(currentKey.layout);
					Keyboard.bindKeys();
					return;
				}

				if (currentKeyCode == "Caps_Lock") {
					capsLocked = !capsLocked;
					view.updateLabelCase();
				}

				if (currentKeyCode != 'BackSpace')
					sendKey(currentKey);
			});

		},

        setView: function(value) {
            view = value;
        },

        showLayout: function(layout) {
            view.showKeyboard(layout);
        },

		sendAlternativeKey: function(altKeyCode) {
			alternativesPopup = null;
            sendKey(altKeyCode);
		},

		isCapsLocked: function() { return capsLocked; },

        setLanguage: function(lang) { language = lang; },
        language: function() { return language; },
	}
})();

window.onload = function() {
    Keyboard.setLanguage('pt_BR');

    Keyboard.setView(new View($('#keyboard')));
    Keyboard.showLayout('mainLayout');
	Keyboard.bindKeys();

	webView.setPosition();
};

window.alternativeKeyClicked = function(keyCode) {
	Keyboard.sendAlternativeKey(keyCode);
}
