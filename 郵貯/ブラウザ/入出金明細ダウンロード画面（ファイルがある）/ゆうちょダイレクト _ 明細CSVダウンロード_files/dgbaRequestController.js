// @(#)$FileVer: dgbaRequestController.js ver020.1 $

// クリック済み判定フラグ
var alreadyClicked = false;

// キャンセル判定フラグ
var isCanceled = false;

/**
 * リクエスト送信制御
 * @param formElementName    サブミットするフォーム名
 * @param path               遷移先パス名
 * @param key                パラメータ名の配列
 * @param value              パラメータ値の配列
 * @param continuous         連続押下許可フラグ
 */
function dcRequest(formElementName, path, key, value, continuous) {

    // フォーム名チェック
    if (formElementName == null || formElementName == "") {
        // フォーム名がnullあるいは空文字列の場合、無反応終了する。
        return false;
    }

    // 指定したフォームの存在チェック
    if (document.forms[formElementName] == null 
        || typeof document.forms[formElementName] == "undefined") {
        // 指定したフォームが画面内に存在しない場合、無反応終了する。
        return false;
    }

    // 遷移先パスチェック
    if (path == null || path == "") {
        // 遷移先パスがnullあるいは空文字列の場合、無反応終了する。 
        return false;
    }

    // キャンセル判定
    if (isCanceled == true) {
        isCanceled = false;
        return false;
    }
    
    // クリック済み判定
    if (alreadyClicked == true) {
        // クリック済みの場合、無反応終了する。
        return false;
    }
    
    // 連続押下許可フラグ判定
    if (continuous == false) {
        // 連続押下不許可の場合、クリック済みフラグを済みに更新する。
        alreadyClicked = true;
    }

    // パラメータ判定
    if (key != null && key.constructor == Array 
        && value != null && value.constructor == Array
        && key.length == value.length) {
        // パラメータ名及びパラメータ値が配列かつ配列長が一致する場合、フォーム要素に値を設定
        for (i=0; i < key.length; i++) {
            // フォーム要素の存在チェック
            if (document.forms[formElementName].elements[key[i]] != null 
                && typeof document.forms[formElementName].elements[key[i]] != "undefined") {
                // 存在する場合、該当するオブジェクトに値を設定する。
                document.forms[formElementName].elements[key[i]].value = value[i];
            }
        }
    }
    
    // 遷移先パスを設定。
    document.forms[formElementName].action = path;

    // フォーム送信。
    document.forms[formElementName].submit();
    
    return false;
}

//印刷子画面表示関数
var wid="width=670";      //横幅       
var hei="height=600";     //高さ       
var men="menubar=yes";     //メニューバー有無 
var too="toolbar=yes";     //ツールバー有無  
var loc="location=yes";     //アドレスバー有無 
var sta="status=yes";      //ステータスバー有無
var res="resizable=yes";     //リサイズ可否   
var scr="scrollbars=yes";    //スクロールバー有無

var opt=wid+","+hei+","+men+","+
             too+","+loc+","+sta+","+res+","+scr;

/**
 * リクエスト送信制御（印刷子画面用）
 * @param formElementName    サブミットするフォーム名
 * @param path               遷移先パス名
 * @param key                パラメータ名の配列
 * @param value              パラメータ値の配列
 * @param continuous         連続押下許可フラグ
 */
