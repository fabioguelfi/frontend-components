Polymer({
    is: 'qa-editable',

    /// properties

    properties: {
        path: String,
    },
ready
    : function() {
        var self = this;
    },

    attached: function() {
        this.old_values_obj = {};
    },

    editAction: function() {

        var self = this,
            input,
            obj,
            old_value,
            wrapper,
            input_width,
            datatype;

        $(self).addClass('edit_mode');

        $(self).find('editable-field').each(function() {

            wrapper = $(document.createElement('span'))
                .attr({
                    class: 'edit_wrapper'
                })

            //armazena info
            obj = $(this).attr('obj');
            old_value = $(this).text();
            datatype = $(this).attr('datatype');
            self.old_values_obj[obj] = old_value;

            input_width = $(this).width();

            //remover info e insere input
            switch (datatype) {
                case 'boolean':
                    input = $(document.createElement('select'))
                        .attr({
                            name: obj,
                            class: 'edit_input',
                            datatype: datatype
                        })
                        .append($(document.createElement('option'))
                            .attr({
                                value: '',
                                selected: (old_value === '-') ? true : false
                            })
                            .text('-'))
                        .append($(document.createElement('option'))
                            .attr({
                                value: 'sim',
                                selected: (old_value === 'sim') ? true : false
                            })
                            .text('sim'))
                        .append($(document.createElement('option'))
                            .attr({
                                value: 'não',
                                selected: (old_value === 'não') ? true : false
                            })
                            .text('não'))
                    break;
                case 'vagasTipo':
                    input = $(document.createElement('select'))
                        .attr({
                            name: obj,
                            class: 'edit_input',
                            datatype: datatype
                        })
                        .append($(document.createElement('option'))
                            .attr({
                                value: 'Cobertas',
                                selected: (old_value === 'Cobertas') ? true : false
                            })
                            .text('Cobertas'))
                        .append($(document.createElement('option'))
                            .attr({
                                value: 'NaoCobertas',
                                selected: (old_value === 'NaoCobertas') ? true : false
                            })
                            .text('Não Cobertas'))
                        .append($(document.createElement('option'))
                            .attr({
                                value: 'Ambos',
                                selected: (old_value === 'Ambos') ? true : false
                            })
                            .text('Ambos'))
                    break;
                default:
                    input = $(document.createElement('input'))
                        .attr({
                            type: 'text',
                            name: obj,
                            value: old_value,
                            class: 'edit_input',
                            datatype: datatype
                        })
                        .css({
                            width: input_width + 5 + 'px'
                        })
                    break;
            }

            wrapper.append(input);

            $(this).html(wrapper);

        });

    },

    saveAction: function() {

        var self = this,
            new_values_arr = [];


        $(self).find('editable-field').each(function() {

            var new_values_obj = {},
                obj, obj_send,
                wrapper,
                value,
                datatype;

            //armazena info
            obj = $(this).find('.edit_input').attr('name');
            obj_send = obj.replace(/\./g, '/');
            datatype = $(this).find('.edit_input').attr('datatype');
            value = $(this).find('.edit_input').val();

            //verifica se campo é inexistente
            if (!self.isNullField(value, datatype)) {
                new_values_obj["op"] = "replace";
                new_values_obj["value"] = self.formatValueJson(value, datatype);
            } else {
                new_values_obj["op"] = "remove";
            }
            new_values_obj["path"] = "/" + obj_send;
            new_values_arr.push(new_values_obj);


            //polular tela com novos dados
            wrapper = $(document.createElement('editable-field'))
                .attr({
                    obj: obj
                })
                .text(self.formatReloadValue(value, datatype));

            $(this).html(wrapper);
            $(self).removeClass('edit_mode');
        });

        this.doPost(new_values_arr);

    },

    // Função de verificação se valor é inexistente
    isNullField: function(val, datatype) {
        switch (datatype) {
            case 'boolean':
                return (val === "-" || val.trim() === '') ? true : false;
                break;
            default:
                return (val.trim() === '') ? true : false;
                break;
        }

    },

    // Função de formatação do valor para ajax
    formatValueJson: function(val, datatype) {

        switch (datatype) {
            case 'boolean':
                if (val === 'não') return 'false';
                else if (val === 'sim') return 'true';
                else return 'null';
                break;
            default:
                return val;
                break;
        }
    },

    // Função de formatação do valor para repopular tela
    formatReloadValue: function(val, datatype) {
        switch (datatype) {
            case 'boolean':
                if (val === '') return '-';
                else return val;
                break;
            default:
                return val;
                break;
        }
    },

    // Função que faz a chamada patch
    doPost: function(new_values_arr) {

        $.ajax({
            headers : {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            },
            url : this.path,
            type : 'PATCH',
            data : JSON.stringify(new_values_arr),
            success : function(response, textStatus, jqXhr) {
                console.log("Patch enviado com sucesso!");
                //console.log(JSON.stringify(new_values_arr));
            },
            error : function(jqXHR, textStatus, errorThrown) {
                console.log("Ocorreram os seguintes erros: " + textStatus, errorThrown);
            }
        });
    },

    clearAction: function() {

        var self = this,
            obj,
            wrapper,
            old_obj = self.old_values_obj;

        $(self).removeClass('edit_mode');

        $(self).find('editable-field').each(function() {

            //armazena info
            obj = $(this).find('.edit_input').attr('name');

            wrapper = $(document.createElement('editable-field'))
                .attr({
                    obj: obj
                })
                .text(old_obj[obj]);

            $(this).html(wrapper);
        });

    },


});
