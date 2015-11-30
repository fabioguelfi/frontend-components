Polymer(
{
	
	is: 'qa-submenu',
	
	ready: function(){
		var self = this;
		$(this).find('input[name=status]').change(function(){
			self.chageListener();
		});
	},
	
	chageListener: function(){
		$('qa-tarefa-lista')[0].load();
	}
	
});