// ユーザー登録画面
import{ Link } from "react-router-dom";

function UserRegistration() {
    return (
        <div>
            <h1>UserRegistration</h1>
            <h1>inputタグとAPIをつかってなんとかする</h1>
            <Link to="/" className="btn btn--yellow">メニュー画面に戻る</Link>
        </div>
    )
}

export default UserRegistration;
