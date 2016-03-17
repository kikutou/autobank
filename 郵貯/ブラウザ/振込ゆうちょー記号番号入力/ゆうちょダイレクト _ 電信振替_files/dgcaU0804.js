// @(#)$FileVer: dgcaU0804.js ver020.1 $

$(function(){

    // ------------------------------
    // モーダルウィンドウ
    // ------------------------------
    $(function(){
        var $modal = $('.jsModal'),
            $linkCondition08 = $('.jsModalLinkCondition08'),
            $execute08_1 = $('.jsModal a.execute08_1'),
            $execute08_2 = $('.jsModal a.execute08_2'),
            $close08 = $('.jsModal a.close08'),
            $checkCondition08_1 = $('#i08Condition_1').val(),
            $checkCondition08_2 = $('.i08Condition_2'),
            $checkCondition08_3 = $('.i08Condition_3'),
            $checkCondition08_4,
            $checkCondition08_5,
            $checkCondition08_6,
            $checkCondition08_7 = $('.i08Condition_7'),
            $checkCondition08_8,
            $checkCondition08_9 = $('.i08Condition_9'),
            $modalCurrent,
            dataLink,
            modalH,
            posiT;

        $modal.hide();
        
        var $target = $linkCondition08.next();
        $target.hide();
        
        $linkCondition08.on('click', function(){
            denshinfurikae($(this));
            return false;
        });

        $execute08_1.on('click', function(){
            $modal.removeClass('on').hide();
            if ($checkCondition08_9.size()!=0 &&
                    $checkCondition08_9.find('input[type="radio"]').is(':checked')) {
                modalException($(this),'modal03');
                return false;
            } else {
                $target.trigger('click');
                return false;
            }
        });

        $execute08_2.on('click', function(){
            $modal.removeClass('on').hide();
            $target.trigger('click');
            return false;
        });

        $close08.on('click', function(){
            $modal.removeClass('on').hide();
            return false;
        });

        var denshinfurikae = function ($this) {
            var $InputLength = '';
            var $sougouKouza = false;
            if ($checkCondition08_9.size()!=0) {
                var $SelectIndex = document.getElementById('mailAddressSentakuId').selectedIndex;
                var selectedSentakuUmuListId = "mailSentakuUmuListId_" + ("0"+($SelectIndex + 1)).slice(-2);
                if (document.getElementById(selectedSentakuUmuListId).innerHTML=='1' &&
                    !$checkCondition08_9.find('input[type="radio"]').is(':checked')) {
                        modalException($this,'modalMail');
                        return false;
                }
            }
            if ($checkCondition08_1=='00') {
                $InputLength = $checkCondition08_2.find('input[type="text"]:first').val();
                if ($InputLength!='' && $InputLength.slice(0,1)=='1') {
                    $sougouKouza = true;
                }
            } else if ($checkCondition08_1=='01') {
                $InputLength = $checkCondition08_3.find('input[type="text"]:first').val();
                if ($InputLength!='' && $InputLength.slice(-1)=='8') {
                    $sougouKouza = true;
                }
            } else if ($checkCondition08_1=='02') {
                $checkCondition08_4 = $('#i08Condition_4').val();
                if ($checkCondition08_4!='' && $checkCondition08_4.slice(0,1)=='1') {
                    $sougouKouza = true;
                }
            } else if ($checkCondition08_1=='03') {
                $checkCondition08_5 = $('#i08Condition_5').val();
                if ($checkCondition08_5!='' && $checkCondition08_5.slice(0,1)=='1') {
                    $sougouKouza = true;
                }
            } else if ($checkCondition08_1=='04') {
                $checkCondition08_6 = $('#i08Condition_6').val();
                if ($checkCondition08_6!='' && $checkCondition08_6.slice(0,1)=='1') {
                    $sougouKouza = true;
                }
            }
            if ($checkCondition08_7.find('input[type="radio"]:checked').val()=='1' && $sougouKouza) {
                modalException($this,'modal01');
                return false;
            } else if ($checkCondition08_7.find('input[type="radio"]:checked').val()=='0' && $('#i08Condition_8').val()!='') {
                modalException($this,'modal02');
                return false;
            } else {
                if ($checkCondition08_9.size()!=0 &&
                        $checkCondition08_9.find('input[type="radio"]').is(':checked')) {
                    modalException($this,'modal03');
                    return false;
                } else {
                    $target.trigger('click');
                    return false;
                }
            }
        };

        var modalException = function ($this, $modalParam) {
            if($modalParam==''){
                $modalParam = $this.data('modal');
            }
            if($this.filter(".off").size()==0){
                if(($this.attr('class').match(/jsModalLink/) || 
                        $this.attr('class').match(/execute08/)) && !$this.attr('class').match(/disabled/)){
                    $modal.hide();
                    posiT = $('body').scrollTop();
                    dataLink = $modalParam;
                    $modalCurrent = $('div[data-modal="' +  dataLink +'"]');
                    $modalCurrent.appendTo('body').addClass('on').fadeIn();
                    modalH = $modalCurrent.find('>div').height();
                    $modal.find('>div').css('margin-top', -modalH / 2);
                    if (0 < $modalCurrent.find('a.execute08_1').size()) {
                        $modalCurrent.find('a.execute08_1').focus();
                    } else if (0 < $modalCurrent.find('a.execute08_2').size()) {
                        $modalCurrent.find('a.execute08_2').focus();
                    } else {
                        $modalCurrent.find('a.close08').focus();
                    }
                    $modalCurrent.find('a.close').focus();
                    return false;
                }else{
                    return false;
                }
            }else{
                return false;
            }
        };
    });
});