/***Main js***/
window.UcozApp = {};
/**
 * Replace all defined symbol in inner HTML of element
 *
 *@param {string} el .ClassName or #id of element (use identificator)
 *@param {object} symbols where  key - the symbol that you want to replace (in RegExp syntax)
 * 				 				value - the symbol which should be replaced
 */
window.UcozApp.replaceSymbol = function(el, symbols) {
    var _arr = document.querySelectorAll(el);
    if (_arr.length) {
        for (var i = 0; i < _arr.length; i++) {
            for (var param in symbols) {
                _arr[i].innerHTML = _arr[i].innerHTML.replace(new RegExp(param, "g"), symbols[param]);
            }
        }
    }
};
UcozApp.replaceSymbol('.pollLnk', {
    '\\[': '',
    '\\]': '',
    '·': '|'
});
UcozApp.replaceSymbol('.catNumData', {
    '\\[': '(',
    '\\]': ')'
});
UcozApp.replaceSymbol('.cDate', {
    '\\(': '',
    '\\)': ''
});
UcozApp.replaceSymbol('.cDetails', {
    ' \\|': ', '
});

/*** jQuery Slider Menu Plugin** @version 1.0.0*/
! function(a) {
    "use strict";
    a.fn.sliderMenu = function() {
        a(this).each(function() {
            var b = a(this).clone(),
                c = a("<div>").addClass("slider-menu"),
                d = a("<nav>").addClass("slider-menu__container").attr({
                    role: "navigation",
                    "aria-label": "Menu"
                }),
                e = 0;
            b.attr("class", "slider-menu__menu"), a("ul", b).addClass("slider-menu__menu").prepend('<li><a href="#" class="slider-menu__back"><span class="slider-menu__text">Back</span></a>').parent().addClass("slider-menu--has-children"), a("li", b).addClass("slider-menu__item"), a("a", b).addClass("slider-menu__link"), d.html(b), a('[data-vertical="true"]', d).addClass("slider-menu__item--vertical"), c.html(d), a(c).on("click", ".slider-menu--has-children .slider-menu__link:not(.slider-menu__back) span", function(b) {
                var c = a(this).parent().attr("href");
                if (c) return location.replace(c), !1
            }), a(c).on("click", ".slider-menu__link", function(b) {
                var c = a(this),
                    f = c.closest(".slider-menu"),
                    g = c.parent(".slider-menu__item"),
                    h = g.parent(".slider-menu__menu"),
                    i = a("> .slider-menu__menu", g);
                if (i.length || c.hasClass("slider-menu__back"))
                    if (b.preventDefault(), g.data("vertical")) i.is(":visible") ? (h.addClass("slider-menu--active"), i.hide(), f.css("height", h.height()), c.removeClass("slider-menu__link--active-link")) : (i.show(), f.css("height", h.height()), c.addClass("slider-menu__link--active-link"));
                    else if (a(".slider-menu__item--vertical .slider-menu__menu", f).hide(), a(".slider-menu__item--vertical .slider-menu__link", f).removeClass("slider-menu__link--active-link"), c.hasClass("slider-menu__back")) {
                    var j = h.parent().parent();
                    e -= 100, d.css("left", "-" + e + "%"), h.removeClass("slider-menu--active"), j.addClass("slider-menu--active").parents(".slider-menu__menu").addClass("slider-menu--active"), f.css("height", j.height())
                } else e += 100, d.css("left", "-" + e + "%"), h.removeClass("slider-menu--active"), i.addClass("slider-menu--active").parents(".slider-menu__menu").addClass("slider-menu--active"), f.css("height", i.height())
            }), a(this).replaceWith(c)
        })
    }
}(jQuery);
/***Main js***/
(function($) {
    $.fn.uNavMenu = function() {
        function init() {
            if (!$('.navItemMore', this).length) {
                $('.uMenuRoot', this).append('<li class="navItemMore"><div class="nav_menu_toggler"><span></span><span></span><span></span></div><ul id="overflow"></ul></li>');
            }
            $('.uMenuRoot li.navItemMore', this).before($('#overflow > li', this));

            var $navItemMore = $('.navItemMore', this),
                $navItems = $('.uMenuRoot > li:not(.navItemMore)', this),
                navItemWidth = $navItemMore.width(),
                windowWidth = $('[id^="uNMenuDiv"]', this).width();

            $navItems.each(function() {
                navItemWidth += $(this).width();
            });

            navItemWidth > windowWidth ? $navItemMore.show() : $navItemMore.hide();

            while (navItemWidth > windowWidth && window.innerWidth > 960) {
                navItemWidth -= $navItems.last().width();
                $navItems.last().prependTo('#overflow', this);
                $navItems.splice(-1, 1);
            }

            $('.uMenuRoot', this).css({
                overflow: 'visible'
            });
        }

        return init.apply(this);
    };
})(jQuery);

var umenu = function() {
    $('#catmenu').uNavMenu()
};

