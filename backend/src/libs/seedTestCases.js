import "dotenv/config";
import { db } from "./db.js";

async function seedTestCases() {
  console.log("Starting testcase migration to TestCase table...");
  try {
    const problems = await db.problem.findMany();
    console.log(`Found ${problems.length} problems to process.`);

    for (const problem of problems) {
      console.log(`Processing problem: "${problem.title}" (ID: ${problem.id})`);

      // Check if test cases already exist for this problem to avoid duplicate seeding
      const existingCount = await db.testCase.count({
        where: { problemId: problem.id },
      });

      if (existingCount > 0) {
        console.log(`Problem "${problem.title}" already has ${existingCount} test cases seeded. Skipping.`);
        continue;
      }

      const testcasesArray = problem.testcases;
      if (!Array.isArray(testcasesArray)) {
        console.log(`Problem "${problem.title}" has no valid testcase JSON array. Skipping.`);
        continue;
      }

      console.log(`Seeding ${testcasesArray.length} test cases for "${problem.title}"...`);
      for (let i = 0; i < testcasesArray.length; i++) {
        const tc = testcasesArray[i];
        const input = tc.input !== undefined ? String(tc.input) : "";
        const output = tc.output !== undefined ? String(tc.output) : "";
        
        // Mark first 2 testcases as public (isHidden: false), the rest as hidden (isHidden: true)
        const isHidden = i >= 2;

        await db.testCase.create({
          data: {
            problemId: problem.id,
            input,
            output,
            isHidden,
          },
        });
      }
      console.log(`Successfully seeded test cases for "${problem.title}".`);
    }

    console.log("Testcase migration completed successfully!");
  } catch (error) {
    console.error("Migration failed:", error);
  } finally {
    process.exit(0);
  }
}

seedTestCases();
