
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
		var self = this;
		$(self).find('.form-comentario').attr('action', this.getMessagesPath());
		$(self).find('.form-observacao').attr('action', this.getObservationPath());
		$(self).find('.btnEditObservation').click(function(e) {
			e.preventDefault();
			$(this).hide();
			$(self).find('.dvForm').show();
			$(self).find('.txtObservation').val($(self).find('.pObservation').text());
			$(self).find('.txtObservation').focus();
			
			$(self).find('.pObservation').hide();
		});
		self.bindFormCallback();
	},

	bindFormCallback: function(){
		var self = this;
		$(self).find('.form-comentario').unbind("iron-form-response");
		$(self).find('.form-comentario').on("iron-form-response", function(response, status){
			self.reset();
			$(self).find('.addCommentBtn').val('');

		});

		$(self).find('.form-observacao').unbind("iron-form-error");
		$(self).find('.form-observacao').on("iron-form-error", function() {
			$(self).find('.pObservation').show();
			$(self).find('.dvForm').hide();
			$(self).find('.btnEditObservation').show();
			alert('ocorreu um erro');
		});
		$(self).find('.form-observacao').on("iron-form-response", function(response, status){
			$(self).find('.pObservation').text($(self).find('.txtObservation').val())
			$(self).find('.btnEditObservation').show();
			$(self).find('.dvForm').hide();
			$(self).find('.pObservation').show();
		});
	},

	getDate: function(timestamp) {
		return moment(timestamp).format("DD/MM/YYYY - HH:mm:ss");
	}

});
