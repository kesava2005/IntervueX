import React from 'react'
import "./Features.css";
function Features() {
  return (
    <section className="features-section">
      <div className="carousel" mask="">
      <article>
        <img
          src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="AI-powered interviews"
        />
        <h2>AI-Powered Interview Prep</h2>
        <div>
          <p>
            Practice real-world coding and behavioral interview questions powered by AI. 
            Get tailored challenges based on your role, skill level, and experience.
          </p>
          <a href="#">Explore</a>
        </div>
      </article>

      <article>
        <img
          src="https://images.pexels.com/photos/1181353/pexels-photo-1181353.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="instant feedback"
        />
        <h2>Instant Feedback</h2>
        <div>
          <p>
            Receive immediate feedback on your answers — both technical and behavioral. 
            Identify areas for improvement and strengthen your responses quickly.
          </p>
          <a href="#">Learn more</a>
        </div>
      </article>

      <article>
        <img
          src="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="progress tracking"
        />
        <h2>Progress Tracking</h2>
        <div>
          <p>
            Track your journey with performance analytics. See how you improve over time, 
            monitor weak areas, and prepare with confidence.
          </p>
          <a href="#">View progress</a>
        </div>
      </article>

      <article>
        <img
          src="https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="role based practice"
        />
        <h2>Role-Based Practice</h2>
        <div>
          <p>
            Customize your preparation for software engineering, data science, or system design interviews. 
            Questions are generated to match your career path.
          </p>
          <a href="#">Customize</a>
        </div>
      </article>

      <article>
        <img
          src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="mock interviews"
        />
        <h2>Mock Interviews</h2>
        <div>
          <p>
            Simulate real interviews with time-bound practice sessions. 
            Get comfortable with the pressure before facing actual recruiters.
          </p>
          <a href="#">Try now</a>
        </div>
      </article>

      <article>
        <img
          src="https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="community"
        />
        <h2>Community & Resources</h2>
        <div>
          <p>
            Join a community of learners, share interview tips, and access curated resources 
            to stay ahead in your preparation journey.
          </p>
          <a href="#">Join community</a>
        </div>
      </article>
          </div>
    </section>
  )
}

export default Features
