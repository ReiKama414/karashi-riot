export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-rays" />
      <div className="section-inner footer-inner">
        <div className="footer-logo">KARASHI<br />RIOT</div>
        <div className="footer-cols">
          <div>
            <span className="footer-label">SHOP</span>
            <span>東京都渋谷区宇田川町 2-14-6</span>
            <span>11:00 — 翌 3:00 ／ 無休</span>
          </div>
          <div>
            <span className="footer-label">MENU</span>
            <a href="#menu">RAMEN MENU</a>
            <a href="#heat">SPICY LEVEL</a>
            <a href="#story">BRAND STORY</a>
          </div>
          <div>
            <span className="footer-label">RULE</span>
            <span>大盛り無料／替え玉 ¥150</span>
            <span>LEVEL 5 は同意書あり</span>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 KARASHI RIOT</span>
          <span>架空のブランドコンセプト／FICTIONAL BRAND CONCEPT</span>
          <a href="https://reikama414.vercel.app/" rel="noreferrer">ReiKama414</a>
        </div>
      </div>
    </footer>
  );
}
