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
    $(document).on('click', '.demo .mode', function(e){
        e.preventDefault();
        var mode = $(this).data('mode');
        $.cookie('theme', mode, { expires: 365, path: '/' });
        applyTheme(mode);
        $('.demo .mode').removeClass('active');
        $(this).addClass('active');
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

    var html = '' +
        '<div class="demo">' +
        '<a href="#" class="settings">' +
        '<i class="fa fa-cog fa-spin"></i>' +
        '</a>' +
        '<h5>Theme</h5>' +
        '<div class="theme-choices">' +
        '<a href="#" class="mode btn btn-sm btn-default" data-mode="light">Light</a>' +
        '<a href="#" class="mode btn btn-sm btn-default" data-mode="dark">Dark</a>' +
        '</div>' +
        '<hr />' +
        '<a href="#" class="reset btn btn-sm btn-info p-l-30 p-r-30">Reset</a>' +
        '</div>';
    $('body').append(html);
    // reflect active theme in UI
    if(savedTheme === 'dark'){
        $('.demo .mode[data-mode="dark"]').addClass('active');
    } else {
        $('.demo .mode[data-mode="light"]').addClass('active');
    }
});