function dcPrintRequest(formElementName, path, key, value, continuous) {

    // フォーム名チェック
    if (formElementName == null || formElementName == "") {
        // フォーム名がnullあるいは空文字列の場合、無反応終了する。
        return false;
    }

    // 指定したフォームの存在チェック
    if (document.forms[formElementName] == null 
        || typeof document.forms[formElementName] == "undefined") {
        // 指定したフォームが画面内に存在しない場合、無反応終了する。
        return false;
    }

    // 遷移先パスチェック
    if (path == null || path == "") {
        // 遷移先パスがnullあるいは空文字列の場合、無反応終了する。 
        return false;
    }

    // キャンセル判定
    if (isCanceled == true) {
        isCanceled = false;
        return false;
    }
    
    // クリック済み判定
    if (alreadyClicked == true) {
        // クリック済みの場合、無反応終了する。
        return false;
    }
    
    // 連続押下許可フラグ判定
    if (continuous == false) {
        // 連続押下不許可の場合、クリック済みフラグを済みに更新する。
        alreadyClicked = true;
    }

    // パラメータ判定
    if (key != null && key.constructor == Array 
        && value != null && value.constructor == Array
        && key.length == value.length) {
        // パラメータ名及びパラメータ値が配列かつ配列長が一致する場合、フォーム要素に値を設定
        for (i=0; i < key.length; i++) {
            // フォーム要素の存在チェック
            if (document.forms[formElementName].elements[key[i]] != null 
                && typeof document.forms[formElementName].elements[key[i]] != "undefined") {
                // 存在する場合、該当するオブジェクトに値を設定する。
                document.forms[formElementName].elements[key[i]].value = value[i];
            }
        }
    }
    
    // 遷移先パスを設定。
    document.forms[formElementName].action = path;

    // 別ウィンド起動
    var wnd = window.open('','printWindow',opt);

    // リクエストのターゲットを別ウィンドに指定
    document.forms[formElementName].target="printWindow";

    // フォーム送信。
    document.forms[formElementName].submit();

    // フォーカスを別ウィンドに移動
    wnd.focus();

    // ターゲットを自画面に戻す
    document.forms[formElementName].target="_self";
    
    return false;
}

/**
 * リクエスト送信制御（印刷子画面用）
 * @param formElementName    サブミットするフォーム名
 * @param path               遷移先パス名
 * @param key                パラメータ名の配列
 * @param value              パラメータ値の配列
 * @param continuous         連続押下許可フラグ
 */
function dcPrintRequestClose(formElementName, path, key, value, continuous) {

    // フォーム名チェック
    if (formElementName == null || formElementName == "") {
        // フォーム名がnullあるいは空文字列の場合、無反応終了する。
        return false;
    }

    // 指定したフォームの存在チェック
    if (document.forms[formElementName] == null 
        || typeof document.forms[formElementName] == "undefined") {
        // 指定したフォームが画面内に存在しない場合、無反応終了する。
        return false;
    }

    // 遷移先パスチェック
    if (path == null || path == "") {
        // 遷移先パスがnullあるいは空文字列の場合、無反応終了する。 
        return false;
    }

    // キャンセル判定
    if (isCanceled == true) {
        isCanceled = false;
        return false;
    }
    
    // クリック済み判定
    if (alreadyClicked == true) {
        // クリック済みの場合、無反応終了する。
        return false;
    }
    
    // 連続押下許可フラグ判定
    if (continuous == false) {
        // 連続押下不許可の場合、クリック済みフラグを済みに更新する。
        alreadyClicked = true;
    }

    // パラメータ判定
    if (key != null && key.constructor == Array 
        && value != null && value.constructor == Array
        && key.length == value.length) {
        // パラメータ名及びパラメータ値が配列かつ配列長が一致する場合、フォーム要素に値を設定
        for (i=0; i < key.length; i++) {
            // フォーム要素の存在チェック
            if (document.forms[formElementName].elements[key[i]] != null 
                && typeof document.forms[formElementName].elements[key[i]] != "undefined") {
                // 存在する場合、該当するオブジェクトに値を設定する。
                document.forms[formElementName].elements[key[i]].value = value[i];
            }
        }
    }
    
    // 遷移先パスを設定。
    document.forms[formElementName].action = path;

    // リクエストのターゲットを親ウィンドに指定
    document.forms[formElementName].target="parentWindow";

    // フォーム送信。
    document.forms[formElementName].submit();

    // 子windowをclose
    window.close();

    // 親windowにfocusを変更

    return false;
}
/**
 * 中止
 */
function dcAbort() {
    isCanceled = true;
}

/**
 * ホームページローダ
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
