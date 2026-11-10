// デモ用の架空競合サイト一式を docs/ に生成する。使い方: node build.mjs
// 実在の企業・商標とは無関係。リンクはすべて相対パスなので GitHub Pages のサブパス配信でも動く。
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const OUT = join(dirname(fileURLToPath(import.meta.url)), "docs");

// 会社ごとにニュースページのパスと呼び名を変えて、「ニュースページを探す」手間が出るようにしている
const companies = [
  {
    slug: "kintai-works",
    name: "株式会社ワークタイム",
    service: "WorkTime クラウド勤怠",
    color: "#1d6fd1",
    newsDir: "news",
    newsLabel: "ニュース",
    tagline: "中小企業のための、いちばん簡単な勤怠管理。",
    news: [
      ["2026-11-12", "新サービス", "勤怠データ分析ダッシュボード「WorkTime Insight」を提供開始", "残業時間や有給取得率を部署別にリアルタイムで可視化する「WorkTime Insight」の提供を開始しました。スタンダードプラン以上で追加料金なしでご利用いただけます。", 6],
      ["2026-11-11", "料金改定", "ライトプランの料金改定について（2027年2月適用）", "2027年2月1日より、ライトプランを月額 220 円/人から 250 円/人へ改定します。あわせて、無料トライアル期間を 14 日から 30 日へ延長します。", 5],
      ["2026-11-05", "新サービス", "新サービス「WorkTime シフト」の提供を開始しました", "シフト作成を自動化する新サービス「WorkTime シフト」の提供を開始しました。既存の勤怠データと連携し、希望休と必要人数から最適なシフト案を自動で作成します。", 1],
      ["2026-10-20", "料金改定", "料金プライス改定のお知らせ（2027年1月適用）", "2027年1月1日より、スタンダードプランを月額 330 円/人から 380 円/人へ改定します。ライトプランの料金に変更はありません。", 2],
      ["2026-09-12", "お知らせ", "年末年始の営業およびサポート対応について", "12月29日から1月3日までサポートデスクをお休みします。", 3],
      ["2026-08-01", "機能追加", "打刻アプリが顔認証打刻に対応しました", "モバイルアプリで顔認証による打刻ができるようになりました。", 4],
    ],
  },
  {
    slug: "shiftly",
    name: "シフトリー株式会社",
    service: "Shiftly",
    color: "#e0663a",
    newsDir: "info",
    newsLabel: "お知らせ",
    tagline: "現場のシフトを、もっと軽やかに。",
    news: [
      ["2026-11-02", "料金改定", "【重要】Shiftly 料金体系の改定について", "2027年2月請求分より、Pro プランを月額 29,800 円から 34,800 円（税抜）へ改定します。ユーザー数の上限は 50 名から 80 名へ拡大します。"],
      ["2026-10-08", "新サービス", "AI シフト提案機能「Shiftly AI」を公開しました", "過去の実績から需要を予測し、人員配置を提案する「Shiftly AI」を公開しました。Pro プラン以上で利用できます。"],
      ["2026-09-01", "お知らせ", "セキュリティ認証 ISMS（ISO 27001）を取得しました", "情報セキュリティマネジメントシステムの認証を取得しました。"],
      ["2026-07-15", "イベント", "オンラインセミナー「シフト管理の落とし穴」開催のご案内", "8月に無料オンラインセミナーを開催します。"],
    ],
  },
  {
    slug: "humanlink",
    name: "ヒューマンリンク・テクノロジーズ",
    service: "HumanLink 人事労務",
    color: "#2b9a6b",
    newsDir: "press",
    newsLabel: "プレスリリース",
    tagline: "人事労務のすべてを、ひとつにつなぐ。",
    news: [
      ["2026-10-28", "プレスリリース", "勤怠・給与連携を強化した「HumanLink Payroll」を発表", "勤怠データから給与計算までを一気通貫で処理する「HumanLink Payroll」を発表しました。2026年12月に提供を開始します。"],
      ["2026-10-01", "プレスリリース", "全プランの料金を改定、初期費用を無料化します", "2026年12月1日より、初期費用を無料化するとともに、月額基本料を 8,000 円から 9,800 円へ改定します。"],
      ["2026-08-20", "プレスリリース", "導入社数 3,000 社を突破", "HumanLink の導入社数が 3,000 社を突破しました。"],
      ["2026-06-10", "プレスリリース", "東京・大阪にサポート拠点を新設", "サポート体制を強化するため、大阪にサポート拠点を新設しました。"],
    ],
  },
  {
    slug: "punchcloud",
    name: "パンチクラウド株式会社",
    service: "PunchCloud",
    color: "#7a4bd1",
    newsDir: "topics",
    newsLabel: "トピックス",
    tagline: "打刻から集計まで、30 秒で。",
    news: [
      ["2026-11-08", "トピックス", "PunchCloud が Slack 連携に対応しました", "Slack から出勤・退勤を打刻できる連携機能を追加しました。全プランで追加料金なしで利用できます。"],
      ["2026-09-25", "トピックス", "新プラン「Enterprise」の提供開始と料金のお知らせ", "従業員 500 名以上の企業向けに、SSO・監査ログ・専任サポートを備えた Enterprise プランを提供開始します。料金は個別見積りです。"],
      ["2026-09-02", "トピックス", "ご利用料金（Business プラン）の改定について", "2026年11月より Business プランを 1 人あたり月額 300 円から 350 円へ改定しました。"],
      ["2026-07-01", "トピックス", "サービス名称のロゴを刷新しました", "ロゴとコーポレートカラーを刷新しました。"],
    ],
  },
];

