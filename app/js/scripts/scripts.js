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
        var id = $(this).attr('href'),
            top = $(id).offset().top;
        $('body,html').animate({scrollTop: (top - 100)}, 1500);
    });

    $('#nav-icon4').click(function () {
        $(this).toggleClass('open');
        $('body').toggleClass('modal-open');
        $('.nav-panel').slideToggle();
    });

    var menu_selector = ".menu"; // Переменная должна содержать название класса или идентификатора, обертки нашего меню.

    function onScroll() {
        var scroll_top = $(document).scrollTop();
        $(menu_selector + " a").each(function () {
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

    $(".menu > a").click(function (e) {
        e.preventDefault();

        $(document).off("scroll");
        $(menu_selector + " a.active").removeClass("active");
        $(this).addClass("active");
        var hash = $(this).attr("href");
        var target = $(hash);

        $("html, body").animate({
            scrollTop: target.offset().top
        }, 500, function () {
            window.location.hash = hash;
            $(document).on("scroll", onScroll);
        });
    });

    /*
     * Experience
     * block
     * navs
     */

    //to left
    $(".exp-left").click(function (e) {
        var prev = $(".exp-tabs .tab-pane.active").prev(".tab-pane");
        var prevLi = $(".experience li.active").prev("li");

        $(".exp-tabs .tab-pane").removeClass("active");
        $(".experience li").removeClass("active");

        if (prev.html() != undefined) {
            prev.addClass("active");
            prevLi.addClass("active");
        } else {
            $("#chl").addClass("active");
            $(".experience li a[href='#chl']").parent().addClass("active");
        }

        //prevent link to #
        e.preventDefault();
    });

    //to right
    $(".exp-right").click(function (e) {
        var next = $(".exp-tabs .tab-pane.active").next(".tab-pane");
        var nextLi = $(".experience li.active").next("li");

        $(".exp-tabs .tab-pane").removeClass("active");
        $(".experience li").removeClass("active");

        if (next.html() != undefined) {
            next.addClass("active");
            nextLi.addClass("active");
        } else {
            $("#usa").addClass("active");
            $(".experience li a[href='#usa']").parent().addClass("active");
        }

        //prevent link to #
        e.preventDefault();
    });

    /*
     * Video from youtube
     * autoplay
     */

    $(".svg-play").click(function () {
        var video = $(this).parent().children("iframe");

        //hide all from video block
        $(this).parent().children().not("iframe").hide();

        //autoplay to video
        var src = video.attr("src");
        video.attr("src", src + "&autoplay=true");
    });

    /*
     * scrolling fire - house
     */

    var house = $('.block-white.house');
    $(window).scroll(function () {
        var top = $(this).scrollTop();
        var houseTop = house.offset().top - 250;

        if (top >= houseTop) {
            $(".house-fire").addClass("house-fire-animated");
            $(".car-fire").addClass("car-fire-animated");
            $(".people1").addClass("people1-animated");
            $(".people2").addClass("people2-animated");
            $(".people3").addClass("people3-animated");
            $(".people4").addClass("people4-animated");
        }
    });

    /*
     * scrolling car
     */
    var car = $('.car-wrap');
    $(window).scroll(function () {
        var top = $(this).scrollTop();
        var carTop = car.offset().top - 200;

        if (top >= carTop) {
            $(".car-block").addClass("car-block-animated");
            $(".wheel1").addClass("wheel1-animated");
            $(".wheel2").addClass("wheel2-animated");
            $(".wheel3").addClass("wheel3-animated");
        }
    });
    
    /*
    * sending 
    * form
    * to admin
    */
    
    $(".contact-form").submit(function (e) {
        var send = true, form = $(this);
        //regexp
        var r = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        //name validation
        if (form.children("input[type='text']").val() == "") {
            send = false;
            //error
        } else {
            var name = form.children("input[type='text']").val();
        }

        //email validation
        if (form.children("input[type='email']").val() == "") {
            send = false;
            //error
        } else if (!r.test(form.children("input[type='email']").val())) {
            send = false;
            //error
        } else {
            var email = form.children("input[type='email']").val();
        }

        //question validation
        if (form.children("textarea").val() == "") {
            send = false;
            //error
        } else {
            var question = form.children("textarea").val();
        }

        if (send) {
            //sending form
            $.ajax({
                method: "post",
                url: "php/send.php",
                data: {
                    name: name,
                    email: email,
                    question: question
                },
                success: function (data) {
                    if (data == "true") {
                        //success
                    } else {
                        //throw error to user
                        //error
                        //throw error to console
                        console.log(data);
                    }
                }
            });
        }

        //prevent to sending form
        e.preventDefault();
    });
});

