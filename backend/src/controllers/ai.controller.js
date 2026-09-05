import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

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

    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
    ];

    const model = genAI.getGenerativeModel({
      model: "gemini-3.6-flash",
      safetySettings,
    });

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

    let responseText = "";
    try {
      const result = await model.generateContent(prompt);
      responseText = result?.response?.text?.() || "";
      if (!responseText && result?.response?.candidates?.[0]?.content?.parts?.[0]?.text) {
        responseText = result.response.candidates[0].content.parts[0].text;
      }
    } catch (genError) {
      console.warn("Primary model generation issue, trying fallback:", genError.message);
      // Fallback model attempt if primary encountered issue
      const fallbackModel = genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
        safetySettings,
      });
      const fallbackResult = await fallbackModel.generateContent(prompt);
      responseText = fallbackResult?.response?.text?.() || "";
    }

    if (!responseText) {
      return res.status(502).json({
        success: false,
        message: "AI service returned an empty response. Please try again.",
      });
    }

    return res.status(200).json({
      success: true,
      feedback: responseText,
    });
  } catch (error) {
    console.error("AI Code Analysis Error:", error);
    const statusCode = error.status || (error.message?.includes("429") ? 429 : 500);
    return res.status(statusCode).json({
      success: false,
      message: error.message?.includes("429")
        ? "AI service is busy or rate limit reached. Please wait a moment and try again."
        : "Failed to generate AI feedback. Please try again later.",
      error: error.message,
    });
  }
};
