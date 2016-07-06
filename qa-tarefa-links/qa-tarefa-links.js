Polymer(
{
	additions: {
		'rejeitar': {
			uri: '/form-descarte.html',
			method: 'DIALOG'
		},
		'ReenvioDocumentos': {
			uri: '/form-documentos.html',
			method: 'DIALOG'
		},
		'fazer-termo-aditivo': {
			uri: '/form-comentar-link.html',
			method: 'DIALOG'
		},
		'minuta-com-pendencias': {
			uri: '/form-comentar-link.html',
			method: 'DIALOG'
		},
		'vistoria-agendada': {
			uri: '/form-comentar-link.html',
			method: 'DIALOG'
		},
		'cancelar-agendamento': {
			uri: '/form-cancelar-agendamento.html',
			method: 'DIALOG'
		}
	},

	is: 'qa-tarefa-links',

	properties: {
		links: Array
	},

	isPost: function(link) {
		return this.isMethod(link, 'POST');
	},

	isGet: function(link) {
		return this.isMethod(link, 'GET');
	},

	isDelete: function(link) {
		return this.isMethod(link, 'DELETE');
	},

	isDialog: function(link) {
		return this.isMethod(link, 'DIALOG');
	},

	isUpload: function(link, method) {
		return this.isMethod(link, 'UPLOAD');
	},

	isMethod: function(link, method) {
		return link && link.rel && this.getAddition(link, 'method') == method;
	},

	isClose: function(link) {
		return link.closes;
	},

	stringifyParams: function(link) {
		var params = this.getAddition(link, 'params') || link.params || link;
		return Object.keys(params).reduce(function(result, param) {
			return result + (result ? '&' : '') + param + '=' + encodeURIComponent(params[param]);
		}, '');
	},

	getUri: function(link) {
		return this.getAddition(link, 'uri');
	},

	getAddition: function(link, key) {
		var addition = this.additions[link.rel];
		return addition && addition[key] || link[key];
	},

	getAction: function(link) {
		var indQuestion = link.uri.indexOf("/") == 0 ? -1 : link.uri.indexOf('?');
		if (indQuestion >= 0){
			return link.uri.substring(0,indQuestion);
		}
		return link.uri;
	},

	getGetFields: function(a,b){
		return _getGetFields(a,b);
	},

	refresh: function() {
		var qaTarefaLista = $('qa-tarefa-lista')[0];
		qaTarefaLista.reset();
		qaTarefaLista.load();
	},

	handleClick: function(event, detail) {
		var self = this;
		var url = $(event.target).attr('href');
		if (typeof $(event.target).attr('closes') != 'undefined') {
			this.ajaxClose(url);
		} else {
			window.open(url);
		}

	},

	ajaxClose: function(url){
		var self = this;
		$.ajax({
			url: url,
			dataType: "json",
			success:function(){
				self.refresh();
			},
			error: function(response) {
				alert('Ocorreu um erro inesperado, entre em contato com a equipe de produto');
			}
		});
	},

	authHeader : function (){
		return {"5andar-auth":document.cookie.match(new RegExp("5AJWT_AUTH=([^;]*)"))[1]}
	}

});

/**
@param dontTryParseAfter avoids recursion that might result in stackoverflow
**/
var _getGetFields = function(link, dontTryParseAfter) {
	var indQuestion = link.uri.indexOf('?');
	var fields = new Array();
	if (indQuestion >= 0){
		var fieldsAndName = link.uri.substring(indQuestion+1,link.uri.length).split("&");
		for (i in fieldsAndName) {
			var bjeto = fieldsAndName[i].split("=");
			fields.push({name:bjeto[0],value:bjeto[1]});
		}
	}
	if ((!dontTryParseAfter) && fields.length == 1 && fields[0].name == 'after') {
		return _getGetFields({uri:decodeURIComponent(fields[0].value)}, true);
	}
	return fields;
};
//5a components
var _formAsJson = function(form,separator){
		var $form = $(form);
		if(! separator) {
			separator = ".";
		}
		var fields = $form.find("input:not([type=submit])[wont-post!='true'],select,textarea,submit[clicked=true],input[type=submit][clicked=true],button[type=submit][clicked=true]");
		var json = {};
		fields.each(function(){
			var $el = $(this);
			var container = json;
			var containerVar = $el.attr("name");
			if(!containerVar){return;}
			var nameSplit = containerVar.split(new RegExp("["+separator+"]"));
			$(nameSplit).each(function(ind,field){
				//ignora primeiro nivel
				var isArray = field.match(new RegExp("\\[([0-9a-zA-Z]+)\\]$"));
				field = field.replace(new RegExp("\\[([0-9a-zA-Z]+)\\]$"),"");

				if(isArray){
					if(! container[field]){
						container[field] = [];
					}
					container = container[field];
					field = isArray[1];
				}

				var ehObjeto = (ind < (nameSplit.length - 1));
				if(ehObjeto){
					if(!container[field]){
						container[field] = {};
					}
					container = container[field];
				} else {
					containerVar = field;
				}
			});
			var elval = $el.val();
			if(elval && (($.isArray(elval) && elval.length > 0)|| (typeof elval == "string" && elval.trim().length > 0))){
				if($el.filter("input[type=checkbox],input[type=radio]").length == 0 || $el.prop("checked")){
					if(!container[containerVar]){
						container[containerVar] = elval;
					} else {
						if(!$.isArray(container[containerVar])){
							container[containerVar] = [container[containerVar]];
						}
						container[containerVar].push(elval);

					}
				}
			}
		});
		return json;
	};

$(document).bind('DOMNodeInserted', "form[enctype=application\\/json]", function(event) {
	$(event.target).find("form[enctype=application\\/json]").each(function(){
		initFormJson($(this));
	});
});
$(document).ready(function(){
	$("form[enctype=application\\/json]").each(function(){
		initFormJson($(this));
	});
});

var initFormJson = function($form) {
	$form.off('submit');
	$form.submit(function(e){
		e.preventDefault();
		var formContent = _formAsJson($form);
		$.ajax({
			url: $form.attr("action"),
			contentType: $form.attr("enctype"),
			dataType: "json",
			data: JSON.stringify(formContent),
			type: $form.attr("method"),
			success:function(){
				var qaTarefaLista = $('qa-tarefa-lista')[0];
				if (qaTarefaLista) {
					qaTarefaLista.reset();
					qaTarefaLista.load();
				}
			},
			error: function(response) {
				alert('Ocorreu um erro inesperado, entre em contato com a equipe de produto');
				console.log(response);
			}
		});

	})
}
