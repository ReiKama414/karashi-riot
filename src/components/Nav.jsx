export function Nav() {
  return (
    <nav className="nav">
      <a className="brand" href="#hero">
        <span className="brand-mark">辛</span>
        <span className="brand-text">
          <span className="brand-name">KARASHI RIOT</span>
          <span className="brand-kana">カラシライオット</span>
        </span>
      </a>
      <div className="nav-links">
        <a className="nav-link" href="#menu">MENU</a>
        <a className="nav-link" href="#heat">辛さ選択</a>
        <a className="nav-link" href="#story">STORY</a>
        <a className="nav-cta" href="#menu">注文する</a>
      </div>
    </nav>
  );
}
