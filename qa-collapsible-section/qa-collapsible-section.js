Polymer(
{
	is: 'qa-collapsible-section',


	/* properties
	---------------------------------------------------------------------------*/
	properties: {
		legend: String,
		targetId: String,
	},


	/* init
	---------------------------------------------------------------------------*/

	
	ready: function() {
		this.target = "#" + this.targetId;

	},


	/* methods
	---------------------------------------------------------------------------*/

	toggle: function(e) {
	    $(e.target.getAttribute('data-target')).toggle();
	    $(e.target).find('.ico').toggleClass('open');
	},

});