function isSpecialKey(key) {
	return !/^[a-z\u00C0-\u00ff]+$/.test(key);
}

const Keyboard = (function() {
	var isPressing = false;
	var capsLockLocked = false;
	var altPopup = 0;
	var altPopupTimeout = 0;
	var backSpaceInterval = 0;
	var backSpaceTimeout = 0;

	function showAlternativeKeys(key) {
		window.alternativeKeys = key.alt;
		altPopup = window.open('qrc:///html/alt.html');
	}

	return {
		initialize: function() {
			View.showKeyboard('pt_BR', 'mainLayout');

			$('button').mousedown(function() {
				if (altPopup) {
					altPopup.close();
					altPopup = 0;
				}

				var key = $(this).data('key');
				var isPressing = true;
				currentKeyCode = key.code || key.label;

				altPopupTimeout = setTimeout(function() {
					if (key.alt)
						showAlternativeKeys(key);
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
				clearTimeout(altPopupTimeout);
				clearTimeout(backSpaceTimeout);
				clearInterval(backSpaceInterval);

				if (currentKeyCode != 'BackSpace')
					x11.sendKey(currentKeyCode);
			});

		},

		sendAlternativeKey: function(altKeyCode) {
			altPopup = 0;
			x11.sendComposedKey(currentKeyCode, altKeyCode);
		}
	}

	/*$('button').click(function() {
		var key = $(this).data('key');
		var keyCode = key.code || key.label;

		if (key.changeLayoutKey) {
			return;
		}

		if (keyCode == "Caps_Lock")
			$('#keyboard').find('button.alphabetical-key').find('span').css('text-transform', ((capsLockLocked = !capsLockLocked) ? 'uppercase' : 'lowercase'));

		x11.sendKey(keyCode);
	});*/
})();

window.onload = function() { Keyboard.initialize(); };

window.alternativeKeyClicked = function(keyCode) {
	Keyboard.sendAlternativeKey(keyCode);
}
