Polymer(
{

	is: 'qa-imovel-infobox',



	/* properties
	---------------------------------------------------------------------------*/
	properties: {
		imovelId: {
			type: Object,
			observer: '_imovelIdChanged'
		}
	},

	_imovelIdChanged: function() {
		this.load();
	},

	/* init
	---------------------------------------------------------------------------*/

	ready: function() {		

	},


	/* methods
	---------------------------------------------------------------------------*/

	load: function() {
		
		var self = this;
		$.getJSON('/api/properties/' + self.imovelId, function(json, textStatus)
		{

			self.imovel = json.imovel;

            //definição provisoria da permissao de animais
            for(i=0; i<self.imovel.amenidades.length; i++){
                if(self.imovel.amenidades[i].codigo === 'PODE_TER_ANIMAIS_DE_ESTIMACAO'){
                    self.animais = json.imovel.amenidades[i].estadoImovel.toLowerCase();
                }
            };

		});

	},

	formatInfo: function(info) {
		if(info === false) return "não"
		else if(info === true) return "sim"
		else return "-"
	},

	statusImovelClass: function(status) {
		if(status === "edicaoSemUsuario" || status === "edicaoUsuarioNaoConfirmado"){return "status_imovel edicao"}
		else{return "status_imovel " + status;}
	},

	statusImovelText: function(status) {
		if(status === "edicaoSemUsuario" || status === "edicaoUsuarioNaoConfirmado"){return "edição"}
		else{return status}
	},


});