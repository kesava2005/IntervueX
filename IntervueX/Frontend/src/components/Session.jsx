import React, { useEffect, useState } from 'react'
import NavBar from './NavBar'
import downArrow from "../assets/down-chevron.png";
import askAI from "../assets/ai.png";
import { useAuth } from './AuthContext';
import { useParams, useNavigate } from 'react-router-dom';
import Generating from './generating';
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function Session() {
  const navigate = useNavigate();
  const course_id = useParams().id;
  const { auth, loading } = useAuth();
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [course, setCourse] = useState({});
  const [questions, setQuestions] = useState([]);
  const [generating, setGenerating] = useState(false);

  // Drawer states
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [aiResponse, setAiResponse] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  const handle_login_click = () => {
    navigate("/");
  };

  const handle_expand_click = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  useEffect(() => {
    loadCourse();
  }, []);

  useEffect(() => {
    if (course.id) {
      loadQuestions();
    }
  }, [course]);

  const loadCourse = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/getCourse/" + course_id, {
        headers: { "Content-Type": "application/json" },
        credentials: "include"
      });
      const data = await res.json();
      if (data.success) {
        const cs = data.course;
        setCourse({
          id: cs._id,
          role: cs.role,
          xp: cs.exp,
          lastupdate: "10th Sep 2025",
          skills: cs.skills.split(" ")
        });
      } else console.log(data.message);
    } catch (err) {
      console.log(err);
    }
  };

  const loadQuestions = async () => {
    setGenerating(true);
    try {
      const res = await fetch("http://localhost:5000/api/getQuestions/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          course_id: course_id,
          email: auth.email
        }),
        credentials: "include"
      });
      const data = await res.json();
      if (data.success && data.questions.length > 0) {
        let formatted = data.questions.map(q => ({
          question: q.question,
          answer: q.answer
        }));
        setQuestions(formatted);
      } else console.log(data.message);
    } catch (err) {
      console.log(err);
    } finally {
      setGenerating(false);
    }
  };

  const generateQuestions = async () => {
    setGenerating(true);
    try {
      const res = await fetch("http://localhost:5000/api/generateQuestions/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          course_id: course.id,
          email: auth.email
        }),
        credentials: "include"
      });
      const data = await res.json();
      console.log(data);

      // After generation, reload updated questions
      await loadQuestions();
    } catch (err) {
      console.log(err);
    } finally {
      setGenerating(false);
    }
  };

  const handleAskAI = async (question) => {
    setDrawerOpen(true);
    setAiLoading(true);
    setAiResponse("");

    try {
      const res = await fetch("http://localhost:5000/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: question }),
      });
      const data = await res.json();
      setAiResponse(data.answer || "No response from AI.");
    } catch (err) {
      console.log(err);
      setAiResponse("Error fetching AI response.");
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-gray-900 pb-[10vh]">
      <NavBar handle_login_click={handle_login_click} />

      {!loading &&
        <div className="rounded-xl border border-amber-400 bg-white/5 backdrop-blur-lg shadow-lg w-[40%] mx-auto mt-[10vh] text-white p-6">
          <div className="mb-3">
            <div className="text-2xl font-bold">{course.role}</div>
            <div className="flex gap-2 mt-2 text-amber-200 flex-wrap">
              {course.skills && course.skills.map((skill, ind) => (
                <span key={ind} className="bg-amber-500/10 text-amber-300 px-3 py-1 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div className='flex flex-wrap gap-3 text-sm mt-4'>
            <button className='bg-gray-800 px-4 py-2 rounded-3xl shadow hover:bg-gray-700'>
              Experience {course.xp} years
            </button>
            <button className='bg-gray-800 px-4 py-2 rounded-3xl shadow hover:bg-gray-700'>
              {questions.length} Q&A
            </button>
            <button className='bg-gray-800 px-4 py-2 rounded-3xl shadow hover:bg-gray-700'>
              Last Updated: {course.lastupdate}
            </button>
          </div>
        </div>}

      <div className="questions mx-auto my-[8vh] w-[75vw]">
        {questions.map((q, index) => (
          <div
            key={index}
            className="border border-gray-700 rounded-xl mb-4 shadow-md bg-gray-900/80 backdrop-blur hover:shadow-lg transition duration-300"
          >
            <div
              className="flex justify-between items-center px-6 py-4 text-white font-medium text-base cursor-pointer"
              onClick={() => handle_expand_click(index)}
            >
              <span className="flex items-center gap-[20px]">
                <span className="text-amber-400 font-bold mr-2">Q</span>
                <span className='w-[55vw]'>{q.question}</span>
              </span>
              <div className="flex items-center gap-3">
                <div
                  className="flex items-center bg-white text-gray-800 px-3 py-1 rounded-lg text-xs shadow hover:scale-105 transition"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAskAI(q.question);
                  }}
                >
                  <img src={askAI} alt="" className='w-4 h-4 mr-1' />
                  Ask AI
                </div>
                <img
                  src={downArrow}
                  alt="toggle"
                  className={`w-5 h-5 transform transition-transform duration-300 ${expandedIndex === index ? "rotate-180" : ""}`}
                />
              </div>
            </div>
            <div
              className={`px-6 overflow-hidden transition-all duration-500 ease-in-out ${expandedIndex === index ? "max-h-96 py-4 opacity-100" : "max-h-0 py-0 opacity-0"
                }`}
            >
              <div className="bg-gray-800 text-gray-200 text-sm p-5 rounded-lg border border-gray-700 shadow-inner text-[1.0rem]">
                {q.answer}
              </div>
            </div>
          </div>
        ))}

        <div className="text-center mt-6">
          {!generating ? (
            <button
              className='bg-amber-400 text-gray-900 px-6 py-3 mt-[5vh] cursor-pointer rounded-xl font-semibold shadow hover:bg-amber-300 transition'
              onClick={generateQuestions}
            >
              Load More Questions
            </button>
          ) : (
            <div className="flex justify-center mt-6">
              <Generating />
            </div>
          )}
        </div>
      </div>

      <div
        className={`fixed top-0 right-0 h-full w-[460px] bg-gray-900 text-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${drawerOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex justify-between items-center px-4 py-3 border-b border-gray-700 bg-gray-800">
          <h2 className="text-lg font-semibold">AI Assistant 🤖</h2>
          <button
            className="text-gray-400 hover:text-white text-xl"
            onClick={() => setDrawerOpen(false)}
          >
            ✕
          </button>
        </div>
        <div className="p-5 overflow-y-auto h-[calc(100%-60px)] prose prose-invert max-w-none space-y-6">
          {aiLoading ? (
            <p className="text-gray-400 italic">Generating response...</p>
          ) : (
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {aiResponse}
            </ReactMarkdown>
          )}
        </div>
      </div>
    </div>
  );
}

export default Session;
