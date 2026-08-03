const education = [
  {
    year: '2021 - 2022',
    title: <>10<sup>th</sup></>,
    description: <>I'm passing 10<sup>th</sup> form UP board with 80.5% marks</>
  },
  {
    year: '2022 - 2024',
    title: <>12<sup>th</sup></>,
    description: <>I'm passing 12<sup>th</sup> form UP board with 89.2% marks</>
  },
  {
    year: '2024 - 2027',
    title: 'Bachelor of Computer i.e. BCA',
    description: <>Currently I'm pursuing <b>BCA</b> from Buddha Institute Of Management which is affliated from Dr.APJ Abdul Kalam Technical Univarsity, Lucknow</>
  }
];

export default function Education({ isVisible }) {
  return (
    <section className={`education ${isVisible ? 'show-animate' : ''}`} id="education">
      <h2 className="heading">My <span>Journey</span><span className="animate scroll" style={{ '--i': 1 }} /></h2>
      <div className="education-row">
        <div className="education-column">
          <h3 className="title">Education<span className="animate scroll" style={{ '--i': 2 }} /></h3>
          <div className="education-box">
            {education.map((item) => (
              <div className="education-content" key={item.year}>
                <div className="content">
                  <div className="year"><i className="bx bxs-calendar" /> {item.year}</div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
            <span className="animate scroll" style={{ '--i': 3 }} />
          </div>
        </div>
      </div>
    </section>
  );
}
