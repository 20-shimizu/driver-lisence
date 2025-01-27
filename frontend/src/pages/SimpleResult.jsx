// 簡易結果画面
import{ Link } from "react-router-dom";

export const SimpleResult = () => {
    return (
        <div >
            <h1>本日の結果</h1>
            <h2>本日のあなたは</h2>
            <h1>＊＊タイプでした！</h1>
            <h2>今日の運転データ（）＊＊の画像を配置する</h2>
            <Link to="/DetailedResult" className="btn btn--pink">詳しい結果をみる</Link>
            <Link to="/UserRegistration" className="btn btn--skyblue">結果を共有する</Link>
            <Link to="/" className="btn btn--yellow">メニュー画面に戻る</Link>
        </div>
    )
}