window.addEvent('domready', function (j) {

    if($('map-communaute')){
            
        var basehref='http://'+self.location.href.split('/')[2]+'/';
        
        var initcoordx = 46.768087;
        var initcoordy = 2.70813;
        var initzoom = 6;

        if($('map-communaute').getProperty('data-coordx') && $('map-communaute').getProperty('data-coordx')!=''){
            initcoordx = $('map-communaute').getProperty('data-coordx');
        }
        if($('map-communaute').getProperty('data-coordy') && $('map-communaute').getProperty('data-coordy')!=''){
            initcoordy = $('map-communaute').getProperty('data-coordy');
        }
        if($('map-communaute').getProperty('data-zoom') && $('map-communaute').getProperty('data-zoom')!=''){
            initzoom = $('map-communaute').getProperty('data-zoom');
        }
    
        if(Browser.Platform.ios || Browser.Platform.webos || Browser.Platform.android){
            isDraggable = false;
        }else{
            isDraggable = true;
        }

        var mapOptions = {
            zoom: initzoom.toInt(),
            center: new google.maps.LatLng(initcoordx,initcoordy),
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            scrollwheel: false,
            draggable: isDraggable,
            styles: [
                        {
                            "featureType": "road",
                            "elementType": "labels",
                            "stylers": [
                                {
                                    "visibility": "simplified"
                                },
                                {
                                    "lightness": 20
                                }
                            ]
                        },
                        {
                            "featureType": "administrative.land_parcel",
                            "elementType": "all",
                            "stylers": [
                                {
                                    "visibility": "off"
                                }
                            ]
                        },
                        {
                            "featureType": "landscape.man_made",
                            "elementType": "all",
                            "stylers": [
                                {
                                    "visibility": "off"
                                }
                            ]
                        },
                        {
                            "featureType": "transit",
                            "elementType": "all",
                            "stylers": [
                                {
                                    "visibility": "off"
                                }
                            ]
                        },
                        {
                            "featureType": "road.local",
                            "elementType": "labels",
                            "stylers": [
                                {
                                    "visibility": "simplified"
                                }
                            ]
                        },
                        {
                            "featureType": "road.local",
                            "elementType": "geometry",
                            "stylers": [
                                {
                                    "visibility": "simplified"
                                }
                            ]
                        },
                        {
                            "featureType": "road.highway",
                            "elementType": "labels",
                            "stylers": [
                                {
                                    "visibility": "simplified"
                                }
                            ]
                        },
                        {
                            "featureType": "poi",
                            "elementType": "labels",
                            "stylers": [
                                {
                                    "visibility": "off"
                                }
                            ]
                        },
                        {
                            "featureType": "road.arterial",
                            "elementType": "labels",
                            "stylers": [
                                {
                                    "visibility": "off"
                                }
                            ]
                        },
                        {
                            "featureType": "water",
                            "elementType": "all",
                            "stylers": [
                                {
                                    "hue": "#a1cdfc"
                                },
                                {
                                    "saturation": 30
                                },
                                {
                                    "lightness": 49
                                }
                            ]
                        },
                        {
                            "featureType": "road.highway",
                            "elementType": "geometry",
                            "stylers": [
                                {
                                    "hue": "#f49935"
                                }
                            ]
                        },
                        {
                            "featureType": "road.arterial",
                            "elementType": "geometry",
                            "stylers": [
                                {
                                    "hue": "#fad959"
                                }
                            ]
                        }
                    ]
        };
    
        var map = new google.maps.Map($("map-communaute"), mapOptions);

        var tabcp = [];
        var tabpays = [];
        var tabville = [];
        var place =  [];var cp = [];var ville = [];var pays = [];var googlex = [];var googley = [];
        var geocoder = [];var info = [];var marker = [];
        var delay = 0;


        var generatepoint = function(point, ville){
            var myLatLng = new google.maps.LatLng(point.y, point.x);

            var marker = new google.maps.Marker({
                position: myLatLng,
                map: map,
                icon: "/wp-content/themes/aveclesaidantsV2/images/pointergoogle.png"
            });
                
            google.maps.event.addListener(marker, "click", function() {
                if($('lightbox-communaute')){
                    var villecommu = ville.toLowerCase().replace(/é/g, 'e').replace(/ /g, '');
                    $$('#invitemembers .current').removeClass('current');
                    $$('#invitemembers .ville'+villecommu).each(function(el,i){
                        el.addClass('current');
                    });
                

                    var windowScroll = new Fx.Scroll(document.body);
                    var box  = new Fx.Morph($('lightbox-communaute'), {duration:700,wait:false,transition:Fx.Transitions.Expo.easeOut}).set({'opacity':0});
                    var backbox = new Fx.Morph($('backbox'), {duration:1000,wait:false,transition:Fx.Transitions.Expo.easeOut}).set({'opacity':0});


                    $('lightbox-communaute').setStyles({'z-index':'1500000'});

                    box.start({'opacity':1});
                    backbox.start({'opacity':0.70});

                    $('backbox').addClass('backlogin');
                    $('lightbox-communaute').addClass('openloginbox');
                    var scrolltop = window.getScrollTop();

                    var boxwidth = $('lightbox-communaute').getWidth();
                    var bodywidth = $(document.body).getWidth();
                    var newleft = (bodywidth-boxwidth)/2;
                    var boxheight = $('lightbox-communaute').getHeight();
                    var bodyheight = window.getHeight();
                    var newtop = scrolltop + (bodyheight-boxheight)/2;

                    $('lightbox-communaute').setStyle('left', newleft+'px');
                    $('lightbox-communaute').setStyle('top', newtop+'px');

                    if($('lightbox-communaute').hasClass('openloginbox')){
                        $('backbox').addEvents({
                            'click':function(e){
                                backbox.start({'opacity':0});
                                box.start({'opacity':0}).chain(function(){
                                    $('lightbox-communaute').setStyles({'z-index':'-2'});
                                });
                                $('lightbox-communaute').removeClass('openloginbox');
                                $('backbox').removeClass('backlogin');
                            }
                        });
                        if($$('#lightbox-communaute .closebox')[0]){
                            $$('#lightbox-communaute .closebox').each(function(el,i){
                                el.addEvents({
                                'click':function(e){
                                    e.stop();
                                    backbox.start({'opacity':0});
                                    box.start({'opacity':0}).chain(function(){
                                        $('lightbox-communaute').setStyles({'z-index':'-2'});
                                    });
                                    $('lightbox-communaute').removeClass('openloginbox');
                                    $('backbox').removeClass('backlogin');
                                }
                                });
                            });
                        }
                    }
                }
            });
        }

        
        var sendjson = [];
        $$('#invitemembers li.getitem').each(function(el,i){
            tabcp[i] = el.getChildren('ul')[0].getChildren('.cp')[0].get('html');
            tabville[i] = el.getChildren('ul')[0].getChildren('.ville')[0].get('html');
            tabpays[i] = el.getChildren('ul')[0].getChildren('.pays')[0].get('html');
            googlex[i] = el.getChildren('ul')[0].getChildren('.google_x')[0].get('html');
            googley[i] = el.getChildren('ul')[0].getChildren('.google_y')[0].get('html');


            if(googley[i]=='' || googlex[i]==''){
                place[i] = tabville[i]+', '+tabpays[i];
//                            geocoder[i] = new GClientGeocoder();
//                            geocoder[i].getLatLng(place[i], function(point) {
//                                if (point) {

                var geocoder = new google.maps.Geocoder();
                geocoder.geocode({'address': place[i]}, function(point) {
                    if (point && typeof point[0] != 'undefined') {
                        var myLatLng = new google.maps.LatLng(point[0].geometry.location.lat(), point[0].geometry.location.lng());
                        sendjson[sendjson.length] = [el.getProperty('rel'), point[0].geometry.location.lat(), point[0].geometry.location.lng()];
//                                    info[i] = "<h3>"+place[i]+"</h3>Latitude: "+point.y+"  Longitude:"+point.x;
                        generatepoint({'x':point[0].geometry.location.lat(), 'y':point[0].geometry.location.lng()}, tabville[i]);
                    }
                });
            }else{
                var point = {};
                point.x = googlex[i];
                point.y = googley[i];
                generatepoint(point, tabville[i]);
            }
        });


        window.addEvent('load',function(){
            if(sendjson.length>0){
                new Request({
                    url: '/webservice/?action=registerpositions',
                    method: 'post'
                }).send('sendjson='+JSON.encode(sendjson));
            }
        });


        if($('nomember') && $('nomembercopy'))
            $('nomembercopy').set('html', '<p>Aucun membre n\'a été trouvé</p>');
        else if($('nomembercopy')){
            var sizetable = $$('#invitemembers .current').length;
            var txtmember = '';
            if(sizetable==1)
                txtmember = '<p>1 membre a été trouvé</p>';
            else
                txtmember = '<p>'+$$('#invitemembers .current').length+' membres ont été trouvés</p>';
            $('nomembercopy').set('html', txtmember);
        }
    }


    if($('member-localisation')){
            var tabcp = $('cp-member').get('html');
            var tabpays = $('pays-member').get('html');
            var place = tabcp+', '+tabpays;    
            var geocoder = new google.maps.Geocoder();
            geocoder.geocode({'address': place}, function(point) {
                if (point && typeof point[0] != 'undefined') {
                    
                    
                    var mapOptions = {
                        zoom: 7,
                        center: new google.maps.LatLng(point[0].geometry.location.lat(),point[0].geometry.location.lng()),
                        mapTypeId: google.maps.MapTypeId.ROADMAP,
                        scrollwheel: false
                    };
                
                    var map = new google.maps.Map(document.getElementById("member-localisation"), mapOptions);


//                    map.setCenter(new GLatLng(point[0].geometry.loaction.ob,point[0].geometry.loaction.pb), 6);
//                    map.disableScrollWheelZoom();
//                    map.disableGoogleBar();

//                    var control4 = new GScaleControl();
//                    map.addControl(control4);
                    
                    
                    var myLatLng = new google.maps.LatLng(point[0].geometry.location.lat(), point[0].geometry.location.lng());
                    var marker = new google.maps.Marker({
                        position: myLatLng,
                        map: map,
                        icon: "/wp-content/themes/aveclesaidantsV2/images/pointergoogle.png"
                    });
                    
                    
                }
            });
      }


    $$('.blocmedia').each(function(el,i){
        el.setProperty('id', 'mediabloc'+i);
        var initimg = el.getElements('img')[0].getProperty('src');
        var obj = new Swiff('/wp-content/themes/aveclesaidantsV2/javascripts/player/cplayer.swf', {
            id: 'soundz',
            container:'mediabloc'+i,
            width: el.getWidth(),
            height: el.getHeight(),
            params: {
                wmode: 'transparent',
                bgcolor: '#ffffff',
                allowscriptaccess:'always',
                allowfullscreen:'true'
            },
            vars: {
                file:el.getProperty('rel'),
                image:initimg,
                title: 'clrzplayer',
                autostart : false,
                controlbar : 'over',
                skin:'/wp-content/themes/aveclesaidantsV2/javascripts/player/stylishdefault.swf'
            }
        });
    });


});