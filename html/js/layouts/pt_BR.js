window.Keyboards = window.Keyboards || {};

window.Keyboards['pt_BR'] = {
//    modMap: {
//        shift: [ 'dead_grave' ]
//    }
//
/*
        dead_grave: { shift: true },
        dead_circumflex: { shift: true },
        plus: { shift: true },
        numbersign: { shift: true },
        ampersand: { shift: true },
        colon: { shift: true },
        percent: { shift: true },
        dollar: { shift: true },
        exclam: { shift: true }
        at
        question
    },
*/

    mainLayout: [
        [
            { label: 'q' }, { label: 'w' }, { label: 'e', alt: { 'é': 'dead_acute', 'è': 'dead_grave', 'ê': 'dead_circumflex' } },
            { label: 'r' }, { label: 't' }, { label: 'y' }, { label: 'u', alt: { 'ú': 'dead_acute' } },
            { label: 'i', alt: [ { label: 'í', code: 'dead_acute' } ] },
            { label: 'o', alt: [ { label: 'ó', code: 'dead_acute' }, { label: 'õ', code: 'dead_tilde' }, { label: 'ô', code: 'dead_circumflex' } ] }, { label: 'p' }
        ],

        [
            { label: 'a', alt: { 'á': 'dead_acute', 'à': 'dead_grave', 'ã': 'dead_tilde' } }, { label: 's' }, { label: 'd' }, { label: 'f' }, { label: 'g' },
            { label: 'h' }, { label: 'j' }, { label: 'k' }, { label: 'l' }, { label: 'ç', code: 'ccedilla' }
        ],

        [
            { label: '⇪', ratio: 1.5, code: 'Caps_Lock' },
            { label: 'z' }, { label: 'x' }, { label: 'c' }, { label: 'v' },
            { label: 'b' }, { label: 'n' }, { label: 'm' },
            { label: '⌫', ratio: 1.5, code: 'BackSpace' }
        ],

        [
            { label: '?123', isLayoutSwitcher: true, layout: 'alternativeLayout' },
            { label: '&nbsp', ratio: 7, code: 'space' },
            { label: '↵', ratio: 2, code: 'Return' }
        ]
    ],

    alternativeLayout: [
        [
            { label: '1' }, { label: '2' }, { label: '3' }, { label: '4' }, { label: '5' }, { label: '6' }, { label: '7' }, { label: '8' }, { label: '9' }, { label: '0' }
        ],


        [
            { label: '-', code: 'minus' }, { label: '+', code: 'plus' }, { label: '=', code: 'equal' },
            { label: '#', code: 'numbersign' }, { label: '/', code: 'slash' }, { label: '&', code: 'ampersand' },
            { label: ':', code: 'colon' }, { label: ';', code: 'semicolon' }, { label: '%', code: 'percent' }, { label: '$', code: 'dollar' }
        ],


        [
            { label: 'ABC', isLayoutSwitcher: true, layout: 'mainLayout', ratio: 5 }, { label: '?', code: 'question' },
            { label: '.', code: 'period' }, { label: ',', code: 'comma' }, { label: '@', code: 'at' }, { label: '!', code: 'exclam' }
        ]
    ]
};
