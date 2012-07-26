window.onload = function() {
	Keyboards['pt_BR'].main.forEach(function(row, i) {
		var keyboardRow = $('<div class="keyboard-row"/>');
		row.forEach(function(key, x) {
			var buttonKey = $('<button class="keyboard-key"/>');
			buttonKey.data('key', key.key || key.label);
			buttonKey.append($('<span>' + key.label + '</span>'));
			keyboardRow.append(buttonKey);
		});
		$('#keyboard').append(keyboardRow);
	});

/*
	$('button').mousedown(function() {
		$(this).data('pressed', true);

		setTimeout(function() {
			if ($(this).data('pressed')) {
			}
		}.bind(this), 400);
	});

	$('button').mouseup(function() {
		$(this).data('pressed', false);
	});*/

	$('button').click(function() {
		x11.sendKey($(this).data('key'));
	});
}
