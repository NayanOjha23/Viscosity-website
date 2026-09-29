export default function Footer() {
  return (
    <footer className="footer">
      <img
        className="footer__logo"
        src="/assets/darkLogo-v6-anim.svg"
        alt="Viscosity Global"
      />
      <div className="footer__cols mono">
        <span>© {new Date().getFullYear()} VISCOSITY GLOBAL FZE</span>
        <span>BASE OILS · SYNTHETICS · PETROCHEMICALS · WORLDWIDE</span>
        <span>25.1288° N, 56.3265° E</span>
      </div>
    </footer>
  );
}
