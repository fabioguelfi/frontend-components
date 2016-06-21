Polymer(
{
	is: 'qa-collapsible-section',


	/* properties
	---------------------------------------------------------------------------*/
	properties: {
		legend: String,
		targetId: String,
		collapseId: String,
		iconClass: {
			type: String,
			value: "ico"
		}
	},


	/* init
	---------------------------------------------------------------------------*/

	
	ready: function() {
		this.set("collapseId","collapse-" + this.targetId)
	},


	/* methods
	---------------------------------------------------------------------------*/

	toggle: function() {
	  this.$$("iron-collapse").toggle()
		this.set("iconClass",this.iconClass == "ico"?"ico open":"ico");
	}

});
