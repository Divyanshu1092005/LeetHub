import "dotenv/config";
import { db } from "./db.js";

const cppData = {
  "Add Two Numbers": {
    snippet: `#include <iostream>
using namespace std;

int addTwoNumbers(int a, int b) {
    // Write your code here
    return 0;
}

int main() {
    int a, b;
    if (cin >> a >> b) {
        cout << addTwoNumbers(a, b) << endl;
    }
    return 0;
}`,
    solution: `#include <iostream>
using namespace std;
int main() {
    int a, b;
    if (cin >> a >> b) { cout << a + b << endl; }
    return 0;
}`
  },
  "Climbing Stairs": {
    snippet: `#include <iostream>
using namespace std;

int climbStairs(int n) {
    // Write your code here
    return 0;
}

int main() {
    int n;
    if(cin >> n) {
        cout << climbStairs(n) << endl;
    }
    return 0;
}`,
    solution: `#include <iostream>
using namespace std;
int main() {
    int n;
    if(cin >> n) {
        if (n <= 2) { cout << n << endl; return 0; }
        int a = 1, b = 2;
        for(int i = 3; i <= n; i++){
            int temp = a + b;
            a = b;
            b = temp;
        }
        cout << b << endl;
    }
    return 0;
}`
  },
  "Valid Palindrome": {
    snippet: `#include <iostream>
#include <string>
#include <cctype>
using namespace std;

bool isPalindrome(string s) {
    // Write your code here
    return false;
}

int main() {
    string s;
    getline(cin, s);
    cout << (isPalindrome(s) ? "true" : "false") << endl;
    return 0;
}`,
    solution: `#include <iostream>
#include <string>
#include <cctype>
using namespace std;

int main() {
    string s;
    getline(cin, s);
    int left = 0, right = s.length() - 1;
    bool valid = true;
    while (left < right) {
        while (left < right && !isalnum(s[left])) left++;
        while (left < right && !isalnum(s[right])) right--;
        if (tolower(s[left]) != tolower(s[right])) {
            valid = false;
            break;
        }
        left++; right--;
    }
    cout << (valid ? "true" : "false") << endl;
    return 0;
}`
  }
};

async function main() {
  console.log("Starting DB update for existing problems...");

  for (const [title, data] of Object.entries(cppData)) {
    // Find problem by title
    const problem = await db.problem.findFirst({
      where: {
        title: {
          equals: title,
          mode: 'insensitive'
        }
      }
    });

    if (problem) {
      console.log(`Updating problem: "${problem.title}"`);

      // Merge C++ keys into JSON fields
      const codeSnippets = {
        ...problem.codeSnippets,
        "C++": data.snippet
      };

      const referenceSolutions = {
        ...problem.referenceSolutions,
        "C++": data.solution
      };

      const examples = {
        ...problem.examples
      };
      if (!examples["C++"]) {
        examples["C++"] = examples["JAVASCRIPT"] || examples["PYTHON"] || { input: "", output: "", explanation: "" };
      }

      await db.problem.update({
        where: { id: problem.id },
        data: {
          codeSnippets,
          referenceSolutions,
          examples
        }
      });
      console.log(`Problem "${problem.title}" updated successfully with C++ configuration.`);
    } else {
      console.log(`Problem "${title}" not found in database.`);
    }
  }

  console.log("All problems processed.");
}

main()
  .catch((e) => {
    console.error("Migration failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    // clean up
  });
