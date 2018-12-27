/**
 * Created on 25/10/2016.
 */

'use strict';
(function ($){

    $(document).on('ready', function () {

        var $header = $('.header'),
            $itemSearch = $('.item-search'),
            $headerPopup = $('.header-popup'),
            $listLayout = $('.list-layout'),
            $gridLayout = $('.grid-layout');

        /* Search Popup */
        $itemSearch.on('click', function () {
            $('.header-popup-search', $header).addClass('active');
        });
        $('.header-close', $header).on('click', function() {
            $headerPopup.removeClass('active');
        });
        $('.header-search', $header).on('click', function() {
            $itemSearch.trigger('click');
        });
        $(document).on('keydown', function (event) {
            if (event.keyCode == 27) {
                $headerPopup.removeClass('active');
            }
        });
        /* End Search Popup */

        /* Share Popup */
        $('.header-share', $header).on('click', function () {
            $('.header-popup-social', $header).addClass('active');
        });
        /* End Share Popup */

        $('.menu-item-has-children > a', $header).on('click', function (event) {
            event.preventDefault();
        });

        if ($('.main-menu', $header).length) {
            var $menu  = $('.main-menu', $header),
                $menuMobile = $('.menu-mobile', $header);

            $menu.append('<div class="menu-close"></div>');
            $menu.on('click', '.menu-close', function () {
                $menuMobile.trigger('click');
            });

            $('.menu-item-has-children', $menu).each( function () {
                var $arrowIcon = $('<span class="arrow-icon"><i class="fa fa-angle-right"></i></span>');

                $(this).append($arrowIcon);

                $('> .sub-menu', this).prepend('<li class="menu-item item-back"><a href="#">Back</a></li>');
            });

            $menuMobile.on( 'click', function () {
                $menu.toggleClass('menu-active');
            });
            $menu.on('click', '.arrow-icon', function () {
                var $parent = $(this).closest('.menu-item-has-children');

                $parent.addClass('menu-active');
            });
            $menu.on('click', '.item-back', function (event) {
                event.preventDefault();
                $(this).closest('.menu-item-has-children').removeClass('menu-active');
            });

            $(document).on('click', function (event) {

                var $header = $(event.target).closest('.main-menu'),
                    $headerResponsive = $(event.target).closest('.header-responsive');

                if (!$header.length && $menu.hasClass('menu-active') && !$headerResponsive.length) {
                    $menu.removeClass('menu-active');
                }
            });
        }

        $('.featured-slider').owlCarousel({
            autoPlay: false,
            singleItem: true,
            navigation: true,
            pagination: false,
            slideSpeed: 800,
            navigationText: ['',''],
            addClassActive: true
        });

        $('.instagram-pics').owlCarousel({
            items : 8,
            itemsDesktop : [1199,6],
            itemsDesktopSmall : [990,4],
            itemsTabletSmall : [600,3],
            itemsMobile : [400,2],
            navigation : false,
            pagination : false
        });

        var i = 0;
        $('img', $gridLayout).each( function () {
            var image = new Image();

            image.src = $(this).attr('src');

            image.onload = function () {
                i++;

                if (i == $('img', $gridLayout).length) {
                    $gridLayout.masonry({
                        itemSelector: '.post-grid'
                    });
                }
            }
        });

        $('.widget-twitter-slide').owlCarousel({
            items: 1,
            loop: true,
            autoPlay: false,
            nav: false,
            smartSpeed: 400,
            navText: '',
            dots: true
        });
        $listLayout.on('equalHeight', function () {

            var $self = $(this);

            $('.post-list', $self).each( function () {

                var $this = $(this),
                    $image = $('.post-media img', this),
                    src = $image.attr('src'),
                    $content = $('.post-content', this);

                $image.unwrap();
                $('.image', this).css({
                    'padding-bottom': ''
                });
                setTimeout(function () {

                    var imgHeight = $image.height(),
                        contentHeight = $content.height();

                    if (imgHeight < contentHeight) {
                        var objImage = new Image();

                        objImage.src = src;

                        objImage.onload = function () {
                            $image.wrap('<div class="image"></div>');
                            $('.image', $this).css({
                                'padding-bottom': contentHeight + 'px',
                                'background-image': 'url('+ $image.attr('src') +')'
                            });
                        };
                    }
                });
            });
        }).trigger('equalHeight');

        $('.back-to-top').on('click', function (event) {
            event.preventDefault();
            $('html, body').animate({
                scrollTop: 0
            }, 500);
        });

        $(window).on('resize', function () {
            $listLayout.trigger('equalHeight');
        });


    });

    $(window).on('load', function () {
        $('.preloader').hide();
    });

})(jQuery);