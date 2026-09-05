import "dotenv/config";
import { db } from "../src/libs/db.js";
import { striverProblems } from "./seedStriver.js";

const problemsData = [
  {
    title: "Two Sum",
    difficulty: "EASY",
    tags: ["Array", "Hash Table"],
    description: "Given an array of integers `nums` and an integer `target`, return the indices of the two numbers such that they add up to `target`.\n\nYou may assume that each input would have **exactly one solution**, and you may not use the same element twice.\n\nYou can return the answer in any order.\n\n### Example 1:\n```text\nInput: nums = [2,7,11,15], target = 9\nOutput: [0,1]\nExplanation: Because nums[0] + nums[1] == 9, we return 0 1.\n```\n\n### Constraints:\n- `2 <= nums.length <= 10^4`\n- `-10^9 <= nums[i] <= 10^9`\n- `-10^9 <= target <= 10^9`\n- Only one valid answer exists.",
    constraints: "2 <= nums.length <= 10^4\n-10^9 <= nums[i] <= 10^9\n-10^9 <= target <= 10^9\nOnly one valid answer exists.",
    hints: "Can you use a hash map to look up complements in O(1) time?",
    editorial: "Store each element and its index in a hash map as you iterate. For each number, check if `target - num` already exists in the map.",
    examples: {
      "C++": { input: "nums = [2,7,11,15], target = 9", output: "0 1", explanation: "Because nums[0] + nums[1] == 9, we return 0 1." },
      "JAVA": { input: "nums = [2,7,11,15], target = 9", output: "0 1", explanation: "Because nums[0] + nums[1] == 9, we return 0 1." },
      "PYTHON": { input: "nums = [2,7,11,15], target = 9", output: "0 1", explanation: "Because nums[0] + nums[1] == 9, we return 0 1." },
      "JAVASCRIPT": { input: "nums = [2,7,11,15], target = 9", output: "0 1", explanation: "Because nums[0] + nums[1] == 9, we return 0 1." }
    },
    codeSnippets: {
      "C++": `#include <iostream>
#include <vector>
#include <sstream>
#include <unordered_map>
using namespace std;

vector<int> twoSum(vector<int>& nums, int target) {
    // Write your code here
    return {};
}

int main() {
    string line;
    if (getline(cin, line)) {
        stringstream ss(line);
        vector<int> nums;
        int num;
        while (ss >> num) nums.push_back(num);
        int target;
        if (cin >> target) {
            vector<int> result = twoSum(nums, target);
            if (result.size() >= 2) {
                cout << result[0] << " " << result[1] << endl;
            }
        }
    }
    return 0;
}`,
      "JAVA": `import java.util.*;

public class Main {
    public static int[] twoSum(int[] nums, int target) {
        // Write your code here
        return new int[]{};
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextLine()) {
            String[] parts = sc.nextLine().trim().split("\\s+");
            int[] nums = new int[parts.length];
            for (int i = 0; i < parts.length; i++) nums[i] = Integer.parseInt(parts[i]);
            if (sc.hasNextInt()) {
                int target = sc.nextInt();
                int[] ans = twoSum(nums, target);
                if (ans.length >= 2) {
                    System.out.println(ans[0] + " " + ans[1]);
                }
            }
        }
        sc.close();
    }
}`,
      "PYTHON": `import sys
from typing import List

def twoSum(nums: List[int], target: int) -> List[int]:
    # Write your code here
    return []

if __name__ == "__main__":
    lines = sys.stdin.read().splitlines()
    if len(lines) >= 2:
        nums = list(map(int, lines[0].strip().split()))
        target = int(lines[1].strip())
        result = twoSum(nums, target)
        if len(result) >= 2:
            print(f"{result[0]} {result[1]}")`,
      "JAVASCRIPT": `const readline = require('readline');

function twoSum(nums, target) {
  // Write your code here
  return [];
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

const lines = [];
rl.on('line', (line) => lines.push(line.trim()));
rl.on('close', () => {
  if (lines.length >= 2) {
    const nums = lines[0].split(/\\s+/).map(Number);
    const target = Number(lines[1]);
    const result = twoSum(nums, target);
    console.log(result.join(' '));
  }
});`
    },
    referenceSolutions: {
      "C++": `#include <iostream>
#include <vector>
#include <sstream>
#include <unordered_map>
using namespace std;

int main() {
    string line;
    if (getline(cin, line)) {
        stringstream ss(line);
        vector<int> nums;
        int num;
        while (ss >> num) nums.push_back(num);
        int target;
        if (cin >> target) {
            unordered_map<int, int> mp;
            for (int i = 0; i < nums.size(); i++) {
                int complement = target - nums[i];
                if (mp.find(complement) != mp.end()) {
                    cout << mp[complement] << " " << i << endl;
                    return 0;
                }
                mp[nums[i]] = i;
            }
        }
    }
    return 0;
}`,
      "JAVA": `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextLine()) {
            String[] parts = sc.nextLine().trim().split("\\s+");
            int[] nums = new int[parts.length];
            for (int i = 0; i < parts.length; i++) nums[i] = Integer.parseInt(parts[i]);
            if (sc.hasNextInt()) {
                int target = sc.nextInt();
                Map<Integer, Integer> map = new HashMap<>();
                for (int i = 0; i < nums.length; i++) {
                    int comp = target - nums[i];
                    if (map.containsKey(comp)) {
                        System.out.println(map.get(comp) + " " + i);
                        break;
                    }
                    map.put(nums[i], i);
                }
            }
        }
        sc.close();
    }
}`,
      "PYTHON": `import sys

if __name__ == "__main__":
    lines = sys.stdin.read().splitlines()
    if len(lines) >= 2:
        nums = list(map(int, lines[0].strip().split()))
        target = int(lines[1].strip())
        seen = {}
        for i, num in enumerate(nums):
            diff = target - num
            if diff in seen:
                print(f"{seen[diff]} {i}")
                break
            seen[num] = i`,
      "JAVASCRIPT": `const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

const lines = [];
rl.on('line', (line) => lines.push(line.trim()));
rl.on('close', () => {
  if (lines.length >= 2) {
    const nums = lines[0].split(/\\s+/).map(Number);
    const target = Number(lines[1]);
    const seen = new Map();
    for (let i = 0; i < nums.length; i++) {
      const comp = target - nums[i];
      if (seen.has(comp)) {
        console.log(\`\${seen.get(comp)} \${i}\`);
        break;
      }
      seen.set(nums[i], i);
    }
  }
});`
    },
    testCases: [
      { input: "2 7 11 15\n9", output: "0 1", isHidden: false },
      { input: "3 2 4\n6", output: "1 2", isHidden: false },
      { input: "3 3\n6", output: "0 1", isHidden: false },
      { input: "1 5 8 11 14 17 23 30\n34", output: "3 6", isHidden: true },
      { input: "-10 -5 0 5 10 15\n0", output: "0 4", isHidden: true }
    ]
  },
  {
    title: "Maximum Subarray Sum",
    difficulty: "MEDIUM",
    tags: ["Array", "Dynamic Programming", "Divide and Conquer"],
    description: "Given an integer array `nums`, find the subarray with the largest sum, and return its sum.\n\nA **subarray** is a contiguous non-empty sequence of elements within an array.\n\n### Example 1:\n```text\nInput: nums = [-2,1,-3,4,-1,2,1,-5,4]\nOutput: 6\nExplanation: The subarray [4,-1,2,1] has the largest sum 6.\n```\n\n### Constraints:\n- `1 <= nums.length <= 10^5`\n- `-10^4 <= nums[i] <= 10^4`",
    constraints: "1 <= nums.length <= 10^5\n-10^4 <= nums[i] <= 10^4",
    hints: "Look into Kadane's algorithm to solve this in O(n) time.",
    editorial: "Keep track of the current maximum subarray ending at each index and the overall maximum subarray seen so far.",
    examples: {
      "C++": { input: "nums = [-2,1,-3,4,-1,2,1,-5,4]", output: "6", explanation: "The subarray [4,-1,2,1] has the largest sum 6." },
      "JAVA": { input: "nums = [-2,1,-3,4,-1,2,1,-5,4]", output: "6", explanation: "The subarray [4,-1,2,1] has the largest sum 6." },
      "PYTHON": { input: "nums = [-2,1,-3,4,-1,2,1,-5,4]", output: "6", explanation: "The subarray [4,-1,2,1] has the largest sum 6." },
      "JAVASCRIPT": { input: "nums = [-2,1,-3,4,-1,2,1,-5,4]", output: "6", explanation: "The subarray [4,-1,2,1] has the largest sum 6." }
    },
    codeSnippets: {
      "C++": `#include <iostream>
#include <vector>
#include <sstream>
#include <algorithm>
using namespace std;

int maxSubArray(vector<int>& nums) {
    // Write your code here
    return 0;
}

int main() {
    string line;
    if (getline(cin, line)) {
        stringstream ss(line);
        vector<int> nums;
        int num;
        while (ss >> num) nums.push_back(num);
        if (!nums.empty()) {
            cout << maxSubArray(nums) << endl;
        }
    }
    return 0;
}`,
      "JAVA": `import java.util.*;

public class Main {
    public static int maxSubArray(int[] nums) {
        // Write your code here
        return 0;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextLine()) {
            String[] parts = sc.nextLine().trim().split("\\s+");
            int[] nums = new int[parts.length];
            for (int i = 0; i < parts.length; i++) nums[i] = Integer.parseInt(parts[i]);
            System.out.println(maxSubArray(nums));
        }
        sc.close();
    }
}`,
      "PYTHON": `import sys
from typing import List

def maxSubArray(nums: List[int]) -> int:
    # Write your code here
    return 0

if __name__ == "__main__":
    line = sys.stdin.read().strip()
    if line:
        nums = list(map(int, line.split()))
        print(maxSubArray(nums))`,
      "JAVASCRIPT": `const readline = require('readline');

function maxSubArray(nums) {
  // Write your code here
  return 0;
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', (line) => {
  const nums = line.trim().split(/\\s+/).map(Number);
  console.log(maxSubArray(nums));
  process.exit(0);
});`
    },
    referenceSolutions: {
      "C++": `#include <iostream>
#include <vector>
#include <sstream>
#include <algorithm>
using namespace std;

int main() {
    string line;
    if (getline(cin, line)) {
        stringstream ss(line);
        vector<int> nums;
        int num;
        while (ss >> num) nums.push_back(num);
        if (nums.empty()) return 0;
        int maxSoFar = nums[0], curr = nums[0];
        for (size_t i = 1; i < nums.size(); i++) {
            curr = max(nums[i], curr + nums[i]);
            maxSoFar = max(maxSoFar, curr);
        }
        cout << maxSoFar << endl;
    }
    return 0;
}`,
      "JAVA": `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextLine()) {
            String[] parts = sc.nextLine().trim().split("\\s+");
            int[] nums = new int[parts.length];
            for (int i = 0; i < parts.length; i++) nums[i] = Integer.parseInt(parts[i]);
            int maxSoFar = nums[0], curr = nums[0];
            for (int i = 1; i < nums.length; i++) {
                curr = Math.max(nums[i], curr + nums[i]);
                maxSoFar = Math.max(maxSoFar, curr);
            }
            System.out.println(maxSoFar);
        }
        sc.close();
    }
}`,
      "PYTHON": `import sys

if __name__ == "__main__":
    line = sys.stdin.read().strip()
    if line:
        nums = list(map(int, line.split()))
        max_so_far = curr = nums[0]
        for x in nums[1:]:
            curr = max(x, curr + x)
            max_so_far = max(max_so_far, curr)
        print(max_so_far)`,
      "JAVASCRIPT": `const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', (line) => {
  const nums = line.trim().split(/\\s+/).map(Number);
  let maxSoFar = nums[0], curr = nums[0];
  for (let i = 1; i < nums.length; i++) {
    curr = Math.max(nums[i], curr + nums[i]);
    maxSoFar = Math.max(maxSoFar, curr);
  }
  console.log(maxSoFar);
  process.exit(0);
});`
    },
    testCases: [
      { input: "-2 1 -3 4 -1 2 1 -5 4", output: "6", isHidden: false },
      { input: "1", output: "1", isHidden: false },
      { input: "5 4 -1 7 8", output: "23", isHidden: false },
      { input: "-5 -2 -8 -1 -4", output: "-1", isHidden: true },
      { input: "10 -3 2 1 -6 9 -2 5 -1", output: "16", isHidden: true }
    ]
  },
  {
    title: "Maximum Subarray Product",
    difficulty: "MEDIUM",
    tags: ["Array", "Dynamic Programming"],
    description: "Given an integer array `nums`, find a subarray that has the largest product, and return the product.\n\nThe test cases are generated so that the answer will fit in a **32-bit** integer.\n\n### Example 1:\n```text\nInput: nums = [2,3,-2,4]\nOutput: 6\nExplanation: [2,3] has the largest product 6.\n```\n\n### Constraints:\n- `1 <= nums.length <= 2 * 10^4`\n- `-10 <= nums[i] <= 10`",
    constraints: "1 <= nums.length <= 2 * 10^4\n-10 <= nums[i] <= 10",
    hints: "Track both maximum and minimum products up to the current element since multiplying two negatives creates a positive.",
    editorial: "Because a negative number can turn a minimum product into a maximum product, maintain both `max_product` and `min_product` as you iterate.",
    examples: {
      "C++": { input: "nums = [2,3,-2,4]", output: "6", explanation: "[2,3] has the largest product 6." },
      "JAVA": { input: "nums = [2,3,-2,4]", output: "6", explanation: "[2,3] has the largest product 6." },
      "PYTHON": { input: "nums = [2,3,-2,4]", output: "6", explanation: "[2,3] has the largest product 6." },
      "JAVASCRIPT": { input: "nums = [2,3,-2,4]", output: "6", explanation: "[2,3] has the largest product 6." }
    },
    codeSnippets: {
      "C++": `#include <iostream>
#include <vector>
#include <sstream>
#include <algorithm>
using namespace std;

int maxProduct(vector<int>& nums) {
    // Write your code here
    return 0;
}

int main() {
    string line;
    if (getline(cin, line)) {
        stringstream ss(line);
        vector<int> nums;
        int num;
        while (ss >> num) nums.push_back(num);
        if (!nums.empty()) {
            cout << maxProduct(nums) << endl;
        }
    }
    return 0;
}`,
      "JAVA": `import java.util.*;

public class Main {
    public static int maxProduct(int[] nums) {
        // Write your code here
        return 0;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextLine()) {
            String[] parts = sc.nextLine().trim().split("\\s+");
            int[] nums = new int[parts.length];
            for (int i = 0; i < parts.length; i++) nums[i] = Integer.parseInt(parts[i]);
            System.out.println(maxProduct(nums));
        }
        sc.close();
    }
}`,
      "PYTHON": `import sys
from typing import List

def maxProduct(nums: List[int]) -> int:
    # Write your code here
    return 0

if __name__ == "__main__":
    line = sys.stdin.read().strip()
    if line:
        nums = list(map(int, line.split()))
        print(maxProduct(nums))`,
      "JAVASCRIPT": `const readline = require('readline');

function maxProduct(nums) {
  // Write your code here
  return 0;
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', (line) => {
  const nums = line.trim().split(/\\s+/).map(Number);
  console.log(maxProduct(nums));
  process.exit(0);
});`
    },
    referenceSolutions: {
      "C++": `#include <iostream>
#include <vector>
#include <sstream>
#include <algorithm>
using namespace std;

int main() {
    string line;
    if (getline(cin, line)) {
        stringstream ss(line);
        vector<int> nums;
        int num;
        while (ss >> num) nums.push_back(num);
        if (nums.empty()) return 0;
        int maxP = nums[0], minP = nums[0], result = nums[0];
        for (size_t i = 1; i < nums.size(); i++) {
            if (nums[i] < 0) swap(maxP, minP);
            maxP = max(nums[i], maxP * nums[i]);
            minP = min(nums[i], minP * nums[i]);
            result = max(result, maxP);
        }
        cout << result << endl;
    }
    return 0;
}`,
      "JAVA": `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextLine()) {
            String[] parts = sc.nextLine().trim().split("\\s+");
            int[] nums = new int[parts.length];
            for (int i = 0; i < parts.length; i++) nums[i] = Integer.parseInt(parts[i]);
            int maxP = nums[0], minP = nums[0], result = nums[0];
            for (int i = 1; i < nums.length; i++) {
                if (nums[i] < 0) {
                    int temp = maxP;
                    maxP = minP;
                    minP = temp;
                }
                maxP = Math.max(nums[i], maxP * nums[i]);
                minP = Math.min(nums[i], minP * nums[i]);
                result = Math.max(result, maxP);
            }
            System.out.println(result);
        }
        sc.close();
    }
}`,
      "PYTHON": `import sys

if __name__ == "__main__":
    line = sys.stdin.read().strip()
    if line:
        nums = list(map(int, line.split()))
        max_p = min_p = result = nums[0]
        for x in nums[1:]:
            if x < 0:
                max_p, min_p = min_p, max_p
            max_p = max(x, max_p * x)
            min_p = min(x, min_p * x)
            result = max(result, max_p)
        print(result)`,
      "JAVASCRIPT": `const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', (line) => {
  const nums = line.trim().split(/\\s+/).map(Number);
  let maxP = nums[0], minP = nums[0], result = nums[0];
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] < 0) {
      const temp = maxP;
      maxP = minP;
      minP = temp;
    }
    maxP = Math.max(nums[i], maxP * nums[i]);
    minP = Math.min(nums[i], minP * nums[i]);
    result = Math.max(result, maxP);
  }
  console.log(result);
  process.exit(0);
});`
    },
    testCases: [
      { input: "2 3 -2 4", output: "6", isHidden: false },
      { input: "-2 0 -1", output: "0", isHidden: false },
      { input: "-2 3 -4", output: "24", isHidden: false },
      { input: "0 2", output: "2", isHidden: true },
      { input: "-1 -2 -3 -4", output: "24", isHidden: true }
    ]
  },
  {
    title: "Search in Rotated Sorted Array",
    difficulty: "MEDIUM",
    tags: ["Array", "Binary Search"],
    description: "There is an integer array `nums` sorted in ascending order (with distinct values).\n\nPrior to being passed to your function, `nums` is possibly rotated at an unknown pivot index `k` (`1 <= k < nums.length`).\n\nGiven the array `nums` after the possible rotation and an integer `target`, return the index of `target` if it is in `nums`, or `-1` if it is not in `nums`.\n\nYou must write an algorithm with `O(log n)` runtime complexity.\n\n### Example 1:\n```text\nInput: nums = [4,5,6,7,0,1,2], target = 0\nOutput: 4\n```\n\n### Constraints:\n- `1 <= nums.length <= 5000`\n- `-10^4 <= nums[i] <= 10^4`\n- All values of `nums` are unique.\n- `nums` is an ascending array that is possibly rotated.",
    constraints: "1 <= nums.length <= 5000\n-10^4 <= nums[i] <= 10^4\nAll values of nums are unique.\nnums is an ascending array that is possibly rotated.",
    hints: "In any rotated sorted array, at least one half (left or right) is always strictly sorted. Determine which half is sorted and adjust binary search boundaries accordingly.",
    editorial: "Compute mid. If `nums[left] <= nums[mid]`, the left half is normally sorted. Check if target lies in `[nums[left], nums[mid]]`. Otherwise, the right half is sorted.",
    examples: {
      "C++": { input: "nums = [4,5,6,7,0,1,2], target = 0", output: "4", explanation: "0 is at index 4 in nums." },
      "JAVA": { input: "nums = [4,5,6,7,0,1,2], target = 0", output: "4", explanation: "0 is at index 4 in nums." },
      "PYTHON": { input: "nums = [4,5,6,7,0,1,2], target = 0", output: "4", explanation: "0 is at index 4 in nums." },
      "JAVASCRIPT": { input: "nums = [4,5,6,7,0,1,2], target = 0", output: "4", explanation: "0 is at index 4 in nums." }
    },
    codeSnippets: {
      "C++": `#include <iostream>
#include <vector>
#include <sstream>
using namespace std;

int search(vector<int>& nums, int target) {
    // Write your code here
    return -1;
}

int main() {
    string line;
    if (getline(cin, line)) {
        stringstream ss(line);
        vector<int> nums;
        int num;
        while (ss >> num) nums.push_back(num);
        int target;
        if (cin >> target) {
            cout << search(nums, target) << endl;
        }
    }
    return 0;
}`,
      "JAVA": `import java.util.*;

public class Main {
    public static int search(int[] nums, int target) {
        // Write your code here
        return -1;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextLine()) {
            String[] parts = sc.nextLine().trim().split("\\s+");
            int[] nums = new int[parts.length];
            for (int i = 0; i < parts.length; i++) nums[i] = Integer.parseInt(parts[i]);
            if (sc.hasNextInt()) {
                int target = sc.nextInt();
                System.out.println(search(nums, target));
            }
        }
        sc.close();
    }
}`,
      "PYTHON": `import sys
from typing import List

def search(nums: List[int], target: int) -> int:
    # Write your code here
    return -1

if __name__ == "__main__":
    lines = sys.stdin.read().splitlines()
    if len(lines) >= 2:
        nums = list(map(int, lines[0].strip().split()))
        target = int(lines[1].strip())
        print(search(nums, target))`,
      "JAVASCRIPT": `const readline = require('readline');

function search(nums, target) {
  // Write your code here
  return -1;
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

const lines = [];
rl.on('line', (line) => lines.push(line.trim()));
rl.on('close', () => {
  if (lines.length >= 2) {
    const nums = lines[0].split(/\\s+/).map(Number);
    const target = Number(lines[1]);
    console.log(search(nums, target));
  }
});`
    },
    referenceSolutions: {
      "C++": `#include <iostream>
#include <vector>
#include <sstream>
using namespace std;

int main() {
    string line;
    if (getline(cin, line)) {
        stringstream ss(line);
        vector<int> nums;
        int num;
        while (ss >> num) nums.push_back(num);
        int target;
        if (cin >> target) {
            int left = 0, right = nums.size() - 1, ans = -1;
            while (left <= right) {
                int mid = left + (right - left) / 2;
                if (nums[mid] == target) { ans = mid; break; }
                if (nums[left] <= nums[mid]) {
                    if (nums[left] <= target && target < nums[mid]) right = mid - 1;
                    else left = mid + 1;
                } else {
                    if (nums[mid] < target && target <= nums[right]) left = mid + 1;
                    else right = mid - 1;
                }
            }
            cout << ans << endl;
        }
    }
    return 0;
}`,
      "JAVA": `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextLine()) {
            String[] parts = sc.nextLine().trim().split("\\s+");
            int[] nums = new int[parts.length];
            for (int i = 0; i < parts.length; i++) nums[i] = Integer.parseInt(parts[i]);
            if (sc.hasNextInt()) {
                int target = sc.nextInt();
                int left = 0, right = nums.length - 1, ans = -1;
                while (left <= right) {
                    int mid = left + (right - left) / 2;
                    if (nums[mid] == target) { ans = mid; break; }
                    if (nums[left] <= nums[mid]) {
                        if (nums[left] <= target && target < nums[mid]) right = mid - 1;
                        else left = mid + 1;
                    } else {
                        if (nums[mid] < target && target <= nums[right]) left = mid + 1;
                        else right = mid - 1;
                    }
                }
                System.out.println(ans);
            }
        }
        sc.close();
    }
}`,
      "PYTHON": `import sys

if __name__ == "__main__":
    lines = sys.stdin.read().splitlines()
    if len(lines) >= 2:
        nums = list(map(int, lines[0].strip().split()))
        target = int(lines[1].strip())
        left, right = 0, len(nums) - 1
        ans = -1
        while left <= right:
            mid = (left + right) // 2
            if nums[mid] == target:
                ans = mid
                break
            if nums[left] <= nums[mid]:
                if nums[left] <= target < nums[mid]:
                    right = mid - 1
                else:
                    left = mid + 1
            else:
                if nums[mid] < target <= nums[right]:
                    left = mid + 1
                else:
                    right = mid - 1
        print(ans)`,
      "JAVASCRIPT": `const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

const lines = [];
rl.on('line', (line) => lines.push(line.trim()));
rl.on('close', () => {
  if (lines.length >= 2) {
    const nums = lines[0].split(/\\s+/).map(Number);
    const target = Number(lines[1]);
    let left = 0, right = nums.length - 1, ans = -1;
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (nums[mid] === target) { ans = mid; break; }
      if (nums[left] <= nums[mid]) {
        if (nums[left] <= target && target < nums[mid]) right = mid - 1;
        else left = mid + 1;
      } else {
        if (nums[mid] < target && target <= nums[right]) left = mid + 1;
        else right = mid - 1;
      }
    }
    console.log(ans);
  }
});`
    },
    testCases: [
      { input: "4 5 6 7 0 1 2\n0", output: "4", isHidden: false },
      { input: "4 5 6 7 0 1 2\n3", output: "-1", isHidden: false },
      { input: "1\n0", output: "-1", isHidden: false },
      { input: "6 7 8 1 2 3 4 5\n8", output: "2", isHidden: true },
      { input: "5 1 3\n5", output: "0", isHidden: true }
    ]
  },
  {
    title: "Koko Eating Bananas",
    difficulty: "MEDIUM",
    tags: ["Array", "Binary Search"],
    description: "Koko loves to eat bananas. There are `n` piles of bananas, the `i-th` pile has `piles[i]` bananas. The guards have gone and will come back in `h` hours.\n\nKoko can decide her bananas-per-hour eating speed of `k`. Each hour, she chooses some pile of bananas and eats `k` bananas from that pile. If the pile has less than `k` bananas, she eats all of them instead and will not eat any more bananas during this hour.\n\nKoko likes to eat slowly but still wants to finish eating all the bananas before the guards return.\n\nReturn the minimum integer `k` such that she can eat all the bananas within `h` hours.\n\n### Example 1:\n```text\nInput: piles = [3,6,7,11], h = 8\nOutput: 4\n```\n\n### Constraints:\n- `1 <= piles.length <= 10^4`\n- `piles.length <= h <= 10^9`\n- `1 <= piles[i] <= 10^9`",
    constraints: "1 <= piles.length <= 10^4\npiles.length <= h <= 10^9\n1 <= piles[i] <= 10^9",
    hints: "The eating speed k must lie between 1 and max(piles). Can you apply binary search on this answer range?",
    editorial: "Perform binary search on the answer range [1, max(piles)]. For a candidate speed mid, compute total hours required: sum of ceil(pile / mid). If total <= h, search left; else search right.",
    examples: {
      "C++": { input: "piles = [3,6,7,11], h = 8", output: "4", explanation: "Koko can eat with speed 4 bananas/hour." },
      "JAVA": { input: "piles = [3,6,7,11], h = 8", output: "4", explanation: "Koko can eat with speed 4 bananas/hour." },
      "PYTHON": { input: "piles = [3,6,7,11], h = 8", output: "4", explanation: "Koko can eat with speed 4 bananas/hour." },
      "JAVASCRIPT": { input: "piles = [3,6,7,11], h = 8", output: "4", explanation: "Koko can eat with speed 4 bananas/hour." }
    },
    codeSnippets: {
      "C++": `#include <iostream>
#include <vector>
#include <sstream>
#include <algorithm>
#include <cmath>
using namespace std;

int minEatingSpeed(vector<int>& piles, int h) {
    // Write your code here
    return 1;
}

int main() {
    string line;
    if (getline(cin, line)) {
        stringstream ss(line);
        vector<int> piles;
        int val;
        while (ss >> val) piles.push_back(val);
        int h;
        if (cin >> h) {
            cout << minEatingSpeed(piles, h) << endl;
        }
    }
    return 0;
}`,
      "JAVA": `import java.util.*;

public class Main {
    public static int minEatingSpeed(int[] piles, int h) {
        // Write your code here
        return 1;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextLine()) {
            String[] parts = sc.nextLine().trim().split("\\s+");
            int[] piles = new int[parts.length];
            for (int i = 0; i < parts.length; i++) piles[i] = Integer.parseInt(parts[i]);
            if (sc.hasNextInt()) {
                int h = sc.nextInt();
                System.out.println(minEatingSpeed(piles, h));
            }
        }
        sc.close();
    }
}`,
      "PYTHON": `import sys
import math
from typing import List

def minEatingSpeed(piles: List[int], h: int) -> int:
    # Write your code here
    return 1

if __name__ == "__main__":
    lines = sys.stdin.read().splitlines()
    if len(lines) >= 2:
        piles = list(map(int, lines[0].strip().split()))
        h = int(lines[1].strip())
        print(minEatingSpeed(piles, h))`,
      "JAVASCRIPT": `const readline = require('readline');

function minEatingSpeed(piles, h) {
  // Write your code here
  return 1;
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

const lines = [];
rl.on('line', (line) => lines.push(line.trim()));
rl.on('close', () => {
  if (lines.length >= 2) {
    const piles = lines[0].split(/\\s+/).map(Number);
    const h = Number(lines[1]);
    console.log(minEatingSpeed(piles, h));
  }
});`
    },
    referenceSolutions: {
      "C++": `#include <iostream>
#include <vector>
#include <sstream>
#include <algorithm>
using namespace std;

int main() {
    string line;
    if (getline(cin, line)) {
        stringstream ss(line);
        vector<int> piles;
        int val;
        while (ss >> val) piles.push_back(val);
        long long h;
        if (cin >> h) {
            long long left = 1, right = 0;
            for (int p : piles) right = max(right, (long long)p);
            long long ans = right;
            while (left <= right) {
                long long mid = left + (right - left) / 2;
                long long hours = 0;
                for (int p : piles) {
                    hours += (p + mid - 1) / mid;
                }
                if (hours <= h) {
                    ans = mid;
                    right = mid - 1;
                } else {
                    left = mid + 1;
                }
            }
            cout << ans << endl;
        }
    }
    return 0;
}`,
      "JAVA": `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextLine()) {
            String[] parts = sc.nextLine().trim().split("\\s+");
            int[] piles = new int[parts.length];
            long right = 0;
            for (int i = 0; i < parts.length; i++) {
                piles[i] = Integer.parseInt(parts[i]);
                right = Math.max(right, piles[i]);
            }
            if (sc.hasNextLong()) {
                long h = sc.nextLong();
                long left = 1, ans = right;
                while (left <= right) {
                    long mid = left + (right - left) / 2;
                    long hours = 0;
                    for (int p : piles) {
                        hours += (p + mid - 1) / mid;
                    }
                    if (hours <= h) {
                        ans = mid;
                        right = mid - 1;
                    } else {
                        left = mid + 1;
                    }
                }
                System.out.println(ans);
            }
        }
        sc.close();
    }
}`,
      "PYTHON": `import sys
import math

if __name__ == "__main__":
    lines = sys.stdin.read().splitlines()
    if len(lines) >= 2:
        piles = list(map(int, lines[0].strip().split()))
        h = int(lines[1].strip())
        left, right = 1, max(piles)
        ans = right
        while left <= right:
            mid = (left + right) // 2
            hours = sum(math.ceil(p / mid) for p in piles)
            if hours <= h:
                ans = mid
                right = mid - 1
            else:
                left = mid + 1
        print(ans)`,
      "JAVASCRIPT": `const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

const lines = [];
rl.on('line', (line) => lines.push(line.trim()));
rl.on('close', () => {
  if (lines.length >= 2) {
    const piles = lines[0].split(/\\s+/).map(Number);
    const h = Number(lines[1]);
    let left = 1, right = Math.max(...piles), ans = right;
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      let hours = 0;
      for (const p of piles) {
        hours += Math.ceil(p / mid);
      }
      if (hours <= h) {
        ans = mid;
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }
    console.log(ans);
  }
});`
    },
    testCases: [
      { input: "3 6 7 11\n8", output: "4", isHidden: false },
      { input: "30 11 23 4 20\n5", output: "30", isHidden: false },
      { input: "30 11 23 4 20\n6", output: "23", isHidden: false },
      { input: "1000000000\n2", output: "500000000", isHidden: true },
      { input: "312884470\n312884469", output: "2", isHidden: true }
    ]
  }
];

