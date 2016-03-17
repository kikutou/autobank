// @(#)$FileVer: run.js ver020.6 $

// ------------------------------
// MJL
// ------------------------------
MJL.event.add(window, 'load', function () {
    MJL.enable.heightEqualizer("col2", {
        collect :function(parent) {
            return MJL.getElementsByClassName(parent, "boxHdgBa");
        }
    });
});



$(function(){   

    // ------------------------------
    // 階層チェック
    // ------------------------------
    // /pc/index.html or /pc/で終わる時 トップページ
    var dir = location.pathname;
    if(dir.match(/\/pc\/$|\/01_PC\/$/) || dir.match(/\/pc\/index.html$|\/01_PC\/index.html$/)){
        dir = 'top';
    }


    // ------------------------------
    // 別窓アイコン追加
    // ------------------------------
    $(function(){
        var $sub = $("ul.listMenuBa a[onclick^=JavaScript]"),
            $btn = $("p.btnTy05 a[onclick^=JavaScript]"),
            $link = $("p.btnBa.back.home a[onclick^=JavaScript]"),
            $li = $("li.btnBa.back.home a[onclick^=JavaScript]"),
            $main = $("#structure a[onclick^=JavaScript]").not($sub).not($btn).not($link).not($li);
        $main.not(":has(img)").not("a[href$=pdf]").append('<img src="' + $('#runjs').attr('context-root') + '/pages/pc/etc/img/modules/DFCAiconBlank01.gif" alt="別窓で開きます。" width="15" height="12" class="icon">');
        $sub.append('<img src="' + $('#runjs').attr('context-root') + '/pages/pc/etc/img/modules/DFCAiconBlank01.gif" alt="別窓で開きます。" width="15" height="12" class="icon">');
        if(dir === 'top'){
            $main.find('>img').attr('src', $('#runjs').attr('context-root') + '/pages/pc/etc/img/modules/DFCAiconBlank01.gif');
            $sub.find('>img').attr('src', $('#runjs').attr('context-root') + '/pages/pc/etc/img/modules/DFCAiconBlank01.gif');
        }
    });
    
    // ------------------------------
    // 注釈リスト　※サイズ調整
    // ------------------------------
    $(function(){
        var $list = $('ul.listNoticeBa'),
            $li = $list.find('li > span'),
            word;
            
        $li.each(function(){
            var $item = $(this);
            word =  $item.text();
            if(word === '※'){
                $item.closest('li').addClass('single');
            }
        });
    });

    // ------------------------------
    // ページのトップへ
    // ------------------------------
    $(function(){
        var $link = $('.btnTy02 > a');
        $link.on('click', function(){
            $('html,body').animate({scrollTop:0}, 500);
            return false;
        });
    });

    // ------------------------------
    // ページ内リンク
    // ------------------------------
    $(function(){
    var $pageLink = $('a.pageLink[href^=#]');
        $pageLink.click(function(){
            var speed = 500;
            var href= $(this).attr("href");
            var target = $(href == "#" || href == "" ? 'html' : href);
            var position = target.offset().top;
            $("html, body").animate({scrollTop:position}, speed, "swing");
            return false;
        });
    });

    // ------------------------------
    // モーダルウィンドウ
    // ------------------------------
    $(function(){
        var $modal = $('.jsModal'),
            $link = $('.jsModalLink'),
            $linkCondition = $('.jsModalLinkCondition'),
            $linkMail = $('.jsModalLinkMail'),
            $execute = $('.jsModal a.execute'),
            $close = $('.jsModal a.close'),
            $checkCondition = $('.i01Condition'),
            $checkMail = $('.i01Mail'),
            $modalCurrent,
            dataModal,
            dataLink,
            modalH,
            posiT;
        var $clicks = new Array();

        $modal.hide();
        
        $link.each(function() {
            var $target = $(this).next();
            $clicks[$(this).data('modal')] = $target;
            $target.hide();
        });

        $linkCondition.each(function() {
            var $target = $(this).next();
            $clicks[$(this).data('modal')] = $target;
            $target.hide();
        });

        $linkMail.each(function() {
            var $target = $(this).next();
            $clicks[$(this).data('modal')] = $target;
            $target.hide();
        });

        $link.on('click', function(){
                modalException($(this),'');
                return false;
        });

        $linkMail.on('click', function(){
            if ($checkMail.size()!=0) {
                if ($checkMail.find('input[type="radio"]').size()!=0 &&
                    !$checkMail.find('input[type="radio"]').is(':checked')) {
                        modalException($(this),'modalMail');
                        return false;
                } else if ($checkMail.find('input[type="checkbox"]').size()!=0 &&
                           !($checkMail.find('input[type="checkbox"]').is(':checked'))) {
                        modalException($(this),'modalMail');
                        return false;
                }
                modalException($(this),'');
                return false;
            } else {
                $clicks[$(this).data('modal')].trigger('click');
                return false;
            }
        });

        $linkCondition.on('click', function(){
            if ($checkCondition.size()==0) {
                  $clicks[$(this).data('modal')].trigger('click');
                 return false;
            } else if ($checkCondition.size()==1 &&
                   (
                       ($checkCondition.find('input[type="radio"]').size()!=0 &&
                            $checkCondition.find('input[type="radio"]').is(':checked')) ||
                       ($checkCondition.find('option:first-child').size()!=0 &&
                            !($checkCondition.find('option:first-child').is(':selected')))
                   )
               ) {
                $clicks[$(this).data('modal')].trigger('click');
                return false;
            } else if ($checkCondition.size()>1 &&
                          (
                              ($(this).parents('div.i01Condition').find('input[type="radio"]').size!=0 &&
                                  $(this).parents('div.i01Condition').find('input[type="radio"]').is(':checked')) ||
                              ($(this).parents('div.i01Condition').find('option:first-child').size()!=0 &&
                                  !($(this).parents('div.i01Condition').find('option:first-child').is(':selected')))
                          )
                      ) {
                $clicks[$(this).data('modal')].trigger('click');
                return false;
            } else {
                modalException($(this),'');
                return false;
            }
        });

        $execute.on('click', function(){
            $modal.removeClass('on').hide();
            $clicks[$(this).parents('div.jsModal').data('modal')].trigger('click');
            return false;
        });
        $close.on('click', function(){
            $modal.removeClass('on').hide();
            return false;
        });
        
        var modalException = function ($this, $modalParam) {
            if($modalParam==''){
                $modalParam = $this.data('modal');
            }
            if($this.filter(".off").size()==0){
                if($this.attr('class').match(/jsModalLink/) && !$this.attr('class').match(/disabled/)){
                    $modal.hide();
                    posiT = $('body').scrollTop();
                    dataLink = $modalParam;
                    $modalCurrent = $('div[data-modal="' +  dataLink +'"]');
                    $modalCurrent.appendTo('body').addClass('on').fadeIn();
                    modalH = $modalCurrent.find('>div').height();
                    $modal.find('>div').css('margin-top', -modalH / 2);
                    if (0 < $modalCurrent.find('a.execute').size()) {
                        $modalCurrent.find('a.execute').prop('tabIndex',1);
                        $modalCurrent.find('a.execute').focus();
                    } else {
                    	$modalCurrent.find('a.close').prop('tabIndex',1);
                        $modalCurrent.find('a.close').focus();
                    }
                    return false;
                }else{
                    return false;
                }
            }else{
                return false;
            }
        };
        
        //ポップアップ表示時のキー制御
        $(window).keydown(function (event) {
            if ($modal.hasClass('on')) {
                //Escキーがクリックされたとき
                if('27' == event.keyCode){
                    $modal.removeClass('on').hide();
                }
                //Tabキーがクリックされたとき
                if ('9' == event.keyCode) {
                    if ($(':focus').attr('class') == 'execute') {
                        $close.focus();
                    } else {
                        $execute.focus();
                    }
                    return false;
                }
            }
        });
    });


    // ------------------------------
    // ボタンdisabled
    // ------------------------------
    $(function() {
        var $btnA = $('input.jsDisabled');
        $btnA.prop('disabled', true);
        var $btnB = $('a.jsDisabled');
        $btnB.addClass('disabled'); 
    });


    // ------------------------------
    // ラジオボタンで明細種別のリンク先切り替え #jsInput01
    // ------------------------------
    $(function(){
        var $root = $('#jsInput01'),
            $form = $root.find('form'),
            $radio01_01 = $root.find('#radio01-01'),
            $radio01_02 = $root.find('#radio01-02'),
            $radio01_03 = $root.find('#radio01-03'),
            $radio02_01 = $root.find('#radio02-01'),
            $radio02_02 = $root.find('#radio02-02'),
            $radio02_03 = $root.find('#radio02-03'),
            $hidden1 = $root.find('#i01Hidden'),
            $hidden2 = $root.find('#i02Hidden');
            
            //初期表示制御
            if($radio01_01.prop('checked')==true){
                $radio02_03.attr('disabled', true);
            } else if ($radio01_02.prop('checked')==true){
                $hidden2.hide();
            } else if ($radio01_03.prop('checked')==true){
                $hidden1.hide();
                $hidden2.hide();
            }
            $('th input',$hidden1).parents('tbody').children('tr').each(function() {
                if($(this).find('th').find('input').prop('checked')==true){
                    $(this).addClass('active');
                }
            });
            
            
            //明細種別がクリックされたとき
            $radio01_01.on('click', function(){
                $hidden1.show();
                $hidden2.show();
                $radio02_03.attr('disabled', true).prop('checked',false).parents('tr').removeClass('active');
                if ($radio02_02.prop('checked')==false) {
                    $radio02_01.prop('checked', true).parents('tr').addClass('active');
                }
            });
            
            $radio01_02.on('click', function(){
                $hidden1.show();
                $hidden2.hide();
                $radio02_03.removeAttr('disabled');
            });
            
            $radio01_03.on('click', function(){
                $hidden1.hide();
                $hidden2.hide();
            });
            
            //thのラジオボタンが押されたとき
            $('th input',$hidden1).on('click', function(){
                $(this).parents('tbody').children('tr').each(function() {
                    $(this).removeClass('active');
                });
                    $(this).parents('tr').addClass('active');
            });
            
            //tdのフォームパーツが押されたとき
            $('td input,td select,td img',$hidden1).on('click', function(){
                $(this).parents('tbody').children('tr').each(function() {
                    $(this).removeClass('active').find('th').find('input').prop('checked',false);
                });
                    $(this).parents('tr').addClass('active').find('th').find('input').prop('checked',true);
                
            });
            
    });


    // ------------------------------
    // 商品を選ぶ プルダウン出現とボタンアティブ制御 #jsInput02
    // ------------------------------
    $(function(){
        var $root = $('#jsInput02'),
            $form = $root.find('form'),
            $radio = $root.find('#i02Radio'),
            $hidden = $root.find('#i02Hidden'),
            $submit = $root.find('#i02Submit'),
            link;

        changeRadio();

        function changeRadio(){    
            link = $radio.find('input:checked').attr('data-link');
            $form.attr('action', link);
    
            if($radio.find('li:last-child input').is(':checked')){
                $hidden.show();
                if($hidden.find('option:first-child').is(':selected')){
                    $submit.attr('disabled', 'disabled').addClass('disabled'); 
                }
            }else if($radio.find('li:first-child input').is(':checked')){
                $hidden.hide();
                $submit.removeAttr('disabled').removeClass('disabled'); 
            }else{
                $hidden.hide();
                $submit.attr('disabled', 'disabled').addClass('disabled'); 
            }
        }
        
        $radio.find('input').on('change', function(){
            changeRadio();
        });
        
        $hidden.find('select').on('change', function(){
            if($hidden.find('option:first-child').is(':selected')){
                $submit.attr('disabled', 'disabled').addClass('disabled');  
            }else{
                $submit.removeAttr('disabled').removeClass('disabled');
            }
        });
    });



    // ------------------------------
    // 定期貯金 inputに入力があると 満期時の金額を入力 #jsInput03
    // ------------------------------
    $(function(){
        var $root = $('#jsInput03'),
            $input = $root.find('#i03Input'),
            $text = $root.find('#i03Text');

        $input.blur(function(){
            if($input.val() != ''){
                $text.text('500,175');
            }
        });
    });
    

    // ------------------------------
    // 以下の金融機関から選択 #jsInput05
    // ------------------------------
    $(function(){
        var $root = $('#jsInput05'),
            $hiddenB = $root.find('#i05HiddenB'),
            $radio = $root.find('#i05Radio'),
            $input = $('.i05Input'),
            $toggleBox = $('.i05toggleBox'),
            $search = $input.closest('.layColumn').find('.col:last-child > p'),
            $nextBtn = $root.find('.btnBa input[type="submit"]'),
            $link = $('.i05Link'),
            $jsModalSearch = $('.boxBdrTy01 .layColumn input[type="text"]');
            
        $hiddenB.hide();
        $toggleBox.hide();
        $toggleBox.slice(0,1).show();
        $nextBtn.addClass('off').prop('disabled', true);
        
        $toggleBox.find('.i05toggleBtn').on('click', function(){
        $toggleBox.toggle();
            
            });
        
        $radio.parents('.boxTy01').find('input[type="radio"]').on('change', function(){
            //各金融機関ボタン選択がクリックされたら
            if($radio.find('input[type="radio"]').is(':checked')){
                $nextBtn.removeClass('off').prop('disabled', false);
                $hiddenB.hide();
            }
            //上記以外の金融機関から選択がクリックされたら
            else{
                $nextBtn.addClass('off').prop('disabled', true);
            }
        });
        
        $radio.next('p').find('input[type="radio"]').on('change', function(){
            $hiddenB.show();
        });
        
        $input.on('change keyup', function(){
            $search.find('a').removeClass('disabled');
        });
        $search.find('a').on('click', function(){
            if($input.val() === ''){
                return false;
            }
            $jsModalSearch.val($input.val());
        });
        
        //モーダルウインドウのリストリンクがクリックされたら文字を入力ボックスに入れ次へボタンをアクティブに
        $('.boxBdrTy01 .listLinkTy01 li a').on('click', function(){
            $input.val($(this).text());
            $jsModalSearch.val($(this).text());
            $nextBtn.removeClass('off').prop('disabled', false);
            return false;
        });

    });

    // ランダム生成 数字・英数字版共通のため外出し 20131210
    function createRandomKey(keybord, key){
        var l = key.length;
        for(var i=l-1;i>0;i--){
            var j = Math.floor(Math.random()*(i+1));
            var tmp = key[i];
            key[i] = key[j];
            key[j] = tmp;
        }
        for(var i=0;i<key.length; i++) {
            keybord.append(key[i]);
        }
    }

    // ------------------------------
    // テキストとプルダウン入替 .jsInput07
    // ------------------------------
    $(function(){
        $('.btnTy05 span.jsInput07:first-child').each(function() {
        var $input = $(this),
            $select = $(this).next(".select"),
            $btn = $input.nextAll('a').slice(0,1);
            $input.text($("option:selected",$select).text());
            $select.hide();
            
            $btn.on('click', function(){
                $input.hide();
                $select.show();
                return false;
            });
            
            
            $btn.on('click',function(){
            if($btn.filter('.off').size()==0){
                $btn.addClass('off');
                $input.hide();
                $select.show();
            }
            else{
                $btn.removeClass('off');
                $input.show();
                $select.hide();
            }
            return false;
        });
        $select.on('change',function(){
        $input.text($("option:selected",$select).text());
        });
            
            
        });
     });



    // ------------------------------
    // チェックすると次へボタンがアクティブ .jsInput08
    // ------------------------------
    $(function(){
        var $input = $('.jsInput08'),
            $checkbox = $input.find('input[type="checkbox"]'),
            $nextBtn = $input.nextAll('ul').find($('.jsDisabled08'));
        
        $nextBtn.addClass('disabled');
        $nextBtn.attr('disabled', true);
        $nextBtn.css('box-shadow','0px 0px 0px 1px rgb(235, 235, 235) inset');
        $checkbox.on('change', function(){
            $nextBtn.addClass('disabled');
            $nextBtn.attr('disabled', true);
            $nextBtn.css('box-shadow','0px 0px 0px 1px rgb(235, 235, 235) inset');
            if($checkbox.is(':checked')){
                $nextBtn.removeClass('disabled');
                $nextBtn.attr('disabled', false);
                $nextBtn.css('box-shadow','');
            }
        });

    });


    // ------------------------------
    // タブ切替
    // ------------------------------
    $(function() {
        var $tab = $('.jsTabContainer02');
        
        $tab.each(function(){
            var $nav = $(this).find('>.tabNav'),
                $contents =$(this).find('>.tabContents'),
                num;
                
            $contents.addClass('static');
            
            $nav.each(function(){
                var $root = $(this);
                $root.find('a').bind('click', function() {
                    num = $root.find('>li>a').index(this);
                    $nav.find('>li').removeClass('current');
                    $nav.find('>li:nth-child('+ (num + 1) +')').addClass('current');
                    $contents.find('>li').removeClass('current');
                    $contents.find('>li').eq(num).addClass('current');
                    return false;
                });
            });
        });
    });


    // ------------------------------
    // チェックすると入金お知らせ口座選択がアクティブ .jsInput09
    // ------------------------------
    $(function(){
        $('.jsInput09').each(function() {
        var $input = $(this),
            $checkbox = $input.find('input[type="checkbox"]'),
            $selectAccount = $input.parents(".tblTy03").nextAll('.tblTy03').slice(0,1).find('td.jsInput09Link p input[type="checkbox"]');
            $selectAccount.prop('disabled', true);
            //#1480対応
            if($checkbox.is(':checked')){
                $selectAccount.prop('disabled', false);
            }
            $checkbox.on('change', function(){
                $selectAccount.prop('disabled', true);
                if($checkbox.is(':checked')){    
                    $selectAccount.prop('disabled', false);
                }
            });
        });
     });

    // ------------------------------
    // チェックするとチェックボックスががアクティブ .jsInput091
    // ------------------------------
    $(function(){
        $('.jsInput091').each(function() {
        var $input = $(this),
            $checkbox = $input.find('input[type="checkbox"]'),
            $selectAccount = $("div.boxShadowBa").find('.tblTy01').slice(0,1).find('td.jsInput091Link p input[type="checkbox"]');
            $selectAccount.prop('disabled', true);
            //#3185対応
            if($checkbox.is(':checked')){
                $selectAccount.prop('disabled', false);
            }
            $checkbox.on('change', function(){
                $selectAccount.prop('disabled', true);
                if($checkbox.is(':checked')){    
                    $selectAccount.prop('disabled', false);
                }
            });
        });
     });



    // ------------------------------
    // チェックするとメールアドレス修正フォームを表示 .jsInput10
    // ------------------------------
    $(function(){
        var $input = $('.jsInput10'),
            $inputBtn = $input.find('a'),
            $link = $('.jsModalLink'),
            $error = $('.jsInput10Error'),
            $tableTr = $input.parents("tr").nextAll('tr.jsInput10Link').slice(0,2);
            $tableTr.hide();

            var errflg = $error.find('input[type="hidden"]').val();
            if (errflg == 1) {
                $inputBtn.text("メールアドレスを修正しない");
                $tableTr.show();
                $inputBtn.addClass("on");
                changeHyoujiFlag();
            }
        
        $inputBtn.on('click',function () {
            if($(this).filter(".on").size()==0){
                 $(this).text("メールアドレスを修正しない");
                 $tableTr.show();
                 $(this).addClass("on");
            }
            else{
                 $(this).text("メールアドレスを修正する");
                 $tableTr.hide();
                 $(this).removeClass("on");
            }
            return false;
        });
        
        
        var $jsInput10Mail = $('.jsInput10Mail'),
            $MailOutput= $('.jsModal').find('.jsInput10MailOutput'),
            $mailText01 = $input.parents("tr").nextAll('tr.jsInput10Link').slice(0,1).find('input'),
            $mailText02 = $input.parents("tr").nextAll('tr.jsInput10Link').slice(1,2).find('input');
            
        $MailOutput.text($jsInput10Mail.text());
        
        $link.on('click',function () {
            if($inputBtn.filter('.on').size()!=0){
                         $MailOutput.text($mailText01.val());
                         $MailOutput.parents('.jsModal').find('.yes').find('input').removeAttr('disabled');
            }
            else{
                         $MailOutput.text($jsInput10Mail.text());
                         $MailOutput.parents('.jsModal').find('.yes').find('input').removeAttr('disabled');
            }
                return false;
        });
    });
    
    
    // ------------------------------
    // モーダルウィンドウ(ソフトウェアキーボード用)
    // ------------------------------
    $(function(){
        var $modal = $('.softkeyModal'),
            $link = $('.softkeyboard'),
            $close = $('.softkeyModal a.close'),
            $modalCurrent,
            dataLink,
            dataWrite,
            modalH;
        
        $('.softkeyModal').hide();
        
        $link.on('click', function(){
            if($(this).filter(".off").size()==0){
                if($(this).attr('class').match(/softkeyboard/) && !$(this).attr('class').match(/disabled/)){
                    $modal.hide();
                    posiT = $('body').scrollTop();
                    dataLink = $(this).data('mode');
                    dataWrite = $(this).data('write');
                    $modalCurrent = $('div.'+dataLink);
                    $modalCurrent.appendTo('body').addClass('on').fadeIn();
                    modalH = $modalCurrent.find('>div').height();
                    $modal.find('>div').css('margin-top', -modalH / 2);
                    $modalCurrent.find('input[type="password"]:first').attr('data-write', dataWrite);
                    return false;
                }else{
                    return false;
                }
            }else{
                return false;
            }
        });
        
        $close.on('click', function(){
            $modal.removeClass('on').hide();
            return false;
        });
    });    
    
    // ------------------------------
    // ソフトウェアキーボード 
    // ------------------------------
    $(function(){
        $('.boxModalTy03').each(function() {
            var x1 = -1;
            var y1 = -1;
            var movelimit = 1;
            var maskflag = false;
            var $area = $('.softkeyModal'),
                $modal = $(this),
                $keybordChar = $modal.find('.listBtnTy06'),
                $keybordNum = $modal.find('.listBtnTy07'),
                $btn = $modal.find('.enter'),
                $btnAllDel = $modal.find('.delete'),
                $btnSingleDel = $modal.find('.backspace'),
                $btnCharLi = $keybordChar.find('li'),
                $btnNumLi = $keybordNum.find('li'),
                $close = $modal.find('.close'),
                $check = $modal.find('.switchCase'),
                $pass = $modal.find('input[type="password"]:first');
            
            // ランダムキー配列
            createRandomKey($keybordChar, $btnCharLi);
            createRandomKey($keybordNum, $btnNumLi);

            // keybordChar値の退避
            $keybordChar.find('a').each(function() {
              $(this).attr('sKey', $(this).text());
            });
            
            // keybordNum値の退避
            $keybordNum.find('a').each(function() {
              $(this).attr('sKey', $(this).text());
            });
            
            // キー値初期表示をマスク
            mask();
            
            // keybordCharの選択
            $keybordChar.find('a').on('click', function(){
                mask();
                var $maxlen = $('body').find('input[type="password"][name="' + $pass.attr('data-write') + '"]').attr("maxlength");
                if ($maxlen == undefined || ($pass.val().length < $maxlen && $(this).attr('dummy') != "true")) {
                    $pass.val($pass.val() + $(this).attr('sKey'));
                }
                return false;
            });

            // keybordNumの選択
            $keybordNum.find('a').on('click', function(){
                mask();
                var $maxlen = $('body').find('input[type="password"][name="' + $pass.attr('data-write') + '"]').attr("maxlength");
                if ($maxlen == undefined || ($pass.val().length < $maxlen && $(this).attr('dummy') != "true")) {
                    $pass.val($pass.val() + $(this).attr('sKey'));
                }
                return false;
            });
            
            // 確定
            $btn.on('click', function(){
                var $input = $('body').find('input[type="password"][name="' + $pass.attr('data-write') + '"]');
                $area.removeClass('on').hide();
                $input.val($pass.val());
                $pass.val('');
                $check.attr('checked', false);
                switchChar();
                // キー値表示をマスク
                mask();
                return false;
            });
            
            // mousemoveイベント
            $area.on('mousemove', function(e) {
                var x2 = e.pageX - this.offsetLeft;
                var y2 = e.pageY - this.offsetTop;
                if (Math.abs(x2-x1) > movelimit || Math.abs(y2-y1) > movelimit) {
                    unmask();
                }
                x1 = x2;
                y1 = y2;
            });

            // mousestopイベント
            $area.on('mousestop', function(e) {
                mask();
                x1 = e.pageX - this.offsetLeft;
                y1 = e.pageY - this.offsetTop;
            });
            
            // mouseenterイベント
            $area.on('mouseenter', function(){
                mask();
            });

            // mouseleaveイベント
            $area.on('mouseleave', function(){
                mask();
            });

            // アルファベット大文字表示
            $check.on('click', function(){
                switchChar();
            });

            // 全て消去
            $btnAllDel.on('click', function(){
                $pass.val('');
                return false;
            });
            
            // 一字消去
            $btnSingleDel.on('click', function(){
                var org_pass = $pass.val();
                var del_pass = org_pass.slice(0, org_pass.length-1);
                $pass.val(del_pass);
                return false;
            });
            
            // 閉じる
            $close.on('click', function(){
                $pass.val('');
                $check.attr('checked', false);
                switchChar();
                // キー値表示をマスク
                mask();
            });
            
            // switchChar
            function switchChar() {
                $btnCharLi.each(function() {
                    var elm_a = $(this).children('a');
                    var cnv_key = elm_a.attr('sKey');
                    if($check.is(':checked')){
                        cnv_key = cnv_key.toUpperCase();
                    }else{
                        cnv_key = cnv_key.toLowerCase();
                    }
                    elm_a.text('*');
                    elm_a.attr('sKey', cnv_key);
                });
            }
            
            // mask
            function mask() {
                if (!maskflag) {
                    $keybordChar.find('a').each(function(){
                        if ($(this).text() != '*') {
                            $(this).text('*');
                        }
                    });
                    $keybordNum.find('a').each(function(){
                        if ($(this).text() != '*') {
                            $(this).text('*');
                        }
                    });
                }
                maskflag = true;
            }
            
            // unmask
            function unmask() {
                if (maskflag) {
                    $keybordChar.find('a').each(function(){
                        if ($(this).attr('sKey') != $(this).text()) {
                            $(this).text($(this).attr('sKey'));
                        }
                    });
                    $keybordNum.find('a').each(function(){
                        if ($(this).attr('sKey') != $(this).text()) {
                            $(this).text($(this).attr('sKey'));
                        }
                    });
                }
                maskflag = false;
            }           
        });
        $('.boxModalTy02').each(function() {
            var x1 = -1;
            var y1 = -1;
            var movelimit = 1;
            var maskflag = false;
            var $area = $('.softkeyModal'),
                $modal = $(this),
                $keybordNum = $modal.find('.listBtnTy04'),
                $btn = $modal.find('.enter'),
                $btnAllDel = $modal.find('.delete'),
                $btnSingleDel = $modal.find('.backspace'),
                $btnNumLi = $keybordNum.find('li'),
                $close = $modal.find('.close'),
                $pass = $modal.find('input[type="password"]:first');
            
            // ランダムキー配列
            createRandomKey($keybordNum, $btnNumLi);
            
            // keybordNum値の退避
            $keybordNum.find('a').each(function() {
              $(this).attr('sKey', $(this).text());
            });

            // keybordNumの選択
            $keybordNum.find('a').on('click', function(){
                mask();
                var $maxlen = $('body').find('input[type="password"][name="' + $pass.attr('data-write') + '"]').attr("maxlength");
                if ($pass.val().length < $maxlen && $(this).attr('dummy') != "true") {
                    $pass.val($pass.val() + $(this).attr('sKey'));
                }
                return false;
            });
            
            // 確定
            $btn.on('click', function(){
                var $input = $('body').find('input[type="password"][name="' + $pass.attr('data-write') + '"]');
                $area.removeClass('on').hide();
                $input.val($pass.val());
                $pass.val('');
                return false;
            });
            
            // mousemoveイベント
            $area.on('mousemove', function(e) {
                var x2 = e.pageX - this.offsetLeft;
                var y2 = e.pageY - this.offsetTop;
                if (Math.abs(x2-x1) < movelimit && Math.abs(y2-y1) < movelimit) {
                    mask();
                } else {
                    unmask();
                }
                x1 = x2;
                y1 = y2;
            });

            // mousestopイベント
            $area.on('mousestop', function(e) {
                mask();
            });
            
            // mouseenterイベント
            $area.on('mouseenter', function(){
                mask();
            });

            // mouseleaveイベント
            $area.on('mouseleave', function(){
                mask();
            });

            // 全て消去
            $btnAllDel.on('click', function(){
                $pass.val('');
                return false;
            });
            
            // 一字消去
            $btnSingleDel.on('click', function(){
                var org_pass = $pass.val();
                var del_pass = org_pass.slice(0, org_pass.length-1);
                $pass.val(del_pass);
                return false;
            });
            
            // 閉じる
            $close.on('click', function(){
                $pass.val('');
            });
            
            // mask
            function mask() {
                if (!maskflag) {
                    $keybordNum.find('a').each(function(){
                        if ($(this).text() != '*') {
                            $(this).text('*');
                        }
                    });
                }
                maskflag = true;
            }
            
            // unmask
            function unmask() {
                if (maskflag) {
                    $keybordNum.find('a').each(function(){
                        if ($(this).attr('sKey') != $(this).text()) {
                            $(this).text($(this).attr('sKey'));
                        }
                    });
                }
                maskflag = false;
            }           
        });     
    });

    // ------------------------------
    // 定期貯金の適用金利をセレクトボックスで選択 .jsSelect01
    // ------------------------------
    $(function(){
        var $Select = $(".jsSelect01"),
            $table = $Select.parents("h3").siblings(".jsSelect01Link");
            $("tr",$table).each(function() {
                $("th:gt(1)",this).hide();
                $("td:gt(1)",this).hide();
            });
        
        $Select.on("change", function(){
            var $SelectIndex = $("option",this).index($("option:selected",this))+1//この1はテーブルの列数によって変える。
            $(this).parents("h3").siblings(".jsSelect01Link").find("tr").each(function() {
                $("th:gt(0)",this).hide();
                $("td:gt(0)",this).hide();
                $("th",this).eq($SelectIndex).show();
                $("td",this).eq($SelectIndex).show();
            });
            
        });
    });


    // ------------------------------
    // セレクトボックスで口座を選択すると口座別に残高と無料回数切替 .jsSelect02
    // ※1ページに2セットあると動作の整合性が取れません。
    // ------------------------------
    $(function(){
        var $Select = $(".jsSelect02"),
            $SelectUl = $(".jsSelect02Link");
            
            $("li:not(:first)",$SelectUl).hide();
            
        $Select.on("change", function(){
            var $SelectIndex = $("option",this).index($("option:selected",this));
                $SelectUl.children("li").hide();
                $SelectUl.children("li").eq($SelectIndex).show();
                
        });
    });

    // ------------------------------
    // セレクトボックスで口座を選択すると口座別に残高と無料回数切替 #jsSelect03
    // ボタンでテキストプルダウンの切り替え
    // ※1ページに2セットあると動作の整合性が取れません。
    // ------------------------------
    $(function(){
        var $Select = $(".jsSelect03"),
        $SelectRoot = $(".jsSelect03root", $Select),
        $SelectSelect = $(".jsSelect03Select", $Select),
        $SelectBtn = $(".btnTy05 a", $Select),
        $SelectPrice = $(".jsSelect03Price", $Select),
        $SelectTimes = $(".jsSelect03Link"),
        $SelectCheacked = $("option",this).index($("option:selected",this)),
        $loginChokinShubetsuKubun = "",
        $mutsuuchouKataSougouKouzaHyouji = "",
        $radio03Length = $('#i01Radio3').find('input[type="radio"]').length;
        
            //初期設定
            if($SelectBtn.size()!=0){
            $SelectSelect.hide();
            }
            $SelectRoot.children("li").hide();
            $SelectRoot.children("li").eq($SelectCheacked).show();
            $SelectTimes.children("li").hide();
            $SelectTimes.children("li").eq($SelectCheacked).show();
            $SelectPrice.children("li").hide();
            $SelectPrice.children("li").eq($SelectCheacked).show();
            
            $loginChokinShubetsuKubun = $("#logChoShu-0" + $SelectCheacked).val();
            $mutsuuchouKataSougouKouzaHyouji = $("#mutsuuChoKouza-0" + $SelectCheacked).val();
            
            if ('0' == $mutsuuchouKataSougouKouzaHyouji) {
                if ('2' == $loginChokinShubetsuKubun) {
                    for(var i=0;i<$radio03Length; i++) {
                        if ('40' == $('#i01Radio3').find('input[type="radio"]').eq(i).val() ||
                            '41' == $('#i01Radio3').find('input[type="radio"]').eq(i).val()){
                            $('#i01Radio3').find('input[type="radio"]').eq(i).attr('disabled', false);
                        }
                    }
                } else {
                    for(var i=0;i<$radio03Length; i++) {
                        if ('40' == $('#i01Radio3').find('input[type="radio"]').eq(i).val() ||
                            '41' == $('#i01Radio3').find('input[type="radio"]').eq(i).val()){
                            $('#i01Radio3').find('input[type="radio"]').eq(i).attr('disabled', true);
                        }
                    }
                }
            } else {
                for(var i=0;i<$radio03Length; i++) {
                    if ('40' == $('#i01Radio3').find('input[type="radio"]').eq(i).val() ||
                        '41' == $('#i01Radio3').find('input[type="radio"]').eq(i).val()){
                        $('#i01Radio3').find('input[type="radio"]').eq(i).attr('disabled', false);
                    }
                }
            }

        $SelectBtn.on("click", function(){
            $SelectRoot.toggle();
            $SelectSelect.toggle();
            return false;           
        });
            
        $SelectSelect.on("change", function(){
            var $SelectIndex = $("option",this).index($("option:selected",this));
                $SelectRoot.children("li").hide();
                $SelectRoot.children("li").eq($SelectIndex).show();
                $SelectTimes.children("li").hide();
                $SelectTimes.children("li").eq($SelectIndex).show();
                $SelectPrice.children("li").hide();
                $SelectPrice.children("li").eq($SelectIndex).show();
                
                $loginChokinShubetsuKubun = $("#logChoShu-0" + $SelectIndex).val();
                $mutsuuchouKataSougouKouzaHyouji = $("#mutsuuChoKouza-0" + $SelectIndex).val();
                
                if ('0' == $mutsuuchouKataSougouKouzaHyouji) {
                    if ('2' == $loginChokinShubetsuKubun) {
                        for(var i=0;i<$radio03Length; i++) {
                            if ('40' == $('#i01Radio3').find('input[type="radio"]').eq(i).val() ||
                                '41' == $('#i01Radio3').find('input[type="radio"]').eq(i).val()){
                                $('#i01Radio3').find('input[type="radio"]').eq(i).attr('disabled', false);
                            }
                        }
                    } else {
                        for(var i=0;i<$radio03Length; i++) {
                            if ('40' == $('#i01Radio3').find('input[type="radio"]').eq(i).val() ||
                                '41' == $('#i01Radio3').find('input[type="radio"]').eq(i).val()){
                                $('#i01Radio3').find('input[type="radio"]').eq(i).attr('disabled', true);
                            }
                        }
                    }
                } else {
                    for(var i=0;i<$radio03Length; i++) {
                        if ('40' == $('#i01Radio3').find('input[type="radio"]').eq(i).val() ||
                            '41' == $('#i01Radio3').find('input[type="radio"]').eq(i).val()){
                            $('#i01Radio3').find('input[type="radio"]').eq(i).attr('disabled', false);
                        }
                    }
                }
        });
    });

    // ------------------------------
    // セレクトボックスで口座を選択すると口座別に残高とワンタイムパスワード送付先メールアドレス切替 #jsSelect04
    // ボタンでテキストプルダウンの切り替え
    // ※1ページに2セットあると動作の整合性が取れません。
    // ------------------------------
    $(function(){
        var $Select = $(".jsSelect04"),
        $SelectRoot = $(".jsSelect04root", $Select),
        $SelectSelect = $(".jsSelect04Select", $Select),
        $SelectBtn = $(".btnTy05 a", $Select),
        $SelectPrice = $(".jsSelect04Price", $Select),
        $SelectWanTime = $(".jsSelect04WanTime", $Select),
        $SelectWanTimeMail = $(".jsSelect04WanTimeMail", $SelectWanTime),
        $SelectChecked = $("option",this).index($("option:selected",this));

            //初期設定
            if($SelectBtn.size()!=0){
            $SelectSelect.hide();
            }
            $SelectRoot.children("li").hide();
            $SelectRoot.children("li").eq($SelectChecked).show();
            $SelectPrice.children("li").hide();
            $SelectPrice.children("li").eq($SelectChecked).show();

            if (document.getElementById('mailAddressSentakuUmuId')) {
                // メールアドレス選択有無設定
                var selectedSentakuUmuListId = "mailSentakuUmuListId_" + ("0"+($SelectChecked + 1)).slice(-2);
                    document.getElementById('mailAddressSentakuUmuId').value
                        = document.getElementById(selectedSentakuUmuListId).innerHTML;

                // 「ワンタイムパスワード送付先メールアドレス」欄表示制御
                $SelectWanTime.hide();
                if (document.getElementById('mailAddressSentakuUmuId').value=='1') {
                    $SelectWanTime.show();
                    $SelectWanTimeMail.children("li").show();
                }
            }

        $SelectBtn.on("click", function(){
            $SelectRoot.toggle();
            $SelectSelect.toggle();
            return false;
        });

        $SelectSelect.on("change", function(){
            var $SelectIndex = $("option",this).index($("option:selected",this));
                $SelectRoot.children("li").hide();
                $SelectRoot.children("li").eq($SelectIndex).show();
                $SelectPrice.children("li").hide();
                $SelectPrice.children("li").eq($SelectIndex).show();

            // メールアドレス選択有無設定値変更処理
            var selectedSentakuUmuListId = "mailSentakuUmuListId_" + ("0"+($SelectIndex + 1)).slice(-2);
                document.getElementById('mailAddressSentakuUmuId').value
                    = document.getElementById(selectedSentakuUmuListId).innerHTML;

            // 「ワンタイムパスワード送付先メールアドレス」欄表示制御
            $SelectWanTime.hide();
            if (document.getElementById('mailAddressSentakuUmuId').value=='1') {
                $SelectWanTime.show();
                $SelectWanTimeMail.children("li").show();
            }

            // メールアドレス選択ラジオボタンクリア
            var wanTimeMailObj = document.getElementById("wanTimeMailId");
            var wanTimeMailLen = wanTimeMailObj.getElementsByTagName("li").length;
            var wanTimeMailRadioId = "";
            for (var i=0; i<wanTimeMailLen; i++) {
                wanTimeMailRadioId = "radio02_" + ("0"+(i+1)).slice(-2);
                document.getElementById(wanTimeMailRadioId).checked = false;
            }

        });
    });

    // ------------------------------
    // セレクトボックスで口座を選択すると口座別にシリアル番号とトークン利用状況と残高を切替 #jsSelect05
    // ボタンでテキストプルダウンの切り替え
    // ※1ページに2セットあると動作の整合性が取れません。
    // ------------------------------
    $(function(){
        var $Select = $(".jsSelect05"),
        $SelectSelect = $(".jsSelect05Select", $Select),
        $SelectTokenInfo = $(".jsSelect05TokenInfo", $Select),
        $SelectPrice = $(".jsSelect05Price", $Select),
        $SelectChecked = $("option",this).index($("option:selected",this));;

        //初期設定
        $SelectTokenInfo.children("li").hide();
        $SelectTokenInfo.children("li").eq($SelectChecked).show();
        $SelectPrice.children("li").hide();
        $SelectPrice.children("li").eq($SelectChecked).show();

        $SelectSelect.on("change", function(){
            var $SelectIndex = $("option",this).index($("option:selected",this));
                $SelectTokenInfo.children("li").hide();
                $SelectTokenInfo.children("li").eq($SelectIndex).show();
                $SelectPrice.children("li").hide();
                $SelectPrice.children("li").eq($SelectIndex).show();
        });
    });

    // ------------------------------
    // 画像を拡大するfancybox
    // ------------------------------
     $(function(){
        if($('.fancybox').size()!=0){
        $('.fancybox').fancybox();
        }
    });

    // ------------------------------
    // リンクを無効化する
    // ------------------------------
     $(function(){
         $('a.link_inactive').on('click', function(e) {
            e.preventDefault(); 
         });
        $('a.link_inactive').css({'cursor' : 'default', 'pointer-events' : 'none'});
    });
    
    // ------------------------------
    // 選択した値で要素を書換える
    // ------------------------------
     $(function(){
         // 初期表示（テキスト）
         $('input:text.copyval').each(function() {
             var $target = $('#' + $(this).attr('id').substring(0, $(this).attr('id').indexOf('_')));
             $target.text($(this).val());
         });
         // 初期表示（ラジオボタン）
         $('input:radio.copyval').each(function() {
             if ($(this).is(':checked')) {
                 var $target = $('#' + $(this).attr('id').substring(0, $(this).attr('id').indexOf('_')));
                 $target.text($('label[for="'+$(this).attr('id')+'"]').text());
             }
         });
         // 初期表示（セレクト）
         $('select.copyval').each(function() {
             var $option = $(this).children('option:selected');
             var $target = $('#' + $(this).attr('id').substring(0, $(this).attr('id').indexOf('_')));
             $target.text($option.text());
         });

         // テキスト
         $('input:text.copyval').on('change', function() {
             var $target = $('#' + $(this).attr('id').substring(0, $(this).attr('id').indexOf('_')));
             $target.text($(this).val());
         });
         // ラジオボタン
         $('input:radio.copyval').on('change', function() {
             if ($(this).is(':checked')) {
                 var $target = $('#' + $(this).attr('id').substring(0, $(this).attr('id').indexOf('_')));
                 $target.text($('label[for="'+$(this).attr('id')+'"]').text());
             }
         });
         // セレクト
         $('select.copyval').on('change', function() {
             var $option = $(this).children('option:selected');
             var $target = $('#' + $(this).attr('id').substring(0, $(this).attr('id').indexOf('_')));
             $target.text($option.text());
         });         
    });
     // ------------------------------
     // お客さま番号入力時のautofocus処理
     // ------------------------------
    $(function(){
        
        var $inputFocus1 = $('#focus1'),
            $inputFocus2 = $('#focus2'),
            $inputFocus3 = $('#focus3'),
            $inputFocus1Value = '',
            $inputFocus2Value = '';

        $inputFocus1.on('keydown', function(){
            $inputFocus1Value = $inputFocus1.val();
            $inputFocus2Value = $inputFocus2.val();
        });
        $inputFocus2.on('keydown', function(){
            $inputFocus1Value = $inputFocus1.val();
            $inputFocus2Value = $inputFocus2.val();
        });
        
        $inputFocus3.on('keydown', function(){
            $inputFocus1Value = $inputFocus1.val();
            $inputFocus2Value = $inputFocus2.val();
        });
        
        $inputFocus1.on('keyup', function(){
            if ($inputFocus1Value != $inputFocus1.val() && $inputFocus1.val().length == '4') {
                $inputFocus2.prop('selectionEnd', 0);
                $inputFocus2.prop('selectionStart', 0);
                $inputFocus2.focus();
            }
        });
        $inputFocus2.on('keyup', function(){
            if ($inputFocus2Value != $inputFocus2.val() && $inputFocus2.val().length == '4') {
                $inputFocus3.prop('selectionEnd', 0);
                $inputFocus3.prop('selectionStart', 0);
                $inputFocus3.focus();
            }
        });
    });
    // ------------------------------
    // ラジオボタンの活性・非活性切り替え
    // ------------------------------
    $(function(){
        var obj = $('.toggleState');
        var iniChk = $('input:radio.off').prop('checked');
        if(iniChk){
            obj.prop('disabled', true);
        }
        
        $('input:radio.toggle').on('change', function(){
            var chk = $(this).hasClass('on');
            chk ? obj.prop('disabled',false) : obj.prop('disabled',true);
        });
    });
});