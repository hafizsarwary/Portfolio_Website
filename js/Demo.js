$(document).ready(function () {
    $(document).on('click', '.demo .settings', function (e) {
        e.preventDefault();
        if ($(this).parent().attr('style') === 'left: 0px;') {
            $(this).parent().animate({ 'left': '-200px' });
        }
        else {
            $(this).parent().animate({ 'left': '0' });
        }
    });

    // Theme init (light/dark)
    function applyTheme(mode){
        if(mode === 'dark'){
            $('html').addClass('theme-dark');
        }else{
            $('html').removeClass('theme-dark');
        }
    }
    var savedTheme = $.cookie('theme');
    if(savedTheme){ applyTheme(savedTheme); }

    function updateThemeIcon(){
        var isDark = $('html').hasClass('theme-dark');
        var $icon = $('.theme-toggle i');
        if($icon.length){
            $icon.removeClass('fa-moon-o fa-sun-o').addClass(isDark ? 'fa-sun-o' : 'fa-moon-o');
        }
    }
    updateThemeIcon();
    $(document).on('click', '.demo .mode', function(e){
        e.preventDefault();
        var mode = $(this).data('mode');
        $.cookie('theme', mode, { expires: 365, path: '/' });
        applyTheme(mode);
        updateThemeIcon();
        $('.demo .mode').removeClass('active');
        $(this).addClass('active');
    });

    // One-tap toggle in header
    $(document).on('click', '.theme-toggle', function(e){
        e.preventDefault();
        var isDark = $('html').hasClass('theme-dark');
        var next = isDark ? 'light' : 'dark';
        $.cookie('theme', next, { expires: 365, path: '/' });
        applyTheme(next);
        updateThemeIcon();
        // reflect state in demo panel buttons if open
        $('.demo .mode').removeClass('active');
        $('.demo .mode[data-mode="'+next+'"]').addClass('active');
    });

    if ($.cookie('box')) {
        $('html').addClass($.cookie('box'));
    }
    $(document).on('click', '.demo .boxed', function (e) {
        e.preventDefault();
        $.cookie('box', $(this).data('box'), { expires: 7, path: '/' });
        $('html').removeAttr('class').addClass($(this).data('box'));
        window.location.href = 'index.html';
    });

    if ($.cookie('background')) {
        if ($.cookie('box')) {
            $('body').css({ 'background-image': 'url(Theme/img/bg/' + $.cookie('background') + ')' });
        }
    }
    $(document).on('click', '.demo .background', function (e) {
        e.preventDefault();
        if ($.cookie('box')) {
            $.cookie('background', $(this).data('background'), { expires: 7, path: '/' });
            $('body').css({ 'background-image': 'url(Theme/img/bg/' + $(this).data('background') + ')' });
        }
    });

    $(document).on('click', '.demo .reset', function (e) {
        e.preventDefault();
        $('#color').attr('href', 'css/colors/yellow.css');
        $('html').removeClass('boxed');
        $('html').removeClass('theme-dark');
        $('body').removeAttr('style');
        $.removeCookie('color', { path: '/' });
        $.removeCookie('theme', { path: '/' });
        $.removeCookie('box', { path: '/' });
        $.removeCookie('background', { path: '/' });
    });

    // Remove legacy color/theme demo panel UI (not used anymore)
    // Intentionally not appending the floating demo panel.
    // reflect active theme in UI
    // Reflect state only if demo panel exists
    if(savedTheme === 'dark'){
        $('.demo .mode[data-mode="dark"]').addClass('active');
    } else {
        $('.demo .mode[data-mode="light"]').addClass('active');
    }
    updateThemeIcon();
});
