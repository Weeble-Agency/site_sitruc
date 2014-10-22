jQuery(document).ready(function ($) {

	// Custom select
	$('.filters select').FakeSelect();

	// On attend que les images loadent pour calculer la vraie hauteur des blocs
	$( window ).load(function() {
    	
		if( $('.single-content').outerHeight(true) > 800 ){
			$('.single-infos').affix({
			    offset: {
			      	top: function() {
			      		return (this.top = $('.top-contact-banner').outerHeight(true) + $('#top').outerHeight(true) + $('#main-menu').outerHeight(true) + $('#topnav').outerHeight(true) );
			      	}
			    , bottom: function () {
			    		return (this.bottom = $('.single-pagination').outerHeight(true) + $('#footer').outerHeight(true) + $('.related-posts').outerHeight(true) + 15 );
			      	}
			    }
			});
		}

	});

	/* Filtres */
	$('#filterby').on('change', function() {
		window.location.href = $(this).val();
	});

	/* Trigger video */
	$('html').on('click', '#trigger-video' , function(event) {
        event.preventDefault();
       	$('.iframe-player, .single-content').toggleClass('visible');
    });

    /* formulaire d'inscription */
    $('html').on('click', '#form-aa-est-aidant' , function(event) {
	    var $this = $(this);

	    if ($this.is(':checked')) {
	        $('.if-aidant').removeClass('hidden');
	    } else {
	        $('.if-aidant').addClass('hidden');
	    }
	});

	$('html').on('click', '#form-aa-est-benevole' , function(event) {
	    var $this = $(this);
	  
	    if ($this.is(':checked')) {
	        $('.if-benevole').removeClass('hidden');
	    } else {
	        $('.if-benevole').addClass('hidden');
	    }
	});

	$('html').on('click', '#etresocietaire' , function(event) {
	    var $this = $(this);
	  
	    if ($this.is(':checked')) {
	        $('.if-societaire').removeClass('hidden');
	    } else {
	        $('.if-societaire').addClass('hidden');
	    }
	});

	/* Ajax pagination */
	$('html').on('click', '.ajax-pagination .read-more', function(event){
        event.preventDefault();
        var href = $(this).attr('href');

        $.ajax({
            url: href,
            type: "GET",
            cache: "false",
            success: function(data, textStatus, xhr){
            	html = $(data);
            	
            	/* refresh posts */
				posts = $('.posts', html);
				$(posts.html()).appendTo('.posts');

				/* refresh pagination */
				var pagination = $('.pagination-more', html);
				$('.pagination-more').empty().append(pagination.html());

				history.pushState({}, '', href);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                window.location.href = href;
            }
        });
    });

	/* Pagination communauté */
    $('html').on('click', '.ajax-communaute .read-more', function(event){
        event.preventDefault();
        var href = $(this).attr('href');

        $.ajax({
            url: href,
            type: "GET",
            cache: "false",
            success: function(data, textStatus, xhr){
            	html = $(data);
            	
            	/* refresh membres */
				posts = $('.membres', html);
				$(posts.html()).appendTo('.membres');

				/* refresh pagination */
				var pagination = $('.pagination-more', html);
				$('.pagination-more').empty().append(pagination.html());

				history.pushState({}, '', href);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                window.location.href = href;
            }
        });
    });

    $(".page-communaute .btn-map").on('click', function(event) {
	    event.preventDefault();
	    $('html, body').animate({
	    	scrollTop: $(this.hash).offset().top
	    }, 750);
	});

});

