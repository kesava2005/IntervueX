const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const User = require("./models/user");
const Courses = require("./models/Courses");
const questions = require("./models/questions");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const app = express();
const port = 5000;
const mongoURI = "mongodb://127.0.0.1:27017/IntXDB";
const SECRET_KEY = process.env.SECRET_KEY || "my_secret_key";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

mongoose.connect(mongoURI)
  .then(() => console.log("Database connected"))
  .catch(err => console.log(err));

function authenticateUser(req, res, next) {
  console.log("Cookies received:", req.cookies);
  const token = req.cookies && req.cookies.token;
  if (!token) return res.json({ success: false, message: "Not authenticated" });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("JWT verify error:", err);
    return res.json({ success: false, message: "Invalid or expired token" });
  }
}



const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post("/api/generateQuestions", async (req, res) => {
  try {
    const { course_id, email } = req.body;
    const course = await Courses.findById(course_id);
    console.log(course_id);
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    const prompt = `
      You are an expert interviewer. Generate 10 interview questions and their answers 
      in JSON format for a candidate with the following details:

      Role: ${course.role}
      Skills: ${course.skills}
      Experience: ${course.exp} years

      Format strictly as an array of objects:
      [
        {"question": "....", "answer": "...."},
        {"question": "....", "answer": "...."}
      ]
    `;

    // Call Gemini (force JSON output if possible)
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });
    const result = await model.generateContent(prompt);

    let textResponse = result.response.text();
    let cleaned;
    let ques;
    try {
      let cleaned = textResponse
        .replace(/```json/g, "") // removes all ```
        .replace(/```/g, "")    // removes all ```
        .trim();


      ques = JSON.parse(cleaned);
    } catch (e) {
      console.error("Parsing failed, raw response:", textResponse);
      return res.status(500).json({ success: false, message: "Invalid AI response" });
    }

    res.json({ success: true, questions: ques });
    try {
      for (let i = 0; i < ques.length; i++) {
        let question = ques[i].question;
        let ans = ques[i].answer;
        let new_question = new questions({ email: email, course_id: course_id, question: question, answer: ans });
        await new_question.save();
      }
      console.log("generated questions added successfully");
    }
    catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.error("Error generating questions:", err);
    res.status(500).json({ success: false, message: "Failed to generate questions" });
  }
});

app.post("/api/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });
  res.json({ success: true, message: "Logged out successfully" });
});

app.post("/api/insertUser", async (req, res) => {
  const email = req.headers['email'] || req.body.email;
  const password = req.headers['password'] || req.body.password;
  try {
    const newuser = new User({ email, password });
    await newuser.save();
    res.json({ success: true, message: "User inserted" });
  } catch (err) {
    console.log("Error while inserting:", err);
    res.status(500).json({ success: false, message: "Insert failed" });
  }
});

app.post("/api/insertCourse", async (req, res) => {
  const { email, role, exp, skills, description } = req.body;
  try {
    const newCourse = new Courses({ email, role, skills, exp, description });
    await newCourse.save();
    res.json({ success: true, message: "Course Added" });
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Insert failed" });
  }
});
app.post("/api/deleteCourse", async (req, res) => {
  const { email, course_id } = req.body;

  try {
    const courseObjectId = new mongoose.Types.ObjectId(course_id);

    const courseResult = await Courses.deleteOne({ _id: courseObjectId });
    const questionResult = await questions.deleteMany({ email:email, course_id: course_id.toString() });

    console.log("Courses deleted:", courseResult.deletedCount);
    console.log("Questions deleted:", questionResult.deletedCount);

    res.json({ success: true, message: "Course deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Deletion failed" });
  }
});
app.get("/api/currentUser", authenticateUser, (req, res) => {
  res.json({ email: req.user.email, success: true });
});

app.post("/api/getCourses", async (req, res) => {
  const email = req.body;
  try {
    const courses = await Courses.find(email);

    const coursesWithQCount = await Promise.all(
      courses.map(async (course) => {
        const qcount = await questions.countDocuments({ course_id: course._id, email: course.email });
        return {
          ...course.toObject(),
          qcount: qcount.toString()
        };
      })
    );

    res.send({ courses: coursesWithQCount, success: true, message: "Fetched successfully" }); // ✅ return correct array
  }
  catch (err) {
    console.log(err);
    res.send({ success: false, message: "Fetching failed" });
  }
});

app.post("/api/getQuestions", async (req, res) => {
  const { course_id, email } = req.body;
  try {
    const qs = await questions.find({ course_id: course_id, email: email });
    if (typeof (qs) == "undefined") { console.log("entering"); return res.send({ success: false, message: "no questions exists" }); }
    res.send({ success: true, questions: qs });
  }
  catch (err) {
    console.log(err);
    res.send({ success: false, message: "failed to fetch questions" });
  }
})
app.get("/api/getCourse/:id", async (req, res) => {
  const course_id = req.params.id;
  try {
    const course = await Courses.findById(course_id);
    if (!course) return res.json({ success: false, message: "No such course exists" });
    res.json({ success: true, course: course });
  }
  catch (err) {
    console.log(err);
    res.json({ success: false, message: "Failed to fetch course details" });
  }
});

app.post("/api/gemini", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt || prompt.trim() === "") {
      return res.status(400).json({ success: false, message: "Prompt is required" });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });
    const result = await model.generateContent(prompt);

    const responseText = result.response.text();

    res.json({
      success: true,
      answer: responseText
    });
  } catch (err) {
    console.error("Error in /api/gemini:", err);
    res.status(500).json({ success: false, message: "AI failed to respond" });
  }
});

app.post("/api/verifyUser", async (req, res) => {
  const email = req.headers['email'] || req.body.email;
  const password = req.headers['password'] || req.body.password;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    if (user.password !== password) return res.status(401).json({ success: false, message: "Invalid password" });

    const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: "1h" });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax"
    });
    res.status(200).json({ success: true, message: "Login successful" });

    console.log("Token created for:", email);
  } catch (err) {
    console.error("Error verifying user:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

app.get("/", (req, res) => res.send("Backend"));
app.listen(port, () => console.log(`App listening on ${port}`));
