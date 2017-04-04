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
            $(".car").addClass("car-animated");
            $(".wheel1").addClass("wheel1-animated");
            $(".wheel2").addClass("wheel2-animated");
            $(".wheel3").addClass("wheel3-animated");
        }
    });

    /*
    * show
    * hide
    * smoke head
    */
    $(".smoke-left").addClass("smoke-left-show");
    $(".smoke-right").addClass("smoke-right-show");

    $(".play-head").mouseover(function () {
        $(".smoke-left").removeClass("smoke-left-show");
        $(".smoke-right").removeClass("smoke-right-show");

        $(".smoke-left").addClass("smoke-left-hide");
        $(".smoke-right").addClass("smoke-right-hide");
    });

    $(".play-head").mouseleave(function () {
        $(".smoke-left").removeClass("smoke-left-hide");
        $(".smoke-right").removeClass("smoke-right-hide");

        $(".smoke-left").addClass("smoke-left-show");
        $(".smoke-right").addClass("smoke-right-show");
    });
    
    /*
    * sending 
    * form
    * to admin
    */
    
    $(".contact-form").submit(function (e) {
        var send = true, form = $(this), error = "";
        //regexp
        var r = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        //name validation
        if (form.children("input[type='text']").val() == "") {
            send = false;
            //error
            error = 'Поле "Ім\'я" обов\'язкове для заповнення';
            form.children("input[type='text']").focus();
        } else {
            var name = form.children("input[type='text']").val();
        }

        if (error == "") {
            //email validation
            if (form.children("input[type='email']").val() == "") {
                send = false;
                //error
                error = 'Поле "E-mail" обов\'язкове для заповнення';
                form.children("input[type='email']").focus();
            } else if (!r.test(form.children("input[type='email']").val())) {
                send = false;
                //error
                error = 'Невірний формат вводу E-mail';
                form.children("input[type='email']").focus();
            } else {
                var email = form.children("input[type='email']").val();
            }
        }

        if (error == "") {
            //question validation
            if (form.children("textarea").val() == "") {
                send = false;
                //error
                error = 'Поле "Текст запитання" обов\'язкове для заповнення';
                form.children("textarea").focus();
            } else {
                var question = form.children("textarea").val();
            }
        }

        if (send) {
            $('.button-form').attr("disabled", true);
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
                        $(".success-form").html("Повідомлення успішно відправлене");
                        form.children("textarea").addClass("textarea-with-error");
                        form.trigger('reset');
                        setTimeout(function () {
                            $(".success-form").html("");
                            form.children("textarea").removeClass("textarea-with-error");
                        }, 3000);
                    } else {
                        //throw error to user
                        $(".error-form").html("Помилка. Спробуйте пізніше");
                        form.children("textarea").addClass("textarea-with-error");
                        setTimeout(function () {
                            $(".error-form").html("");
                            form.children("textarea").removeClass("textarea-with-error");
                        }, 3000);
                    }
                    $('.button-form').removeAttr("disabled");
                },
                error: function (xhr) {
                    $(".error-form").html("Error: " + xhr.status);
                    form.children("textarea").addClass("textarea-with-error");
                    $('.button-form').removeAttr("disabled");
                    setTimeout(function () {
                        $(".error-form").html("");
                        form.children("textarea").removeClass("textarea-with-error");
                    }, 3000);
                }
            });
        } else {
            $(".error-form").html(error);
            form.children("textarea").addClass("textarea-with-error");
            setTimeout(function () {
                $(".error-form").html("");
                form.children("textarea").removeClass("textarea-with-error");
            }, 3000);
        }

        //prevent to sending form
        e.preventDefault();
    });
});

