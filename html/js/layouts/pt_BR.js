window.Keyboards = window.Keyboards || {};

window.Keyboards['pt_BR'] = {
	main: [
/*		[
			{ label: '1' }, { label: '2' }, { label: '3' }, { label: '4' }, { label: '5' },
			{ label: '6' }, { label: '7' }, { label: '8' }, { label: '9' }, { label: '0' }
		],
*/
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
			{ label: '&nbsp', ratio: 8, key: 'space' },
			{ label: '↵', ratio: 2, key: 'Return' }
		]
	]
};
