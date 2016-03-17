/*==============================
ユーザーエージェント
==============================*/
var ua = {};
ua.name = window.navigator.userAgent.toLowerCase();
 
ua.isIE = (ua.name.indexOf('msie') >= 0 || ua.name.indexOf('trident') >= 0);
ua.isiPhone = ua.name.indexOf('iphone') >= 0;
ua.isiPod = ua.name.indexOf('ipod') >= 0;
ua.isiPad = ua.name.indexOf('ipad') >= 0;
ua.isiOS = (ua.isiPhone || ua.isiPod || ua.isiPad);
ua.isAndroid = ua.name.indexOf('android') >= 0;
ua.isTablet = (ua.isiPad || (ua.isAndroid && ua.name.indexOf('mobile') < 0));
 
if (ua.isIE) {
    ua.verArray = /(msie|rv:?)\s?([0-9]{1,})([\.0-9]{1,})/.exec(ua.name);
    if (ua.verArray) {
        ua.ver = parseInt(ua.verArray[2], 10);
    }
}
if (ua.isiOS) {
    ua.verArray = /(os)\s([0-9]{1,})([\_0-9]{1,})/.exec(ua.name);
    if (ua.verArray) {
        ua.ver = parseInt(ua.verArray[2], 10);
    }
}
if (ua.isAndroid) {
    ua.verArray = /(android)\s([0-9]{1,})([\.0-9]{1,})/.exec(ua.name);
    if (ua.verArray) {
        ua.ver = parseInt(ua.verArray[2], 10);
    }
}



/*==============================
基本設定
==============================*/

var w = $(window).innerWidth();
var x = 479;




/*==============================
ブレークポイント通過時リロード
==============================*/
var reflg = 0;
var uatab = navigator.userAgent;

$(window).load(function() {
	if(w <= x){
		reflg=1;
	}
	else if(w>x){
		reflg=2;
	}
});