const css = (c) => `
*{box-sizing:border-box}body{margin:0;font-family:"Hiragino Sans","Noto Sans JP",Meiryo,sans-serif;color:#222;line-height:1.8}
a{color:${c};text-decoration:none}a:hover{text-decoration:underline}
header{background:${c};color:#fff}header .in{max-width:960px;margin:0 auto;padding:16px 24px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px}
header a{color:#fff}header .logo{font-size:20px;font-weight:700}header nav a{margin-left:20px;font-size:14px}
main{max-width:960px;margin:0 auto;padding:32px 24px 64px}
.hero{background:#f4f6fa;padding:56px 24px;text-align:center}.hero h1{margin:0 0 8px;font-size:28px}
h2{border-left:6px solid ${c};padding-left:12px;margin-top:40px}
ul.news{list-style:none;padding:0}ul.news li{padding:14px 0;border-bottom:1px solid #e3e6ec;display:flex;gap:16px;flex-wrap:wrap}
.date{color:#666;min-width:6.5em}.tag{background:${c};color:#fff;font-size:12px;padding:0 10px;border-radius:10px;height:1.8em;line-height:1.8em;min-width:6em;text-align:center}
table{border-collapse:collapse;width:100%}th,td{border:1px solid #d5d9e0;padding:10px 14px;text-align:left}th{background:#f4f6fa;width:30%}
footer{background:#222;color:#aaa;text-align:center;padding:24px;font-size:12px}
.note{background:#fff8e1;border:1px solid #f0d98a;padding:8px 14px;font-size:12px;margin:0}
`;

const page = (c, depth, title, body) => {
  const up = "../".repeat(depth);
  return `<!doctype html>
<html lang="ja"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title}</title><style>${css(c.color)}</style></head><body>
<p class="note">これはデモ用の架空のサイトです。実在の企業・サービスとは関係ありません。</p>
<header><div class="in"><a class="logo" href="${up}${c.slug}/index.html">${c.service}</a>
<nav><a href="${up}${c.slug}/products.html">サービス</a><a href="${up}${c.slug}/pricing.html">料金</a><a href="${up}${c.slug}/${c.newsDir}/index.html">${c.newsLabel}</a><a href="${up}${c.slug}/company.html">会社概要</a></nav></div></header>
${body}
<footer>&copy; 2026 ${c.name}（デモ用の架空企業）</footer></body></html>
`;
};

const write = (rel, html) => {
  const p = join(OUT, rel);
  mkdirSync(dirname(p), { recursive: true });
  writeFileSync(p, html);
};

