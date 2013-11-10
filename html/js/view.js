function isSpecialKey(key) {
    return !/^[a-z\u00C0-\u00ff]+$/.test(key);
}

function getLayoutWidth(layout) {
    var width = 0;

    Keyboards[Keyboard.language()][layout].forEach(function(row, i) {
        var w = 0;
        row.forEach(function(key, j) {
            w += 1 * (key.ratio ? key.ratio : 1);
        });

        if (w > width)
            width = w;
    });

    return width;
}

const View = function(el) {
    var placeHolderWidth = -1;

    return {
        showKeyboard: function(layout) {
            var layoutWidth = getLayoutWidth(layout);
            if (placeHolderWidth == -1)
                placeHolderWidth = parseInt(el.width() / layoutWidth);
            var keyboardWidth = placeHolderWidth * layoutWidth - 6;

            el.empty();

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
                        if (key.label)
                            buttonKey.append($('<span>' + key.label + '</span>'));
                        else {
                            buttonKey.addClass('spacer');
                            buttonKey.append($('<span>&nbsp;</span>'));
                        }
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

            webView.setPosition();
        },

        updateLabelCase: function() {
            var capsLocked = (!window.opener ? Keyboard.isCapsLocked() : window.opener.isCapsLocked);
            el.find('button.alphabetical-key').find('span').css('text-transform', (capsLocked ? 'uppercase' : 'lowercase'));
        }
    }
}
