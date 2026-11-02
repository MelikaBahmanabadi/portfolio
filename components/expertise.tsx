import { expertise } from "@/data/profile";
import { expertiseIcons } from "./icons";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

export function Expertise() {
  return (
    <section id="expertise" className="section expertise">
      <div className="expertise-glow expertise-glow--one" aria-hidden />
      <div className="expertise-glow expertise-glow--two" aria-hidden />
      <div className="expertise-grain" aria-hidden />

      <div className="container">
        <SectionHeading
          eyebrow="Expertise"
          tone="dark"
          title={
            <>
              The toolkit behind
              <br />
              <em>intelligent systems</em>
            </>
          }
          description="Six areas I work across, grounded in shipped systems rather than slideware — each one backed by a repository or a production pipeline."
        />

        <div className="expertise-grid">
          {expertise.map((item, index) => {
            const Icon = expertiseIcons[item.icon];
            return (
              <Reveal key={item.title} delay={index * 70}>
                <article className="expertise-card">
                  <span className="expertise-icon" aria-hidden>
                    <Icon size={22} />
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <ul className="expertise-chips">
                    {item.stack.map((tech) => (
                      <li key={tech}>{tech}</li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