rmSync(OUT, { recursive: true, force: true });

for (const c of companies) {
  const list = (prefix, limit = c.news.length) =>
    `<ul class="news">${c.news.slice(0, limit).map(([d, t, title, , id], i) => `<li><span class="date">${d}</span><span class="tag">${t}</span><a href="${prefix}${id ?? i + 1}.html">${title}</a></li>`).join("")}</ul>`;

  write(`${c.slug}/index.html`, page(c, 1, `${c.service} | ${c.name}`,
    `<div class="hero"><h1>${c.tagline}</h1><p>${c.service} は、${c.name} が提供するクラウドサービスです。</p></div>
<main><h2>最新の${c.newsLabel}</h2>${list(`${c.newsDir}/`, 3)}
<p><a href="${c.newsDir}/index.html">${c.newsLabel}一覧を見る &raquo;</a></p></main>`));

  write(`${c.slug}/products.html`, page(c, 1, `サービス紹介 | ${c.service}`,
    `<main><h1>サービス紹介</h1><p>${c.service} は、勤怠・シフト・労務の業務を効率化します。打刻、集計、申請・承認、法令対応までをひとつの画面で行えます。</p>
<h2>主な機能</h2><ul><li>打刻（PC・スマホ・ICカード）</li><li>残業・休暇の申請と承認</li><li>月次集計とCSV出力</li><li>外部サービスとの API 連携</li></ul></main>`));

  write(`${c.slug}/pricing.html`, page(c, 1, `料金 | ${c.service}`,
    `<main><h1>料金プラン</h1><p>最新の料金は${c.newsLabel}でご案内しています。</p>
<table><tr><th>プラン</th><td>ライト</td><td>スタンダード</td></tr><tr><th>対象</th><td>〜30名</td><td>〜300名</td></tr><tr><th>月額</th><td>お問い合わせください</td><td>お問い合わせください</td></tr></table></main>`));

  write(`${c.slug}/company.html`, page(c, 1, `会社概要 | ${c.name}`,
    `<main><h1>会社概要</h1><table><tr><th>会社名</th><td>${c.name}</td></tr><tr><th>設立</th><td>2015年4月</td></tr><tr><th>所在地</th><td>東京都千代田区（架空）</td></tr><tr><th>事業内容</th><td>${c.service} の開発・提供</td></tr></table></main>`));

  write(`${c.slug}/${c.newsDir}/index.html`, page(c, 2, `${c.newsLabel}一覧 | ${c.service}`,
    `<main><h1>${c.newsLabel}</h1>${list("")}</main>`));

  c.news.forEach(([d, t, title, text, id], i) => {
    write(`${c.slug}/${c.newsDir}/${id ?? i + 1}.html`, page(c, 2, `${title} | ${c.service}`,
      `<main><p><span class="date">${d}</span> <span class="tag">${t}</span></p><h1>${title}</h1><p>${text}</p>
<p><a href="index.html">&laquo; ${c.newsLabel}一覧へ戻る</a></p></main>`));
  });
}

// ポータル: 監視対象を探す起点。URL を人手で探す手間の再現用で、ニュースページへの直リンクは置かない
write("index.html", `<!doctype html>
<html lang="ja"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>勤怠SaaS比較ナビ | 勤怠管理・シフト管理サービス一覧</title><style>${css("#334155")}</style></head><body>
<p class="note">これはデモ用の架空のサイトです。実在の企業・サービスとは関係ありません。</p>
<header><div class="in"><span class="logo">勤怠SaaS比較ナビ</span></div></header>
<div class="hero"><h1>勤怠管理・シフト管理サービス一覧</h1><p>主要な勤怠 SaaS の公式サイトをまとめています。</p></div>
<main><h2>掲載サービス</h2><ul>
${companies.map((c) => `<li><a href="${c.slug}/index.html">${c.service}（${c.name}）</a> — ${c.tagline}</li>`).join("\n")}
</ul></main>
<footer>&copy; 2026 勤怠SaaS比較ナビ（デモ用の架空サイト）</footer></body></html>
`);
write(".nojekyll", "");

console.log(`generated: ${OUT}`);
