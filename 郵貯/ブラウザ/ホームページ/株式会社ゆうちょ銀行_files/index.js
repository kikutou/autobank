$(function() {
	var tab = $('#top_news .tab_cnts');
	$(tab).children('li:first-child').show();
	$('#top_news .tab_menu li:first-child').addClass('active');
	$('#top_news .tab_menu li').click(function() {
		if($(this).hasClass('txt')) {
		} else {
			$(tab).children('li').hide();
			$('#top_news .tab_menu li').removeClass('active');
			$(this).addClass('active');
			if($(this).hasClass('li01')) {
				$(tab).children('.li01').show();
			}
			else if($(this).hasClass('li02')) {
				$(tab).children('.li02').show();
			}
			else if($(this).hasClass('li03')) {
				$(tab).children('.li03').show();
			}
			else if($(this).hasClass('li04')) {
				$(tab).children('.li04').show();
			}
		}
	});

	$('#top_news .tab_menu li').keypress( function ( e ) {
		if ( e.which == 13 ) {
			$(tab).children('li').hide();
			$('#top_news .tab_menu li').removeClass('active');
			$(this).addClass('active');
			if($(this).hasClass('li01')) {
				$(tab).children('.li01').show();
			}
			else if($(this).hasClass('li02')) {
				$(tab).children('.li02').show();
			}
			else if($(this).hasClass('li03')) {
				$(tab).children('.li03').show();
			}
			else if($(this).hasClass('li04')) {
				$(tab).children('.li04').show();
			}
			return false;
		}
	});
});