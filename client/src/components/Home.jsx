const phoneNumber = '918922808878';

function openWhatsApp(message) {
  window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
}

export default function Home({ isVisible }) {
  const handleLetsTalk = (event) => {
    event.preventDefault();
    openWhatsApp(`Hello Aman,

I visited your portfolio and would like to connect with you.
Let's discuss something interesting!`);
  };

  return (
    <section className={`home ${isVisible ? 'show-animate' : ''}`} id="home">
      <div className="home-content">
        <h1>
          Hi I'm <span>Aman Jaiswal</span>
          <span className="animate" style={{ '--i': 2 }} />
        </h1>
        <div className="text-animate">
          <h3>MERN Stack Developer</h3>
          <span className="animate" style={{ '--i': 3 }} />
        </div>
        <p>
          I’m a BCA student and aspiring Software Engineer focused on MERN Stack Development and DSA in C++. I enjoy building modern, responsive web applications and solving complex problems through clean and efficient code. 🚀
          <span className="animate" style={{ '--i': 4 }} />
        </p>

        <div className="btn-box">
          <a href="/PDF/F_aman_jaiswal_resume.pdf" download className="btn">Resume</a>
          <a href="#" className="btn" onClick={handleLetsTalk}>Let's Talk</a>
          <span className="animate" style={{ '--i': 5 }} />
        </div>
      </div>

      <div className="home-sci">
        <a href="#" aria-label="Facebook"><i className="bx bxl-facebook" /></a>
        <a target="_blank" rel="noreferrer" href="https://github.com/Aman-jaiswal001" aria-label="GitHub">
          <i className="bx bxl-github" />
        </a>
        <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/aman-jaiswal-a2032a337?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app&original_referer=" aria-label="LinkedIn">
          <i className="bx bxl-linkedin" />
        </a>
        <span className="animate" style={{ '--i': 6 }} />
      </div>

      <div className="home-imgHover" />
      <span className="animate home-img" style={{ '--i': 7 }} />
    </section>
  );
}

export { openWhatsApp, phoneNumber };
