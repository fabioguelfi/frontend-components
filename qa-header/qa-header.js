/*
 * Created by Willianson
 * At 2015.08.19
 */




Polymer(
{
	is: 'qa-header',


	/* properties
	---------------------------------------------------------------------------*/
	properties: {
        logoTitle: {
          type: String
        },
        componentsPath: {
          type: String
        },
		userName: {
		  	type: String
		},
		userRole: {
		  	type: String
		}
      },	

	/* init
	---------------------------------------------------------------------------*/

	ready: function() {
		console.log('user header =  ' + JSON.stringify(this.user));
	}


	/* methods
	---------------------------------------------------------------------------*/
});