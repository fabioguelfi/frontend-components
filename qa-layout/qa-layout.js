/*
 * Created by Willianson
 * At 2015.08.19
 */




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
        }
      },

	/* init
	---------------------------------------------------------------------------*/
    ready: function() {
    	console.log('this.showHeaderSection1 = ' + this.dontShowHeader);
    	console.log('this.showSubmenuSection1 = ' + this.dontShowSubmenu);
    	console.log('this.showNavigationSection1 = ' + this.dontShowNavigation);
    },


	/* methods
	---------------------------------------------------------------------------*/
	anyClick: function()
	{
		alert(1)
	}

});