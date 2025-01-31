// 警告画面
import{ Link } from "react-router-dom";

function Alert () {
    return (
        <div>
            <h1>警告</h1>
            <h2>危険な運転行動が複数検出されました。</h2>
            <h3>前回の警告以降、運転に改善がみられなかったため、運転の継続が危険であると判断しました。</h3>
            <h1>免許返納を行うことをつよく推奨します。</h1>
            <a href="https://www.keishicho.metro.tokyo.lg.jp/menkyo/koshin/jisyu_hennou/index.html" target="_blank" rel="noopener noreferrer" className="btn btn--red">免許返納について</a>
            <Link to="/detailed_result/-1" className="btn btn--pink">詳しい結果を見る</Link>
            <Link to="/" className="btn btn--pink">戻る</Link>
        </div>
    )
}

export default Alert;
