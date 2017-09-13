Polymer(
{
	is: 'qa-collapsible-section',


	/* properties
	---------------------------------------------------------------------------*/
	properties: {
		legend: String,
		targetId: String,
		collapseId: String,
		opened: {
			type: Boolean,
			value: false,
			notify: true
		},
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
		var open = this.iconClass == "ico";
	  this.$$("iron-collapse").toggle()
		this.set("iconClass",open?"ico open":"ico");
		this.fire("qa.collapse."+(open?"open":close));
		if (open && !this.get("firstOpen")) {
			this.fire("qa.collapse.firstOpen");
			this.set("firstOpen",true)
		}
	}

});
