//Формируем ссылку с учетом базовой
$.url = function (url) {
    return $("base").attr("href") + url.substr(1);
}

var VC = {
    mobileNav: function () {
        $('body').toggleClass('__opened');
    },

    mobilePhone: function () {
        $('.head-phone_num').toggleClass('opened');
    },

    changeCostumers: function () {
        if (window.innerWidth > 640) {
            $('.your-costumers .planet .satelite').off('mouseenter').on('mouseenter', function () {
                var name = $(this).prop('class').split(' ')[1];

                $('.your-costumers .planet').removeAttr('class').addClass('planet ' + name);
                $('.your-costumers .planet-content').removeClass('opened');
                $('.your-costumers .planet-content.' + name).addClass('opened');
            });
        }
        else {
            $('.your-costumers .planet .satelite').off('mouseenter');
            $('.your-costumers .planet .satelite').off('click').on('click', function () {
                var name = $(this).prop('class').split(' ')[1];

                $('.your-costumers .planet').removeAttr('class').addClass('planet ' + name);
                $('.your-costumers .planet-content').removeClass('opened');
                $('.your-costumers .planet-content.' + name).addClass('opened');

                /* Анимируем скролл экрана к контенту, если разрешение ниже 640 или равно ему */
                $('html, body').animate({ scrollTop: $('.planet-info').offset().top }, 500);
            });
        }
    },

    changeJoined: function () {
        if (window.innerWidth > 800) {
            $('.join-info .joiner').off('mouseenter').on('mouseenter', function () {
                var name = $(this).prop('class').split(' ')[1];

                $('.join-dialog').removeAttr('class').addClass('join-dialog ' + name);
                $('.join-content').removeClass('opened');
                $('.join-content.' + name).addClass('opened');
            });
        }
        else {
            $('.join-info .joiner').off('mouseenter');
            $('.join-info .joiner').off('click').on('click', function () {
                var name = $(this).prop('class').split(' ')[1];

                $('.join-dialog').removeAttr('class').addClass('join-dialog ' + name);
                $('.join-content').removeClass('opened');
                $('.join-content.' + name).addClass('opened');
            });
        }
    },

    getParameterByName: function (name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
        var results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    },

    addGoogleSearch: function () {
        if ($('#google-search').length) {
            $('#google-search').html('<gcse:searchresults-only/>');

            var cx = '009379243938517090614:hldteapo-am';
            var gcse = document.createElement('script');
            gcse.type = 'text/javascript';
            gcse.async = true;
            gcse.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') + '//cse.google.com/cse.js?cx=' + cx;
            var s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(gcse, s);
        }
    },

    youtubePlay: function(self) {
        var $video = $('#video'),
            src = $video.attr('src');

        self.parent().addClass('played');
        $video.attr('src', src + '&autoplay=1');
    }
}

$(function () {
    /*$('[type="submit"]').on('click', function (e) {
        e.preventDefault();
        var $form = $(this).parents('form');
        var form = $(this).parents('form')[0];

        var formData = new FormData();
        var redirectUrl = '';

        // Convert each form key to 'contact[key]'
        new FormData(form).forEach(function (value, key) {
            switch (key) {
                case 'RedirectUrl':
                    redirectUrl = value;
                    break
            }
            key = 'contact[' + key + ']';
            formData.append(key, value);
            //console.info("%s: %s", key, value);
        });

        $form.validate({
            rules: {
                To: {
                    email: true,
                    required: true
                }
            },
            errorPlacement: function (error, element) {
                element.addClass('error');
            }
        });

        if ($form.valid()) {
            $.ajax({
                url: $.url('/storefrontapi/feedback'),
                method: 'POST',
                data: formData,
                async: true,
                cache: false,
                processData: false,
                contentType: false,
                success: function (response) {
                    if (redirectUrl) {
                        window.location = redirectUrl;
                    }
                },
                error: function (a, b, c) {
                    alert('Error');
                }
            });
        }
    });*/

    $('body').delegate('[data-swipe="opened"]', 'click', function (e) {
        var li = $(this).parent('[data-id="swipeli"]');
        if (li.find('.sub-menu').length) {
            e.preventDefault();
            if (li.hasClass('opened')) {
                $('[data-id="swipeli"]').removeClass('opened');
            } else {
                $('[data-id="swipeli"]').removeClass('opened');
                li.addClass('opened');
            }
        }
    });

    $('body').delegate('.mobile-btn', 'click', function () {
        VC.mobileNav();
    });

    $('.head-phone').off('click').on('click', function () {
        VC.mobilePhone();
    });

    $('.learn-link').on('click', function () {
        $(this).next().slideToggle(500);
    });

    /* Меняем описание для текущей планеты и красим ее в соотв. цвет */
    VC.changeCostumers();

    /* Меняем описание для блока Joined */
    VC.changeJoined();

    /* Добавляем Google search */
    VC.addGoogleSearch();

    $(window).resize(function () {
        VC.changeCostumers();
        VC.changeJoined();
    });

    if ($('[name="Contact[PartnerId]"]').length > 0) {
        $('[name="Contact[PartnerId]"]').val(VC.getParameterByName("pid"));
    }

    if ($('[name="Contact[JobId]"]').length > 0) {
        $('[name="Contact[JobId]"]').val(VC.getParameterByName("jid"));
    }

    $('.mac .play').on('click', function() {
        var self = $(this);

        VC.youtubePlay(self);
    });
});
