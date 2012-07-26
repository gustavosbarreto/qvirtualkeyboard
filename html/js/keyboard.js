window.onload = function() {
	var layoutWidth = 10;
	var keyboardWidth = $('#keyboard').width();
	var placeHolderWidth = keyboardWidth / layoutWidth;

	Keyboards['pt_BR'].main.forEach(function(row, i) {
		var keyboardRow = $('<div class="keyboard-row"/>');
		row.forEach(function(key, x) {
			var buttonKey = $('<button class="keyboard-key"/>');
			buttonKey.data('key', key.key || key.label);
			buttonKey.append($('<span>' + key.label + '</span>'));
			buttonKey.css('width', placeHolderWidth * (key.ratio || 1));
			keyboardRow.append(buttonKey);
		});
		$('#keyboard').append(keyboardRow);
	});

	$('button').click(function() {
		var key = $(this).data('key');

		if (key == "Caps_Lock") {
		}

		x11.sendKey($(this).data('key'));
	});
}
