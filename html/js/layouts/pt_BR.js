window.Keyboards = window.Keyboards || {};

window.Keyboards['pt_BR'] = {
	mainLayout: [
		[
			{ label: 'q' }, { label: 'w' }, { label: 'e', alt: { 'é': 'eacute', 'è': 'egrave', 'ê': 'ecircumflex' } },
			{ label: 'r' }, { label: 't' }, { label: 'y' }, { label: 'u', alt: { 'ú': 'uacute' } },
			{ label: 'i', alt: [ { label: 'í', code: 'iacute' } ] },
			{ label: 'o', alt: [ { label: 'ó', code: 'oacute' }, { label: 'õ', code: 'otilde' }, { label: 'ô', code: 'ocircumflex' } ] }, { label: 'p' }
		],

		[
			{ label: 'a', alt: { 'á': 'aacute', 'à': 'agrave', 'ã': 'atilde' } }, { label: 's' }, { label: 'd' }, { label: 'f' }, { label: 'g' },
			{ label: 'h' }, { label: 'j' }, { label: 'k' }, { label: 'l' }, { label: 'ç' }
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
