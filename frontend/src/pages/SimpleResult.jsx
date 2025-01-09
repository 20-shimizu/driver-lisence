// 簡易結果画面
import{ Link } from "react-router-dom";

export const SimpleResult = () => {
    return (
        <div className="App">
            <h1>Simpleresult</h1>
            <Link to="/DetailedResult">詳細結果を表示</Link>
        </div>
    )
}