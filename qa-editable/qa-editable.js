Polymer({
    is: 'qa-editable',

    /// properties

    properties: {
        path: String,
    },

    ready: function() {
        var self = this;
    },

    attached: function() {
        this.old_values_obj = {};
    },

    editAction: function() {

        var self = this,
            input_text,
            obj,
            old_value,
            wrapper,
            input_width;

        $(self).addClass('edit_mode');

        $(self).find('editable-field').each(function() {

            wrapper = $(document.createElement('span'))
                .attr({
                    class: 'edit_wrapper'
                })

            //armazena info
            obj = $(this).attr('obj');
            old_value = $(this).text();
            self.old_values_obj[obj] = old_value;

            $(this).text().replace(' ', '');
            input_width = $(this).width();


            //remover info e insere input
            input_text = $(document.createElement('input'))
                .attr({
                    type: 'text',
                    name: obj,
                    value: old_value,
                    class: 'edit_input'
                })
                .css({
                    width: input_width + 5 + 'px'
                })

            wrapper.append(input_text);

            $(this).html(wrapper);

            /*$(self).keypress(function(e) {
                if(e.which == 13) {
                    console.log(self);
                }
            });*/

        });

    },

    saveAction: function() {

        var self = this,
            new_values_arr = [];


        $(self).find('editable-field').each(function() {

            var new_values_obj = {},
                obj, obj_send,
                wrapper,
                value;

            //armazena info
            obj = $(this).find('.edit_input').attr('name');
            obj_send = obj.replace(/\./g, '/');

            //prepara array para ajax
            value = $(this).find('.edit_input').val();
            new_values_obj["op"] = "replace";
            new_values_obj["path"] = "/" + obj_send;
            new_values_obj["value"] = value;
            new_values_arr.push(new_values_obj);


            //polular tela com novos dados
            wrapper = $(document.createElement('editable-field'))
                .attr({
                    obj: obj
                })
                .text(value);

            $(this).html(wrapper);
            $(self).removeClass('edit_mode');
        });

        console.log(new_values_arr);

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

    doPost: function(new_values_arr) {
    	$.post( this.path, new_values_arr)
		  .done(function( data ) {
		    //popular tela
		});
    }


});
