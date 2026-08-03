export default function About({ isVisible }) {
  return (
    <section className={`about ${isVisible ? 'show-animate' : ''}`} id="about">
      <h2 className="heading">
        About <span>Me</span><span className="animate scroll" style={{ '--i': 1 }} />
      </h2>

      <div className="about-img">
        <img src="/images/about2.jpg" alt="Aman Jaiswal" />
        <span className="circle-spin" />
        <span className="animate scroll" style={{ '--i': 2 }} />
      </div>

      <div className="about-content">
        <h3>Frontend Developer!<span className="animate scroll" style={{ '--i': 3 }} /></h3>
        <p>
          Hi, I'm Aman Jaiswal, a Frontend Developer who loves turning ideas into responsive and
          user-friendly websites. I enjoy working with HTML, CSS, JavaScript, and modern frameworks
          like React and Tailwind to build clean and interactive interfaces.
          <span className="animate scroll" style={{ '--i': 4 }} />
        </p>
        <div className="btn-box btns">
          <a href="#projects" className="btn">Read More</a>
          <span className="animate scroll" style={{ '--i': 5 }} />
        </div>
      </div>
    </section>
  );
}
