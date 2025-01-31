// ヘッダー
import { Link } from "react-router-dom";
export const Header = () =>{
    <div>
      <Link to="\">トップ</Link> | 
      <Link to="\simple_result">運転結果</Link> |
      <Link to="\user_profile">プロフィール</Link>
    </div>
}