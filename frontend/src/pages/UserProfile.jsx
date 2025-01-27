import{ Link } from "react-router-dom";
// ユーザープロフィール画面
export const UserProfile = ( ) => {
    return (
        <div>
            <h1>UserProfile</h1>
            <h1>ユーザ情報の表示</h1>
            <Link to="/FamilyProfile">家族の登録情報へ</Link>
            <Link to="/LoginFrom" className="btn btn--purple">ログイン</Link>
            <Link to="/UserRegistration" className="btn btn--pink">（ログインできていないときに表示）ユーザー登録はこちら</Link>
            <Link to="/" className="btn btn--yellow">メニュー画面に戻る</Link>
        </div>
    )
}