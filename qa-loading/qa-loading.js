/*
 * Created by Willianson
 * At 2015.08.24
 */




Polymer(
{
	is: 'qa-loading',




	/* properties
	---------------------------------------------------------------------------*/
	properties: {
		mode 		: String,
		backcolor 	: String,
    	frontcolor 	: String,
    	size 		: String
    },




	/* init
	---------------------------------------------------------------------------*/
	ready: function()
	{
		// Default: #d9d9d9 #646668
		// Mode: full, small, full-transparent

		this.mode 		= (this.mode || 'full');
		this.backcolor 	= (this.backcolor || 'rgba(0,0,0,0)');
		this.frontcolor = (this.frontcolor || 'rgba(255,255,255,0.7)');
		this.size 		= (this.size || '42');
		this.openned 	= false;

		this.setTextColor();
	},




	/* methods
	---------------------------------------------------------------------------*/
	hide: function()
	{
		// elements
		var el_loading = $(this);

		// action
		el_loading.removeClass('show');
	},



	setTextColor: function()
	{
		// elements
		var el_text = $('qa-loading span');

		// data
		var frontcolor = el_text.data('frontcolor');

		// action
		el_text.css('color', frontcolor);
	},



	show: function(mode)
	{
		// elements
		var el_loading = $(this);

		// data
		this.mode = (mode || this.mode);

		// action
		el_loading.addClass('show');
	},


});