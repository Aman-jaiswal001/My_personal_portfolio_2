const skillGroups = [
  {
    title: 'Coding Skills',
    skills: [
      ['HTML', '80%'],
      ['CSS', '65%'],
      ['JavaScript', '55%'],
      ['C/C++', '70%'],
      ['DSA in C++', '65%']
    ]
  },
  {
    title: 'Core Skills',
    skills: [
      ['Tailwind CSS', '60%'],
      ['React', '40%'],
      ['NodeJs', '78%'],
      ['ExpressJs', '80%'],
      ['Database - SQL & MongoDB', '72%']
      
    ]
  }
];

export default function Skills({ isVisible }) {
  return (
    <section className={`skills ${isVisible ? 'show-animate' : ''}`} id="skills">
      <h2 className="heading">My <span>Skills</span><span className="animate scroll" style={{ '--i': 1 }} /></h2>
      <div className="skills-row">
        {skillGroups.map((group, groupIndex) => (
          <div className="skills-column" key={group.title}>
            <h3 className="title">{group.title}<span className="animate scroll" style={{ '--i': groupIndex === 0 ? 2 : 5 }} /></h3>
            <div className="skills-box">
              <div className="skills-content">
                {group.skills.map(([name, percent]) => (
                  <div className="progress" key={name}>
                    <h3>{name} <span>{percent}</span></h3>
                    <div className="bar"><span /></div>
                  </div>
                ))}
              </div>
              <span className="animate scroll" style={{ '--i': groupIndex === 0 ? 3 : 6 }} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
