// 詳細結果画面
import{ Link } from "react-router-dom";

function DetailedResult() {
  return (
    <div>
      <h1>本日の結果</h1>
      <h2>本日のあなたは</h2>
      <h1>＊＊タイプでした！</h1>
      <h1>＊＊タイプの画像。運転レポートのoverallsummaryから持ってくる。</h1>
      <Link to="/SimpleResult" className="btn btn--yellow">戻る</Link>
    </div>
  );
};

export default DetailedResult;
  