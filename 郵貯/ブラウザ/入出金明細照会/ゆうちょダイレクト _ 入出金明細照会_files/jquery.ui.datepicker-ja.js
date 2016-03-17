/* Japanese initialisation for the jQuery UI date picker plugin. */
/* Written by Kentaro SATO (kentaro@ranvis.com). */
jQuery(function($){
	$.datepicker.regional['ja'] = {
		closeText: '•Â‚¶‚é',
		prevText: '&#x3C;‘O',
		nextText: 'Ÿ&#x3E;',
		currentText: '¡Œ',
		monthNames: ['1','2','3','4','5','6','7','8','9','10','11','12'],
		monthNamesShort: ['1','2','3','4','5','6','7','8','9','10','11','12'],
		dayNames: ['“ú—j“ú','Œ—j“ú','‰Î—j“ú','…—j“ú','–Ø—j“ú','‹à—j“ú','“y—j“ú'],//“y—j“ú‚Ì–¼Ì‚ğ•ÏX‚·‚éê‡‚Ícss‚à‡‚í‚¹‚ÄC³‚·‚éB
		dayNamesShort: ['“ú','Œ','‰Î','…','–Ø','‹à','“y'],
		dayNamesMin: ['“ú','Œ','‰Î','…','–Ø','‹à','“y'],
		weekHeader: 'T',
		dateFormat: 'yy/mm/dd',
		firstDay: 0,
		isRTL: false,
		showMonthAfterYear: true,
		yearSuffix: '”N',
		monthSuffix:'Œ'};
	$.datepicker.setDefaults($.datepicker.regional['ja']);
});
