Polymer(
{
	is: 'qa-dialog',




	/* properties
	---------------------------------------------------------------------------*/
	properties: {
		animation_time 	: 200,
		overlay_close	: false
    },




	/* init
	---------------------------------------------------------------------------*/
	ready: function()
	{},




	/* methods
	---------------------------------------------------------------------------*/
	close: function()
	{
		// action
		$(this).fadeOut(this.animation_time, function()
		{
			$(this).remove();
		});
	},



	hideContentLoading: function()
	{
		var me = this;

		// elements
		var el_content_loading = $('section.content div.loading');

		// action
		el_content_loading.fadeOut(me.animation_time, function(){ $(this).remove(); });
	},



	iframeLoaded: function()
	{
		var me = this;
		$(this).closest('qa-dialog').removeClass('loading').find('qa-loading').hide();
	},



	showContentLoading: function()
	{
		var me = this;

		// elements
		var el_content = $('section.content');

		// action
		el_content.append('<div class="loading none"></div>').find('.loading').fadeIn(me.animation_time);
	},



	showOutput: function(output)
	{
		var me = this;

		// template
		var html_output =  '<div id="cleanbox-output">'
			html_output += '	<div id="output-message" class="radius-5 shadow-30"></div>'
			html_output += '</div>';

		// elements
		var el_body 			= $('body');
		var el_output 			= $('#cleanbox-output');
		var el_output_message 	= el_output.find('#output-message');

		// validate
		if (el_output.length == 0)
		{
			el_body.append(html_output);
			el_output 			= $('#cleanbox-output');
			el_output_message 	= el_output.find('#output-message');
		}

		// action
		// __class
		if(eval(output.type))
			el_output.removeClass('error').addClass('success');
		else
			el_output.removeClass('success').addClass('error');
		
		// __message
		el_output_message.html(output.message);

		// __show
		el_output.stop(false, false).animate({'top': '10px'}, (me.animation_time * 2.5), 'easeInOutBack');

		// __hide
		setTimeout(function(){
			el_output.stop(false, false).animate({'top': '-100px'}, (me.animation_time * 2.5), 'easeInOutBack');
		}, me.output_duration);
	},

});