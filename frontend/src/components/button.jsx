// ボタン。リンクはここから引っ張る形に変えるつもり。
import { Link } from "react-router-dom";
export const Header = ({type}) =>{

  switch (type) {
    case "simpleResult":
      return <Link to="/SimpleResult" class="btn btn--red">運転結果</Link>;
    case "detailResult":
      return <Link to="/DetailedResult" class="btn btn--pink">詳しい結果をみる</Link>;
    case "returnLicense":
      return <a href="https://www.keishicho.metro.tokyo.lg.jp/menkyo/koshin/jisyu_hennou/index.html" className="btn btn--red">免許返納について</a>
    default:
      return <h3>その引数は想定されていません。</h3>;
  }

};