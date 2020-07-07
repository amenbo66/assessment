'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

/**
 * 指定した要素の子どもを全て削除する
 * @param {HTMLElement} element HTMLの要素
 */
function removeAllChildren(element) {
    while (element.firstChild) {
      // 子どもの要素があるかぎり削除
      element.removeChild(element.firstChild)
    }
  }

assessmentButton.onclick = () => {
    const userName = userNameInput.value;
    if (userName.legth === 0){
        return;
    }

     removeAllChildren(resultDivided);
      //result-areaにh3タグで'診断結果'という文字を表示
      const header = document.createElement('h3');　//h3タグを作る
      header.innerText = '診断結果';　//h3タグに'診断結果'の文字列を設定
      resultDivided.appendChild(header);　//result-areaにh3変数を設定(javascriptで作ったhタグをhtmlに表示させる)
      
       //診断結果を実行
     const result = assessment(userName);

       //pタグで診断結果を表示
      const paragraph = document.createElement('p');
    　 paragraph.innerText = result;
    resultDivided.appendChild(paragraph);
    
//TODO　ツイーとエリアの作成
    //tweetエリアの初期化
    removeAllChildren(tweetDivided);
    //aタグを作って属性を設定する
   
    const anchor = document.createElement('a'); //JS上でaタグを作る
    const hrefValue=
    'https://twitter.com/intent/tweet?button_hashtag=' +
    encodeURIComponent('あなたのいいところ')+
    '&ref_src=twsrc%5Etfw';
    anchor.setAttribute('href',hrefValue);//href属性を作る
    anchor.className = 'twitter-hashtag-button';
    anchor.setAttribute('data-text',result);
    anchor.innerText = 'Tweet #あなたのいいところ'; 
    //aタグをHTMLとして表示する
    tweetDivided.appendChild(anchor);

    //scriptタグを作る
    const script = document.createElement('script');
    script.setAttribute('src','https://platform.twitter.com/widgets.js');
    tweetDivided.appendChild(script);
};  

userNameInput.onkeydown = event => {
  if(event.key === 'Enter'){
    assessmentButton.onclick(); 
  }
};




const answers = [
'{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
'{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
'{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
'{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
'{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
'{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
'{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
'{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
'{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
'{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
'{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
'{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
'{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
'{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
'{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
'{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。',
];

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param　{string} userName　ユーザの定義
 * @return {string} 診断結果
 */
function assessment(userName){
    //userNameを数値に変換
    var userNameNumber=  0 ;
    for (let i = 0; i < userName.length; i++) {
        userNameNumber += userName.charCodeAt(i);
    }
   //5桁の数値を回答結果の範囲に変換
   var answerNumber = userNameNumber　% answers.length;
   //診断結果
   var result = answers[answerNumber];
   return result.replace(/\{userName\}/g,userName);
}
console.assert(
    assessment('太郎')　=== '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
);
console.assert(
    assessment('太郎')　===　assessment('太郎'),
    '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません'
    );
