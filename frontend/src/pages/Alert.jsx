import { Link } from "react-router-dom";
import warningIcon from "../assets/warning-icon.svg";
import "./Alert.css";

function Alert() {
    return (
        <div className="alert-container">
            <h1 className="alert-title">警告</h1>
            <div className="alert-warning">
                <img src={warningIcon} alt="Warning Icon" className="alert-icon" />
                <h2 className="alert-danger">危険</h2>
                <img src={warningIcon} alt="Warning Icon" className="alert-icon" />
            </div>
            <h3 className="alert-message">危険な運転行動が検出されました。</h3>
            <h2 className="alert-recommendation">免許返納を行うことを強く推奨します。</h2>
            <div className="alert-buttons">
                <a href="https://www.keishicho.metro.tokyo.lg.jp/menkyo/koshin/jisyu_hennou/index.html" 
                   target="_blank" rel="noopener noreferrer" 
                   className="btn btn--red">
                    免許返納について
                </a>
                <Link to="/detailed_result/-1" 
                      className="btn btn--yellow">
                    詳しい結果を見る
                </Link>
                <Link to="/" 
                      className="btn btn--purple">
                    戻る
                </Link>
            </div>
        </div>
    );
}

export default Alert;
