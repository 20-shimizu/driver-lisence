// 簡易結果画面
import{ Link } from "react-router-dom";

export const SimpleResult = () => {
    return (
        <div>
            <h1>Simpleresult</h1>
            <h1>本日の結果</h1>
            <h2>本日のあなたは</h2>
            <h1>＊＊タイプでした！</h1>
            <Link to="/DetailedResult" class="btn btn--pink btn--radius">詳細結果を表示</Link>
            <h1>結果を共有する</h1>
        </div>
    )
}