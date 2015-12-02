Polymer(
{
	is: 'qa-layout',




	/* properties
	---------------------------------------------------------------------------*/
	properties: {
        componentsPath: {
          type: String
        },
        dontShowHeader: {
            type: Boolean,
            value: false
        },
        dontShowSubmenu: {
            type: Boolean,
            value: false
        },
        dontShowNavigation: {
            type: Boolean,
            value: false
        },
        logoTitle: {
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
    	
    	
    },


	/* methods
	---------------------------------------------------------------------------*/
	anyClick: function()
	{
		alert(1)
	}

});