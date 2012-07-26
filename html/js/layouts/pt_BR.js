window.Keyboards = window.Keyboards || {};

window.Keyboards['pt_BR'] = {
	main: [
		[
			{ label: 'q' }, { label: 'w' }, { label: 'e', alt: { 'é': 'eacute', 'è': 'egrave', 'ê': 'ecircumflex' } },
			{ label: 'r' }, { label: 't' }, { label: 'y' }, { label: 'u', alt: { 'ú': 'uacute' } },
			{ label: 'i', alt: [ { label: 'í', key: 'iacute' } ] },
			{ label: 'o', alt: [ { label: 'ó', key: 'oacute' }, { label: 'õ', key: 'otilde' }, { label: 'ô', key: 'ocircumflex' } ] }, { label: 'p' }
		],

		[
			{ label: 'a', alt: { 'á': 'aacute', 'à': 'agrave', 'ã': 'atilde' } }, { label: 's' }, { label: 'd' }, { label: 'f' }, { label: 'g' },
			{ label: 'h' }, { label: 'j' }, { label: 'k' }, { label: 'l' }, { label: 'ç' }
		],

		[
			{ label: '⇪', ratio: 1.5, key: 'Caps_Lock' },
			{ label: 'z' }, { label: 'x' }, { label: 'c' }, { label: 'v' },
			{ label: 'b' }, { label: 'n' }, { label: 'm' },
			{ label: '⌫', ratio: 1.5, key: 'BackSpace' }
		],

		[
			{ label: '?123' },
			{ label: '&nbsp', ratio: 7, key: 'space' },
			{ label: '↵', ratio: 2, key: 'Return' }
		]
	]
};
