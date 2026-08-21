import { GoogleGenerativeAI } from "@google/generative-ai";

export const analyzeCodeSubmission = async (req, res) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({
        success: false,
        message: "Gemini API key is not configured on the server.",
      });
    }

    const { problemTitle, problemDescription, userCode, isSuccessful } = req.body;

    // Strict validation
    if (
      !problemTitle ||
      typeof problemTitle !== "string" ||
      !problemTitle.trim() ||
      !problemDescription ||
      typeof problemDescription !== "string" ||
      !problemDescription.trim() ||
      !userCode ||
      typeof userCode !== "string" ||
      !userCode.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: problemTitle, problemDescription, or userCode.",
      });
    }

    const submissionStatus = typeof isSuccessful === "boolean" ? isSuccessful : false;

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-3.6-flash" });

    const prompt = `
You are a senior software engineering interviewer at a top tech company conducting a friendly mock interview.
Tone & Language: Natural, clear, encouraging Hinglish (Hindi mixed with English technical terms). Simple and beginner-friendly.

Candidate Submission Details:
- Problem Title: ${problemTitle.trim()}
- Problem Description: ${problemDescription.trim()}
- Candidate's Code:
\`\`\`
${userCode.trim()}
\`\`\`
- Submission Passed All Testcases: ${submissionStatus ? "YES (Accepted)" : "NO (Failed/Wrong Answer/Error)"}

Instructions:
${submissionStatus
        ? "The candidate solved the problem successfully! Congratulate them warmly in Hinglish, point out strong points in their code, and challenge them with further time/space optimizations or cleaner coding practices."
        : "The candidate's solution did not pass all test cases or encountered an error. Gently explain where the logic gap or edge case failure likely is without being harsh, and encourage them to fix it step by step."
      }

Please provide your review in the following EXACT Markdown structure:

### 1. Code Review & Verdict 🔍
Provide a clear status verdict, syntax/logic feedback, code readability review, and edge case coverage analysis in friendly Hinglish.

### 2. Problem Breakdown (Saral Bhasha Mein) 💡
Explain the problem requirements, key constraints, and core logic in simple, intuitive Hinglish.

### 3. Dry Run Step-by-Step 🚶‍♂️
Walk through the algorithm with a concrete sample input/output step-by-step showing variable states and iterations.

### 4. Solution Approaches 🚀
Present the algorithmic solutions clearly:
- **Brute Force Approach**: High-level logic, Time Complexity: O(...), Space Complexity: O(...)
- **Better Approach**: High-level logic, Time Complexity: O(...), Space Complexity: O(...)
- **Optimal Approach**: High-level logic with brief code/pseudocode outline, Time Complexity: O(...), Space Complexity: O(...)

### 5. Interviewer Pro-Tips 🎯
Share crucial interview tips, common pitfalls/mistakes candidates make for this specific question, and standard follow-up questions interviewer might ask.
`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    return res.status(200).json({
      success: true,
      feedback: responseText,
    });
  } catch (error) {
    console.error("AI Code Analysis Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to generate AI feedback. Please try again later.",
      error: error.message,
    });
  }
};
