function isSpecialKey(key) {
	return !/^[a-z\u00C0-\u00ff]+$/.test(key);
}

const Keyboard = function() {
	var isPressing = false;
	var capsLockLocked = false;

	View.showKeyboard('pt_BR', 'mainLayout');

	//$('button').mouseDown(function() {
	//});

	$('button').click(function() {
		var key = $(this).data('key');
		var keyCode = key.code || key.label;

		if (key.changeLayoutKey) {
			return;
		}

		if (keyCode == "Caps_Lock")
			$('#keyboard').find('button.alphabetical-key').find('span').css('text-transform', ((capsLockLocked = !capsLockLocked) ? 'uppercase' : 'lowercase'));

		x11.sendKey(keyCode);
	});
}

window.onload = function() { Keyboard() };
