const navItems = [
  ['home', 'Home'],
  ['about', 'About'],
  ['education', 'Education'],
  ['skills', 'Skills'],
  ['projects', 'Projects'],
  ['achievements', 'Achievements'],
  ['contact', 'Contact']
];

export default function Header({ activeSection, isMenuOpen, isSticky, onToggleMenu, onCloseMenu }) {
  return (
    <header className={`header ${isSticky ? 'sticky' : ''}`}>
      <a href="#" className="logo">
        Aman Jaiswal<span className="animate" style={{ '--i': 1 }} />
      </a>

      <button
        className={`bx ${isMenuOpen ? 'bx-x' : 'bx-menu'}`}
        id="menu-icon"
        type="button"
        aria-label="Toggle navigation"
        onClick={onToggleMenu}
      >
        <span className="animate" style={{ '--i': 2 }} />
      </button>

      <nav className={`navbar ${isMenuOpen ? 'active' : ''}`}>
        {navItems.map(([id, label]) => (
          <a key={id} href={`#${id}`} className={activeSection === id ? 'active' : ''} onClick={onCloseMenu}>
            {label}
          </a>
        ))}
        <span className="active-nav" />
        <span className="animate" style={{ '--i': 2 }} />
      </nav>
    </header>
  );
}
