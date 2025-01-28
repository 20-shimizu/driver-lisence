// 簡易結果画面
import{ Link } from "react-router-dom";

function SimpleResult() {
    return (
        <div >
            <h1>本日の結果</h1>
            <h2>本日のあなたは</h2>
            <h1>＊＊タイプでした！</h1>
            <h2>今日の運転データ（）＊＊の画像を配置する</h2>
            <Link to="/DetailedResult" className="btn btn--pink">詳しい結果をみる</Link>
            <div className="btn btn--skyblue">結果を共有する</div>
            <Link to="/" className="btn btn--yellow">メニュー画面に戻る</Link>
        </div>
    )
}

export default SimpleResult;
