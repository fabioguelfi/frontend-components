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

			for(i=0; i<json.imovel.amenidades.length; i++){
				if(json.imovel.amenidades[i].codigo === 'PODE_TER_ANIMAIS_DE_ESTIMACAO'){
					json.imovel.caracteristicas.animais = self.formatInfo(json.imovel.amenidades[i].estadoImovel);
				}
			};

			self.imovel = json.imovel;

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