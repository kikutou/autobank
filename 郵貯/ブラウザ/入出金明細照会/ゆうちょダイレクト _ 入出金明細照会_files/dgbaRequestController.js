// @(#)$FileVer: dgbaRequestController.js ver020.1 $

// �N���b�N�ςݔ���t���O
var alreadyClicked = false;

// �L�����Z������t���O
var isCanceled = false;

/**
 * ���N�G�X�g���M����
 * @param formElementName    �T�u�~�b�g����t�H�[����
 * @param path               �J�ڐ�p�X��
 * @param key                �p�����[�^���̔z��
 * @param value              �p�����[�^�l�̔z��
 * @param continuous         �A���������t���O
 */
function dcRequest(formElementName, path, key, value, continuous) {

    // �t�H�[�����`�F�b�N
    if (formElementName == null || formElementName == "") {
        // �t�H�[������null���邢�͋󕶎���̏ꍇ�A�������I������B
        return false;
    }

    // �w�肵���t�H�[���̑��݃`�F�b�N
    if (document.forms[formElementName] == null 
        || typeof document.forms[formElementName] == "undefined") {
        // �w�肵���t�H�[������ʓ��ɑ��݂��Ȃ��ꍇ�A�������I������B
        return false;
    }

    // �J�ڐ�p�X�`�F�b�N
    if (path == null || path == "") {
        // �J�ڐ�p�X��null���邢�͋󕶎���̏ꍇ�A�������I������B 
        return false;
    }

    // �L�����Z������
    if (isCanceled == true) {
        isCanceled = false;
        return false;
    }
    
    // �N���b�N�ςݔ���
    if (alreadyClicked == true) {
        // �N���b�N�ς݂̏ꍇ�A�������I������B
        return false;
    }
    
    // �A���������t���O����
    if (continuous == false) {
        // �A�������s���̏ꍇ�A�N���b�N�ς݃t���O���ς݂ɍX�V����B
        alreadyClicked = true;
    }

    // �p�����[�^����
    if (key != null && key.constructor == Array 
        && value != null && value.constructor == Array
        && key.length == value.length) {
        // �p�����[�^���y�уp�����[�^�l���z�񂩂z�񒷂���v����ꍇ�A�t�H�[���v�f�ɒl��ݒ�
        for (i=0; i < key.length; i++) {
            // �t�H�[���v�f�̑��݃`�F�b�N
            if (document.forms[formElementName].elements[key[i]] != null 
                && typeof document.forms[formElementName].elements[key[i]] != "undefined") {
                // ���݂���ꍇ�A�Y������I�u�W�F�N�g�ɒl��ݒ肷��B
                document.forms[formElementName].elements[key[i]].value = value[i];
            }
        }
    }
    
    // �J�ڐ�p�X��ݒ�B
    document.forms[formElementName].action = path;

    // �t�H�[�����M�B
    document.forms[formElementName].submit();
    
    return false;
}

//����q��ʕ\���֐�
var wid="width=670";      //����       
var hei="height=600";     //����       
var men="menubar=yes";     //���j���[�o�[�L�� 
var too="toolbar=yes";     //�c�[���o�[�L��  
var loc="location=yes";     //�A�h���X�o�[�L�� 
var sta="status=yes";      //�X�e�[�^�X�o�[�L��
var res="resizable=yes";     //���T�C�Y��   
var scr="scrollbars=yes";    //�X�N���[���o�[�L��

var opt=wid+","+hei+","+men+","+
             too+","+loc+","+sta+","+res+","+scr;

/**
 * ���N�G�X�g���M����i����q��ʗp�j
 * @param formElementName    �T�u�~�b�g����t�H�[����
 * @param path               �J�ڐ�p�X��
 * @param key                �p�����[�^���̔z��
 * @param value              �p�����[�^�l�̔z��
 * @param continuous         �A���������t���O
 */
