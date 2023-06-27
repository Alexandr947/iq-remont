function packResize() {
    $('.pack__list_w-else').css('min-height', $('.pack:nth-child(2) .pack__list').height() - 24);
}

$(document).ready(function() {
    $("input[name=phone]").mask("+7 (999) 999-99-99");

    var portfolioSlider = $('.portfolio__slides').bxSlider({
        mode: 'fade',
        touchEnabled: false,
        prevSelector: '.portfolio__slider-prev',
        nextSelector: '.portfolio__slider-next',
        adaptiveHeight: true,
        onSlideBefore: function(slideElement, oldIndex, newIndex) {
            $('.portfolio__slider-count i').text(+newIndex + 1);
            setTimeout(function() {
                sliders[newIndex].reloadSlider();
            }, 100);
        },
        nextText: ' ',
        prevText: ' ',
        onSliderLoad: function () {
            $(".portfolio .bx-pager.bx-default-pager").remove();
        }
    });

    var reviews = $('.review'), sliders = [];
    $('.portfolio__slider-count em').text(reviews.length);

    for(var i = 0; i < reviews.length; i++) {
        (function () {
            var j = i;
            sliders[j] = reviews.eq(j).find('.review__slides').bxSlider({
                adaptiveHeight: true,
                prevSelector: reviews.eq(j).find('.review__slider-prev'),
                nextSelector: reviews.eq(j).find('.review__slider-next'),
                pagerCustom: reviews.eq(j).find('.review__slider-control'),
                nextText: ' ',
                prevText: ' ',
                onSliderLoad: function () {
                    $(".portfolio .bx-pager.bx-default-pager").remove();
                }
            });
        })();

        if(i == reviews.length - 1) {
            portfolioSlider.goToSlide(1);
            setTimeout(function() {
                portfolioSlider.goToSlide(0);
            }, 580);
        }
    }

    $('.service__title').on('click', function(e) {
        var block = $(this).parent();
        if(block.hasClass('open')) {
            block.removeClass('open').find('.service__content').slideUp();
        } else {
            block.addClass('open').find('.service__content').slideDown();
        }
    });

    $('.pack__top').on('click', function(e) {
        var block = $(this).parent();
        if(block.hasClass('open')) {
            block.removeClass('open').find('.pack__content').slideUp();
        } else {
            block.addClass('open').find('.pack__content').slideDown();
        }
    });

    $('.pack__list-else').on('click', function() {
        var block = $(this).parents('.pack');
        if($(this).hasClass('view')) {
            $(this).removeClass('view').text('Показать полностью');
            block.find('.pack__list_w-else').removeClass('view');
        } else {
            $(this).addClass('view').text('Скрыть');
            block.find('.pack__list_w-else').addClass('view');
        }
    });

    $('.menu__btn, .menu__close').on('click', function() {
        if($(this).hasClass('open')) {
            $('.menu__close, .menu__btn').removeClass('open');
            $('.menu').removeClass('open').slideUp();
        } else {
            $('.menu__close, .menu__btn').addClass('open');
            $('.menu').addClass('open').slideDown();
        }
    });

    $('.popup').on('click', function(e){
        e.stopPropagation();
    });

    $('.js-popup-link').on('click', function (e) {
        e.preventDefault();
        var self = this;

        $('html').height($(window).height()).css('overflow', 'hidden');
        $('.page-wrap').css('overflow', 'scroll');

        $('.overlay').fadeIn(400,
            function () {
                $($(self).data('href'))
                    .css('display', 'block')
                    .stop().animate({opacity: 1}, 300);
            });
        return false;
    });

    function popupClose() {
        $('.popup')
            .stop().animate({opacity: 0}, 300,
            function () {
                $('.page-wrap').css('overflow', 'hidden');
                $('html').css('overflow', 'auto');
                $(this).css('display', 'none');
                $('.overlay').stop().fadeOut(400);
            }
        );
    }

    $('.overlay, .popup__close, .popup__btn').click(popupClose);
    $('body').keyup(function(e){
        if(e.keyCode == 27) {
            popupClose();
        }
    });

    var designRange = document.getElementById('designRange');
    noUiSlider.create(designRange, {
        start: [15],
        range: {
            'min': [15],
            'max': [90]
        }
    });

    designRange.noUiSlider.on('update', function (values, handle) {
        $('.design__field').val(Math.round(values[handle]));
    });

    var rangeFirst = document.getElementById('rangeFirst');
    noUiSlider.create(rangeFirst, {
        start: [5],
        range: {
            'min': [5],
            'max': [80]
        }
    });

    rangeFirst.noUiSlider.on('update', function (values, handle) {
        $('.range__result_first em').text(Math.round(values[handle]));
    });

    var rangeSecond = document.getElementById('rangeSecond');
    noUiSlider.create(rangeSecond, {
        start: [5],
        range: {
            'min': [5],
            'max': [15]
        }
    });

    rangeSecond.noUiSlider.on('update', function (values, handle) {
        $('.range__result_second em').text(Math.round(values[handle]));
    });

    $('.select').on('click', function() {
        if($(this).hasClass('open')) {
            $(this).removeClass('open');
        } else {
            $('.select').removeClass('open');
            $(this).addClass('open');
        }
    });

    $('.select__item').on('click', function() {
        $(this).parents('.select').find('.select__selected').text($(this).text());
        $(this).parents('.select').find('input').val($(this).text());
    });

    $('.js-scroll-link').click(function(e){
        e.preventDefault();
        $('.menu__close.open').trigger('click');
        $('html,body').stop().animate({ scrollTop: $($(this).data('href')).offset().top - $('.header').outerHeight() + 2}, 1000);
    });

    packResize();

    $('.step__next').on('click', function() {
        $('.step_1').removeClass('active');
        $('.step_2').addClass('active');
    });

    $('.calc').submit(function(e){
        e.preventDefault();
        var self = this;

        $.ajax({
            url: $(this).attr('action'),
            type: 'POST',
            data: $(this).serialize(),
            success: function (data, textStatus, jqXHR) {
                $('.step_2').removeClass('active');
                $('.step_3').addClass('active');
            }
        });
    });
});

$(window).resize(function() {
    packResize()
});

function contactMapsInit(){
    var center = [55.746239603591896,37.57557680426016];

    if($(window).width() <= 700) {
        center = [55.74850288004143,37.57198264418019];
    }

    var map = new ymaps.Map("map",
        {
            center: center,
            zoom: 16,
            controls: []

        })
        ,placemark = new ymaps.Placemark([55.74629406901195,37.5719289999999], {
        hintContent: 'г. Москва, Наб. Тараса Шевченко, 1/2, офис 245'
    }, {
        iconLayout: 'default#image',
        iconImageHref: 'images/mark.png',
        iconImageSize: [60, 60],
        iconImageOffset: [-30, -30]
    });

    map.behaviors.disable('scrollZoom');
    map.geoObjects.add(placemark);
}

ymaps.ready(contactMapsInit);