$(window).resize(function() {
var w = $(window).innerWidth();
var new_url = location.href.replace(/#.*$/,"");
	if(w <= x && reflg==2){
		if((uatab.indexOf('Android') > 0 && uatab.indexOf('Mobile') == -1)){
		} else {
			location.href=new_url;
			reflg=1;
		}
	}
	else if(w>x && reflg==1){
		if((uatab.indexOf('Android') > 0 && uatab.indexOf('Mobile') == -1)){
		} else {
			location.href=new_url;
			reflg=2;
		}
	}
});



/*==============================
フォント設定
==============================*/
function cText(obj){
	if(obj.value==obj.defaultValue){
		obj.value="";
		obj.style.color="#000";
	}
}

function sText(obj){
	if(obj.value==""){
		obj.value=obj.defaultValue;
		obj.style.color="#666";
	}
}



/*==============================
グロナビ_現在地表示
==============================*/
$(function(){	
　path = location.pathname;
	if (w > x || !jQuery.support.opacity) {
		if(path.match("/kojin/access/")){
			$("#header #h_g_menu_01kojin_01 a.h_g_menu_01_01").addClass('active');
		}
		if(path.match("/kojin/chokin/")){
			$("#header #h_g_menu_01kojin_02 a.h_g_menu_01_01").addClass('active');
		}
		if(path.match("/kojin/sokin/")){
			$("#header #h_g_menu_01kojin_03 a.h_g_menu_01_01").addClass('active');
		}
		if(path.match("/kojin/kyuyo_nenkin/")){
			$("#header #h_g_menu_01kojin_04 a.h_g_menu_01_01").addClass('active');
		}
		if(path.match("/kojin/card/")){
			$("#header #h_g_menu_01kojin_05 a.h_g_menu_01_01").addClass('active');
		}
		if(path.match("/kojin/shisanunyou/")){
			$("#header #h_g_menu_01kojin_06 a.h_g_menu_01_01").addClass('active');
		}
		if(path.match("/kojin/loan/")){
			$("#header #h_g_menu_01kojin_07 a.h_g_menu_01_01").addClass('active');
		}
		if(path.match("/hojin/speedy/")){
			$("#header #h_g_menu_01hojin_01 a.h_g_menu_01_01").addClass('active');
		}
		if(path.match("/hojin/smart/")){
			$("#header #h_g_menu_01hojin_02 a.h_g_menu_01_01").addClass('active');
		}
		if(path.match("/hojin/cs/")){
			$("#header #h_g_menu_01hojin_03 a.h_g_menu_01_01").addClass('active');
		}
		if(path.match("/ir/financial/")){
			$("#header #h_g_menu_01ir_01 a.h_g_menu_01_01").addClass('active');
		}
		if(path.match("/ir/information/")){
			$("#header #h_g_menu_01ir_02 a.h_g_menu_01_01").addClass('active');
		}
		if(path.match("/ir/stock/")){
			$("#header #h_g_menu_01ir_03 a.h_g_menu_01_01").addClass('active');
		}
		if(path.match("/ir/investor/")){
			$("#header #h_g_menu_01ir_04 a.h_g_menu_01_01").addClass('active');
		}
		if(path.match("/aboutus/ci/")){
			$("#header #h_g_menu_01aboutus_02 a.h_g_menu_01_01").addClass('active');
		}
		if(path.match("/aboutus/company/")){
			$("#header #h_g_menu_01aboutus_03 a.h_g_menu_01_01").addClass('active');
		}
		if(path.match("/aboutus/activity/")){
			$("#header #h_g_menu_01aboutus_04 a.h_g_menu_01_01").addClass('active');
		}
		if(path.match("/aboutus/cm/")){
			$("#header #h_g_menu_01aboutus_05 a.h_g_menu_01_01").addClass('active');
		}
		if(path.match("/recruit/sinsotu/")){
			$("#header #h_g_menu_01recruit_01 a.h_g_menu_01_01").addClass('active');
		}
		if(path.match("/recruit/chuto/")){
			$("#header #h_g_menu_01recruit_02 a.h_g_menu_01_01").addClass('active');
		}
	}
});



/*==============================
グロナビ_マウスオーバー＋開閉
==============================*/
$(function(){	
	if (w > x || !jQuery.support.opacity) {
		var outFlg = false;
		var navFlg = false;
		$('#header #h_g_menu dt a.h_g_menu_01_01.active').mousemove(function(){
			outFlg = true;
		},
		function(){
			outFlg = false;
		});
		if (navigator.userAgent.indexOf('iPhone') > 0 || navigator.userAgent.indexOf('iPad') > 0 || navigator.userAgent.indexOf('iPod') > 0 || navigator.userAgent.indexOf('Android') > 0) {
			navFlg = true;
		}

		$('body').mousemove(function() {
	        if(!outFlg){
				navFlg = true;
			}
		});

		$('#header #h_g_menu dt a.h_g_menu_01_01').hover(function(){
			if(navFlg) {
				$(this).parent('dt').next('dd').css('z-index','900');
				$(this).parent('dt').next('dd').stop(true,false).slideDown(400);
				if (!($(this).hasClass('active'))){
					$(this).stop(true,false).animate( {backgroundColor: '#1d6414'},400);
				}
			}
		},
		function(){
			$(this).parent('dt').next('dd').css('z-index','800');
			$(this).parent('dt').next('dd').stop().slideUp(400);
			if (!($(this).hasClass('active'))){
				$(this).stop(true,false).animate( {backgroundColor: '#009900'},400);
				$(this).removeClass('tab_on');
				$(this).addClass('tab_off');
			}
		});
		$("#header #h_g_menu dd.h_g_menu_01_01").hover(function(){
			$(this).stop(true,false).slideDown(400);
			$(this).css('display','block');
			if(!($(this).prev('dt').children('a.h_g_menu_01_01').hasClass('active'))) {
				$(this).prev('dt').children('a.h_g_menu_01_01').stop(true,false).animate( {backgroundColor: '#1d6414'},400);
				$(this).prev('dt').children('a.h_g_menu_01_01').addClass('hover');
			}
		},
		function(){
			$(this).stop().slideUp(400);
			if (!($(this).prev('dt').children('a.h_g_menu_01_01').hasClass('active'))) {
				$(this).prev('dt').children('a.h_g_menu_01_01').stop(true,false).animate( {backgroundColor: '#090'},400);
				$(this).prev('dt').children('a.h_g_menu_01_01').removeClass('hover');
			}
		});
	}
});



/*==============================
グロナビ_閉じるボタン
==============================*/
$(function(){	
	$("#header dd.h_g_menu_01_01 .h_g_menu_close p").click(function(){
		$(this).parent('div').parent('dd').slideUp(400);
		if ($(this).parent('div').parent('dd').prev('dt').children('a').hasClass('active')) {
		}
		else {
			$(this).parent('div').parent('dd').prev('dt').children('a').animate( {backgroundColor: '#090'},400).removeClass('hover');
		}
	});
	$('#header dd.h_g_menu_01_01 .h_g_menu_close p').keypress( function ( e ) {
		if ( e.which == 13 ) {
			$(this).parent('div').parent('dd').slideUp(400);
			$(this).parent('div').parent('dd').prev('dt').children('a').removeClass('tab_on');
			$(this).parent('div').parent('dd').prev('dt').children('a').addClass('tab_off');
			return false;
		}
	});
});



/*==============================
グロナビ_フォーカス
==============================*/
$(function(){	
	if (w > x || !jQuery.support.opacity) {
		$('a.h_g_menu_01_01').focus(function(){
			$(this).parent('dt').next('dd.h_g_menu_01_01').css('display' , 'block');
			$(this).addClass('hover');
			$(this).parent('dt').prev('dd.h_g_menu_01_01').css('display' , 'none');
		});
		$('a.h_g_menu_01_01').blur(function(){
			$(this).removeClass('hover');
		});
		$("dd.h_g_menu_01_01 .h_g_menu_close p:last").blur(function(){
			$(this).closest('dd.h_g_menu_01_01').css('display' , 'none');
			$(this).closest('dd.h_g_menu_01_01').prev('dt').children('a.h_g_menu_01_01').removeClass('active');
		});
	}
});



/*==============================
グロナビ_スマートフォン
==============================*/
$(function(){	
	if(w<=x && jQuery.support.opacity) {
		$('#h_menu_btn').click(function(){
			var display = $('#h_sp_menu').css('display');
			if (display == 'block') {
				//$(this).removeClass('h_menu_btn_open');
				//$(this).addClass('h_menu_btn_close');
				$('#h_sp_menu').slideUp(400);
				$('#contents').fadeIn();
				$('.side_menu').fadeIn();
				$('#footer').fadeIn();
				$('#top_contents').css('height','auto');
				$('#top_contents').css('overflow','visible');
				$('.btn_to_top').css('z-index','10000');
			} else {
				//$(this).removeClass('h_menu_btn_close');
				//$(this).addClass('h_menu_btn_open');
				$('#h_sp_menu').slideDown(400);
				$('#contents').fadeOut();
				$('.side_menu').fadeOut();
				$('#footer').fadeOut();
				$('#top_contents').css('height','0');
				$('#top_contents').css('overflow','hidden');
				$('.btn_to_top').css('z-index','0');
			}
		});
		$('#h_close_btn span').click(function(){
			$('#h_menu_btn').removeClass('h_menu_btn_open');
			$('#h_menu_btn').addClass('h_menu_btn_close');
			$('#h_sp_menu').slideUp(400);
			$('#contents').fadeIn();
			$('.side_menu').fadeIn();
			$('#footer').fadeIn();
			$('#top_contents').css('height','auto');
			$('#top_contents').css('overflow','visible');
			$('.btn_to_top').css('z-index','10000');
		});
	}
});



/*==============================
グロナビ_タブレット対応
==============================*/
$(function (){
	if (navigator.userAgent.indexOf('iPhone') > 0 || navigator.userAgent.indexOf('iPad') > 0 || navigator.userAgent.indexOf('iPod') > 0 || navigator.userAgent.indexOf('Android') > 0) {
		if (w>x) {
			var tbtn = $('a.h_g_menu_01_01');
			tbtn.addClass('tab_off');
			$(tbtn).click(function(e){
				if ($(tbtn).parent('dt').next('dd').hasClass('dis_n')) {
					$(tbtn).removeClass('tab_on');
					$(this).addClass('tab_off');
				}
				else if($(this).hasClass('tab_off')) {
					e.preventDefault();
					$(tbtn).removeClass('tab_on');
					$(tbtn).addClass('tab_off');
					$(this).removeClass('tab_off');
					$(this).addClass('tab_on');
				}
				else {
					$(tbtn).removeClass('tab_on');
					$(this).addClass('tab_off');
				}
			});
		}
	}
});



/*==============================
ローカルナビ_アコーディオン
==============================*/
$(function(){	
	if (w<=x && jQuery.support.opacity) {
		$('.side_menu_list div').hide();
		$('.side_menu ul.side_menu_list li span').click(function(){
			$(this).toggleClass('open');
			$('.side_menu_list div').slideToggle(400);
		});
	}

	$('a.side_menu_list01_a').click(function(){
		if ($(this).attr('href') == "toggle") {
			if ($(this).hasClass('side_menu_list01_close')) {
				$(this).parent().children('.side_menu_list02').slideDown(400);
				$(this).removeClass('side_menu_list01_close');
				$(this).addClass('side_menu_list01_open');
			} else if ($(this).hasClass('side_menu_list01_open')) {
				$(this).parent().children('.side_menu_list02').slideUp(400);
				$(this).removeClass('side_menu_list01_open');
				$(this).addClass('side_menu_list01_close');
			}
			return false;
		}
	});
	$('a.side_menu_list02_a').click(function(){
		if ($(this).attr('href') == "toggle") {
			if ($(this).hasClass('side_menu_list02_close')) {
				$(this).parent().children('.side_menu_list03').slideDown(400);
				$(this).removeClass('side_menu_list02_close');
				$(this).addClass('side_menu_list02_open');
			} else if ($(this).hasClass('side_menu_list02_open')) {
				$(this).parent().children('.side_menu_list03').slideUp(400);
				$(this).removeClass('side_menu_list02_open');
				$(this).addClass('side_menu_list02_close');
			}
			return false;
		}
	});
});



/*==============================
ローカルナビ_現在地表示
==============================*/
$(function(){
	var url = window.location;
	var url = url.href;
	var fileName = url.replace(/^[httpsfile]+:\/{2,3}[0-9a-z\.\_\-:]+?:?[0-9]*?\//i,'/');

	if (w>x || !jQuery.support.opacity) {
		if (fileName.indexOf('?') != -1) {
			fileName = fileName.substring(0,fileName.indexOf('?'));
		};
		if (fileName.indexOf('#') != -1) {
			fileName = fileName.substring(0,fileName.indexOf('#'));
		};
		if (fileName.indexOf('.html') == -1) {
			fileName = fileName+'index.html';
		};

		//if(fileName^=)
		var obj = 'a[href="'+fileName+'"]';
		$('.side_menu_top').find(obj).css('color','#009900');
		if ($(obj).hasClass('side_menu_list03_a')) {
			$(obj).parents('ul').show();
			$(obj).parent().parent().parent().children('.side_menu_list02_a').removeClass('side_menu_list02_close');
			$(obj).parent().parent().parent().children('.side_menu_list02_a').addClass('side_menu_list02_open');
			$(obj).parent().parent().parent().children('.side_menu_list02_a').css('color','#009900');
			$(obj).parents('ul').children().children('.side_menu_list01_a').removeClass('side_menu_list01_close');
			$(obj).parents('ul').children().children('.side_menu_list01_a').addClass('side_menu_list01_open');
			$(obj).parents('ul').children().children('.side_menu_list01_a').css('color','#009900');
		};
		if ($(obj).hasClass('side_menu_list02_a')) {
			$(obj).parents('ul').show();
			$(obj).parents('ul').children().children('.side_menu_list01_a').removeClass('side_menu_list01_close');
			$(obj).parents('ul').children().children('.side_menu_list01_a').addClass('side_menu_list01_open');
			$(obj).parents('ul').children().children('.side_menu_list01_a').css('color','#009900');
		};
	}
});



/*==============================
その他_画像＋テキスト並列
==============================*/
$(window).load(function() {
	if(w>x || !jQuery.support.opacity){
		$('.arrange_box_l').each(function() {
			var fl_w = $(this).children('.img_area').children('.img').find('img').width();
			$(this).children('.img_area').children('.cap').css('width',fl_w);
			$(this).children('.txt_area').css('width',660-fl_w);
		});
		$('.arrange_box_r').each(function() {
			var fl_w = $(this).children('.img_area').children('.img').find('img').width();
			$(this).children('.img_area').children('.cap').css('width',fl_w);
			$(this).children('.txt_area').css('width',660-fl_w);
		});
	}
});



/*==============================
その他_画像＋テキスト回り込み
==============================*/
$(window).load(function() {
	if(w>x || !jQuery.support.opacity){
		$('.img_fl_left').each(function() {
			var fl_w = $(this).children('.img_fl_left_img').find('img').width();
			$(this).children('.img_fl_left_img').children('span').css('width',fl_w);
		});
		$('.img_fl_right').each(function() {
			var fl_w = $(this).children('.img_fl_right_img').find('img').width();
			$(this).children('.img_fl_right_img').children('span').css('width',fl_w);
		});
	}
});



/*==============================
その他_画像PC,SP自動切替え
==============================*/
$(function(){
	if(w <= x && jQuery.support.opacity){
		$('.pcsp').each(function(){
			$(this).attr("src",$(this).attr("src").replace('_pci', '_spi'));
		});
	}
});



/*==============================
その他_アコーディオン
==============================*/
$(document).ready(function(){
	if(document.URL.match(/kj_crd_cdt_jcb_sv_yutai/) || document.URL.match(/kj_crd_cdt_vm_sv_yutai/)) {
		$('.slide_content_btn').addClass('close');
	} else {
		$('.slide_content_btn').addClass('open');
	}
    $('.slide_content_title').click(function(){
		$(this).children('div').toggleClass('close');
		$(this).children('div').toggleClass('open');
		$(this).next('.slide_content_area').slideToggle("fast");
	});
	$('.slide_content_title').keypress( function ( e ) {
		if ( e.which == 13 ) {
		$(this).children('div').toggleClass('close');
		$(this).children('div').toggleClass('open');
		$(this).next('.slide_content_area').slideToggle("fast");
			return false;
		}
	});
});



/*==============================
その他_フッター位置調整
==============================*/
$(window).load(function() {
	if(w <= x && jQuery.support.opacity){
		var fp_t=$('.side_menu_bottom').height();
		$('#footer').css('padding-top',fp_t+20);
	}
});



/*==============================
その他_ページ内リンク
==============================*/
$(function() {
	$('a[href^=#]').click(function() {
		var speed = 400;
		var href= $(this).attr("href");
		var target = $(href == "#" || href == "" ? 'html' : href);
		var position = target.offset().top;
		$('body,html').animate({scrollTop:position}, speed, 'swing');
		return false;
	});
	$('map area[href^=#]').click(function() {
		var speed = 400;
		var href= $(this).attr("href");
		var target = $(href == "#" || href == "" ? 'html' : href);
		var position = target.offset().top;
		$('body,html').animate({scrollTop:position}, speed, 'swing');
		return false;
	});
});



/*==============================
その他_トップに戻る
==============================*/
$(function() {
	var topBtn = $('.btn_to_top');    
	//最初はボタンを隠す
	topBtn.hide();
	//スクロールが300に達したらボタンを表示させる
	$(window).scroll(function () {
		if ($(this).scrollTop() > 300) {
			topBtn.fadeIn();
		} else {
			topBtn.fadeOut();
		}
	});
	//スクロールしてトップに戻る
	//500の数字を大きくするとスクロール速度が遅くなる
	topBtn.click(function () {
		$('body,html').animate({
			scrollTop: 0
		}, 500);
		return false;
	});
});



/*==============================
ローカルナビ_現在地展開
==============================*/
$(function(){
	if(w <= x && jQuery.support.opacity){
		$(".side_menu_top h2 a").click(function() {
			return false;
		});
	}
	
	/*==========店舗・ATM==========*/
	//「ゆうちょ　ATMのご案内」タブを開く
		if(document.URL.match(/kj_acs_atm_/)) {
			$("a[href *= 'kj_acs_atm_index']").next('ul').show();
			$("a[href *= 'kj_acs_atm_index']").removeClass('side_menu_list01_link');
			$("a[href *= 'kj_acs_atm_index']").addClass('side_menu_list01_open');
			$("a[href *= 'kj_acs_atm_index']").append('<span class="txt_n">メニュー開閉</span>');
			$("a.side_menu_list01_a[href *= 'kj_acs_atm_index']").attr("href", "toggle");
		}
	/*==========貯金==========*/
	//「定額貯金一覧」タブを開く
		if(document.URL.match(/kj_cho_tg_/)) {
			$("a[href *= 'kj_cho_tg_index']").next('ul').show();
			$("a[href *= 'kj_cho_tg_index']").removeClass('side_menu_list01_link');
			$("a[href *= 'kj_cho_tg_index']").addClass('side_menu_list01_open');
			$("a[href *= 'kj_cho_tg_index']").append('<span class="txt_n">メニュー開閉</span>');
			$("a.side_menu_list01_a[href *= 'kj_cho_tg_index']").attr("href", "toggle");
		}
	//「定期貯金一覧」タブを開く
		if(document.URL.match(/kj_cho_tk_/)) {
			$("a[href *= 'kj_cho_tk_index']").next('ul').show();
			$("a[href *= 'kj_cho_tk_index']").removeClass('side_menu_list01_link');
			$("a[href *= 'kj_cho_tk_index']").addClass('side_menu_list01_open');
			$("a[href *= 'kj_cho_tk_index']").append('<span class="txt_n">メニュー開閉</span>');
			$("a.side_menu_list01_a[href *= 'kj_cho_tk_index']").attr("href", "toggle");
		}
	//「財形貯金」タブを開く
		if(document.URL.match(/kj_cho_zk_/)) {
			$("a[href *= 'kj_cho_zk_index']").next('ul').show();
			$("a[href *= 'kj_cho_zk_index']").removeClass('side_menu_list01_link');
			$("a[href *= 'kj_cho_zk_index']").addClass('side_menu_list01_open');
			$("a[href *= 'kj_cho_zk_index']").append('<span class="txt_n">メニュー開閉</span>');
			$("a.side_menu_list01_a[href *= 'kj_cho_zk_index']").attr("href", "toggle");
		}
	
	/*==========送金・支払・海外関連==========*/
	//「口座を持っていない相手に送る」タブを開く
		if(document.URL.match(/kj_sk_hkz_/)) {
			$("a[href *= 'kj_sk_hkz_index']").next('ul').show();
			$("a[href *= 'kj_sk_hkz_index']").removeClass('side_menu_list01_link');
			$("a[href *= 'kj_sk_hkz_index']").addClass('side_menu_list01_open');
			$("a[href *= 'kj_sk_hkz_index']").append('<span class="txt_n">メニュー開閉</span>');
			$("a.side_menu_list01_a[href *= 'kj_sk_hkz_index']").attr("href", "toggle");
		}
	//「ゆうちょ口座に送金する」タブを開く
		if(document.URL.match(/kj_sk_kz_/)) {
			$("a[href *= 'kj_sk_kz_index']").next('ul').show();
			$("a[href *= 'kj_sk_kz_index']").removeClass('side_menu_list01_link');
			$("a[href *= 'kj_sk_kz_index']").addClass('side_menu_list01_open');
			$("a[href *= 'kj_sk_kz_index']").append('<span class="txt_n">メニュー開閉</span>');
			$("a.side_menu_list01_a[href *= 'kj_sk_kz_index']").attr("href", "toggle");
		}
	//「他の金融機関口座に送金する」タブを開く
		if(document.URL.match(/kj_sk_fm_/)) {
			$("a[href *= 'kj_sk_fm_furikomi']").next('ul').show();
			$("a[href *= 'kj_sk_fm_furikomi']").removeClass('side_menu_list01_link');
			$("a[href *= 'kj_sk_fm_furikomi']").addClass('side_menu_list01_open');
			$("a[href *= 'kj_sk_fm_furikomi']").append('<span class="txt_n">メニュー開閉</span>');
			$("a.side_menu_list01_a[href *= 'kj_sk_fm_furikomi']").attr("href", "toggle");
		}
	//「自動で送金・払込み」タブを開く
		if(document.URL.match(/kj_sk_jd_/)) {
			$("a[href *= 'kj_sk_jd_haraikomi']").next('ul').show();
			$("a[href *= 'kj_sk_jd_haraikomi']").removeClass('side_menu_list01_link');
			$("a[href *= 'kj_sk_jd_haraikomi']").addClass('side_menu_list01_open');
			$("a[href *= 'kj_sk_jd_haraikomi']").append('<span class="txt_n">メニュー開閉</span>');
			$("a.side_menu_list01_a[href *= 'kj_sk_jd_haraikomi']").attr("href", "toggle");
		}
	//「Pay-easy（ペイジー）」タブを開く
		if(document.URL.match(/kj_sk_pe_/)) {
			$("a[href *= 'kj_sk_pe_index']").next('ul').show();
			$("a[href *= 'kj_sk_pe_index']").removeClass('side_menu_list01_link');
			$("a[href *= 'kj_sk_pe_index']").addClass('side_menu_list01_open');
			$("a[href *= 'kj_sk_pe_index']").append('<span class="txt_n">メニュー開閉</span>');
			$("a.side_menu_list01_a[href *= 'kj_sk_pe_index']").attr("href", "toggle");
		}
		//「Pay-easy（ペイジー）」「ペイジーでお支払いできる税金・料金」タブを開く
		if(document.URL.match(/kj_sk_pe_list/)) {
			$("a[href *= 'kj_sk_pe_list']").next('ul').show();
			$("a[href *= 'kj_sk_pe_list']").removeClass('side_menu_list01_link');
			$("a[href *= 'kj_sk_pe_list']").addClass('side_menu_list01_open');
			$("a[href *= 'kj_sk_pe_list']").append('<span class="txt_n">メニュー開閉</span>');
			$("a.side_menu_list02_a[href *= 'kj_sk_pe_list']").attr("href", "toggle");
		}
	//「国際送金」タブを開く
		if(document.URL.match(/kj_sk_ks_/)) {
			$("a[href *= 'kj_sk_ks_index']").next('ul').show();
			$("a[href *= 'kj_sk_ks_index']").removeClass('side_menu_list01_link');
			$("a[href *= 'kj_sk_ks_index']").addClass('side_menu_list01_open');
			$("a[href *= 'kj_sk_ks_index']").append('<span class="txt_n">メニュー開閉</span>');
			$("a.side_menu_list01_a[href *= 'kj_sk_ks_index']").attr("href", "toggle");
		}
	
	/*==========カードサービス==========*/
	//「クレジットカード」タブを開く
		if(document.URL.match(/kj_crd_cdt_/)) {
			$("a[href *= 'kj_crd_cdt_top_index']").next('ul').show();
			$("a[href *= 'kj_crd_cdt_top_index']").removeClass('side_menu_list01_link');
			$("a[href *= 'kj_crd_cdt_top_index']").addClass('side_menu_list01_open');
			$("a[href *= 'kj_crd_cdt_top_index']").append('<span class="txt_n">メニュー開閉</span>');
			$("a.side_menu_list01_a[href *= 'kj_crd_cdt_top_index']").attr("href", "toggle");
		}
		//「クレジットカード」「JP BANK VISAカード/マスターカード」タブを開く
		if(document.URL.match(/kj_crd_cdt_vm_/)) {
			$("a[href *= 'kj_crd_cdt_vm_vmindex']").next('ul').show();
			$("a[href *= 'kj_crd_cdt_vm_vmindex']").removeClass('side_menu_list01_link');
			$("a[href *= 'kj_crd_cdt_vm_vmindex']").addClass('side_menu_list01_open');
			$("a[href *= 'kj_crd_cdt_vm_vmindex']").append('<span class="txt_n">メニュー開閉</span>');
			$("a.side_menu_list02_a[href *= 'kj_crd_cdt_vm_vmindex']").attr("href", "toggle");
		}
		//「クレジットカード」「JP BANK JCBカード」タブを開く
		if(document.URL.match(/kj_crd_cdt_jcb_/)) {
			$("a[href *= 'kj_crd_cdt_jcb_jindex']").next('ul').show();
			$("a[href *= 'kj_crd_cdt_jcb_jindex']").removeClass('side_menu_list01_link');
			$("a[href *= 'kj_crd_cdt_jcb_jindex']").addClass('side_menu_list01_open');
			$("a[href *= 'kj_crd_cdt_jcb_jindex']").append('<span class="txt_n">メニュー開閉</span>');
			$("a.side_menu_list02_a[href *= 'kj_crd_cdt_jcb_jindex']").attr("href", "toggle");
		}
	
	/*==========資産運用==========*/
	//「国債」タブを開く
		if(document.URL.match(/kj_suy_ks_/)) {
			$("a[href *= 'kj_suy_ks_index']").next('ul').show();
			$("a[href *= 'kj_suy_ks_index']").removeClass('side_menu_list01_link');
			$("a[href *= 'kj_suy_ks_index']").addClass('side_menu_list01_open');
			$("a[href *= 'kj_suy_ks_index']").append('<span class="txt_n">メニュー開閉</span>');
			$("a.side_menu_list01_a[href *= 'kj_suy_ks_index']").attr("href", "toggle");
		}
	//「投資信託」タブを開く
		if(document.URL.match(/kj_suy_ts_/)) {
			$("a[href *= 'kj_suy_ts_index']").next('ul').show();
			$("a[href *= 'kj_suy_ts_index']").removeClass('side_menu_list01_link');
			$("a[href *= 'kj_suy_ts_index']").addClass('side_menu_list01_open');
			$("a[href *= 'kj_suy_ts_index']").append('<span class="txt_n">メニュー開閉</span>');
			$("a.side_menu_list01_a[href *= 'kj_suy_ts_index']").attr("href", "toggle");
		}
		//「投資信託」「NISA」タブを開く
		if(document.URL.match(/kj_suy_ts_nisa_/)) {
			$("a[href *= 'kj_suy_ts_nisa_index']").next('ul').show();
			$("a[href *= 'kj_suy_ts_nisa_index']").removeClass('side_menu_list01_link');
			$("a[href *= 'kj_suy_ts_nisa_index']").addClass('side_menu_list01_open');
			$("a[href *= 'kj_suy_ts_nisa_index']").append('<span class="txt_n">メニュー開閉</span>');
			$("a.side_menu_list02_a[href *= 'kj_suy_ts_nisa_index']").attr("href", "toggle");
		}
	//「変額年金保険」タブを開く
		if(document.URL.match(/kj_suy_hg_/)) {
			$("a[href *= 'kj_suy_hg_index']").next('ul').show();
			$("a[href *= 'kj_suy_hg_index']").removeClass('side_menu_list01_link');
			$("a[href *= 'kj_suy_hg_index']").addClass('side_menu_list01_open');
			$("a[href *= 'kj_suy_hg_index']").append('<span class="txt_n">メニュー開閉</span>');
			$("a.side_menu_list01_a[href *= 'kj_suy_hg_index']").attr("href", "toggle");
		}
	//「確定拠出年金」タブを開く
		if(document.URL.match(/kj_suy_kt_/)) {
			$("a[href *= 'kj_suy_kt_index']").next('ul').show();
			$("a[href *= 'kj_suy_kt_index']").removeClass('side_menu_list01_link');
			$("a[href *= 'kj_suy_kt_index']").addClass('side_menu_list01_open');
			$("a[href *= 'kj_suy_kt_index']").append('<span class="txt_n">メニュー開閉</span>');
			$("a.side_menu_list01_a[href *= 'kj_suy_kt_index']").attr("href", "toggle");
		}
	
	/*==========ローン・貸付け==========*/
	//「スルガ銀行の個人ローンのお申込み」タブを開く
		if(document.URL.match(/kj_ln_loan/) || document.URL.match(/kj_ln_tetuzuki/) || document.URL.match(/kj_ln_access/) ) {
			$("a[href *= 'kj_ln_loan']").next('ul').show();
			$("a[href *= 'kj_ln_loan']").removeClass('side_menu_list01_link');
			$("a[href *= 'kj_ln_loan']").addClass('side_menu_list01_open');
			$("a[href *= 'kj_ln_loan']").append('<span class="txt_n">メニュー開閉</span>');
			$("a.side_menu_list01_a[href *= 'kj_ln_loan']").attr("href", "toggle");
		}

	/*==========会社情報==========*/
	//「コーポレートガバナンス」タブを開く
		if(document.URL.match(/abt_cmp_governance/) || document.URL.match(/abt_cmp_report/)  || document.URL.match(/abt_cmp_system/)  || document.URL.match(/abt_cmp_compliance/)  || document.URL.match(/bt_cmp_conflict/)  || document.URL.match(/abt_cmp_risk/) || document.URL.match(/abt_cmp_internalaudit/)) {
			$("a[href *= 'abt_cmp_governance']").next('ul').show();
			$("a[href *= 'abt_cmp_governance']").removeClass('side_menu_list01_link');
			$("a[href *= 'abt_cmp_governance']").addClass('side_menu_list01_open');
			$("a[href *= 'abt_cmp_governance']").append('<span class="txt_n">メニュー開閉</span>');
			$("a.side_menu_list01_a[href *= 'abt_cmp_governance']").attr("href", "toggle");
		}


	/*==========取り組み・活動==========*/
	//「福祉・ボランティアサービス」タブを開く
		if(document.URL.match(/abt_act_fk_/)) {
			$("a[href *= 'abt_act_fk_index']").next('ul').show();
			$("a[href *= 'abt_act_fk_index']").removeClass('side_menu_list01_link');
			$("a[href *= 'abt_act_fk_index']").addClass('side_menu_list01_open');
			$("a[href *= 'abt_act_fk_index']").append('<span class="txt_n">メニュー開閉</span>');
			$("a.side_menu_list01_a[href *= 'abt_act_fk_index']").attr("href", "toggle");
		}
		//「福祉・ボランティアサービス」「ゆうちょボランティア貯金」タブを開く
		if(document.URL.match(/abt_act_fk_vlt_/) || document.URL.match(/abt_act_fk_volunteer/)) {
			$("a[href *= 'abt_act_fk_volunteer']").next('ul').show();
			$("a[href *= 'abt_act_fk_volunteer']").removeClass('side_menu_list01_link');
			$("a[href *= 'abt_act_fk_volunteer']").addClass('side_menu_list01_open');
			$("a[href *= 'abt_act_fk_volunteer']").append('<span class="txt_n">メニュー開閉</span>');
			$("a.side_menu_list02_a[href *= 'abt_act_fk_volunteer']").attr("href", "toggle");
		}

	/*==========各種お申込み・お手続き==========*/
	//「貯金商品」タブを開く
		if(document.URL.match(/tzk_shn_/)) {
			$("a[href *= 'tzk_shn_index']").next('ul').show();
			$("a[href *= 'tzk_shn_index']").removeClass('side_menu_list01_link');
			$("a[href *= 'tzk_shn_index']").addClass('side_menu_list01_open');
			$("a[href *= 'tzk_shn_index']").append('<span class="txt_n">メニュー開閉</span>');
			$("a.side_menu_list01_a[href *= 'tzk_shn_index']").attr("href", "toggle");
		}
	//「送金・決済・受取り」タブを開く
		if(document.URL.match(/tzk_sk_/)) {
			$("a[href *= 'tzk_sk_index']").next('ul').show();
			$("a[href *= 'tzk_sk_index']").removeClass('side_menu_list01_link');
			$("a[href *= 'tzk_sk_index']").addClass('side_menu_list01_open');
			$("a[href *= 'tzk_sk_index']").append('<span class="txt_n">メニュー開閉</span>');
			$("a.side_menu_list01_a[href *= 'tzk_sk_index']").attr("href", "toggle");
		}
	//「貸付け」タブを開く
		if(document.URL.match(/tzk_ktk_/)) {
			$("a[href *= 'tzk_ktk_index']").next('ul').show();
			$("a[href *= 'tzk_ktk_index']").removeClass('side_menu_list01_link');
			$("a[href *= 'tzk_ktk_index']").addClass('side_menu_list01_open');
			$("a[href *= 'tzk_ktk_index']").append('<span class="txt_n">メニュー開閉</span>');
			$("a.side_menu_list01_a[href *= 'tzk_ktk_index']").attr("href", "toggle");
		}
	//「国債」タブを開く
		if(document.URL.match(/tzk_ks_/)) {
			$("a[href *= 'tzk_ks_index']").next('ul').show();
			$("a[href *= 'tzk_ks_index']").removeClass('side_menu_list01_link');
			$("a[href *= 'tzk_ks_index']").addClass('side_menu_list01_open');
			$("a[href *= 'tzk_ks_index']").append('<span class="txt_n">メニュー開閉</span>');
			$("a.side_menu_list01_a[href *= 'tzk_ks_index']").attr("href", "toggle");
		}
		//「海外関連サービス」タブを開く
		if(document.URL.match(/tzk_kg_/)) {
			$("a[href *= 'tzk_kg_index']").next('ul').show();
			$("a[href *= 'tzk_kg_index']").removeClass('side_menu_list01_link');
			$("a[href *= 'tzk_kg_index']").addClass('side_menu_list01_open');
			$("a[href *= 'tzk_kg_index']").append('<span class="txt_n">メニュー開閉</span>');
			$("a.side_menu_list01_a[href *= 'tzk_kg_index']").attr("href", "toggle");
		}

	//「Corporate Information」タブを開く
		if(document.URL.match(/en_abt_cmp_/)) {
			$("a[href *= 'en_abt_cmp_management']").next('ul').show();
			$("a[href *= 'en_abt_cmp_management']").removeClass('side_menu_list01_link');
			$("a[href *= 'en_abt_cmp_management']").addClass('side_menu_list01_open');
			$("a[href *= 'en_abt_cmp_management']").append('<span class="txt_n">Open Menu or Close Menu</span>');
			$("a.side_menu_list01_a[href *= 'en_abt_cmp_management']").attr("href", "toggle");
		}
		//「Corporate Information」「Corporate Profile」タブを開く
		if(document.URL.match(/en_abt_cmp_profile/) || document.URL.match(/en_abt_cmp_overseas/)) {
			$("a[href *= 'en_abt_cmp_profile']").next('ul').show();
			$("a[href *= 'en_abt_cmp_profile']").removeClass('side_menu_list01_link');
			$("a[href *= 'en_abt_cmp_profile']").addClass('side_menu_list01_open');
			$("a[href *= 'en_abt_cmp_profile']").append('<span class="txt_n">Open Menu or Close Menu</span>');
			$("a.side_menu_list02_a[href *= 'en_abt_cmp_profile']").attr("href", "toggle");
		}
		//「Corporate Information」「Corporate Governance」タブを開く
		if(document.URL.match(/en_abt_cmp_governance/) || document.URL.match(/en_abt_cmp_system/) || document.URL.match(/en_abt_cmp_auditing/) || document.URL.match(/en_abt_cmp_risk/) || document.URL.match(/en_abt_cmp_compliance/)) {
			$("a[href *= 'en_abt_cmp_governance']").next('ul').show();
			$("a[href *= 'en_abt_cmp_governance']").removeClass('side_menu_list01_link');
			$("a[href *= 'en_abt_cmp_governance']").addClass('side_menu_list01_open');
			$("a[href *= 'en_abt_cmp_governance']").append('<span class="txt_n">Open Menu or Close Menu</span>');
			$("a.side_menu_list02_a[href *= 'en_abt_cmp_governance']").attr("href", "toggle");
		}

	//「Investor Relations」タブを開く
		if(document.URL.match(/en_ir_/)) {
			$("a[href *= 'en_ir_index']").next('ul').show();
			$("a[href *= 'en_ir_index']").removeClass('side_menu_list01_link');
			$("a[href *= 'en_ir_index']").addClass('side_menu_list01_open');
			$("a[href *= 'en_ir_index']").append('<span class="txt_n">Open Menu or Close Menu</span>');
			$("a.side_menu_list01_a[href *= 'en_ir_index']").attr("href", "toggle");
		}
		//「Investor Relations」「Financial Information」タブを開く
		if(document.URL.match(/en_ir_fnc_/)) {
			$("a[href *= 'en_ir_fnc_index']").next('ul').show();
			$("a[href *= 'en_ir_fnc_index']").removeClass('side_menu_list01_link');
			$("a[href *= 'en_ir_fnc_index']").addClass('side_menu_list01_open');
			$("a[href *= 'en_ir_fnc_index']").append('<span class="txt_n">Open Menu or Close Menu</span>');
			$("a.side_menu_list02_a[href *= 'en_ir_fnc_index']").attr("href", "toggle");
		}
		//「Investor Relations」「IR Information」タブを開く
		if(document.URL.match(/en_ir_inf_/)) {
			$("a[href *= 'en_ir_inf_index']").next('ul').show();
			$("a[href *= 'en_ir_inf_index']").removeClass('side_menu_list01_link');
			$("a[href *= 'en_ir_inf_index']").addClass('side_menu_list01_open');
			$("a[href *= 'en_ir_inf_index']").append('<span class="txt_n">Open Menu or Close Menu</span>');
			$("a.side_menu_list02_a[href *= 'en_ir_inf_index']").attr("href", "toggle");
		}
		//「Investor Relations」「Stock Information」タブを開く
		if(document.URL.match(/en_ir_stk_/)) {
			$("a[href *= 'en_ir_stk_index']").next('ul').show();
			$("a[href *= 'en_ir_stk_index']").removeClass('side_menu_list01_link');
			$("a[href *= 'en_ir_stk_index']").addClass('side_menu_list01_open');
			$("a[href *= 'en_ir_stk_index']").append('<span class="txt_n">Open Menu or Close Menu</span>');
			$("a.side_menu_list02_a[href *= 'en_ir_stk_index']").attr("href", "toggle");
		}
		//「Investor Relations」「To Individual Investors」タブを開く
		if(document.URL.match(/en_ir_inv_/)) {
			$("a[href *= 'en_ir_inv_index']").next('ul').show();
			$("a[href *= 'en_ir_inv_index']").removeClass('side_menu_list01_link');
			$("a[href *= 'en_ir_inv_index']").addClass('side_menu_list01_open');
			$("a[href *= 'en_ir_inv_index']").append('<span class="txt_n">Open Menu or Close Menu</span>');
			$("a.side_menu_list02_a[href *= 'en_ir_inv_index']").attr("href", "toggle");
		}

	//「Service Information」タブを開く
		if(document.URL.match(/en_ias_index/) || document.URL.match(/en_djp_index/) ) {
			$("a[href *= 'en_ias_index']").next('ul').show();
			$("a[href *= 'en_ias_index']").removeClass('side_menu_list01_link');
			$("a[href *= 'en_ias_index']").addClass('side_menu_list01_open');
			$("a[href *= 'en_ias_index']").append('<span class="txt_n">Open Menu or Close Menu</span>');
			$("a.side_menu_list01_a[href *= 'en_ias_index']").attr("href", "toggle");
		}

});



/*--------------------------------------------------------------------------*
 *  
 *  heightLine JavaScript Library beta4
 *  
 *  MIT-style license. 
 *  
 *  2007 Kazuma Nishihata 
 *  http://www.webcreativepark.net
 *  
 *--------------------------------------------------------------------------*/
new function(){(function(h,k,a){try{h.addEventListener(k,a,!1)}catch(m){h.attachEvent("on"+k,a)}})(window,"load",function(){this.className="heightLine";this.parentClassName="heightLineParent";reg=new RegExp(this.className+"-([a-zA-Z0-9-_]+)","i");objCN=[];for(var h=document.getElementsByTagName?document.getElementsByTagName("*"):document.all,k=0;k<h.length;k++)for(var a=h[k].className.split(/\s+/),m=0;m<a.length;m++)if(a[m]==this.className){objCN["main CN"]||(objCN["main CN"]=[]);objCN["main CN"].push(h[k]);
break}else if(a[m]==this.parentClassName){objCN["parent CN"]||(objCN["parent CN"]=[]);objCN["parent CN"].push(h[k]);break}else if(a[m].match(reg)){a=a[m].match(reg);objCN[a]||(objCN[a]=[]);objCN[a].push(h[k]);break}var l=document.createElement("div"),h=document.createTextNode("S");l.appendChild(h);l.style.visibility="hidden";l.style.position="absolute";l.style.top="0";document.body.appendChild(l);var n=l.offsetHeight;changeBoxSize=function(){for(var f in objCN)if(objCN.hasOwnProperty(f))if("parent CN"==
f)for(var d=0;d<objCN[f].length;d++){for(var a=0,g=objCN[f][d].childNodes,e=0;e<g.length;e++)g[e]&&1==g[e].nodeType&&(g[e].style.height="auto",a=a>g[e].offsetHeight?a:g[e].offsetHeight);for(e=0;e<g.length;e++)if(g[e].style){var b=g[e].currentStyle||document.defaultView.getComputedStyle(g[e],""),c=a;b.paddingTop&&(c-=b.paddingTop.replace("px",""));b.paddingBottom&&(c-=b.paddingBottom.replace("px",""));b.borderTopWidth&&"medium"!=b.borderTopWidth&&(c-=b.borderTopWidth.replace("px",""));b.borderBottomWidth&&
"medium"!=b.borderBottomWidth&&(c-=b.borderBottomWidth.replace("px",""));g[e].style.height=c+"px"}}else{for(d=a=0;d<objCN[f].length;d++)objCN[f][d].style.height="auto",a=a>objCN[f][d].offsetHeight?a:objCN[f][d].offsetHeight;for(d=0;d<objCN[f].length;d++)objCN[f][d].style&&(b=objCN[f][d].currentStyle||document.defaultView.getComputedStyle(objCN[f][d],""),c=a,b.paddingTop&&(c-=b.paddingTop.replace("px","")),b.paddingBottom&&(c-=b.paddingBottom.replace("px","")),b.borderTopWidth&&"medium"!=b.borderTopWidth&&
(c-=b.borderTopWidth.replace("px","")),b.borderBottomWidth&&"medium"!=b.borderBottomWidth&&(c-=b.borderBottomWidth.replace("px","")),objCN[f][d].style.height=c+"px")}};checkBoxSize=function(){n!=l.offsetHeight&&(changeBoxSize(),n=l.offsetHeight)};changeBoxSize();setInterval(checkBoxSize,1E3);window.onresize=changeBoxSize})};