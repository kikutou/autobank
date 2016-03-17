// 一定期間New/Upマークを表示する
function newUp(y, m, d) {
  delDay = 7; // 何日後に削除するか
  oldDay = new Date(y + "/" + m + "/" +d);
  newDay = new Date();
  d =(newDay - oldDay) / (1000 * 24 * 3600);
  if(d <= delDay) {
    document.write("<span class='icon_new'>NEW</span>");
  }
}
