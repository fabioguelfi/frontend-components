Polymer(
{
	is: 'qa-fieldset',




	/* properties
	---------------------------------------------------------------------------*/
	properties: {
		legend: String,
		dataLegend: {
			type: Number,
			observer: "_dataChanged"
		},
	},

	_dataChanged: function() {
		var self = this;
		if(self.dataLegend !== undefined){
			self.legend += self.dataLegend;
		}
	},


	/* init
	---------------------------------------------------------------------------*/

	
	ready: function() {


	},


	/* methods
	---------------------------------------------------------------------------*/


});