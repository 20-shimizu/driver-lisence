import{ Link } from "react-router-dom";
// ユーザープロフィール画面
export const UserProfile = ( ) => {
    return (
        <div>
            <h1>UserProfile</h1>
            <h1>ユーザ情報の表示</h1>
            <Link to="/EmailSendFrom">家族の情報登録へ</Link>
            <Link to="/LoginForm" className="btn btn--purple">ログイン</Link>
            <Link to="/UserRegistration" className="btn btn--pink">ユーザー登録</Link>
            <Link to="/" className="btn btn--yellow">メニュー画面に戻る</Link>
        </div>
    )
}