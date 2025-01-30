import{ Link } from "react-router-dom";

function SensorDataInput () {
    return (
        <div>
            <h1>センサデータ登録</h1>
            <div className="btn btn--green">登録</div>
            <Link to="/" className="btn btn--pink">戻る</Link>
        </div>
    )
}

export default SensorDataInput;
