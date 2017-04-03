/**
 * Created by alexrewrew on 15.02.17.
 */
$(document).ready(function () {

    //responsive scripts
    if (window.matchMedia('(max-width: 767px)').matches) {
        $('.nav-panel a').click(function () {
            $('.nav-panel').slideUp()
            $('#nav-icon4').removeClass('open')
        })
    }

    $(".smooth").click(function (event) {
        event.preventDefault();
        var id  = $(this).attr('href'),
            top = $(id).offset().top;
        $('body,html').animate({scrollTop: (top - 100)}, 1500);
    });

    $('#nav-icon4').click(function(){
        $(this).toggleClass('open');
        $('body').toggleClass('modal-open');
        $('.nav-panel').slideToggle();
    });

//
    $('#video-header-play').click(function() {
        var $video = $('#video-header'),
            src = $video.attr('src');
        $video.attr('src', src + '&autoplay=1');
        $('#video-header-play').hide()
        $('#video-header-cover').hide()
        $('h1').hide()
    });
//
    
    $('.play-button').hover(
        function() {
            $(this).attr('src', 'img/pieces/play-hover.png')
        },
        function() {
            $(this).attr('src', 'img/pieces/play.png')
        }
    )


    var menu_selector = ".menu"; // Переменная должна содержать название класса или идентификатора, обертки нашего меню.

    function onScroll(){
        var scroll_top = $(document).scrollTop();
        $(menu_selector + " a").each(function(){
            var hash = $(this).attr("href");
            var target = $(hash);
            if (target.position().top <= (scroll_top + 200) && target.position().top + target.outerHeight() > (scroll_top + 140)) {
                $(menu_selector + " a.active").removeClass("active");
                $(this).addClass("active");
            } else {
                $(this).removeClass("active");
            }
        });
    }

    $(document).on("scroll", onScroll);

    $(".menu > a").click(function(e){
        e.preventDefault();

        $(document).off("scroll");
        $(menu_selector + " a.active").removeClass("active");
        $(this).addClass("active");
        var hash = $(this).attr("href");
        var target = $(hash);

        $("html, body").animate({
            scrollTop: target.offset().top
        }, 500, function(){
            window.location.hash = hash;
            $(document).on("scroll", onScroll);
        });
    });

})

