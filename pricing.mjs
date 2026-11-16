// 料金ページ 1 枚だけのデモ用サイトを docs/pricing/index.html に書き出す。
// 使い方: node pricing.mjs before|after
//   before = 改定前、after = 改定後。公開 URL は同じ (…/pricing/) のまま中身だけ切り替わる。
// 切り替えたら commit して main に push すると、GitHub Pages に反映される。
// 実在の企業・商標とは無関係。build.mjs は docs/ を作り直すので、実行したあとはこのスクリプトを再度回す。
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const OUT = join(dirname(fileURLToPath(import.meta.url)), "docs", "pricing", "index.html");

const variants = {
  before: {
    updated: "2026-10-01",
    notice: null,
    trial: "14 日間",
    light: "220 円",
    standard: "330 円",
  },
  after: {
    updated: "2026-11-15",
    notice:
      "料金改定のお知らせ：2026年11月15日より、ライトプランを 220 円から 250 円/人へ、スタンダードプランを 330 円から 380 円/人へ改定しました。あわせて無料トライアルを 14 日から 30 日へ延長しています。",
    trial: "30 日間",
    light: "250 円",
    standard: "380 円",
  },
};

const name = process.argv[2];
const v = variants[name];
if (!v) {
  console.error("使い方: node pricing.mjs before|after");
  process.exit(1);
}

const html = `<!doctype html>
<html lang="ja"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex">
<title>料金プラン | WorkTime クラウド勤怠</title>
<style>
*{box-sizing:border-box}body{margin:0;font-family:"Hiragino Sans","Noto Sans JP",Meiryo,sans-serif;color:#222;line-height:1.8}
header{background:#1d6fd1;color:#fff}header .in{max-width:960px;margin:0 auto;padding:16px 24px;font-size:20px;font-weight:700}
main{max-width:960px;margin:0 auto;padding:32px 24px 64px}
h1{font-size:28px;margin:0 0 8px}
.lead{color:#555;margin:0 0 24px}
.notice{background:#fff3e0;border:1px solid #f0c27a;border-radius:6px;padding:12px 16px;margin:0 0 24px}
table{border-collapse:collapse;width:100%}th,td{border:1px solid #d5d9e0;padding:10px 14px;text-align:left}
thead th{background:#1d6fd1;color:#fff}tbody th{background:#f4f6fa;width:28%}
.price{font-size:20px;font-weight:700}
.note{background:#fff8e1;border-bottom:1px solid #f0d98a;padding:8px 14px;font-size:12px;margin:0}
footer{background:#222;color:#aaa;text-align:center;padding:24px;font-size:12px}
</style></head><body>
<p class="note">これはデモ用の架空のサイトです。実在の企業・サービスとは関係ありません。</p>
<header><div class="in">WorkTime クラウド勤怠</div></header>
<main>
<h1>料金プラン</h1>
<p class="lead">従業員数に応じて選べる、シンプルな料金体系です。最終更新日：${v.updated}</p>
${v.notice ? `<p class="notice">${v.notice}</p>` : ""}
<table>
<thead><tr><th></th><th>ライト</th><th>スタンダード</th><th>エンタープライズ</th></tr></thead>
<tbody>
<tr><th>月額（1 人あたり・税抜）</th><td class="price">${v.light}</td><td class="price">${v.standard}</td><td class="price">個別見積り</td></tr>
<tr><th>無料トライアル</th><td>${v.trial}</td><td>${v.trial}</td><td>${v.trial}</td></tr>
<tr><th>打刻（PC・スマホ・IC カード）</th><td>○</td><td>○</td><td>○</td></tr>
<tr><th>残業・休暇の申請と承認</th><td>○</td><td>○</td><td>○</td></tr>
<tr><th>外部サービスとの API 連携</th><td>—</td><td>○</td><td>○</td></tr>
<tr><th>サポート</th><td>メール</td><td>メール・チャット</td><td>専任担当</td></tr>
</tbody>
</table>
</main>
<footer>&copy; 2026 株式会社ワークタイム（デモ用の架空企業）</footer>
</body></html>
`;

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, html);
console.log(`docs/pricing/index.html を「${name}」で書き出しました`);