//dev
$(function($) {
    var parentLi = $('#catmenu li.uWithSubmenu');
    var didScroll;
    var lastScrollTop = 0;
    var delta = 5;
    var buttonToIcon = {
        '#invoice-form-export': 'file_download',
        '#invoice-form-print': 'print',
        '#invoice-form-send-el-goods': 'forward'
    };
    var captionHight = $('.caption').innerHeight() + 'px';
    var $headerSearchBox = $('.header-search-box');
    var $schQuery = $('.schQuery', $headerSearchBox);
    var $s_form = $('form', $headerSearchBox);
    var $navName = $('.head-l');
    var $userBtns = $('.user-btns');
    var $schBox = $('#sch-box');
    var $queryField = $('.queryField', $headerSearchBox);

    //add class for header if scroll top or bottom
    function hasScrolled() {
        var st = $(this).scrollTop();
        var navbarHeight = $('header').outerHeight();
        if (Math.abs(lastScrollTop - st) <= delta) return;
        if (st > lastScrollTop && st > navbarHeight) {
            $('header').removeClass('nav-down').addClass('nav-up');
        } else {
            if (st + $(window).height() < $(document).height()) {
                $('header').removeClass('nav-up').addClass('nav-down');
            }
        }
        lastScrollTop = st;
    }
    //open menu
    function openMenu() {
        $('.mm-wrapper, .owerflow-layer').addClass('openned');
    }
    //close menu
    function closeMenu() {
        $('.mm-wrapper, .owerflow-layer').removeClass('openned');
    }
    //convert text to icon
    function convertToIcon(obj) {
        for (var prop in obj) {
            $(prop).attr('title', $(prop).val()).addClass('material-icons').val(obj[prop]);
        }
    }

    function openSearch() {
        $queryField.addClass('open');
    }

    function closeSearch() {
        $queryField.val('');
        $queryField.removeClass('open');
    }

    function mobileIconTogler(toShow) {
        if (arguments.length) {
            $userBtns.addClass('mw-hide');
            $navName.addClass('mw-hide');
            $schBox.addClass('mw-hide');

            toShow.removeClass('mw-hide');
        } else {
            $userBtns.removeClass('mw-hide');
            $navName.removeClass('mw-hide');
            $schBox.removeClass('mw-hide');
        }
    }

    function closeTempNode() {
        closeMenu();
        $queryField.removeClass('open');
        $userBtns.removeClass('open');
        mobileIconTogler();
    }

    $('.mobile-menu-container')
        .append($('#catmenu .uMenuRoot').clone()); //create mobile menu
    $('.mobile-menu-container .uMenuRoot').sliderMenu(); //create slider in mobile menu
    $('nav .uMenuRoot')
        .append('<li class="navItemMore"><div class="nav_menu_toggler">\
	<span></span><span></span><span></span>\
	</div><ul id="overflow"></ul></li>'); //create toggler in nav menu
    $('> a', parentLi)
        .after('<i class="material-icons menu_tog">keyboard_arrow_down</i>'); //create arrow in nav menu
    $('> i', parentLi).on('click', function() {
        var $this = $(this);
        if ($this.text() == 'keyboard_arrow_down') {
            $this.text('keyboard_arrow_up').parent().addClass('over');
        } else {
            $this.text('keyboard_arrow_down').parent().removeClass('over');
        }
    });
    window.onresize = umenu;
    window.onload = umenu;
    $(window).scroll(function(event) {
        didScroll = true;
    });
    setInterval(function() {
        if (didScroll) {
            hasScrolled();
            didScroll = false;
        }
    }, 250);

    $('.nav-head .i_menu').on('click', openMenu);
    $(".owerflow-layer,.i_close").on('click', closeMenu);

    $('.goOnTop').on('click', function(e) {
        e.preventDefault();
        $('body').animate({
            scrollTop: 0
        }, 1000);
    });

    $('.sidebox ul.cat-tree').removeAttr('style').removeClass('cat-tree');
    var sdLi = $('.sidebox li:has(ul)').addClass('parent-li');
    $(sdLi).each(function() {
        $(this).prepend('<em>+</em>');
    });

    $('> em', sdLi).on('click', function() {
        $(this).text() == '+' ? $(this).text('-').parent().addClass('over') : $(this).text('+').parent().removeClass('over');
    });


    $('.slide').css('min-height', captionHight);
    $s_form.val('');
    if ($('#cont-shop-invoices h1').length) {
        $('#cont-shop-invoices h1 + table').addClass('status_table').after('<div class="fil_togg_wrapper"><div class="fil_togg_holder"><span class="material-icons">storage</span><span class="material-icons arrow">keyboard_arrow_down</span></div></div>').siblings('table, hr').addClass('filter_table');
        $('.fil_togg_holder').on('click', function() {
            var arrow = $(this).children('.arrow');
            $('.filter_table').fadeToggle();
            arrow.text(arrow.text() == 'keyboard_arrow_up' ? 'keyboard_arrow_down' : 'keyboard_arrow_up');
        });
        convertToIcon(buttonToIcon);
        $(document).ajaxComplete(function() {
            convertToIcon(buttonToIcon);
        });
    }

    $('a > img').each(function() {
        $(this).parent().addClass('no-bg');
    });


    // c(navigator.userAgent);

    $('.i_person').on('click', function() {
        $userBtns.toggleClass('open');
        $userBtns.hasClass('open') ? mobileIconTogler($userBtns) : mobileIconTogler();
        mobileIconTogler($userBtns);
    });

    $('<div class="material-icons i_search">search</div>')
        .appendTo($schQuery).click(function() {
            if ($queryField.val()) {
                $s_form.submit();
            } else {
                $queryField.toggleClass('open');
                $queryField.hasClass('open') ? mobileIconTogler($schBox) : mobileIconTogler();
            }
        });

    $(document).mouseup(function(e) {
        if ($(".schQuery").has(e.target).length === 0) {
            closeSearch();
            $userBtns.hasClass('open') || mobileIconTogler();
        }
        if ($userBtns.has(e.target).length === 0) {
            $userBtns.removeClass('open');
            $queryField.hasClass('open') || mobileIconTogler();
        }
    });

    $(document).keyup(function(e) {
        e.which == 27 && closeTempNode();
    });

});

WebFontConfig = {
    google: {
        families: ['Open+Sans:400,600,700&subset=cyrillic,greek']
    },
    active: umenu
};