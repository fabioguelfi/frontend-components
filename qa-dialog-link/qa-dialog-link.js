/*
 * Created by Willianson
 * At 2015.08.26
 */




Polymer(
{
	is: 'qa-dialog-link',




	/* properties
	---------------------------------------------------------------------------*/
	properties: {
		'href' 			: String,
		'target' 		: String,
		'data-params' 	: String,
		'action' 		: String,
		'params': Object
    },




	/* init
	---------------------------------------------------------------------------*/
	ready: function()
	{
		this.bindCallers();
		this.bindClosers();
	},




	/* methods
	---------------------------------------------------------------------------*/
	bindCallers: function()
	{
		var self = this;

		// elements
		var el_callers 	= $(this).find('a:not([action="close"])');

		// click
		var open_function = function(event)
		{
			event.preventDefault();

			// data
			var destine 		= $(this).attr('href');
			var window_target	= $(this).attr('target');
			var params 			= $(this).data('params');
			var fullscreen 		= $(this).data('fullscreen');

			if (params) 
				destine += '?'+params;

			// action
			self.open(destine, window_target, fullscreen);
		};
		
		// action
		el_callers.on('click', open_function);
	},



	bindClosers: function()
	{
		var self = this;

		// elements
		var el_closers = $(this).find('a[action="close"]');
		
		// click
		var close_function = function(event)
		{
			event.preventDefault();
			
			// action
			top.$('qa-dialog:last')[0].close();
		};
		
		// action
		el_closers.on('click', close_function);
	},



	open: function(reference, window_target, fullscreen)
	{
		var self			= this;
		var window_target 	= (window_target || null);
		var fullscreen 		= (fullscreen || false);

		// elements
		var el_body = (window_target) ? eval(window_target).$('body') : $('body');
		
		// data
		var new_dialog 	= null;
		var type 		= null;
		
		var linkParams = $(self).attr('params');;

		// action
		// _element
		if (!!reference && reference.length > 1 && (reference.indexOf('#') == 0 || reference.indexOf('.') == 0))
		{
			self.template({ type: (fullscreen ? 'fullscreen' : 'element'), content: 'TODO: apply content by reference.' }, el_body, linkParams);
		}

		// _iframe
		else
		{
			self.template({ type: (fullscreen ? 'fullscreen' : 'iframe'), url: reference }, el_body, linkParams);
		}
		
	},



	template: function(params, el_body, linkParams)
	{
		var self = this;

		// validate
		if (params.length == 0)
			alert('cleanbox.template(): Param "type" must be set.')
				
		// data
		var output = null;
		
		$.get(params.url, function(data){
			var $dialog = $('<qa-dialog params=' + linkParams + '>' + data + '</qa-dialog>');
			el_body.append($dialog);
			$dialog[0].iframeLoaded();
		});

		// action
		switch(params.type)
		{
			case 'iframe':
				output = '<qa-dialog class="loading"><iframe src="'+params.url+'" frameborder="0" data-will="test" onload="$(this).parent()[0].iframeLoaded()"></iframe></qa-dialog>';
				break;

			case 'element':
				output = '<div class="qa-dialog">'+params.content+'</div>';
				break;

			case 'fullscreen':
				output = '<qa-dialog class="fullscreen loading"><a href="#" class="close icon-close" rel="cleanbox-close">FECHAR</a><iframe src="'+params.url+'" frameborder="0" onload="$(this).parent()[0].iframeLoaded()"></iframe></qa-dialog>';
				break;

			default:
				alert('template "'+params.type+'" not implemmented.');
		}
		
	},


});