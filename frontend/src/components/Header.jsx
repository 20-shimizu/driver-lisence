// ヘッダー
import { Link } from "react-router-dom";
export const Header = () =>{
    <div>
      <Link to="\">トップ</Link> | 
      <Link to="\SimpleResult">運転結果</Link> |
      <Link to="\UserProfile">プロフィール</Link>
    </div>
}