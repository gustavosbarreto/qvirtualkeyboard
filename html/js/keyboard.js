function isSpecialKey(key) {
	return !/^[a-z\u00C0-\u00ff]+$/.test(key);
}

const Keyboard = function() {
	var isPressing = false;
	var capsLockLocked = false;
	var altPopupTimeout = 0;
	var backSpaceInterval = 0;
	var backSpaceTimeout = 0;

	View.showKeyboard('pt_BR', 'mainLayout');

	$('button').mousedown(function() {
		var key = $(this).data('key');
		var keyCode = key.code || key.label;
		var isPressing = true;

		altPopupTimeout = setTimeout(function() {
			if (key.alt)
				showAlternativeKeys(key);
		}, 600);

		if (keyCode == 'BackSpace') {
			x11.sendKey(keyCode);

			backSpaceTimeout = setTimeout(function() {
				backSpaceInterval = setInterval(function() {
					x11.sendKey(keyCode);
				}, 100);
			}, 600);
		}
	});

	$('button').mouseup(function() {
		clearTimeout(altPopupTimeout);
		clearTimeout(backSpaceTimeout);
		clearInterval(backSpaceInterval);
	});

	function showAlternativeKeys(key) {
		window.alternativeKeys = key.alt;
		var altPopup = window.open('qrc:///html/alt.html');
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
}

window.onload = function() { Keyboard() };


