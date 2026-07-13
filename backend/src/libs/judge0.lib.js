import axios from "axios"

const getHeaders = () => ({
    "Content-Type": "application/json",
    "X-RapidAPI-Key": process.env.RAPID_API_KEY,
    "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com"
})

export const getJudge0LanguageId = (language) => {
    const languageMap = {
        "PYTHON": 71,
        "JAVA": 62,
        "JAVASCRIPT": 63,
    }
    return languageMap[language.toUpperCase()]
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export const submitBatch = async (submissions) => {
    const { data } = await axios.post(
        `${process.env.JUDGE0_API_URL}/submissions/batch?base64_encoded=false`,
        { submissions },
        { headers: getHeaders() }
    )
    console.log("Submission Results: ", data)
    return data
}

export const pollBatchResults = async (tokens) => {
    while(true) {
        const { data } = await axios.get(
            `${process.env.JUDGE0_API_URL}/submissions/batch`,
            {
                params: {
                    tokens: tokens.join(","),
                    base64_encoded: false,
                },
                headers: getHeaders()
            }
        )

        const results = data.submissions
        const isAllDone = results.every(
            (r) => r.status.id !== 1 && r.status.id !== 2
        )

        if(isAllDone) return results
        await sleep(1000)
    }
}

export function getLanguageName(languageId) {
    const LANGUAGE_NAMES = {
        74: "TypeScript",
        63: "JavaScript",
        71: "Python",
        62: "Java",
    }
    return LANGUAGE_NAMES[languageId] || "Unknown"
}