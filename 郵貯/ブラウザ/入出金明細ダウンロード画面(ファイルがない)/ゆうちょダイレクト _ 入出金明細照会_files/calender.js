$(function(){
//�\���͈͂⏉���l��js���g�p����html�ɋL�q
	
	//�J�����_�[�̉B���C���v�b�g�ɏ����l�̓��t������
	var mm01
	var dd01
	var mm02
	var dd02
    if (m01 < 10) {mm01 = "0" + m01;}
	else{mm01 = m01;}
	if (d01 < 10) {dd01 = "0" + d01;}
	else{dd01 = d01;}
    if (m02 < 10) {mm02 = "0" + m02;}
	else{mm02 = m02;}
	if (d02 < 10) {dd02 = "0" + d02;}
	else{dd02 = d02;}
		
	$('.calender01 input').val(y01+"/"+mm01+"/"+dd01);
	$('.calender02 input').val(y02+"/"+mm02+"/"+dd02);


    //�J�����_�[����v���_�E�����X�V
    $('.calender01,.calender02').each(function() {
        var $class = '.' + $(this).attr('class');
		$($class + ' input').bind('change', function() {
            var i = 0;
            var dates = $(this).val().split('/');
			
            $($class + ' select').each(function() {
                $(this).val(dates[i]);
                i++;
            });
        });
    });
	

    //�v���_�E������J�����_�[���X�V
    $('.calender01,.calender02').each(function() {
        var $class = '.' + $(this).attr('class');
		//�v���_�E���ύX�O�̏����l�擾
		var selectStartNumber
		 $($class + ' select').bind('click', function() {
			 $(this).children("option").each(function() {
				if($(this).prop('selected')==true){
					selectStartNumber = $(this).val();
				}
			  });
		  });
		
		//�v���_�E�����ύX���ꂽ��
        $($class + ' select').bind('change', function() {
            var i = 0;
            var dates = new Array(3);
            $($class + ' select').each(function() {
                dates[i] = $(this).val();
                i++;
            });
            var newdate = dates[0] + '/' + dates[1] + '/' + dates[2];
			
            $($class + ' input').val(newdate);
        });
    });

    //�J�����_�[�̕\��
    var date = new Date();
    var year = date.getFullYear();
    var imgUrl = $('#calenderjs').attr('context-root') + '/pages/pc/etc/img/modules/DFCAiconDate01.gif';
    $.datepicker.setDefaults({
		showButtonPanel: true,
  		showOn: "button",
        buttonImage: imgUrl,
        buttonImageOnly: true,
		//showAnim:"",//�\���E��\�����̃t�F�[�h�����B
		changeMonth: true,
        changeYear: true,
        minDate: new Date(y01 - 1 ,  0,  1),
        maxDate: new Date(y02 + 1 , 11, 31),
         beforeShowDay: function(date) {
					//�y���j���`�F�b�N
                       var result;
                       var dd = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();
                       switch (date.getDay()) {
							case 0: //���j��
								result = [true, "date-holiday"];
								break;
							case 6: //�y�j��
								result = [true, "date-saturday"];
								break;
							default:
								result = [true];
								break;
						}
                        return result;
                    }
					
    });
    $('.calender01 input,.calender02 input').datepicker();
	$('#dateCal01,#dateCal02').hide();
	
});


//�N���ύX�ɂȂ������v���_�E�������ĕ`��
function leapMonthCheck(selectGroup){
	var y = $(".year" + selectGroup).val();
    var m = $(".month" + selectGroup).val();
	if(m != null && m !="" && m.substring(0,1)==0){//m��10�ȉ��Ȃ�
		m = m.substring(1);//01�Ȃǂ�1�ɂ���
	}
				var mCheck = 1;
				var mLast = 12;
	
		if(y==yMax||y==yMin){
			if(y==yMin){
				mCheck = mMin;
				mLast = 12;
				if(m != null && m !="" && m<mMin){
					m = mMin;
				}
			}
			else{
				mCheck = 1;
				mLast = mMax;
				if(m != null && m !="" && m>mMax){
					m = mMax;
				}
			}	
		}
			$('.month' + selectGroup).empty();
			for (var i = mCheck; i <= mLast; i++) {
				if(i < 10){
					if(i==m){
						$('.month' + selectGroup).append('<option value="0' + i + '" selected>' + i + '</option>');
						}
					else{
						$('.month' + selectGroup).append('<option value="0' + i + '">' + i + '</option>');
						}
				}
				else{
					if(i==m){
						$('.month' + selectGroup).append('<option value="' + i + '" selected>' + i + '</option>');
					}
					else{
						$('.month' + selectGroup).append('<option value="' + i + '">' + i + '</option>');
					}
				}
		}
}
