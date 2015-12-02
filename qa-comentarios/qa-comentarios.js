
Polymer(
{
	is: 'qa-comentarios',

	/// properties

	properties: {
		entityId: {
			type: Number,
			observer: '_entityIdChanged'
		},
		commentPathFormat: String,
		observationPathFormat: String
	},

	_entityIdChanged: function() {
		this.load();
		this.attached();
	},

	ready: function() {
		this.comments = [];
		this.observation = '';
	},

	getTag: function() {
		return this.tagPrefix + ':' + this.entityId;
	},

	getMessagesPath	: function() {
		return this.commentPathFormat.replace(':id', this.entityId);
	},
	
	getObservationPath: function() {
		return this.observationPathFormat.replace(':id', this.entityId);
	},

	reset: function() {
		this.comments = [];
		this.load();
	},

	load: function() {
		var self = this;

		$.getJSON(this.getObservationPath(), function(json, textStatus)
		{
			var observation = json.observation;
			self.observation = observation ? observation : 'Não informado';
		});

		$.getJSON(this.getMessagesPath(), function(json, textStatus)
		{
			var messages = json.comments;
			_.map(messages, function(message) {
				self.push('comments', message);	
			});
		});
	},

	attached: function() {
		$('#form-comentario').attr('action', this.getMessagesPath());
		$('#form-observacao').attr('action', this.getObservationPath());
		$('#btnEditObservation').click(function(e) {
			e.preventDefault();
			$(this).hide();
			$('#dvForm').show();
			$('#txtObservation').val($('#pObservation').text());
			$('#txtObservation').focus();
			
			$('#pObservation').hide();
		});
		this.bindFormCallback();
	},

	bindFormCallback: function(){
		var self = this;
		$('#form-comentario').unbind("iron-form-response");
		$('#form-comentario').on("iron-form-response", function(response, status){
			self.reset();
			$('#addCommentBtn').val('');

		});

		$('#form-observacao').unbind("iron-form-error");
		$('#form-observacao').on("iron-form-error", function() {
			$('#pObservation').show();
			$('#dvForm').hide();
			$('#btnEditObservation').show();
			alert('ocorreu um erro');
		});
		$('#form-observacao').on("iron-form-response", function(response, status){
			$('#pObservation').text($('#txtObservation').val())
			$('#btnEditObservation').show();
			$('#dvForm').hide();
			$('#pObservation').show();
		});
	},

	getDate: function(timestamp) {
		return moment(timestamp).format("DD/MM/YYYY - HH:mm:ss");
	}

});
