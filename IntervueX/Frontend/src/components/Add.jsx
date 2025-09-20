import React, { useContext, useState } from 'react'
import Upload from './Upload'
import { useAuth } from './AuthContext'
function Add({ onCourseAdded }) {
  const { auth, setAuth } = useAuth();
  const [role, setRole] = useState(null);
  const [exp, setExp] = useState(null);
  const [skills, setSkills] = useState(null);
  const [description, setDescription] = useState(null);
  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.name == "role") setRole(e.target.value);
    else if (e.target.name == "exp") setExp(e.target.value);
    else if (e.target.name == "skills") setSkills(e.target.value);
    else setDescription(e.target.value);
  }
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/insertCourse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: auth.email,
          role: role,
          exp: exp,
          skills: skills,
          description: description
        })
      });
      const data = await res.json();
      console.log(data.message);
      if (data.success && onCourseAdded) {
        onCourseAdded();
      }
    }
    catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="flex justify-center items-center min-h-screen bg-black/30 backdrop-blur-sm absolute inset-0 z-10">
      <div className="grid grid-cols-2 gap-10 max-w-6xl w-full px-10">

        <div className="bg-white shadow-xl rounded-2xl p-8 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold mb-2">Start A New Interview Journey</h2>
            <p className="text-sm text-gray-600 mb-6">
              Fill out some quick details and unlock your personalized set of interview questions!
            </p>

            <form method="post" className="flex flex-col gap-5">
              <div>
                <label htmlFor="role" className="block mb-1 font-medium text-gray-700 text-sm">Target Role</label>
                <input
                  type="text"
                  name="role"
                  placeholder="e.g. Frontend Developer, UI/UX Designer"
                  className="w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-50 focus:border-amber-700 focus:outline-none"
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="xp" className="block mb-1 font-medium text-gray-700 text-sm">Years Of Experience</label>
                <input
                  type="text"
                  name="exp"
                  placeholder="e.g. 1 Year, 3 Years, 5+ Years"
                  className="w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-50 focus:border-amber-700 focus:outline-none"
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="skills" className="block mb-1 font-medium text-gray-700 text-sm">Topics to Focus On</label>
                <input
                  type="text"
                  name="skills"
                  placeholder="e.g. Reactjs, Nodejs, MongoDB"
                  className="w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-50 focus:border-amber-700 focus:outline-none"
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="desc" className="block mb-1 font-medium text-gray-700 text-sm">Description</label>
                <input
                  type="text"
                  name="description"
                  placeholder="Any specific goals or notes for this session"
                  className="w-full border border-gray-300 rounded-md p-2 text-sm bg-gray-50 focus:border-amber-700 focus:outline-none"
                  onChange={handleChange}
                />
              </div>
            </form>
          </div>

          <button
            type="submit"
            className="mt-6 bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 rounded-lg w-full transition-all"
            onClick={handleClick}
          >
            Create Session
          </button>
        </div>

        <div className="bg-white shadow-xl rounded-2xl p-8 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold mb-2">Upload Job Description</h2>
            <p className="text-sm text-gray-600 mb-6">
              Upload the job description and instantly generate a personalized set of interview questions.
            </p>
            <Upload />
          </div>
        </div>

      </div>
    </div>
  )
}

export default Add
