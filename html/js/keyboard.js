function isSpecialKey(key) {
	return !/^[a-z\u00C0-\u00ff]+$/.test(key);
}

const Keyboard = (function() {
	var isPressing = false;
	var capsLocked = false;
	var alternativesPopup = 0;
	var altPopupTimeout = 0;
	var backSpaceInterval = 0;
	var backSpaceTimeout = 0;
	var currentKey = null;
    var language = "";

	function showAlternativeKeys(key) {
		window.alternativeKeys = key.alt;
		alternativesPopup = window.open('qrc:///html/alt.html');
	}

    // public methods
	return {
		bindKeys: function() {
			$('button').mousedown(function() {
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
					x11.sendKey(currentKeyCode);

					backSpaceTimeout = setTimeout(function() {
						backSpaceInterval = setInterval(function() {
							x11.sendKey(currentKeyCode);
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
					$('#keyboard').children('div').remove();
					View.showKeyboard(currentKey.layout);
					Keyboard.bindKeys();
					return;
				}

				if (currentKeyCode == "Caps_Lock") {
					capsLocked = !capsLocked;
					View.updateLabelCase();
				}

				if (currentKeyCode != 'BackSpace')
					x11.sendKey(currentKeyCode);
			});

		},

		sendAlternativeKey: function(altKeyCode) {
			alternativesPopup = null;
			x11.sendComposedKey(currentKeyCode, altKeyCode);
		},

		isCapsLocked: function() { return capsLocked; },

        setLanguage: function(lang) { language = lang; },
        language: function() { return language; },
	}
})();

window.onload = function() {
    Keyboard.setLanguage('pt_BR');

	View.showKeyboard('mainLayout');

	Keyboard.bindKeys();
	webView.setPosition();
};

window.alternativeKeyClicked = function(keyCode) {
	Keyboard.sendAlternativeKey(keyCode);
}
