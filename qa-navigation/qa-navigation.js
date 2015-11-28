/*
 * Created by Willianson
 * At 2015.08.19
 */




Polymer(
{
	is: 'qa-navigation',




	/* properties
	---------------------------------------------------------------------------*/
	nome: "test",
	
	properties: {
        componentsPath: {
          type: String
        }
      },




	/* init
	---------------------------------------------------------------------------*/




	/* methods
	---------------------------------------------------------------------------*/
	close: function()
	{
		$(this).removeClass('open');
	},



	open: function()
	{
		$(this).addClass('open');
	},


});