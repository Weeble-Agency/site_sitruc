window.addEvent('domready', function() {
    var form = $('formulaire-aidants');
    if (form) {
        verif_form_aidants(form);
        events_form_aidants(form);
    }
});

/* ----------------------------------------------------------
  Affichage / masquage des champs
---------------------------------------------------------- */

var events_form_aidants = function() {
    var el_societaire = $('form-aa-societaire'),
        box_num_societaire = $('box-form-aa-num-societaire');
    if (!el_societaire || !box_num_societaire) {
        return;
    }
    // Cacher num societaire
    box_num_societaire.hide();

    // Au changement de societaire
    el_societaire.addEvent('change', function(e) {
        // - si societaire
        if (el_societaire.value == '1') {
            // afficher num societaire
            box_num_societaire.show();
            box_num_societaire.getElements('input')[0].focus();
        }
        else {
            // sinon masquer
            box_num_societaire.hide();
        }
    });

};

/* ----------------------------------------------------------
  Verification données du formulaire
---------------------------------------------------------- */

var verif_form_aidants = function(form) {
    form.getElements('[data-numberonly]').each(function(el) {
        el.addEvent('blur', function(e) {
            $(this).value = $(this).value.replace(/(\D)/g, '');
        });
    });
    form.addEvent('submit', function(e) {
        var messages = [],
            firstElement = false;
        // Test required elements
        var required_elements = form.getElements('[required], .required');
        required_elements.each(function(el) {
            if (!el.value || el.value === '') {
                messages.push(el.title + ' ne devrait pas être vide');
                if (!firstElement) {
                    firstElement = el;
                }
            }
        });
        var emails = form.getElements('[type=email], .test-email');
        emails.each(function(el) {
            if (!el.value.match(/[^\s@]+@[^\s@]+\.[^\s@]+/)) {
                messages.push(el.title + ' devrait être un email');
                if (!firstElement) {
                    firstElement = el;
                }
            }
        });
        if (messages.length > 0) {
            // Prevent the form from being sent
            e.preventDefault();
            // Display messages
            alert(messages.join("\n"));
            // focus to the first element in error
            firstElement.focus();
            // Legacy method to stop the form from being sent
            return false;
        }
    });
};