function dcPrintRequest(formElementName, path, key, value, continuous) {

    // �t�H�[�����`�F�b�N
    if (formElementName == null || formElementName == "") {
        // �t�H�[������null���邢�͋󕶎���̏ꍇ�A�������I������B
        return false;
    }

    // �w�肵���t�H�[���̑��݃`�F�b�N
    if (document.forms[formElementName] == null 
        || typeof document.forms[formElementName] == "undefined") {
        // �w�肵���t�H�[������ʓ��ɑ��݂��Ȃ��ꍇ�A�������I������B
        return false;
    }

    // �J�ڐ�p�X�`�F�b�N
    if (path == null || path == "") {
        // �J�ڐ�p�X��null���邢�͋󕶎���̏ꍇ�A�������I������B 
        return false;
    }

    // �L�����Z������
    if (isCanceled == true) {
        isCanceled = false;
        return false;
    }
    
    // �N���b�N�ςݔ���
    if (alreadyClicked == true) {
        // �N���b�N�ς݂̏ꍇ�A�������I������B
        return false;
    }
    
    // �A���������t���O����
    if (continuous == false) {
        // �A�������s���̏ꍇ�A�N���b�N�ς݃t���O���ς݂ɍX�V����B
        alreadyClicked = true;
    }

    // �p�����[�^����
    if (key != null && key.constructor == Array 
        && value != null && value.constructor == Array
        && key.length == value.length) {
        // �p�����[�^���y�уp�����[�^�l���z�񂩂z�񒷂���v����ꍇ�A�t�H�[���v�f�ɒl��ݒ�
        for (i=0; i < key.length; i++) {
            // �t�H�[���v�f�̑��݃`�F�b�N
            if (document.forms[formElementName].elements[key[i]] != null 
                && typeof document.forms[formElementName].elements[key[i]] != "undefined") {
                // ���݂���ꍇ�A�Y������I�u�W�F�N�g�ɒl��ݒ肷��B
                document.forms[formElementName].elements[key[i]].value = value[i];
            }
        }
    }
    
    // �J�ڐ�p�X��ݒ�B
    document.forms[formElementName].action = path;

    // �ʃE�B���h�N��
    var wnd = window.open('','printWindow',opt);

    // ���N�G�X�g�̃^�[�Q�b�g��ʃE�B���h�Ɏw��
    document.forms[formElementName].target="printWindow";

    // �t�H�[�����M�B
    document.forms[formElementName].submit();

    // �t�H�[�J�X��ʃE�B���h�Ɉړ�
    wnd.focus();

    // �^�[�Q�b�g������ʂɖ߂�
    document.forms[formElementName].target="_self";
    
    return false;
}

/**
 * ���N�G�X�g���M����i����q��ʗp�j
 * @param formElementName    �T�u�~�b�g����t�H�[����
 * @param path               �J�ڐ�p�X��
 * @param key                �p�����[�^���̔z��
 * @param value              �p�����[�^�l�̔z��
 * @param continuous         �A���������t���O
 */
function dcPrintRequestClose(formElementName, path, key, value, continuous) {

    // �t�H�[�����`�F�b�N
    if (formElementName == null || formElementName == "") {
        // �t�H�[������null���邢�͋󕶎���̏ꍇ�A�������I������B
        return false;
    }

    // �w�肵���t�H�[���̑��݃`�F�b�N
    if (document.forms[formElementName] == null 
        || typeof document.forms[formElementName] == "undefined") {
        // �w�肵���t�H�[������ʓ��ɑ��݂��Ȃ��ꍇ�A�������I������B
        return false;
    }

    // �J�ڐ�p�X�`�F�b�N
    if (path == null || path == "") {
        // �J�ڐ�p�X��null���邢�͋󕶎���̏ꍇ�A�������I������B 
        return false;
    }

    // �L�����Z������
    if (isCanceled == true) {
        isCanceled = false;
        return false;
    }
    
    // �N���b�N�ςݔ���
    if (alreadyClicked == true) {
        // �N���b�N�ς݂̏ꍇ�A�������I������B
        return false;
    }
    
    // �A���������t���O����
    if (continuous == false) {
        // �A�������s���̏ꍇ�A�N���b�N�ς݃t���O���ς݂ɍX�V����B
        alreadyClicked = true;
    }

    // �p�����[�^����
    if (key != null && key.constructor == Array 
        && value != null && value.constructor == Array
        && key.length == value.length) {
        // �p�����[�^���y�уp�����[�^�l���z�񂩂z�񒷂���v����ꍇ�A�t�H�[���v�f�ɒl��ݒ�
        for (i=0; i < key.length; i++) {
            // �t�H�[���v�f�̑��݃`�F�b�N
            if (document.forms[formElementName].elements[key[i]] != null 
                && typeof document.forms[formElementName].elements[key[i]] != "undefined") {
                // ���݂���ꍇ�A�Y������I�u�W�F�N�g�ɒl��ݒ肷��B
                document.forms[formElementName].elements[key[i]].value = value[i];
            }
        }
    }
    
    // �J�ڐ�p�X��ݒ�B
    document.forms[formElementName].action = path;

    // ���N�G�X�g�̃^�[�Q�b�g��e�E�B���h�Ɏw��
    document.forms[formElementName].target="parentWindow";

    // �t�H�[�����M�B
    document.forms[formElementName].submit();

    // �qwindow��close
    window.close();

    // �ewindow��focus��ύX

    return false;
}
/**
 * ���~
 */
function dcAbort() {
    isCanceled = true;
}

/**
 * �z�[���y�[�W���[�_
 */
function cgfLoadHomepage(url, field) {
	var link = $('a#exlink').attr('href');
	$.post(
		link,
		{ 'URL' : url, 'field_id' : field}
	);
	window.open(url, '_linkwin');
    return false;
}
