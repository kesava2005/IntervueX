import React, { useContext, useEffect, useRef, useState } from 'react';
import NavBar from "./NavBar";
import Add from './Add';
import { useAuth } from "./AuthContext";
import { useNavigate } from 'react-router-dom';
import Session from './Session';
import delete_icon from "../assets/delete.png";
function Dashboard() {
  const delete_ref = useRef();
  const navigate = useNavigate();
  const { auth, setAuth, loading } = useAuth();
  const [showAdd, setShowAdd] = useState(false);
  const handle_login_click = () => window.open("http://localhost:5173/", "_self");
  const [usermail, setUsermail] = useState(null);
  const colors = ["bg-pink-100", "bg-green-100", "bg-blue-100", "bg-yellow-100", "bg-purple-100"];
  const [courses, setcourses] = useState([]);
  useEffect(() => {
    if (!loading && !auth?.logged) {
      navigate("/");
    }
    //fetch courses related to auth.email
    if (!loading) {
      fetchCourses();
    }
  }, [auth, navigate, loading]);
  const fetchCourses = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/getCourses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mail: auth.mail
        })
      });
      const data = await res.json();
      const cs = data.courses;
      const formattedCourses = cs.map(c => ({
        _id: c._id,
        role: c.role,
        xp: c.exp,
        lastupdate: "10th Sep 2025",
        qcount: c.qcount,
        skills: c.skills.split(" "),
      }));
      setcourses(formattedCourses);
    } catch (err) {
      console.log(err);
    }
  }
  const handle_add_click = () => setShowAdd(true);
  const handle_close_click = () => setShowAdd(false);
  const handle_course_click = (id) => {
    navigate(`/Session/${id}`);
  }
  const handleCourseAdded = () => {
    fetchCourses();
    setShowAdd(false);
  };
  const handle_delete_click = async (e, id) => {
    e.stopPropagation();
    try {
      const res = await fetch("http://localhost:5000/api/deleteCourse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: auth.email,
          course_id: id
        })
      });
      const data = await res.json();
      fetchCourses();
      if (data.success) {
        alert("Course deleted successfully");
      }
      else console.log(data.message);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div>
      {showAdd && (
        <div
          className="fixed right-6 top-6 text-white text-2xl font-bold z-50 cursor-pointer"
          onClick={handle_close_click}
        >
          X
        </div>
      )}

      <NavBar handle_login_click={handle_login_click} />

      <div className='cards grid grid-cols-3 my-[10vh] mr-[7vw] ml-[10vw] gap-[2vw]'>
        {courses.map((course, index) => {
          const randomColor = colors[Math.floor(Math.random() * colors.length)];
          return (
            <div className="card bg-white group rounded-[10px] p-[10px] border-[1px] border-indigo-500 cursor-pointer relative" key={index} onClick={() => handle_course_click(course._id)}>
              <div className={`top-portion ${randomColor} rounded-[5px] p-[10px]`}>
                <div className="role text-[1.0rem] mb-[5px]">{course.role}</div>
                <div className="skills flex gap-[10px] text-[0.7rem]">{course.skills.map((skill, ind) => <div key={ind}>{skill}</div>)}</div>
              </div>
              <div className='absolute top-[14px] right-[14px] opacity-0 group-hover:opacity-100 transition-opacity duration-200'>
                <img src={delete_icon} alt="" className='w-[12px] h-[12px]' onClick={(e) => handle_delete_click(e, course._id)} />
              </div>
              <div className='bottom-portion flex p-[10px] text-[0.6rem] gap-[1vw]'>
                <div className='xp'><button className='border-[1px] border-gray-400 p-[7px] rounded-3xl'>Experience {course.xp}</button></div>
                <div className='qcount'><button className='border-[1px] border-gray-400 p-[7px] rounded-3xl'>{course.qcount} Q&A</button></div>
                <div className='qcount'><button className='border-[1px] border-gray-400 p-[7px] rounded-3xl'>Last Updated: {course.lastupdate}</button></div>
              </div>
            </div>
          );
        })}

        <div className='add-button'>
          <button
            className="fixed right-6 bottom-6 bg-[#0e7981] p-[15px] rounded-4xl text-white font-bold cursor-pointer hover:bg-[#074347] transition-colors duration-500"
            onClick={handle_add_click}
          >
            + ADD
          </button>
        </div>
      </div>

      {showAdd && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-40">
          <div className="w-[90%] max-w-5xl">
            <Add onCourseAdded={handleCourseAdded} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