async function seed() {
  console.log("Starting seeding of 5 new DSA problems...");
  try {
    // Find an existing admin or user to attach the problems to
    const adminUser = await db.user.findFirst({
      where: { role: "ADMIN" }
    }) || await db.user.findFirst();

    if (!adminUser) {
      throw new Error("No user found in the database to associate problems with. Please create a user first.");
    }

    console.log(`Using user account: ${adminUser.email || adminUser.name} (ID: ${adminUser.id})`);

    const allProblems = [...problemsData, ...striverProblems];
    for (const problemData of allProblems) {
      console.log(`Processing: "${problemData.title}"...`);

      // Prepare basic testcases array for the JSON column
      const testcasesJson = problemData.testCases.map((tc) => ({
        input: tc.input,
        output: tc.output
      }));

      // Check if problem already exists
      let existing = await db.problem.findFirst({
        where: {
          title: {
            equals: problemData.title,
            mode: "insensitive"
          }
        }
      });

      let problemId;
      if (existing) {
        console.log(`Problem "${problemData.title}" exists (ID: ${existing.id}). Updating data...`);
        const updated = await db.problem.update({
          where: { id: existing.id },
          data: {
            description: problemData.description,
            difficulty: problemData.difficulty,
            tags: problemData.tags,
            examples: problemData.examples,
            constraints: problemData.constraints,
            hints: problemData.hints,
            editorial: problemData.editorial,
            testcases: testcasesJson,
            codeSnippets: problemData.codeSnippets,
            referenceSolutions: problemData.referenceSolutions
          }
        });
        problemId = updated.id;
      } else {
        console.log(`Creating new problem "${problemData.title}"...`);
        const created = await db.problem.create({
          data: {
            title: problemData.title,
            description: problemData.description,
            difficulty: problemData.difficulty,
            tags: problemData.tags,
            userId: adminUser.id,
            examples: problemData.examples,
            constraints: problemData.constraints,
            hints: problemData.hints,
            editorial: problemData.editorial,
            testcases: testcasesJson,
            codeSnippets: problemData.codeSnippets,
            referenceSolutions: problemData.referenceSolutions
          }
        });
        problemId = created.id;
      }

      // Re-seed TestCase table rows for this problem
      await db.testCase.deleteMany({
        where: { problemId }
      });

      console.log(`Seeding ${problemData.testCases.length} test cases into TestCase table for "${problemData.title}"...`);
      for (const tc of problemData.testCases) {
        await db.testCase.create({
          data: {
            problemId,
            input: tc.input,
            output: tc.output,
            isHidden: tc.isHidden
          }
        });
      }

      console.log(`✓ "${problemData.title}" seeded successfully!`);
    }

    console.log(`All ${allProblems.length} DSA problems successfully seeded into PostgreSQL database!`);
  } catch (error) {
    console.error("Error during seeding:", error);
    process.exit(1);
  } finally {
    process.exit(0);
  }
}

seed();
