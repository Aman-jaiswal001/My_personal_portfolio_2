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
        <h3>MERN Stack Developer | Full Stack Developer<span className="animate scroll" style={{ '--i': 3 }} /></h3>
        <p>
          I’m Aman Jaiswal, a MERN Stack Developer and BCA student with a strong interest in full-stack web development and problem-solving using DSA in C++. I build responsive and scalable web applications using React.js, Node.js, Express.js, and MongoDB. I have developed projects including a social media platform and blogging platform, working with REST APIs, authentication, CRUD operations, and cloud services. I’m passionate about building real-world solutions and continuously improving my technical skills.
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
