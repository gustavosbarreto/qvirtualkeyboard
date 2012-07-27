window.Keyboards = window.Keyboards || {};

window.Keyboards['pt_BR'] = {
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
			{ label: '?123', changeLayoutKey: true, layout: 'symbolLayout' },
			{ label: '&nbsp', ratio: 7, code: 'space' },
			{ label: '↵', ratio: 2, code: 'Return' }
		]
	]
};
