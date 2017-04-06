Polymer(
	{
		is: 'qa-contract-version',

		properties: {
			contractVersion: {
				type: String,
				value: ''
			}
		},

		ready: function () { },

		getTextContractVersion: function (contractVersion) {
			switch (contractVersion) {
				case 'V2': return '2. Seguro fiança + Proteção residencial';
				case 'V1': return '1. Seguro fiança';
				case 'V0': return '0. Versão antiga';
				default: return 'Versão desconhecida';
			}
		}

	});
