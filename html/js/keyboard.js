function isSpecialKey(key) {
	return !/^[a-z\u00C0-\u00ff]+$/.test(key);
}

const Keyboard = (function() {
	var isPressing = false;
	var capsLocked = false;
	var altPopup = 0;
	var altPopupTimeout = 0;
	var backSpaceInterval = 0;
	var backSpaceTimeout = 0;
	var currentKey = null;

	function showAlternativeKeys(key) {
		window.alternativeKeys = key.alt;
		altPopup = window.open('qrc:///html/alt.html');
	}

	return {
		initialize: function() {
			$('button').mousedown(function() {
				if (altPopup) {
					altPopup.close();
					altPopup = 0;
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


				if (currentKey.isLayoutSwitcher) {
					$('#keyboard').children('div').remove();
					View.showKeyboard('pt_BR', currentKey.layout);
					Keyboard.initialize();
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
			altPopup = 0;
			x11.sendComposedKey(currentKeyCode, altKeyCode);
		},

		isCapsLocked: function() { return capsLocked; }
	}
})();

window.onload = function() {
	View.showKeyboard('pt_BR', 'mainLayout');
	Keyboard.initialize();
	webView.setPosition();
};

window.alternativeKeyClicked = function(keyCode) {
	Keyboard.sendAlternativeKey(keyCode);
}
