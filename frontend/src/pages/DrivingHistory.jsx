// 運転履歴画面
import{ Link } from "react-router-dom";

function DrivingHistory() {
    return (
        <div>
            <h1>過去の運転履歴</h1>
            <Link to="/" className="btn btn--yellow">メニューに戻る</Link>
        </div>
    )
}

export default DrivingHistory;
