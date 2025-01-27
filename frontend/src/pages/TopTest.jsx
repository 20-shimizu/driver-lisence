import{ Link } from "react-router-dom";


export const Top = ( ) => {
    return (
        <div>
            <h1>運転診断くん</h1>
            <Link to="/SimpleResult" class="btn btn--red">運転結果(通常)</Link>
            <Link to="/Alter" class="btn btn--red">運転結果(警告１)</Link>
            <Link to="/DrivingHistory" className="btn btn--purple">過去の結果を見る</Link>
            <a href="https://www.keishicho.metro.tokyo.lg.jp/menkyo/koshin/jisyu_hennou/index.html" className="btn btn--yellow">免許返納について</a>
            <h1 className="btn--mini btn--green">アプリを終了する</h1>
        </div>
    )
}