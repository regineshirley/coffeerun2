(function(window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;

    function FormHandler(selector) {
        if (!selector) {
            throw new Error('No selector provided');
        }

        this.$formElement = $(selector);
        if (this.$formElement.length === 0) {
            throw new Error('Could not find element with selector: ' + selector);
        }
    }

    FormHandler.prototype.addSubmitHandler = function(fn) {
        console.log('Setting submit handler for form');

        this.$formElement.on('submit', function(event) {
            event.preventDefault();

            var data = {};
            $(this).serializeArray().forEach(function(item) {
                data[item.name] = item.value;
                console.log(item.name + ' is ' + item.value);
            });

            //Achievement modal
            if (data.size == 'coffee-zilla' && data.flavor != '' && data.strength == '100') {
                $('#myModal').modal('show');

                document.getElementById('yes').addEventListener('click', function() {
                    if (data.emailAddress != '') {
                        $('#myModal').modal('hide');
                        $('#powerUpModal').modal('show');

                        console.log(data);
                        fn(data);
                        this.reset();
                        //this.element[0].focus();

                    } else {
                        //$('#missingEmail').html('<font color="red">Please enter your email and try again!</font>');
                        $('#myModal').modal('hide');
                        $('#emailError').modal('show');
                    }
                }.bind(this));
            } else {
                console.log(data);
                fn(data);
                this.reset();
                this.elements[0].focus();
            }
        });
    };

//Change strength value and color of number as you slide
    FormHandler.prototype.addSliderHandler = function() {
        var range = $('#strengthLevel');
        var value = $('#strengthValue');

        this.$formElement.on('change', range, function() {
            $(value).html($(range).val());

            if ($(range).val() < 34) {
                $(value).css('color', 'green');
            } else if ($(range).val() > 33 && $(range).val() < 67) {
                $(value).css('color', '#FFCC00');
            } else if ($(range).val() > 66) {
                $(value).css('color', 'red');
            }
        });
    };

    App.FormHandler = FormHandler;
    window.App = App;
})(window);
