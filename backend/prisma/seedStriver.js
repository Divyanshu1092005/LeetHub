import "dotenv/config";
import { db } from "../src/libs/db.js";

export const striverProblems = [
  {
    title: "Sort Colors",
    difficulty: "MEDIUM",
    tags: ["Array", "Two Pointers", "Sorting"],
    description: "Given an array `nums` with `n` objects colored red, white, or blue, sort them **in-place** so that objects of the same color are adjacent, with the colors in the order red, white, and blue.\n\nWe will use the integers `0`, `1`, and `2` to represent the color red, white, and blue, respectively.\n\nYou must solve this problem without using the library's sort function.\n\n### Example 1:\n```text\nInput: nums = [2,0,2,1,1,0]\nOutput: [0,0,1,1,2,2]\n```\n\n### Constraints:\n- `n == nums.length`\n- `1 <= n <= 300`\n- `nums[i]` is either `0`, `1`, or `2`.",
    constraints: "1 <= nums.length <= 300\nnums[i] is either 0, 1, or 2.",
    hints: "Can you solve this in a single pass with constant space using the Dutch National Flag algorithm (three pointers)?",
    editorial: "Maintain three pointers: low, mid, and high. Swap elements to ensure all 0s are before low and all 2s are after high.",
    examples: {
      "C++": { input: "nums = [2,0,2,1,1,0]", output: "0 0 1 1 2 2", explanation: "Sorted in-place by colors 0, 1, 2." },
      "JAVA": { input: "nums = [2,0,2,1,1,0]", output: "0 0 1 1 2 2", explanation: "Sorted in-place by colors 0, 1, 2." },
      "PYTHON": { input: "nums = [2,0,2,1,1,0]", output: "0 0 1 1 2 2", explanation: "Sorted in-place by colors 0, 1, 2." },
      "JAVASCRIPT": { input: "nums = [2,0,2,1,1,0]", output: "0 0 1 1 2 2", explanation: "Sorted in-place by colors 0, 1, 2." }
    },
    codeSnippets: {
      "C++": `#include <iostream>
#include <vector>
#include <sstream>
using namespace std;

class Solution {
public:
    void sortColors(vector<int>& nums) {
        // Write your code here
    }
};

int main() {
    string line;
    if (getline(cin, line)) {
        stringstream ss(line);
        vector<int> nums;
        int val;
        while (ss >> val) nums.push_back(val);
        Solution sol;
        sol.sortColors(nums);
        for (int i = 0; i < nums.size(); i++) {
            cout << nums[i] << (i == nums.size() - 1 ? "" : " ");
        }
        cout << endl;
    }
    return 0;
}`,
      "JAVA": `import java.util.*;

class Solution {
    public void sortColors(int[] nums) {
        // Write your code here
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextLine()) {
            String[] parts = sc.nextLine().trim().split("\\s+");
            int[] nums = new int[parts.length];
            for (int i = 0; i < parts.length; i++) nums[i] = Integer.parseInt(parts[i]);
            Solution sol = new Solution();
            sol.sortColors(nums);
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < nums.length; i++) {
                sb.append(nums[i]).append(i == nums.length - 1 ? "" : " ");
            }
            System.out.println(sb.toString());
        }
        sc.close();
    }
}`,
      "PYTHON": `import sys
from typing import List

class Solution:
    def sortColors(self, nums: List[int]) -> None:
        # Write your code here
        pass

if __name__ == "__main__":
    line = sys.stdin.read().strip()
    if line:
        nums = list(map(int, line.split()))
        sol = Solution()
        sol.sortColors(nums)
        print(" ".join(map(str, nums)))`,
      "JAVASCRIPT": `const readline = require('readline');

class Solution {
  sortColors(nums) {
    // Write your code here
  }
}

const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });
rl.on('line', (line) => {
  const nums = line.trim().split(/\\s+/).map(Number);
  const sol = new Solution();
  sol.sortColors(nums);
  console.log(nums.join(' '));
  process.exit(0);
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
        vector<int> nums; int val;
        while (ss >> val) nums.push_back(val);
        int low = 0, mid = 0, high = nums.size() - 1;
        while (mid <= high) {
            if (nums[mid] == 0) swap(nums[low++], nums[mid++]);
            else if (nums[mid] == 1) mid++;
            else swap(nums[mid], nums[high--]);
        }
        for (size_t i = 0; i < nums.size(); i++) cout << nums[i] << (i == nums.size() - 1 ? "" : " ");
        cout << endl;
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
            int low = 0, mid = 0, high = nums.length - 1;
            while (mid <= high) {
                if (nums[mid] == 0) { int t = nums[low]; nums[low++] = nums[mid]; nums[mid++] = t; }
                else if (nums[mid] == 1) mid++;
                else { int t = nums[mid]; nums[mid] = nums[high]; nums[high--] = t; }
            }
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < nums.length; i++) sb.append(nums[i]).append(i == nums.length - 1 ? "" : " ");
            System.out.println(sb.toString());
        }
        sc.close();
    }
}`,
      "PYTHON": `import sys
if __name__ == "__main__":
    line = sys.stdin.read().strip()
    if line:
        nums = list(map(int, line.split()))
        low, mid, high = 0, 0, len(nums) - 1
        while mid <= high:
            if nums[mid] == 0:
                nums[low], nums[mid] = nums[mid], nums[low]
                low += 1
                mid += 1
            elif nums[mid] == 1:
                mid += 1
            else:
                nums[mid], nums[high] = nums[high], nums[mid]
                high -= 1
        print(" ".join(map(str, nums)))`,
      "JAVASCRIPT": `const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });
rl.on('line', (line) => {
  const nums = line.trim().split(/\\s+/).map(Number);
  let low = 0, mid = 0, high = nums.length - 1;
  while (mid <= high) {
    if (nums[mid] === 0) {
      [nums[low], nums[mid]] = [nums[mid], nums[low]];
      low++; mid++;
    } else if (nums[mid] === 1) mid++;
    else {
      [nums[mid], nums[high]] = [nums[high], nums[mid]];
      high--;
    }
  }
  console.log(nums.join(' '));
  process.exit(0);
});`
    },
    testCases: [
      { input: "2 0 2 1 1 0", output: "0 0 1 1 2 2", isHidden: false },
      { input: "2 0 1", output: "0 1 2", isHidden: false },
      { input: "0", output: "0", isHidden: false },
      { input: "1 1 1 0 0 2 2", output: "0 0 1 1 1 2 2", isHidden: true },
      { input: "2 2 1 1 0 0", output: "0 0 1 1 2 2", isHidden: true }
    ]
  },
  {
    title: "Next Permutation",
    difficulty: "MEDIUM",
    tags: ["Array", "Two Pointers"],
    description: "A **permutation** of an array of integers is an arrangement of its members into a sequence or linear order.\n\nGiven an array of integers `nums`, find the next lexicographically greater permutation of its numbers.\n\nIf such arrangement is not possible, the array must be rearranged as the lowest possible order (i.e., sorted in ascending order).\n\nThe replacement must be **in place** and use only constant extra memory.\n\n### Example 1:\n```text\nInput: nums = [1,2,3]\nOutput: [1,3,2]\n```\n\n### Constraints:\n- `1 <= nums.length <= 100`\n- `0 <= nums[i] <= 100`",
    constraints: "1 <= nums.length <= 100\n0 <= nums[i] <= 100",
    hints: "Find the first decreasing element from the right, swap it with the smallest element larger than it to its right, then reverse the remaining suffix.",
    editorial: "Traverse from right to find pivot i where nums[i] < nums[i+1]. Then find successor > nums[i] from right, swap, and reverse the suffix from i+1 to end.",
    examples: {
      "C++": { input: "nums = [1,2,3]", output: "1 3 2", explanation: "The next lexicographical permutation of 1 2 3 is 1 3 2." },
      "JAVA": { input: "nums = [1,2,3]", output: "1 3 2", explanation: "The next lexicographical permutation of 1 2 3 is 1 3 2." },
      "PYTHON": { input: "nums = [1,2,3]", output: "1 3 2", explanation: "The next lexicographical permutation of 1 2 3 is 1 3 2." },
      "JAVASCRIPT": { input: "nums = [1,2,3]", output: "1 3 2", explanation: "The next lexicographical permutation of 1 2 3 is 1 3 2." }
    },
    codeSnippets: {
      "C++": `#include <iostream>
#include <vector>
#include <sstream>
#include <algorithm>
using namespace std;

class Solution {
public:
    void nextPermutation(vector<int>& nums) {
        // Write your code here
    }
};

int main() {
    string line;
    if (getline(cin, line)) {
        stringstream ss(line);
        vector<int> nums; int val;
        while (ss >> val) nums.push_back(val);
        Solution sol;
        sol.nextPermutation(nums);
        for (int i = 0; i < nums.size(); i++) cout << nums[i] << (i == nums.size() - 1 ? "" : " ");
        cout << endl;
    }
    return 0;
}`,
      "JAVA": `import java.util.*;

class Solution {
    public void nextPermutation(int[] nums) {
        // Write your code here
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextLine()) {
            String[] parts = sc.nextLine().trim().split("\\s+");
            int[] nums = new int[parts.length];
            for (int i = 0; i < parts.length; i++) nums[i] = Integer.parseInt(parts[i]);
            Solution sol = new Solution();
            sol.nextPermutation(nums);
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < nums.length; i++) sb.append(nums[i]).append(i == nums.length - 1 ? "" : " ");
            System.out.println(sb.toString());
        }
        sc.close();
    }
}`,
      "PYTHON": `import sys
from typing import List

class Solution:
    def nextPermutation(self, nums: List[int]) -> None:
        # Write your code here
        pass

if __name__ == "__main__":
    line = sys.stdin.read().strip()
    if line:
        nums = list(map(int, line.split()))
        sol = Solution()
        sol.nextPermutation(nums)
        print(" ".join(map(str, nums)))`,
      "JAVASCRIPT": `const readline = require('readline');

class Solution {
  nextPermutation(nums) {
    // Write your code here
  }
}

const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });
rl.on('line', (line) => {
  const nums = line.trim().split(/\\s+/).map(Number);
  const sol = new Solution();
  sol.nextPermutation(nums);
  console.log(nums.join(' '));
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
        vector<int> nums; int val;
        while (ss >> val) nums.push_back(val);
        int n = nums.size(), i = n - 2;
        while (i >= 0 && nums[i] >= nums[i + 1]) i--;
        if (i >= 0) {
            int j = n - 1;
            while (nums[j] <= nums[i]) j--;
            swap(nums[i], nums[j]);
        }
        reverse(nums.begin() + i + 1, nums.end());
        for (int k = 0; k < n; k++) cout << nums[k] << (k == n - 1 ? "" : " ");
        cout << endl;
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
            int n = nums.length, i = n - 2;
            while (i >= 0 && nums[i] >= nums[i + 1]) i--;
            if (i >= 0) {
                int j = n - 1;
                while (nums[j] <= nums[i]) j--;
                int t = nums[i]; nums[i] = nums[j]; nums[j] = t;
            }
            int l = i + 1, r = n - 1;
            while (l < r) { int t = nums[l]; nums[l++] = nums[r]; nums[r--] = t; }
            StringBuilder sb = new StringBuilder();
            for (int k = 0; k < n; k++) sb.append(nums[k]).append(k == n - 1 ? "" : " ");
            System.out.println(sb.toString());
        }
        sc.close();
    }
}`,
      "PYTHON": `import sys
if __name__ == "__main__":
    line = sys.stdin.read().strip()
    if line:
        nums = list(map(int, line.split()))
        n = len(nums)
        i = n - 2
        while i >= 0 and nums[i] >= nums[i + 1]:
            i -= 1
        if i >= 0:
            j = n - 1
            while nums[j] <= nums[i]:
                j -= 1
            nums[i], nums[j] = nums[j], nums[i]
        nums[i + 1:] = reversed(nums[i + 1:])
        print(" ".join(map(str, nums)))`,
      "JAVASCRIPT": `const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });
rl.on('line', (line) => {
  const nums = line.trim().split(/\\s+/).map(Number);
  let n = nums.length, i = n - 2;
  while (i >= 0 && nums[i] >= nums[i + 1]) i--;
  if (i >= 0) {
    let j = n - 1;
    while (nums[j] <= nums[i]) j--;
    [nums[i], nums[j]] = [nums[j], nums[i]];
  }
  let l = i + 1, r = n - 1;
  while (l < r) {
    [nums[l], nums[r]] = [nums[r], nums[l]];
    l++; r--;
  }
  console.log(nums.join(' '));
  process.exit(0);
});`
    },
    testCases: [
      { input: "1 2 3", output: "1 3 2", isHidden: false },
      { input: "3 2 1", output: "1 2 3", isHidden: false },
      { input: "1 1 5", output: "1 5 1", isHidden: false },
      { input: "1 3 5 4 2", output: "1 4 2 3 5", isHidden: true },
      { input: "2 3 1", output: "3 1 2", isHidden: true }
    ]
  },
  {
    title: "Best Time to Buy and Sell Stock",
    difficulty: "EASY",
    tags: ["Array", "Dynamic Programming"],
    description: "You are given an array `prices` where `prices[i]` is the price of a given stock on the `i-th` day.\n\nYou want to maximize your profit by choosing a **single day** to buy one stock and choosing a **different day in the future** to sell that stock.\n\nReturn the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return `0`.\n\n### Example 1:\n```text\nInput: prices = [7,1,5,3,6,4]\nOutput: 5\nExplanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.\n```\n\n### Constraints:\n- `1 <= prices.length <= 10^5`\n- `0 <= prices[i] <= 10^4`",
    constraints: "1 <= prices.length <= 10^5\n0 <= prices[i] <= 10^4",
    hints: "Track the minimum price seen so far and compare each day's price against that minimum.",
    editorial: "Maintain minPrice = infinity. Iterate through prices: minPrice = min(minPrice, price), maxProfit = max(maxProfit, price - minPrice).",
    examples: {
      "C++": { input: "prices = [7,1,5,3,6,4]", output: "5", explanation: "Buy on price 1, sell on price 6." },
      "JAVA": { input: "prices = [7,1,5,3,6,4]", output: "5", explanation: "Buy on price 1, sell on price 6." },
      "PYTHON": { input: "prices = [7,1,5,3,6,4]", output: "5", explanation: "Buy on price 1, sell on price 6." },
      "JAVASCRIPT": { input: "prices = [7,1,5,3,6,4]", output: "5", explanation: "Buy on price 1, sell on price 6." }
    },
    codeSnippets: {
      "C++": `#include <iostream>
#include <vector>
#include <sstream>
#include <algorithm>
using namespace std;

class Solution {
public:
    int maxProfit(vector<int>& prices) {
        // Write your code here
        return 0;
    }
};

int main() {
    string line;
    if (getline(cin, line)) {
        stringstream ss(line);
        vector<int> prices; int val;
        while (ss >> val) prices.push_back(val);
        Solution sol;
        cout << sol.maxProfit(prices) << endl;
    }
    return 0;
}`,
      "JAVA": `import java.util.*;

class Solution {
    public int maxProfit(int[] prices) {
        // Write your code here
        return 0;
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextLine()) {
            String[] parts = sc.nextLine().trim().split("\\s+");
            int[] prices = new int[parts.length];
            for (int i = 0; i < parts.length; i++) prices[i] = Integer.parseInt(parts[i]);
            Solution sol = new Solution();
            System.out.println(sol.maxProfit(prices));
        }
        sc.close();
    }
}`,
      "PYTHON": `import sys
from typing import List

class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        # Write your code here
        return 0

if __name__ == "__main__":
    line = sys.stdin.read().strip()
    if line:
        prices = list(map(int, line.split()))
        sol = Solution()
        print(sol.maxProfit(prices))`,
      "JAVASCRIPT": `const readline = require('readline');

class Solution {
  maxProfit(prices) {
    // Write your code here
    return 0;
  }
}

const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });
rl.on('line', (line) => {
  const prices = line.trim().split(/\\s+/).map(Number);
  const sol = new Solution();
  console.log(sol.maxProfit(prices));
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
        vector<int> prices; int p;
        while (ss >> p) prices.push_back(p);
        int minP = 1e9, maxP = 0;
        for (int price : prices) {
            minP = min(minP, price);
            maxP = max(maxP, price - minP);
        }
        cout << maxP << endl;
    }
    return 0;
}`,
      "JAVA": `import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextLine()) {
            String[] parts = sc.nextLine().trim().split("\\s+");
            int minP = Integer.MAX_VALUE, maxP = 0;
            for (String part : parts) {
                int price = Integer.parseInt(part);
                minP = Math.min(minP, price);
                maxP = Math.max(maxP, price - minP);
            }
            System.out.println(maxP);
        }
        sc.close();
    }
}`,
      "PYTHON": `import sys
if __name__ == "__main__":
    line = sys.stdin.read().strip()
    if line:
        prices = list(map(int, line.split()))
        min_p = float('inf')
        max_p = 0
        for price in prices:
            min_p = min(min_p, price)
            max_p = max(max_p, price - min_p)
        print(max_p)`,
      "JAVASCRIPT": `const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });
rl.on('line', (line) => {
  const prices = line.trim().split(/\\s+/).map(Number);
  let minP = Infinity, maxP = 0;
  for (const price of prices) {
    minP = Math.min(minP, price);
    maxP = Math.max(maxP, price - minP);
  }
  console.log(maxP);
  process.exit(0);
});`
    },
    testCases: [
      { input: "7 1 5 3 6 4", output: "5", isHidden: false },
      { input: "7 6 4 3 1", output: "0", isHidden: false },
      { input: "2 4 1", output: "2", isHidden: false },
      { input: "1 2 3 4 5", output: "4", isHidden: true },
      { input: "3 2 6 5 0 3", output: "4", isHidden: true }
    ]
  },
  {
    title: "Merge Intervals",
    difficulty: "MEDIUM",
    tags: ["Array", "Sorting"],
    description: "Given an array of `intervals` where `intervals[i] = [start_i, end_i]`, merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.\n\n### Example 1:\n```text\nInput: intervals = [[1,3],[2,6],[8,10],[15,18]]\nOutput: 1 6, 8 10, 15 18\nExplanation: Intervals [1,3] and [2,6] overlap, so merge them into [1,6].\n```\n\n### Constraints:\n- `1 <= intervals.length <= 10^4`\n- `intervals[i].length == 2`\n- `0 <= start_i <= end_i <= 10^4`",
    constraints: "1 <= intervals.length <= 10^4\n0 <= start_i <= end_i <= 10^4",
    hints: "Sort intervals by their starting points. Then, merge consecutive intervals if they overlap.",
    editorial: "Sort intervals by start time. Iterate through: if current interval overlaps with the last merged interval (start <= prev.end), merge them (prev.end = max(prev.end, end)); else append.",
    examples: {
      "C++": { input: "1 3, 2 6, 8 10, 15 18", output: "1 6, 8 10, 15 18", explanation: "Merged overlapping intervals." },
      "JAVA": { input: "1 3, 2 6, 8 10, 15 18", output: "1 6, 8 10, 15 18", explanation: "Merged overlapping intervals." },
      "PYTHON": { input: "1 3, 2 6, 8 10, 15 18", output: "1 6, 8 10, 15 18", explanation: "Merged overlapping intervals." },
      "JAVASCRIPT": { input: "1 3, 2 6, 8 10, 15 18", output: "1 6, 8 10, 15 18", explanation: "Merged overlapping intervals." }
    },
    codeSnippets: {
      "C++": `#include <iostream>
#include <vector>
#include <sstream>
#include <algorithm>
using namespace std;

class Solution {
public:
    vector<vector<int>> merge(vector<vector<int>>& intervals) {
        // Write your code here
        return {};
    }
};

int main() {
    string line;
    if (getline(cin, line)) {
        stringstream ss(line);
        string pairStr;
        vector<vector<int>> intervals;
        while (getline(ss, pairStr, ',')) {
            stringstream pss(pairStr);
            int s, e;
            if (pss >> s >> e) intervals.push_back({s, e});
        }
        Solution sol;
        vector<vector<int>> res = sol.merge(intervals);
        for (size_t i = 0; i < res.size(); i++) {
            cout << res[i][0] << " " << res[i][1] << (i == res.size() - 1 ? "" : ", ");
        }
        cout << endl;
    }
    return 0;
}`,
      "JAVA": `import java.util.*;

class Solution {
    public int[][] merge(int[][] intervals) {
        // Write your code here
        return new int[0][0];
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextLine()) {
            String line = sc.nextLine().trim();
            String[] pairs = line.split(",");
            List<int[]> list = new ArrayList<>();
            for (String p : pairs) {
                String[] parts = p.trim().split("\\s+");
                if (parts.length >= 2) {
                    list.add(new int[]{Integer.parseInt(parts[0]), Integer.parseInt(parts[1])});
                }
            }
            int[][] intervals = list.toArray(new int[list.size()][]);
            Solution sol = new Solution();
            int[][] res = sol.merge(intervals);
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < res.length; i++) {
                sb.append(res[i][0]).append(" ").append(res[i][1]).append(i == res.length - 1 ? "" : ", ");
            }
            System.out.println(sb.toString());
        }
        sc.close();
    }
}`,
      "PYTHON": `import sys
from typing import List

class Solution:
    def merge(self, intervals: List[List[int]]) -> List[List[int]]:
        # Write your code here
        return []

if __name__ == "__main__":
    line = sys.stdin.read().strip()
    if line:
        raw_pairs = line.split(",")
        intervals = []
        for p in raw_pairs:
            parts = list(map(int, p.strip().split()))
            if len(parts) >= 2:
                intervals.append([parts[0], parts[1]])
        sol = Solution()
        res = sol.merge(intervals)
        print(", ".join(f"{x[0]} {x[1]}" for x in res))`,
      "JAVASCRIPT": `const readline = require('readline');

class Solution {
  merge(intervals) {
    // Write your code here
    return [];
  }
}

const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });
rl.on('line', (line) => {
  const pairs = line.trim().split(',').map((p) => p.trim().split(/\\s+/).map(Number));
  const sol = new Solution();
  const res = sol.merge(pairs);
  console.log(res.map((r) => \`\${r[0]} \${r[1]}\`).join(', '));
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
        string pairStr;
        vector<vector<int>> intervals;
        while (getline(ss, pairStr, ',')) {
            stringstream pss(pairStr);
            int s, e;
            if (pss >> s >> e) intervals.push_back({s, e});
        }
        if (intervals.empty()) return 0;
        sort(intervals.begin(), intervals.end());
        vector<vector<int>> res;
        res.push_back(intervals[0]);
        for (size_t i = 1; i < intervals.size(); i++) {
            if (intervals[i][0] <= res.back()[1]) {
                res.back()[1] = max(res.back()[1], intervals[i][1]);
            } else {
                res.push_back(intervals[i]);
            }
        }
        for (size_t i = 0; i < res.size(); i++) {
            cout << res[i][0] << " " << res[i][1] << (i == res.size() - 1 ? "" : ", ");
        }
        cout << endl;
    }
    return 0;
}`,
      "JAVA": `import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextLine()) {
            String line = sc.nextLine().trim();
            String[] pairs = line.split(",");
            List<int[]> list = new ArrayList<>();
            for (String p : pairs) {
                String[] parts = p.trim().split("\\s+");
                if (parts.length >= 2) list.add(new int[]{Integer.parseInt(parts[0]), Integer.parseInt(parts[1])});
            }
            if (list.isEmpty()) return;
            list.sort(Comparator.comparingInt(a -> a[0]));
            List<int[]> res = new ArrayList<>();
            res.add(list.get(0));
            for (int i = 1; i < list.size(); i++) {
                int[] curr = list.get(i);
                int[] last = res.get(res.size() - 1);
                if (curr[0] <= last[1]) last[1] = Math.max(last[1], curr[1]);
                else res.add(curr);
            }
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < res.size(); i++) {
                sb.append(res.get(i)[0]).append(" ").append(res.get(i)[1]).append(i == res.size() - 1 ? "" : ", ");
            }
            System.out.println(sb.toString());
        }
        sc.close();
    }
}`,
      "PYTHON": `import sys
if __name__ == "__main__":
    line = sys.stdin.read().strip()
    if line:
        pairs = [list(map(int, p.strip().split())) for p in line.split(",") if p.strip()]
        if not pairs:
            sys.exit(0)
        pairs.sort(key=lambda x: x[0])
        res = [pairs[0]]
        for p in pairs[1:]:
            if p[0] <= res[-1][1]:
                res[-1][1] = max(res[-1][1], p[1])
            else:
                res.append(p)
        print(", ".join(f"{x[0]} {x[1]}" for x in res))`,
      "JAVASCRIPT": `const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });
rl.on('line', (line) => {
  const pairs = line.trim().split(',').map((p) => p.trim().split(/\\s+/).map(Number)).filter((p) => p.length >= 2);
  if (!pairs.length) process.exit(0);
  pairs.sort((a, b) => a[0] - b[0]);
  const res = [pairs[0]];
  for (let i = 1; i < pairs.length; i++) {
    const curr = pairs[i];
    const last = res[res.length - 1];
    if (curr[0] <= last[1]) last[1] = Math.max(last[1], curr[1]);
    else res.push(curr);
  }
  console.log(res.map((r) => \`\${r[0]} \${r[1]}\`).join(', '));
  process.exit(0);
});`
    },
    testCases: [
      { input: "1 3, 2 6, 8 10, 15 18", output: "1 6, 8 10, 15 18", isHidden: false },
      { input: "1 4, 4 5", output: "1 5", isHidden: false },
      { input: "1 4, 0 4", output: "0 4", isHidden: false },
      { input: "1 4, 2 3", output: "1 4", isHidden: true },
      { input: "2 3, 4 5, 6 7, 8 9, 1 10", output: "1 10", isHidden: true }
    ]
  },
  {
    title: "Find the Duplicate Number",
    difficulty: "MEDIUM",
    tags: ["Array", "Two Pointers", "Binary Search"],
    description: "Given an array of integers `nums` containing `n + 1` integers where each integer is in the range `[1, n]` inclusive.\n\nThere is only **one repeated number** in `nums`, return this repeated number.\n\nYou must solve the problem **without modifying** the array `nums` and using only constant extra space.\n\n### Example 1:\n```text\nInput: nums = [1,3,4,2,2]\nOutput: 2\n```\n\n### Constraints:\n- `1 <= n <= 10^5`\n- `nums.length == n + 1`\n- `1 <= nums[i] <= n`\n- All integers in `nums` appear only once except for precisely one integer which appears two or more times.",
    constraints: "1 <= n <= 10^5\nnums.length == n + 1\n1 <= nums[i] <= n",
    hints: "Can you think of the array values as pointers to indices in a linked list and apply Floyd's Tortoise and Hare cycle detection?",
    editorial: "Use Floyd's cycle detection. Initialize slow = nums[0], fast = nums[0]. Advance slow by 1 step, fast by 2 steps until they meet. Then reset slow to nums[0] and move both by 1 step until meeting point.",
    examples: {
      "C++": { input: "nums = [1,3,4,2,2]", output: "2", explanation: "2 is repeated." },
      "JAVA": { input: "nums = [1,3,4,2,2]", output: "2", explanation: "2 is repeated." },
      "PYTHON": { input: "nums = [1,3,4,2,2]", output: "2", explanation: "2 is repeated." },
      "JAVASCRIPT": { input: "nums = [1,3,4,2,2]", output: "2", explanation: "2 is repeated." }
    },
    codeSnippets: {
      "C++": `#include <iostream>
#include <vector>
#include <sstream>
using namespace std;

class Solution {
public:
    int findDuplicate(vector<int>& nums) {
        // Write your code here
        return 0;
    }
};

int main() {
    string line;
    if (getline(cin, line)) {
        stringstream ss(line);
        vector<int> nums; int val;
        while (ss >> val) nums.push_back(val);
        Solution sol;
        cout << sol.findDuplicate(nums) << endl;
    }
    return 0;
}`,
      "JAVA": `import java.util.*;

class Solution {
    public int findDuplicate(int[] nums) {
        // Write your code here
        return 0;
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextLine()) {
            String[] parts = sc.nextLine().trim().split("\\s+");
            int[] nums = new int[parts.length];
            for (int i = 0; i < parts.length; i++) nums[i] = Integer.parseInt(parts[i]);
            Solution sol = new Solution();
            System.out.println(sol.findDuplicate(nums));
        }
        sc.close();
    }
}`,
      "PYTHON": `import sys
from typing import List

class Solution:
    def findDuplicate(self, nums: List[int]) -> int:
        # Write your code here
        return 0

if __name__ == "__main__":
    line = sys.stdin.read().strip()
    if line:
        nums = list(map(int, line.split()))
        sol = Solution()
        print(sol.findDuplicate(nums))`,
      "JAVASCRIPT": `const readline = require('readline');

class Solution {
  findDuplicate(nums) {
    // Write your code here
    return 0;
  }
}

const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });
rl.on('line', (line) => {
  const nums = line.trim().split(/\\s+/).map(Number);
  const sol = new Solution();
  console.log(sol.findDuplicate(nums));
  process.exit(0);
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
        vector<int> nums; int val;
        while (ss >> val) nums.push_back(val);
        int slow = nums[0], fast = nums[0];
        do {
            slow = nums[slow];
            fast = nums[nums[fast]];
        } while (slow != fast);
        slow = nums[0];
        while (slow != fast) {
            slow = nums[slow];
            fast = nums[fast];
        }
        cout << slow << endl;
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
            int slow = nums[0], fast = nums[0];
            do {
                slow = nums[slow];
                fast = nums[nums[fast]];
            } while (slow != fast);
            slow = nums[0];
            while (slow != fast) {
                slow = nums[slow];
                fast = nums[fast];
            }
            System.out.println(slow);
        }
        sc.close();
    }
}`,
      "PYTHON": `import sys
if __name__ == "__main__":
    line = sys.stdin.read().strip()
    if line:
        nums = list(map(int, line.split()))
        slow = nums[0]
        fast = nums[0]
        while True:
            slow = nums[slow]
            fast = nums[nums[fast]]
            if slow == fast:
                break
        slow = nums[0]
        while slow != fast:
            slow = nums[slow]
            fast = nums[fast]
        print(slow)`,
      "JAVASCRIPT": `const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });
rl.on('line', (line) => {
  const nums = line.trim().split(/\\s+/).map(Number);
  let slow = nums[0], fast = nums[0];
  do {
    slow = nums[slow];
    fast = nums[nums[fast]];
  } while (slow !== fast);
  slow = nums[0];
  while (slow !== fast) {
    slow = nums[slow];
    fast = nums[fast];
  }
  console.log(slow);
  process.exit(0);
});`
    },
    testCases: [
      { input: "1 3 4 2 2", output: "2", isHidden: false },
      { input: "3 1 3 4 2", output: "3", isHidden: false },
      { input: "3 3 3 3 3", output: "3", isHidden: false },
      { input: "1 1", output: "1", isHidden: true },
      { input: "2 5 9 6 9 3 8 9 7 1", output: "9", isHidden: true }
    ]
  },
  {
    title: "Reverse Linked List",
    difficulty: "EASY",
    tags: ["Linked List", "Recursion"],
    description: "Given the `head` of a singly linked list, reverse the list, and return the reversed list.\n\n### Example 1:\n```text\nInput: head = [1,2,3,4,5]\nOutput: 5 4 3 2 1\n```\n\n### Constraints:\n- The number of nodes in the list is the range `[0, 5000]`.\n- `-5000 <= Node.val <= 5000`",
    constraints: "0 <= nodes <= 5000\n-5000 <= Node.val <= 5000",
    hints: "Can you iteratively update next pointers using three pointers: prev, curr, and next?",
    editorial: "Initialize prev = null, curr = head. In a loop, save next = curr.next, point curr.next to prev, advance prev = curr and curr = next. Return prev.",
    examples: {
      "C++": { input: "1 2 3 4 5", output: "5 4 3 2 1", explanation: "Reversed order of elements." },
      "JAVA": { input: "1 2 3 4 5", output: "5 4 3 2 1", explanation: "Reversed order of elements." },
      "PYTHON": { input: "1 2 3 4 5", output: "5 4 3 2 1", explanation: "Reversed order of elements." },
      "JAVASCRIPT": { input: "1 2 3 4 5", output: "5 4 3 2 1", explanation: "Reversed order of elements." }
    },
    codeSnippets: {
      "C++": `#include <iostream>
#include <vector>
#include <sstream>
using namespace std;

struct ListNode {
    int val;
    ListNode *next;
    ListNode(int x) : val(x), next(NULL) {}
};

class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        // Write your code here
        return head;
    }
};

int main() {
    string line;
    if (getline(cin, line)) {
        stringstream ss(line);
        int val;
        ListNode dummy(0);
        ListNode* tail = &dummy;
        while (ss >> val) {
            tail->next = new ListNode(val);
            tail = tail->next;
        }
        Solution sol;
        ListNode* rev = sol.reverseList(dummy.next);
        while (rev) {
            cout << rev->val << (rev->next ? " " : "");
            rev = rev->next;
        }
        cout << endl;
    }
    return 0;
}`,
      "JAVA": `import java.util.*;

class ListNode {
    int val;
    ListNode next;
    ListNode(int x) { val = x; }
}

class Solution {
    public ListNode reverseList(ListNode head) {
        // Write your code here
        return head;
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextLine()) {
            String[] parts = sc.nextLine().trim().split("\\s+");
            if (parts.length == 0 || parts[0].isEmpty()) return;
            ListNode dummy = new ListNode(0);
            ListNode tail = dummy;
            for (String p : parts) {
                tail.next = new ListNode(Integer.parseInt(p));
                tail = tail.next;
            }
            Solution sol = new Solution();
            ListNode rev = sol.reverseList(dummy.next);
            StringBuilder sb = new StringBuilder();
            while (rev != null) {
                sb.append(rev.val).append(rev.next != null ? " " : "");
                rev = rev.next;
            }
            System.out.println(sb.toString());
        }
        sc.close();
    }
}`,
      "PYTHON": `import sys
from typing import Optional

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        # Write your code here
        return head

if __name__ == "__main__":
    line = sys.stdin.read().strip()
    if line:
        vals = list(map(int, line.split()))
        dummy = ListNode(0)
        curr = dummy
        for v in vals:
            curr.next = ListNode(v)
            curr = curr.next
        sol = Solution()
        rev = sol.reverseList(dummy.next)
        res = []
        while rev:
            res.append(str(rev.val))
            rev = rev.next
        print(" ".join(res))`,
      "JAVASCRIPT": `const readline = require('readline');

class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

class Solution {
  reverseList(head) {
    // Write your code here
    return head;
  }
}

const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });
rl.on('line', (line) => {
  const vals = line.trim().split(/\\s+/).map(Number);
  const dummy = new ListNode(0);
  let curr = dummy;
  for (const v of vals) {
    curr.next = new ListNode(v);
    curr = curr.next;
  }
  const sol = new Solution();
  let rev = sol.reverseList(dummy.next);
  const out = [];
  while (rev) {
    out.push(rev.val);
    rev = rev.next;
  }
  console.log(out.join(' '));
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
        vector<int> vals; int v;
        while (ss >> v) vals.push_back(v);
        reverse(vals.begin(), vals.end());
        for (size_t i = 0; i < vals.size(); i++) cout << vals[i] << (i == vals.size() - 1 ? "" : " ");
        cout << endl;
    }
    return 0;
}`,
      "JAVA": `import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextLine()) {
            String[] parts = sc.nextLine().trim().split("\\s+");
            List<String> list = Arrays.asList(parts);
            Collections.reverse(list);
            System.out.println(String.join(" ", list));
        }
        sc.close();
    }
}`,
      "PYTHON": `import sys
if __name__ == "__main__":
    line = sys.stdin.read().strip()
    if line:
        vals = line.split()
        print(" ".join(reversed(vals)))`,
      "JAVASCRIPT": `const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });
rl.on('line', (line) => {
  const vals = line.trim().split(/\\s+/);
  console.log(vals.reverse().join(' '));
  process.exit(0);
});`
    },
    testCases: [
      { input: "1 2 3 4 5", output: "5 4 3 2 1", isHidden: false },
      { input: "1 2", output: "2 1", isHidden: false },
      { input: "1", output: "1", isHidden: false },
      { input: "10 20 30 40 50 60", output: "60 50 40 30 20 10", isHidden: true },
      { input: "7 9 11 13", output: "13 11 9 7", isHidden: true }
    ]
  },
  {
    title: "Detect Cycle in a Linked List",
    difficulty: "EASY",
    tags: ["Linked List", "Two Pointers", "Hash Table"],
    description: "Given `head`, the head of a linked list, determine if the linked list has a cycle in it.\n\nThere is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the `next` pointer.\n\nReturn `true` if there is a cycle in the linked list. Otherwise, return `false`.\n\n### Example 1:\n```text\nInput: head = [3,2,0,-4], pos = 1\nOutput: true\nExplanation: There is a cycle in the linked list, where the tail connects to the 1st node (0-indexed).\n```\n\n### Constraints:\n- The number of the nodes in the list is in the range `[0, 10^4]`.\n- `-10^5 <= Node.val <= 10^5`\n- `pos` is `-1` or a valid index in the linked list.",
    constraints: "0 <= nodes <= 10^4\npos is -1 or valid index.",
    hints: "Can you detect a cycle using two pointers moving at different speeds (tortoise and hare)?",
    editorial: "Initialize slow = head and fast = head. Advance slow by 1 step and fast by 2 steps. If fast and fast.next exist and meet slow, a cycle exists. If fast reaches null, return false.",
    examples: {
      "C++": { input: "3 2 0 -4\n1", output: "true", explanation: "Cycle connects back to index 1." },
      "JAVA": { input: "3 2 0 -4\n1", output: "true", explanation: "Cycle connects back to index 1." },
      "PYTHON": { input: "3 2 0 -4\n1", output: "true", explanation: "Cycle connects back to index 1." },
      "JAVASCRIPT": { input: "3 2 0 -4\n1", output: "true", explanation: "Cycle connects back to index 1." }
    },
    codeSnippets: {
      "C++": `#include <iostream>
#include <vector>
#include <sstream>
using namespace std;

struct ListNode {
    int val;
    ListNode *next;
    ListNode(int x) : val(x), next(NULL) {}
};

class Solution {
public:
    bool hasCycle(ListNode *head) {
        // Write your code here
        return false;
    }
};

int main() {
    string line1, line2;
    if (getline(cin, line1) && getline(cin, line2)) {
        stringstream ss(line1);
        vector<ListNode*> nodes;
        int val;
        while (ss >> val) nodes.push_back(new ListNode(val));
        int pos = stoi(line2);
        for (size_t i = 0; i < nodes.size(); i++) {
            if (i + 1 < nodes.size()) nodes[i]->next = nodes[i + 1];
        }
        if (pos >= 0 && pos < (int)nodes.size()) {
            nodes.back()->next = nodes[pos];
        }
        Solution sol;
        cout << (sol.hasCycle(nodes.empty() ? nullptr : nodes[0]) ? "true" : "false") << endl;
    }
    return 0;
}`,
      "JAVA": `import java.util.*;

class ListNode {
    int val;
    ListNode next;
    ListNode(int x) { val = x; next = null; }
}

class Solution {
    public boolean hasCycle(ListNode head) {
        // Write your code here
        return false;
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextLine()) {
            String line1 = sc.nextLine().trim();
            if (!sc.hasNextLine()) return;
            int pos = Integer.parseInt(sc.nextLine().trim());
            String[] parts = line1.split("\\s+");
            List<ListNode> nodes = new ArrayList<>();
            for (String p : parts) if (!p.isEmpty()) nodes.add(new ListNode(Integer.parseInt(p)));
            for (int i = 0; i < nodes.size() - 1; i++) nodes.get(i).next = nodes.get(i + 1);
            if (pos >= 0 && pos < nodes.size()) nodes.get(nodes.size() - 1).next = nodes.get(pos);
            Solution sol = new Solution();
            System.out.println(sol.hasCycle(nodes.isEmpty() ? null : nodes.get(0)) ? "true" : "false");
        }
        sc.close();
    }
}`,
      "PYTHON": `import sys
from typing import Optional

class ListNode:
    def __init__(self, x):
        self.val = x
        self.next = None

class Solution:
    def hasCycle(self, head: Optional[ListNode]) -> bool:
        # Write your code here
        return false

if __name__ == "__main__":
    lines = sys.stdin.read().splitlines()
    if len(lines) >= 2:
        vals = list(map(int, lines[0].strip().split()))
        pos = int(lines[1].strip())
        nodes = [ListNode(v) for v in vals]
        for i in range(len(nodes) - 1):
            nodes[i].next = nodes[i + 1]
        if 0 <= pos < len(nodes):
            nodes[-1].next = nodes[pos]
        sol = Solution()
        ans = sol.hasCycle(nodes[0] if nodes else None)
        print("true" if ans else "false")`,
      "JAVASCRIPT": `const readline = require('readline');

class ListNode {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class Solution {
  hasCycle(head) {
    // Write your code here
    return false;
  }
}

const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });
const lines = [];
rl.on('line', (l) => lines.push(l.trim()));
rl.on('close', () => {
  if (lines.length >= 2) {
    const vals = lines[0].split(/\\s+/).map(Number);
    const pos = Number(lines[1]);
    const nodes = vals.map((v) => new ListNode(v));
    for (let i = 0; i < nodes.length - 1; i++) nodes[i].next = nodes[i + 1];
    if (pos >= 0 && pos < nodes.length) nodes[nodes.length - 1].next = nodes[pos];
    const sol = new Solution();
    console.log(sol.hasCycle(nodes[0] || null) ? "true" : "false");
  }
});`
    },
    referenceSolutions: {
      "C++": `#include <iostream>
using namespace std;
int main() {
    string l1, l2;
    if (getline(cin, l1) && getline(cin, l2)) {
        int pos = stoi(l2);
        cout << (pos >= 0 ? "true" : "false") << endl;
    }
    return 0;
}`,
      "JAVA": `import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextLine()) {
            sc.nextLine();
            if (sc.hasNextLine()) {
                int pos = Integer.parseInt(sc.nextLine().trim());
                System.out.println(pos >= 0 ? "true" : "false");
            }
        }
        sc.close();
    }
}`,
      "PYTHON": `import sys
if __name__ == "__main__":
    lines = sys.stdin.read().splitlines()
    if len(lines) >= 2:
        pos = int(lines[1].strip())
        print("true" if pos >= 0 else "false")`,
      "JAVASCRIPT": `const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });
const lines = [];
rl.on('line', (l) => lines.push(l.trim()));
rl.on('close', () => {
  if (lines.length >= 2) {
    console.log(Number(lines[1]) >= 0 ? "true" : "false");
  }
});`
    },
    testCases: [
      { input: "3 2 0 -4\n1", output: "true", isHidden: false },
      { input: "1 2\n0", output: "true", isHidden: false },
      { input: "1\n-1", output: "false", isHidden: false },
      { input: "1 2 3 4 5\n-1", output: "false", isHidden: true },
      { input: "5 10 15 20\n2", output: "true", isHidden: true }
    ]
  },
  {
    title: "Merge Two Sorted Lists",
    difficulty: "EASY",
    tags: ["Linked List", "Recursion"],
    description: "You are given the heads of two sorted linked lists `list1` and `list2`.\n\nMerge the two lists into one **sorted** list. The list should be made by splicing together the nodes of the first two lists.\n\nReturn the head of the merged linked list.\n\n### Example 1:\n```text\nInput: list1 = [1,2,4], list2 = [1,3,4]\nOutput: 1 1 2 3 4 4\n```\n\n### Constraints:\n- The number of nodes in both lists is in the range `[0, 50]`.\n- `-100 <= Node.val <= 100`\n- Both `list1` and `list2` are sorted in non-decreasing order.",
    constraints: "0 <= nodes <= 50\n-100 <= Node.val <= 100",
    hints: "Use a dummy head node and attach the smaller of list1.val and list2.val at each step.",
    editorial: "Create dummy node. While l1 and l2 exist, point tail.next to the smaller node and advance that list. Attach any remaining nodes at the end.",
    examples: {
      "C++": { input: "1 2 4\n1 3 4", output: "1 1 2 3 4 4", explanation: "Merged in ascending order." },
      "JAVA": { input: "1 2 4\n1 3 4", output: "1 1 2 3 4 4", explanation: "Merged in ascending order." },
      "PYTHON": { input: "1 2 4\n1 3 4", output: "1 1 2 3 4 4", explanation: "Merged in ascending order." },
      "JAVASCRIPT": { input: "1 2 4\n1 3 4", output: "1 1 2 3 4 4", explanation: "Merged in ascending order." }
    },
    codeSnippets: {
      "C++": `#include <iostream>
#include <vector>
#include <sstream>
using namespace std;

struct ListNode {
    int val;
    ListNode *next;
    ListNode(int x) : val(x), next(NULL) {}
};

class Solution {
public:
    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {
        // Write your code here
        return nullptr;
    }
};

ListNode* buildList(const string& line) {
    stringstream ss(line);
    int val;
    ListNode dummy(0);
    ListNode* curr = &dummy;
    while (ss >> val) {
        curr->next = new ListNode(val);
        curr = curr->next;
    }
    return dummy.next;
}

int main() {
    string l1, l2;
    getline(cin, l1);
    getline(cin, l2);
    ListNode* head1 = buildList(l1);
    ListNode* head2 = buildList(l2);
    Solution sol;
    ListNode* res = sol.mergeTwoLists(head1, head2);
    while (res) {
        cout << res->val << (res->next ? " " : "");
        res = res->next;
    }
    cout << endl;
    return 0;
}`,
      "JAVA": `import java.util.*;

class ListNode {
    int val;
    ListNode next;
    ListNode(int x) { val = x; }
}

class Solution {
    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
        // Write your code here
        return null;
    }
}

public class Main {
    static ListNode build(String line) {
        String[] parts = line.trim().split("\\s+");
        ListNode dummy = new ListNode(0);
        ListNode curr = dummy;
        for (String p : parts) {
            if (!p.isEmpty()) {
                curr.next = new ListNode(Integer.parseInt(p));
                curr = curr.next;
            }
        }
        return dummy.next;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String l1 = sc.hasNextLine() ? sc.nextLine() : "";
        String l2 = sc.hasNextLine() ? sc.nextLine() : "";
        Solution sol = new Solution();
        ListNode res = sol.mergeTwoLists(build(l1), build(l2));
        StringBuilder sb = new StringBuilder();
        while (res != null) {
            sb.append(res.val).append(res.next != null ? " " : "");
            res = res.next;
        }
        System.out.println(sb.toString());
        sc.close();
    }
}`,
      "PYTHON": `import sys
from typing import Optional

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def mergeTwoLists(self, list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:
        # Write your code here
        return None

def build(line):
    dummy = ListNode(0)
    curr = dummy
    for v in line.strip().split():
        curr.next = ListNode(int(v))
        curr = curr.next
    return dummy.next

if __name__ == "__main__":
    lines = sys.stdin.read().splitlines()
    l1 = lines[0] if len(lines) > 0 else ""
    l2 = lines[1] if len(lines) > 1 else ""
    sol = Solution()
    res = sol.mergeTwoLists(build(l1), build(l2))
    out = []
    while res:
        out.append(str(res.val))
        res = res.next
    print(" ".join(out))`,
      "JAVASCRIPT": `const readline = require('readline');

class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

class Solution {
  mergeTwoLists(list1, list2) {
    // Write your code here
    return null;
  }
}

function build(line) {
  const dummy = new ListNode(0);
  let curr = dummy;
  for (const p of line.trim().split(/\\s+/)) {
    if (p) {
      curr.next = new ListNode(Number(p));
      curr = curr.next;
    }
  }
  return dummy.next;
}

const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });
const lines = [];
rl.on('line', (l) => lines.push(l));
rl.on('close', () => {
  const h1 = build(lines[0] || "");
  const h2 = build(lines[1] || "");
  const sol = new Solution();
  let res = sol.mergeTwoLists(h1, h2);
  const out = [];
  while (res) {
    out.push(res.val);
    res = res.next;
  }
  console.log(out.join(' '));
});`
    },
    referenceSolutions: {
      "C++": `#include <iostream>
#include <vector>
#include <sstream>
#include <algorithm>
using namespace std;
int main() {
    string l1, l2;
    vector<int> nums;
    if (getline(cin, l1)) {
        stringstream ss(l1); int v; while (ss >> v) nums.push_back(v);
    }
    if (getline(cin, l2)) {
        stringstream ss(l2); int v; while (ss >> v) nums.push_back(v);
    }
    sort(nums.begin(), nums.end());
    for (size_t i = 0; i < nums.size(); i++) cout << nums[i] << (i == nums.size() - 1 ? "" : " ");
    cout << endl;
    return 0;
}`,
      "JAVA": `import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        List<Integer> nums = new ArrayList<>();
        if (sc.hasNextLine()) {
            for (String p : sc.nextLine().trim().split("\\s+")) if (!p.isEmpty()) nums.add(Integer.parseInt(p));
        }
        if (sc.hasNextLine()) {
            for (String p : sc.nextLine().trim().split("\\s+")) if (!p.isEmpty()) nums.add(Integer.parseInt(p));
        }
        Collections.sort(nums);
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < nums.size(); i++) sb.append(nums.get(i)).append(i == nums.size() - 1 ? "" : " ");
        System.out.println(sb.toString());
        sc.close();
    }
}`,
      "PYTHON": `import sys
if __name__ == "__main__":
    lines = sys.stdin.read().splitlines()
    nums = []
    for l in lines:
        for p in l.strip().split():
            nums.append(int(p))
    nums.sort()
    print(" ".join(map(str, nums)))`,
      "JAVASCRIPT": `const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });
const lines = [];
rl.on('line', (l) => lines.push(l));
rl.on('close', () => {
  const nums = [];
  for (const l of lines) {
    for (const p of l.trim().split(/\\s+/)) {
      if (p) nums.push(Number(p));
    }
  }
  nums.sort((a, b) => a - b);
  console.log(nums.join(' '));
});`
    },
    testCases: [
      { input: "1 2 4\n1 3 4", output: "1 1 2 3 4 4", isHidden: false },
      { input: " \n0", output: "0", isHidden: false },
      { input: "2 5 8\n1 3 7", output: "1 2 3 5 7 8", isHidden: false },
      { input: "1 3 5\n2 4 6 8", output: "1 2 3 4 5 6 8", isHidden: true },
      { input: "5 10 15\n2 4 6", output: "2 4 5 6 10 15", isHidden: true }
    ]
  },
  {
    title: "Search a 2D Matrix",
    difficulty: "MEDIUM",
    tags: ["Array", "Binary Search", "Matrix"],
    description: "You are given an `m x n` integer matrix `matrix` with the following two properties:\n- Each row is sorted in non-decreasing order.\n- The first integer of each row is greater than the last integer of the previous row.\n\nGiven an integer `target`, return `true` if `target` is in `matrix` or `false` otherwise.\n\nYou must write a solution in `O(log(m * n))` time complexity.\n\n### Example 1:\n```text\nInput: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3\nOutput: true\n```\n\n### Constraints:\n- `m == matrix.length`\n- `n == matrix[i].length`\n- `1 <= m, n <= 100`\n- `-10^4 <= matrix[i][j], target <= 10^4`",
    constraints: "1 <= m, n <= 100\n-10^4 <= matrix[i][j], target <= 10^4",
    hints: "Treat the 2D matrix of size m x n as a 1D sorted array of length m * n and apply standard binary search.",
    editorial: "Index k in [0, m * n - 1] maps to row = k / n and col = k % n. Perform binary search over [0, m * n - 1].",
    examples: {
      "C++": { input: "3 4\n1 3 5 7\n10 11 16 20\n23 30 34 60\n3", output: "true", explanation: "Target 3 is in the matrix." },
      "JAVA": { input: "3 4\n1 3 5 7\n10 11 16 20\n23 30 34 60\n3", output: "true", explanation: "Target 3 is in the matrix." },
      "PYTHON": { input: "3 4\n1 3 5 7\n10 11 16 20\n23 30 34 60\n3", output: "true", explanation: "Target 3 is in the matrix." },
      "JAVASCRIPT": { input: "3 4\n1 3 5 7\n10 11 16 20\n23 30 34 60\n3", output: "true", explanation: "Target 3 is in the matrix." }
    },
    codeSnippets: {
      "C++": `#include <iostream>
#include <vector>
using namespace std;

class Solution {
public:
    bool searchMatrix(vector<vector<int>>& matrix, int target) {
        // Write your code here
        return false;
    }
};

int main() {
    int m, n;
    if (cin >> m >> n) {
        vector<vector<int>> matrix(m, vector<int>(n));
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) cin >> matrix[i][j];
        }
        int target;
        cin >> target;
        Solution sol;
        cout << (sol.searchMatrix(matrix, target) ? "true" : "false") << endl;
    }
    return 0;
}`,
      "JAVA": `import java.util.*;

class Solution {
    public boolean searchMatrix(int[][] matrix, int target) {
        // Write your code here
        return false;
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextInt()) {
            int m = sc.nextInt();
            int n = sc.nextInt();
            int[][] matrix = new int[m][n];
            for (int i = 0; i < m; i++) {
                for (int j = 0; j < n; j++) matrix[i][j] = sc.nextInt();
            }
            int target = sc.nextInt();
            Solution sol = new Solution();
            System.out.println(sol.searchMatrix(matrix, target) ? "true" : "false");
        }
        sc.close();
    }
}`,
      "PYTHON": `import sys
from typing import List

class Solution:
    def searchMatrix(self, matrix: List[List[int]], target: int) -> bool:
        # Write your code here
        return False

if __name__ == "__main__":
    lines = sys.stdin.read().splitlines()
    if lines:
        m, n = map(int, lines[0].strip().split())
        matrix = []
        for i in range(1, m + 1):
            matrix.append(list(map(int, lines[i].strip().split())))
        target = int(lines[m + 1].strip())
        sol = Solution()
        print("true" if sol.searchMatrix(matrix, target) else "false")`,
      "JAVASCRIPT": `const readline = require('readline');

class Solution {
  searchMatrix(matrix, target) {
    // Write your code here
    return false;
  }
}

const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });
const lines = [];
rl.on('line', (l) => lines.push(l.trim()));
rl.on('close', () => {
  if (!lines.length) return;
  const [m, n] = lines[0].split(/\\s+/).map(Number);
  const matrix = [];
  for (let i = 1; i <= m; i++) {
    matrix.push(lines[i].split(/\\s+/).map(Number));
  }
  const target = Number(lines[m + 1]);
  const sol = new Solution();
  console.log(sol.searchMatrix(matrix, target) ? "true" : "false");
});`
    },
    referenceSolutions: {
      "C++": `#include <iostream>
#include <vector>
using namespace std;
int main() {
    int m, n;
    if (cin >> m >> n) {
        int total = m * n;
        vector<int> arr(total);
        for (int i = 0; i < total; i++) cin >> arr[i];
        int target; cin >> target;
        int l = 0, r = total - 1, found = 0;
        while (l <= r) {
            int mid = l + (r - l) / 2;
            if (arr[mid] == target) { found = 1; break; }
            if (arr[mid] < target) l = mid + 1;
            else r = mid - 1;
        }
        cout << (found ? "true" : "false") << endl;
    }
    return 0;
}`,
      "JAVA": `import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextInt()) {
            int m = sc.nextInt();
            int n = sc.nextInt();
            int total = m * n;
            int[] arr = new int[total];
            for (int i = 0; i < total; i++) arr[i] = sc.nextInt();
            int target = sc.nextInt();
            int l = 0, r = total - 1;
            boolean found = false;
            while (l <= r) {
                int mid = l + (r - l) / 2;
                if (arr[mid] == target) { found = true; break; }
                if (arr[mid] < target) l = mid + 1;
                else r = mid - 1;
            }
            System.out.println(found ? "true" : "false");
        }
        sc.close();
    }
}`,
      "PYTHON": `import sys
if __name__ == "__main__":
    nums = sys.stdin.read().split()
    if nums:
        m, n = int(nums[0]), int(nums[1])
        total = m * n
        matrix_vals = list(map(int, nums[2:2 + total]))
        target = int(nums[2 + total])
        l, r = 0, total - 1
        found = False
        while l <= r:
            mid = (l + r) // 2
            if matrix_vals[mid] == target:
                found = True
                break
            elif matrix_vals[mid] < target:
                l = mid + 1
            else:
                r = mid - 1
        print("true" if found else "false")`,
      "JAVASCRIPT": `const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });
const tokens = [];
rl.on('line', (l) => {
  for (const part of l.trim().split(/\\s+/)) if (part) tokens.push(Number(part));
});
rl.on('close', () => {
  if (!tokens.length) return;
  const m = tokens[0], n = tokens[1];
  const total = m * n;
  const arr = tokens.slice(2, 2 + total);
  const target = tokens[2 + total];
  let l = 0, r = total - 1, found = false;
  while (l <= r) {
    const mid = Math.floor((l + r) / 2);
    if (arr[mid] === target) { found = true; break; }
    if (arr[mid] < target) l = mid + 1;
    else r = mid - 1;
  }
  console.log(found ? "true" : "false");
});`
    },
    testCases: [
      { input: "3 4\n1 3 5 7\n10 11 16 20\n23 30 34 60\n3", output: "true", isHidden: false },
      { input: "3 4\n1 3 5 7\n10 11 16 20\n23 30 34 60\n13", output: "false", isHidden: false },
      { input: "1 1\n1\n1", output: "true", isHidden: false },
      { input: "1 2\n1 3\n3", output: "true", isHidden: true },
      { input: "2 2\n1 4\n5 8\n6", output: "false", isHidden: true }
    ]
  },
  {
    title: "Find Minimum in Rotated Sorted Array",
    difficulty: "MEDIUM",
    tags: ["Array", "Binary Search"],
    description: "Suppose an array of length `n` sorted in ascending order is **rotated** between `1` and `n` times.\n\nGiven the sorted rotated array `nums` of **unique** elements, return the minimum element of this array.\n\nYou must write an algorithm that runs in `O(log n)` time.\n\n### Example 1:\n```text\nInput: nums = [3,4,5,1,2]\nOutput: 1\nExplanation: The original array was [1,2,3,4,5] rotated 3 times.\n```\n\n### Constraints:\n- `n == nums.length`\n- `1 <= n <= 5000`\n- `-5000 <= nums[i] <= 5000`\n- All the integers of `nums` are unique.",
    constraints: "1 <= n <= 5000\n-5000 <= nums[i] <= 5000\nAll elements unique.",
    hints: "Compare nums[mid] with nums[right]. If nums[mid] > nums[right], the minimum is strictly in the right half.",
    editorial: "Binary search between left = 0 and right = n - 1. If nums[mid] > nums[right], left = mid + 1; else right = mid. When left == right, nums[left] is the minimum.",
    examples: {
      "C++": { input: "nums = [3,4,5,1,2]", output: "1", explanation: "Minimum is 1." },
      "JAVA": { input: "nums = [3,4,5,1,2]", output: "1", explanation: "Minimum is 1." },
      "PYTHON": { input: "nums = [3,4,5,1,2]", output: "1", explanation: "Minimum is 1." },
      "JAVASCRIPT": { input: "nums = [3,4,5,1,2]", output: "1", explanation: "Minimum is 1." }
    },
    codeSnippets: {
      "C++": `#include <iostream>
#include <vector>
#include <sstream>
using namespace std;

class Solution {
public:
    int findMin(vector<int>& nums) {
        // Write your code here
        return 0;
    }
};

int main() {
    string line;
    if (getline(cin, line)) {
        stringstream ss(line);
        vector<int> nums; int val;
        while (ss >> val) nums.push_back(val);
        Solution sol;
        cout << sol.findMin(nums) << endl;
    }
    return 0;
}`,
      "JAVA": `import java.util.*;

class Solution {
    public int findMin(int[] nums) {
        // Write your code here
        return 0;
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextLine()) {
            String[] parts = sc.nextLine().trim().split("\\s+");
            int[] nums = new int[parts.length];
            for (int i = 0; i < parts.length; i++) nums[i] = Integer.parseInt(parts[i]);
            Solution sol = new Solution();
            System.out.println(sol.findMin(nums));
        }
        sc.close();
    }
}`,
      "PYTHON": `import sys
from typing import List

class Solution:
    def findMin(self, nums: List[int]) -> int:
        # Write your code here
        return 0

if __name__ == "__main__":
    line = sys.stdin.read().strip()
    if line:
        nums = list(map(int, line.split()))
        sol = Solution()
        print(sol.findMin(nums))`,
      "JAVASCRIPT": `const readline = require('readline');

class Solution {
  findMin(nums) {
    // Write your code here
    return 0;
  }
}

const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });
rl.on('line', (line) => {
  const nums = line.trim().split(/\\s+/).map(Number);
  const sol = new Solution();
  console.log(sol.findMin(nums));
  process.exit(0);
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
        vector<int> nums; int val;
        while (ss >> val) nums.push_back(val);
        int l = 0, r = nums.size() - 1;
        while (l < r) {
            int mid = l + (r - l) / 2;
            if (nums[mid] > nums[r]) l = mid + 1;
            else r = mid;
        }
        cout << nums[l] << endl;
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
            int l = 0, r = nums.length - 1;
            while (l < r) {
                int mid = l + (r - l) / 2;
                if (nums[mid] > nums[r]) l = mid + 1;
                else r = mid;
            }
            System.out.println(nums[l]);
        }
        sc.close();
    }
}`,
      "PYTHON": `import sys
if __name__ == "__main__":
    line = sys.stdin.read().strip()
    if line:
        nums = list(map(int, line.split()))
        l, r = 0, len(nums) - 1
        while l < r:
            mid = (l + r) // 2
            if nums[mid] > nums[r]:
                l = mid + 1
            else:
                r = mid
        print(nums[l])`,
      "JAVASCRIPT": `const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });
rl.on('line', (line) => {
  const nums = line.trim().split(/\\s+/).map(Number);
  let l = 0, r = nums.length - 1;
  while (l < r) {
    const mid = Math.floor((l + r) / 2);
    if (nums[mid] > nums[r]) l = mid + 1;
    else r = mid;
  }
  console.log(nums[l]);
  process.exit(0);
});`
    },
    testCases: [
      { input: "3 4 5 1 2", output: "1", isHidden: false },
      { input: "4 5 6 7 0 1 2", output: "0", isHidden: false },
      { input: "11 13 15 17", output: "11", isHidden: false },
      { input: "2 1", output: "1", isHidden: true },
      { input: "5 1 2 3 4", output: "1", isHidden: true }
    ]
  },
  {
    title: "Maximum Depth of Binary Tree",
    difficulty: "EASY",
    tags: ["Tree", "Depth-First Search", "Breadth-First Search", "Binary Tree"],
    description: "Given the `root` of a binary tree, return its **maximum depth**.\n\nA binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.\n\n### Example 1:\n```text\nInput: root = [3,9,20,null,null,15,7]\nOutput: 3\n```\n\n### Constraints:\n- The number of nodes in the tree is in the range `[0, 10^4]`.\n- `-100 <= Node.val <= 100`",
    constraints: "0 <= nodes <= 10^4\n-100 <= Node.val <= 100",
    hints: "Can you compute the depth recursively: 1 + max(maxDepth(root.left), maxDepth(root.right))?",
    editorial: "If root is null, return 0. Recursively compute depth of left and right subtrees and return 1 + max(leftDepth, rightDepth).",
    examples: {
      "C++": { input: "3 9 20 null null 15 7", output: "3", explanation: "Depth of root 3 is 3." },
      "JAVA": { input: "3 9 20 null null 15 7", output: "3", explanation: "Depth of root 3 is 3." },
      "PYTHON": { input: "3 9 20 null null 15 7", output: "3", explanation: "Depth of root 3 is 3." },
      "JAVASCRIPT": { input: "3 9 20 null null 15 7", output: "3", explanation: "Depth of root 3 is 3." }
    },
    codeSnippets: {
      "C++": `#include <iostream>
#include <vector>
#include <sstream>
#include <queue>
#include <algorithm>
using namespace std;

struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode(int x) : val(x), left(NULL), right(NULL) {}
};

class Solution {
public:
    int maxDepth(TreeNode* root) {
        // Write your code here
        return 0;
    }
};

TreeNode* buildTree(const string& line) {
    stringstream ss(line);
    string token;
    vector<string> tokens;
    while (ss >> token) tokens.push_back(token);
    if (tokens.empty() || tokens[0] == "null") return nullptr;
    TreeNode* root = new TreeNode(stoi(tokens[0]));
    queue<TreeNode*> q;
    q.push(root);
    size_t i = 1;
    while (!q.empty() && i < tokens.size()) {
        TreeNode* curr = q.front(); q.pop();
        if (tokens[i] != "null") {
            curr->left = new TreeNode(stoi(tokens[i]));
            q.push(curr->left);
        }
        i++;
        if (i < tokens.size() && tokens[i] != "null") {
            curr->right = new TreeNode(stoi(tokens[i]));
            q.push(curr->right);
        }
        i++;
    }
    return root;
}

int main() {
    string line;
    if (getline(cin, line)) {
        TreeNode* root = buildTree(line);
        Solution sol;
        cout << sol.maxDepth(root) << endl;
    }
    return 0;
}`,
      "JAVA": `import java.util.*;

class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode(int x) { val = x; }
}

class Solution {
    public int maxDepth(TreeNode root) {
        // Write your code here
        return 0;
    }
}

public class Main {
    static TreeNode buildTree(String line) {
        String[] tokens = line.trim().split("\\s+");
        if (tokens.length == 0 || tokens[0].equals("null") || tokens[0].isEmpty()) return null;
        TreeNode root = new TreeNode(Integer.parseInt(tokens[0]));
        Queue<TreeNode> q = new LinkedList<>();
        q.add(root);
        int i = 1;
        while (!q.isEmpty() && i < tokens.length) {
            TreeNode curr = q.poll();
            if (!tokens[i].equals("null")) {
                curr.left = new TreeNode(Integer.parseInt(tokens[i]));
                q.add(curr.left);
            }
            i++;
            if (i < tokens.length && !tokens[i].equals("null")) {
                curr.right = new TreeNode(Integer.parseInt(tokens[i]));
                q.add(curr.right);
            }
            i++;
        }
        return root;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextLine()) {
            TreeNode root = buildTree(sc.nextLine());
            Solution sol = new Solution();
            System.out.println(sol.maxDepth(root));
        }
        sc.close();
    }
}`,
      "PYTHON": `import sys
from typing import Optional
from collections import deque

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def maxDepth(self, root: Optional[TreeNode]) -> int:
        # Write your code here
        return 0

def buildTree(line):
    tokens = line.strip().split()
    if not tokens or tokens[0] == "null":
        return None
    root = TreeNode(int(tokens[0]))
    q = deque([root])
    i = 1
    while q and i < len(tokens):
        curr = q.popleft()
        if tokens[i] != "null":
            curr.left = TreeNode(int(tokens[i]))
            q.append(curr.left)
        i += 1
        if i < len(tokens) and tokens[i] != "null":
            curr.right = TreeNode(int(tokens[i]))
            q.append(curr.right)
        i += 1
    return root

if __name__ == "__main__":
    line = sys.stdin.read().strip()
    if line:
        root = buildTree(line)
        sol = Solution()
        print(sol.maxDepth(root))`,
      "JAVASCRIPT": `const readline = require('readline');

class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class Solution {
  maxDepth(root) {
    // Write your code here
    return 0;
  }
}

function buildTree(line) {
  const tokens = line.trim().split(/\\s+/);
  if (!tokens.length || tokens[0] === 'null' || !tokens[0]) return null;
  const root = new TreeNode(Number(tokens[0]));
  const q = [root];
  let i = 1;
  while (q.length && i < tokens.length) {
    const curr = q.shift();
    if (tokens[i] !== 'null') {
      curr.left = new TreeNode(Number(tokens[i]));
      q.push(curr.left);
    }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') {
      curr.right = new TreeNode(Number(tokens[i]));
      q.push(curr.right);
    }
    i++;
  }
  return root;
}

const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });
rl.on('line', (line) => {
  const root = buildTree(line);
  const sol = new Solution();
  console.log(sol.maxDepth(root));
  process.exit(0);
});`
    },
    referenceSolutions: {
      "C++": `#include <iostream>
#include <vector>
#include <sstream>
#include <queue>
#include <algorithm>
using namespace std;
struct TreeNode {
    int val; TreeNode *left, *right;
    TreeNode(int x) : val(x), left(NULL), right(NULL) {}
};
int depth(TreeNode* root) {
    if (!root) return 0;
    return 1 + max(depth(root->left), depth(root->right));
}
int main() {
    string line;
    if (getline(cin, line)) {
        stringstream ss(line); string t; vector<string> tokens;
        while (ss >> t) tokens.push_back(t);
        if (tokens.empty() || tokens[0] == "null") { cout << 0 << endl; return 0; }
        TreeNode* root = new TreeNode(stoi(tokens[0]));
        queue<TreeNode*> q; q.push(root); size_t i = 1;
        while (!q.empty() && i < tokens.size()) {
            TreeNode* curr = q.front(); q.pop();
            if (tokens[i] != "null") { curr->left = new TreeNode(stoi(tokens[i])); q.push(curr->left); }
            i++;
            if (i < tokens.size() && tokens[i] != "null") { curr->right = new TreeNode(stoi(tokens[i])); q.push(curr->right); }
            i++;
        }
        cout << depth(root) << endl;
    }
    return 0;
}`,
      "JAVA": `import java.util.*;
public class Main {
    static class TreeNode { int val; TreeNode left, right; TreeNode(int x) { val = x; } }
    static int depth(TreeNode r) { if (r == null) return 0; return 1 + Math.max(depth(r.left), depth(r.right)); }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextLine()) {
            String[] tokens = sc.nextLine().trim().split("\\s+");
            if (tokens.length == 0 || tokens[0].equals("null") || tokens[0].isEmpty()) { System.out.println(0); return; }
            TreeNode root = new TreeNode(Integer.parseInt(tokens[0]));
            Queue<TreeNode> q = new LinkedList<>(); q.add(root); int i = 1;
            while (!q.isEmpty() && i < tokens.length) {
                TreeNode c = q.poll();
                if (!tokens[i].equals("null")) { c.left = new TreeNode(Integer.parseInt(tokens[i])); q.add(c.left); }
                i++;
                if (i < tokens.length && !tokens[i].equals("null")) { c.right = new TreeNode(Integer.parseInt(tokens[i])); q.add(c.right); }
                i++;
            }
            System.out.println(depth(root));
        }
        sc.close();
    }
}`,
      "PYTHON": `import sys
from collections import deque
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right
def depth(r):
    if not r: return 0
    return 1 + max(depth(r.left), depth(r.right))
if __name__ == "__main__":
    line = sys.stdin.read().strip()
    if line:
        tokens = line.split()
        if not tokens or tokens[0] == "null":
            print(0)
            sys.exit(0)
        root = TreeNode(int(tokens[0]))
        q = deque([root])
        i = 1
        while q and i < len(tokens):
            curr = q.popleft()
            if tokens[i] != "null":
                curr.left = TreeNode(int(tokens[i]))
                q.append(curr.left)
            i += 1
            if i < len(tokens) and tokens[i] != "null":
                curr.right = TreeNode(int(tokens[i]))
                q.append(curr.right)
            i += 1
        print(depth(root))`,
      "JAVASCRIPT": `const readline = require('readline');
class TreeNode {
  constructor(val, left = null, right = null) { this.val = val; this.left = left; this.right = right; }
}
function depth(r) { if (!r) return 0; return 1 + Math.max(depth(r.left), depth(r.right)); }
const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });
rl.on('line', (line) => {
  const tokens = line.trim().split(/\\s+/);
  if (!tokens.length || tokens[0] === 'null' || !tokens[0]) { console.log(0); process.exit(0); }
  const root = new TreeNode(Number(tokens[0]));
  const q = [root];
  let i = 1;
  while (q.length && i < tokens.length) {
    const c = q.shift();
    if (tokens[i] !== 'null') { c.left = new TreeNode(Number(tokens[i])); q.push(c.left); }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') { c.right = new TreeNode(Number(tokens[i])); q.push(c.right); }
    i++;
  }
  console.log(depth(root));
  process.exit(0);
});`
    },
    testCases: [
      { input: "3 9 20 null null 15 7", output: "3", isHidden: false },
      { input: "1 null 2", output: "2", isHidden: false },
      { input: "1", output: "1", isHidden: false },
      { input: "1 2 3 4 null null 5", output: "3", isHidden: true },
      { input: "1 2 null 3 null 4", output: "4", isHidden: true }
    ]
  },
  {
    title: "Lowest Common Ancestor of a Binary Tree",
    difficulty: "MEDIUM",
    tags: ["Tree", "Depth-First Search", "Binary Tree"],
    description: "Given a binary tree, find the lowest common ancestor (LCA) of two given nodes `p` and `q` in the tree.\n\nAccording to the definition of LCA on Wikipedia: “The lowest common ancestor is defined between two nodes `p` and `q` as the lowest node in `T` that has both `p` and `q` as descendants (where we allow a node to be a descendant of itself).”\n\n### Example 1:\n```text\nInput: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1\nOutput: 3\n```\n\n### Constraints:\n- The number of nodes in the tree is in the range `[2, 10^5]`.\n- `-10^9 <= Node.val <= 10^9`\n- All `Node.val` are unique.\n- `p != q`\n- `p` and `q` exist in the tree.",
    constraints: "2 <= nodes <= 10^5\nAll Node.val are unique.\np != q and exist in tree.",
    hints: "If root equals p or q, root is part of LCA. Recurse on left and right; if both return non-null, root is LCA.",
    editorial: "If root is null or root equals p or q, return root. If both left and right recursive calls return non-null, root is the LCA. Otherwise return the non-null child.",
    examples: {
      "C++": { input: "3 5 1 6 2 0 8 null null 7 4\n5 1", output: "3", explanation: "LCA of 5 and 1 is 3." },
      "JAVA": { input: "3 5 1 6 2 0 8 null null 7 4\n5 1", output: "3", explanation: "LCA of 5 and 1 is 3." },
      "PYTHON": { input: "3 5 1 6 2 0 8 null null 7 4\n5 1", output: "3", explanation: "LCA of 5 and 1 is 3." },
      "JAVASCRIPT": { input: "3 5 1 6 2 0 8 null null 7 4\n5 1", output: "3", explanation: "LCA of 5 and 1 is 3." }
    },
    codeSnippets: {
      "C++": `#include <iostream>
#include <vector>
#include <sstream>
#include <queue>
using namespace std;

struct TreeNode {
    int val; TreeNode *left, *right;
    TreeNode(int x) : val(x), left(NULL), right(NULL) {}
};

class Solution {
public:
    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
        // Write your code here
        return nullptr;
    }
};

TreeNode* findNode(TreeNode* root, int val) {
    if (!root || root->val == val) return root;
    TreeNode* l = findNode(root->left, val);
    if (l) return l;
    return findNode(root->right, val);
}

TreeNode* buildTree(const string& line) {
    stringstream ss(line); string t; vector<string> tokens;
    while (ss >> t) tokens.push_back(t);
    if (tokens.empty() || tokens[0] == "null") return nullptr;
    TreeNode* root = new TreeNode(stoi(tokens[0]));
    queue<TreeNode*> q; q.push(root); size_t i = 1;
    while (!q.empty() && i < tokens.size()) {
        TreeNode* curr = q.front(); q.pop();
        if (tokens[i] != "null") { curr->left = new TreeNode(stoi(tokens[i])); q.push(curr->left); }
        i++;
        if (i < tokens.size() && tokens[i] != "null") { curr->right = new TreeNode(stoi(tokens[i])); q.push(curr->right); }
        i++;
    }
    return root;
}

int main() {
    string l1, l2;
    if (getline(cin, l1) && getline(cin, l2)) {
        TreeNode* root = buildTree(l1);
        stringstream ss(l2); int pVal, qVal; ss >> pVal >> qVal;
        TreeNode* p = findNode(root, pVal);
        TreeNode* q = findNode(root, qVal);
        Solution sol;
        TreeNode* lca = sol.lowestCommonAncestor(root, p, q);
        if (lca) cout << lca->val << endl;
    }
    return 0;
}`,
      "JAVA": `import java.util.*;

class TreeNode {
    int val; TreeNode left, right;
    TreeNode(int x) { val = x; }
}

class Solution {
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        // Write your code here
        return null;
    }
}

public class Main {
    static TreeNode find(TreeNode r, int v) {
        if (r == null || r.val == v) return r;
        TreeNode left = find(r.left, v);
        if (left != null) return left;
        return find(r.right, v);
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextLine()) {
            String l1 = sc.nextLine();
            if (!sc.hasNextLine()) return;
            String l2 = sc.nextLine();
            String[] tokens = l1.trim().split("\\s+");
            TreeNode root = new TreeNode(Integer.parseInt(tokens[0]));
            Queue<TreeNode> q = new LinkedList<>(); q.add(root); int i = 1;
            while (!q.isEmpty() && i < tokens.length) {
                TreeNode c = q.poll();
                if (!tokens[i].equals("null")) { c.left = new TreeNode(Integer.parseInt(tokens[i])); q.add(c.left); }
                i++;
                if (i < tokens.length && !tokens[i].equals("null")) { c.right = new TreeNode(Integer.parseInt(tokens[i])); q.add(c.right); }
                i++;
            }
            String[] pParts = l2.trim().split("\\s+");
            TreeNode pNode = find(root, Integer.parseInt(pParts[0]));
            TreeNode qNode = find(root, Integer.parseInt(pParts[1]));
            Solution sol = new Solution();
            TreeNode lca = sol.lowestCommonAncestor(root, pNode, qNode);
            if (lca != null) System.out.println(lca.val);
        }
        sc.close();
    }
}`,
      "PYTHON": `import sys
from collections import deque

class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None

class Solution:
    def lowestCommonAncestor(self, root: 'TreeNode', p: 'TreeNode', q: 'TreeNode') -> 'TreeNode':
        # Write your code here
        return None

def find(r, v):
    if not r or r.val == v: return r
    left = find(r.left, v)
    if left: return left
    return find(r.right, v)

if __name__ == "__main__":
    lines = sys.stdin.read().splitlines()
    if len(lines) >= 2:
        tokens = lines[0].strip().split()
        root = TreeNode(int(tokens[0]))
        queue = deque([root])
        i = 1
        while queue and i < len(tokens):
            c = queue.popleft()
            if tokens[i] != "null":
                c.left = TreeNode(int(tokens[i]))
                queue.append(c.left)
            i += 1
            if i < len(tokens) and tokens[i] != "null":
                c.right = TreeNode(int(tokens[i]))
                queue.append(c.right)
            i += 1
        p_val, q_val = map(int, lines[1].strip().split())
        sol = Solution()
        lca = sol.lowestCommonAncestor(root, find(root, p_val), find(root, q_val))
        if lca: print(lca.val)`,
      "JAVASCRIPT": `const readline = require('readline');

class TreeNode {
  constructor(val) { this.val = val; this.left = null; this.right = null; }
}

class Solution {
  lowestCommonAncestor(root, p, q) {
    // Write your code here
    return null;
  }
}

function find(r, v) {
  if (!r || r.val === v) return r;
  const left = find(r.left, v);
  if (left) return left;
  return find(r.right, v);
}

const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });
const lines = [];
rl.on('line', (l) => lines.push(l.trim()));
rl.on('close', () => {
  if (lines.length >= 2) {
    const tokens = lines[0].split(/\\s+/);
    const root = new TreeNode(Number(tokens[0]));
    const q = [root];
    let i = 1;
    while (q.length && i < tokens.length) {
      const c = q.shift();
      if (tokens[i] !== 'null') { c.left = new TreeNode(Number(tokens[i])); q.push(c.left); }
      i++;
      if (i < tokens.length && tokens[i] !== 'null') { c.right = new TreeNode(Number(tokens[i])); q.push(c.right); }
      i++;
    }
    const [pVal, qVal] = lines[1].split(/\\s+/).map(Number);
    const sol = new Solution();
    const lca = sol.lowestCommonAncestor(root, find(root, pVal), find(root, qVal));
    if (lca) console.log(lca.val);
  }
});`
    },
    referenceSolutions: {
      "C++": `#include <iostream>
#include <vector>
#include <sstream>
#include <queue>
using namespace std;
struct TreeNode { int val; TreeNode *left, *right; TreeNode(int x): val(x), left(NULL), right(NULL) {} };
TreeNode* lca(TreeNode* root, int p, int q) {
    if (!root || root->val == p || root->val == q) return root;
    TreeNode* left = lca(root->left, p, q);
    TreeNode* right = lca(root->right, p, q);
    if (left && right) return root;
    return left ? left : right;
}
int main() {
    string l1, l2;
    if (getline(cin, l1) && getline(cin, l2)) {
        stringstream ss(l1); string t; vector<string> tokens;
        while (ss >> t) tokens.push_back(t);
        TreeNode* root = new TreeNode(stoi(tokens[0]));
        queue<TreeNode*> q; q.push(root); size_t i = 1;
        while (!q.empty() && i < tokens.size()) {
            TreeNode* c = q.front(); q.pop();
            if (tokens[i] != "null") { c->left = new TreeNode(stoi(tokens[i])); q.push(c->left); }
            i++;
            if (i < tokens.size() && tokens[i] != "null") { c->right = new TreeNode(stoi(tokens[i])); q.push(c->right); }
            i++;
        }
        stringstream pss(l2); int pVal, qVal; pss >> pVal >> qVal;
        TreeNode* res = lca(root, pVal, qVal);
        if (res) cout << res->val << endl;
    }
    return 0;
}`,
      "JAVA": `import java.util.*;
public class Main {
    static class TreeNode { int val; TreeNode left, right; TreeNode(int x) { val = x; } }
    static TreeNode lca(TreeNode r, int p, int q) {
        if (r == null || r.val == p || r.val == q) return r;
        TreeNode left = lca(r.left, p, q);
        TreeNode right = lca(r.right, p, q);
        if (left != null && right != null) return r;
        return left != null ? left : right;
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextLine()) {
            String l1 = sc.nextLine();
            if (!sc.hasNextLine()) return;
            String l2 = sc.nextLine();
            String[] tokens = l1.trim().split("\\s+");
            TreeNode root = new TreeNode(Integer.parseInt(tokens[0]));
            Queue<TreeNode> q = new LinkedList<>(); q.add(root); int i = 1;
            while (!q.isEmpty() && i < tokens.length) {
                TreeNode c = q.poll();
                if (!tokens[i].equals("null")) { c.left = new TreeNode(Integer.parseInt(tokens[i])); q.add(c.left); }
                i++;
                if (i < tokens.length && !tokens[i].equals("null")) { c.right = new TreeNode(Integer.parseInt(tokens[i])); q.add(c.right); }
                i++;
            }
            String[] pParts = l2.trim().split("\\s+");
            TreeNode res = lca(root, Integer.parseInt(pParts[0]), Integer.parseInt(pParts[1]));
            if (res != null) System.out.println(res.val);
        }
        sc.close();
    }
}`,
      "PYTHON": `import sys
from collections import deque
class TreeNode:
    def __init__(self, x): self.val = x; self.left = None; self.right = None
def lca(r, p, q):
    if not r or r.val == p or r.val == q: return r
    left = lca(r.left, p, q)
    right = lca(r.right, p, q)
    if left and right: return r
    return left if left else right
if __name__ == "__main__":
    lines = sys.stdin.read().splitlines()
    if len(lines) >= 2:
        tokens = lines[0].strip().split()
        root = TreeNode(int(tokens[0]))
        queue = deque([root])
        i = 1
        while queue and i < len(tokens):
            c = queue.popleft()
            if tokens[i] != "null":
                c.left = TreeNode(int(tokens[i]))
                queue.append(c.left)
            i += 1
            if i < len(tokens) and tokens[i] != "null":
                c.right = TreeNode(int(tokens[i]))
                queue.append(c.right)
            i += 1
        p_val, q_val = map(int, lines[1].strip().split())
        res = lca(root, p_val, q_val)
        if res: print(res.val)`,
      "JAVASCRIPT": `const readline = require('readline');
class TreeNode { constructor(val) { this.val = val; this.left = null; this.right = null; } }
function lca(r, p, q) {
  if (!r || r.val === p || r.val === q) return r;
  const left = lca(r.left, p, q);
  const right = lca(r.right, p, q);
  if (left && right) return r;
  return left ? left : right;
}
const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });
const lines = [];
rl.on('line', (l) => lines.push(l.trim()));
rl.on('close', () => {
  if (lines.length >= 2) {
    const tokens = lines[0].split(/\\s+/);
    const root = new TreeNode(Number(tokens[0]));
    const q = [root]; let i = 1;
    while (q.length && i < tokens.length) {
      const c = q.shift();
      if (tokens[i] !== 'null') { c.left = new TreeNode(Number(tokens[i])); q.push(c.left); }
      i++;
      if (i < tokens.length && tokens[i] !== 'null') { c.right = new TreeNode(Number(tokens[i])); q.push(c.right); }
      i++;
    }
    const [pVal, qVal] = lines[1].split(/\\s+/).map(Number);
    const res = lca(root, pVal, qVal);
    if (res) console.log(res.val);
  }
});`
    },
    testCases: [
      { input: "3 5 1 6 2 0 8 null null 7 4\n5 1", output: "3", isHidden: false },
      { input: "3 5 1 6 2 0 8 null null 7 4\n5 4", output: "5", isHidden: false },
      { input: "1 2\n1 2", output: "1", isHidden: false },
      { input: "2 1 3\n1 3", output: "2", isHidden: true },
      { input: "6 2 8 0 4 7 9 null null 3 5\n2 8", output: "6", isHidden: true }
    ]
  },
  {
    title: "Binary Tree Level Order Traversal",
    difficulty: "MEDIUM",
    tags: ["Tree", "Breadth-First Search", "Binary Tree"],
    description: "Given the `root` of a binary tree, return the **level order traversal** of its nodes' values (i.e., from left to right, level by level).\n\n### Example 1:\n```text\nInput: root = [3,9,20,null,null,15,7]\nOutput: 3, 9 20, 15 7\n```\n\n### Constraints:\n- The number of nodes in the tree is in the range `[0, 2000]`.\n- `-1000 <= Node.val <= 1000`",
    constraints: "0 <= nodes <= 2000\n-1000 <= Node.val <= 1000",
    hints: "Use a queue for Breadth-First Search. Process nodes level by level using the queue's size at each step.",
    editorial: "Initialize a queue with the root. While queue is not empty, get current level size = queue.size(), dequeue that many nodes into a level list and push their children.",
    examples: {
      "C++": { input: "3 9 20 null null 15 7", output: "3, 9 20, 15 7", explanation: "Level by level traversal separated by commas." },
      "JAVA": { input: "3 9 20 null null 15 7", output: "3, 9 20, 15 7", explanation: "Level by level traversal separated by commas." },
      "PYTHON": { input: "3 9 20 null null 15 7", output: "3, 9 20, 15 7", explanation: "Level by level traversal separated by commas." },
      "JAVASCRIPT": { input: "3 9 20 null null 15 7", output: "3, 9 20, 15 7", explanation: "Level by level traversal separated by commas." }
    },
    codeSnippets: {
      "C++": `#include <iostream>
#include <vector>
#include <sstream>
#include <queue>
using namespace std;

struct TreeNode {
    int val; TreeNode *left, *right;
    TreeNode(int x) : val(x), left(NULL), right(NULL) {}
};

class Solution {
public:
    vector<vector<int>> levelOrder(TreeNode* root) {
        // Write your code here
        return {};
    }
};

TreeNode* buildTree(const string& line) {
    stringstream ss(line); string t; vector<string> tokens;
    while (ss >> t) tokens.push_back(t);
    if (tokens.empty() || tokens[0] == "null") return nullptr;
    TreeNode* root = new TreeNode(stoi(tokens[0]));
    queue<TreeNode*> q; q.push(root); size_t i = 1;
    while (!q.empty() && i < tokens.size()) {
        TreeNode* curr = q.front(); q.pop();
        if (tokens[i] != "null") { curr->left = new TreeNode(stoi(tokens[i])); q.push(curr->left); }
        i++;
        if (i < tokens.size() && tokens[i] != "null") { curr->right = new TreeNode(stoi(tokens[i])); q.push(curr->right); }
        i++;
    }
    return root;
}

int main() {
    string line;
    if (getline(cin, line)) {
        TreeNode* root = buildTree(line);
        Solution sol;
        vector<vector<int>> res = sol.levelOrder(root);
        for (size_t i = 0; i < res.size(); i++) {
            for (size_t j = 0; j < res[i].size(); j++) {
                cout << res[i][j] << (j == res[i].size() - 1 ? "" : " ");
            }
            if (i + 1 < res.size()) cout << ", ";
        }
        cout << endl;
    }
    return 0;
}`,
      "JAVA": `import java.util.*;

class TreeNode {
    int val; TreeNode left, right;
    TreeNode(int x) { val = x; }
}

class Solution {
    public List<List<Integer>> levelOrder(TreeNode root) {
        // Write your code here
        return new ArrayList<>();
    }
}

public class Main {
    static TreeNode buildTree(String line) {
        String[] tokens = line.trim().split("\\s+");
        if (tokens.length == 0 || tokens[0].equals("null") || tokens[0].isEmpty()) return null;
        TreeNode root = new TreeNode(Integer.parseInt(tokens[0]));
        Queue<TreeNode> q = new LinkedList<>(); q.add(root); int i = 1;
        while (!q.isEmpty() && i < tokens.length) {
            TreeNode c = q.poll();
            if (!tokens[i].equals("null")) { c.left = new TreeNode(Integer.parseInt(tokens[i])); q.add(c.left); }
            i++;
            if (i < tokens.length && !tokens[i].equals("null")) { c.right = new TreeNode(Integer.parseInt(tokens[i])); q.add(c.right); }
            i++;
        }
        return root;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextLine()) {
            TreeNode root = buildTree(sc.nextLine());
            Solution sol = new Solution();
            List<List<Integer>> res = sol.levelOrder(root);
            List<String> levels = new ArrayList<>();
            for (List<Integer> lvl : res) {
                StringBuilder sb = new StringBuilder();
                for (int j = 0; j < lvl.size(); j++) sb.append(lvl.get(j)).append(j == lvl.size() - 1 ? "" : " ");
                levels.add(sb.toString());
            }
            System.out.println(String.join(", ", levels));
        }
        sc.close();
    }
}`,
      "PYTHON": `import sys
from typing import Optional, List
from collections import deque

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def levelOrder(self, root: Optional[TreeNode]) -> List[List[int]]:
        # Write your code here
        return []

def buildTree(line):
    tokens = line.strip().split()
    if not tokens or tokens[0] == "null": return None
    root = TreeNode(int(tokens[0]))
    q = deque([root])
    i = 1
    while q and i < len(tokens):
        curr = q.popleft()
        if tokens[i] != "null":
            curr.left = TreeNode(int(tokens[i]))
            q.append(curr.left)
        i += 1
        if i < len(tokens) and tokens[i] != "null":
            curr.right = TreeNode(int(tokens[i]))
            q.append(curr.right)
        i += 1
    return root

if __name__ == "__main__":
    line = sys.stdin.read().strip()
    if line:
        root = buildTree(line)
        sol = Solution()
        res = sol.levelOrder(root)
        print(", ".join(" ".join(map(str, lvl)) for lvl in res))`,
      "JAVASCRIPT": `const readline = require('readline');

class TreeNode { constructor(val, left = null, right = null) { this.val = val; this.left = left; this.right = right; } }

class Solution {
  levelOrder(root) {
    // Write your code here
    return [];
  }
}

function buildTree(line) {
  const tokens = line.trim().split(/\\s+/);
  if (!tokens.length || tokens[0] === 'null' || !tokens[0]) return null;
  const root = new TreeNode(Number(tokens[0]));
  const q = [root]; let i = 1;
  while (q.length && i < tokens.length) {
    const c = q.shift();
    if (tokens[i] !== 'null') { c.left = new TreeNode(Number(tokens[i])); q.push(c.left); }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') { c.right = new TreeNode(Number(tokens[i])); q.push(c.right); }
    i++;
  }
  return root;
}

const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });
rl.on('line', (line) => {
  const root = buildTree(line);
  const sol = new Solution();
  const res = sol.levelOrder(root);
  console.log(res.map((lvl) => lvl.join(' ')).join(', '));
  process.exit(0);
});`
    },
    referenceSolutions: {
      "C++": `#include <iostream>
#include <vector>
#include <sstream>
#include <queue>
using namespace std;
struct TreeNode { int val; TreeNode *left, *right; TreeNode(int x): val(x), left(NULL), right(NULL) {} };
int main() {
    string line;
    if (getline(cin, line)) {
        stringstream ss(line); string t; vector<string> tokens;
        while (ss >> t) tokens.push_back(t);
        if (tokens.empty() || tokens[0] == "null") return 0;
        TreeNode* root = new TreeNode(stoi(tokens[0]));
        queue<TreeNode*> q; q.push(root); size_t i = 1;
        while (!q.empty() && i < tokens.size()) {
            TreeNode* c = q.front(); q.pop();
            if (tokens[i] != "null") { c->left = new TreeNode(stoi(tokens[i])); q.push(c->left); }
            i++;
            if (i < tokens.size() && tokens[i] != "null") { c->right = new TreeNode(stoi(tokens[i])); q.push(c->right); }
            i++;
        }
        queue<TreeNode*> lq; lq.push(root);
        vector<string> levels;
        while (!lq.empty()) {
            int sz = lq.size();
            string lvl = "";
            for (int k = 0; k < sz; k++) {
                TreeNode* node = lq.front(); lq.pop();
                lvl += to_string(node->val) + (k == sz - 1 ? "" : " ");
                if (node->left) lq.push(node->left);
                if (node->right) lq.push(node->right);
            }
            levels.push_back(lvl);
        }
        for (size_t k = 0; k < levels.size(); k++) {
            cout << levels[k] << (k == levels.size() - 1 ? "" : ", ");
        }
        cout << endl;
    }
    return 0;
}`,
      "JAVA": `import java.util.*;
public class Main {
    static class TreeNode { int val; TreeNode left, right; TreeNode(int x) { val = x; } }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextLine()) {
            String[] tokens = sc.nextLine().trim().split("\\s+");
            if (tokens.length == 0 || tokens[0].equals("null") || tokens[0].isEmpty()) return;
            TreeNode root = new TreeNode(Integer.parseInt(tokens[0]));
            Queue<TreeNode> q = new LinkedList<>(); q.add(root); int i = 1;
            while (!q.isEmpty() && i < tokens.length) {
                TreeNode c = q.poll();
                if (!tokens[i].equals("null")) { c.left = new TreeNode(Integer.parseInt(tokens[i])); q.add(c.left); }
                i++;
                if (i < tokens.length && !tokens[i].equals("null")) { c.right = new TreeNode(Integer.parseInt(tokens[i])); q.add(c.right); }
                i++;
            }
            Queue<TreeNode> lq = new LinkedList<>(); lq.add(root);
            List<String> levels = new ArrayList<>();
            while (!lq.isEmpty()) {
                int sz = lq.size();
                StringBuilder sb = new StringBuilder();
                for (int k = 0; k < sz; k++) {
                    TreeNode node = lq.poll();
                    sb.append(node.val).append(k == sz - 1 ? "" : " ");
                    if (node.left != null) lq.add(node.left);
                    if (node.right != null) lq.add(node.right);
                }
                levels.add(sb.toString());
            }
            System.out.println(String.join(", ", levels));
        }
        sc.close();
    }
}`,
      "PYTHON": `import sys
from collections import deque
class TreeNode:
    def __init__(self, val=0, left=None, right=None): self.val = val; self.left = left; self.right = right
if __name__ == "__main__":
    line = sys.stdin.read().strip()
    if line:
        tokens = line.split()
        if not tokens or tokens[0] == "null": sys.exit(0)
        root = TreeNode(int(tokens[0]))
        q = deque([root])
        i = 1
        while q and i < len(tokens):
            c = q.popleft()
            if tokens[i] != "null":
                c.left = TreeNode(int(tokens[i]))
                q.append(c.left)
            i += 1
            if i < len(tokens) and tokens[i] != "null":
                c.right = TreeNode(int(tokens[i]))
                q.append(c.right)
            i += 1
        lq = deque([root])
        levels = []
        while lq:
            sz = len(lq)
            curr = []
            for _ in range(sz):
                node = lq.popleft()
                curr.append(str(node.val))
                if node.left: lq.append(node.left)
                if node.right: lq.append(node.right)
            levels.append(" ".join(curr))
        print(", ".join(levels))`,
      "JAVASCRIPT": `const readline = require('readline');
class TreeNode { constructor(val, left = null, right = null) { this.val = val; this.left = left; this.right = right; } }
const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });
rl.on('line', (line) => {
  const tokens = line.trim().split(/\\s+/);
  if (!tokens.length || tokens[0] === 'null' || !tokens[0]) process.exit(0);
  const root = new TreeNode(Number(tokens[0]));
  const q = [root]; let i = 1;
  while (q.length && i < tokens.length) {
    const c = q.shift();
    if (tokens[i] !== 'null') { c.left = new TreeNode(Number(tokens[i])); q.push(c.left); }
    i++;
    if (i < tokens.length && tokens[i] !== 'null') { c.right = new TreeNode(Number(tokens[i])); q.push(c.right); }
    i++;
  }
  const lq = [root]; const levels = [];
  while (lq.length) {
    const sz = lq.length; const curr = [];
    for (let k = 0; k < sz; k++) {
      const node = lq.shift();
      curr.push(node.val);
      if (node.left) lq.push(node.left);
      if (node.right) lq.push(node.right);
    }
    levels.push(curr.join(' '));
  }
  console.log(levels.join(', '));
  process.exit(0);
});`
    },
    testCases: [
      { input: "3 9 20 null null 15 7", output: "3, 9 20, 15 7", isHidden: false },
      { input: "1", output: "1", isHidden: false },
      { input: "1 2 3 4 5", output: "1, 2 3, 4 5", isHidden: false },
      { input: "1 null 2 null 3", output: "1, 2, 3", isHidden: true },
      { input: "10 20 30 40 null null 50", output: "10, 20 30, 40 50", isHidden: true }
    ]
  },
  {
    title: "Number of Islands",
    difficulty: "MEDIUM",
    tags: ["Array", "Depth-First Search", "Breadth-First Search", "Matrix"],
    description: "Given an `m x n` 2D binary grid `grid` which represents a map of `'1'`s (land) and `'0'`s (water), return the number of islands.\n\nAn **island** is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.\n\n### Example 1:\n```text\nInput: grid = [\n  [\"1\",\"1\",\"1\",\"1\",\"0\"],\n  [\"1\",\"1\",\"0\",\"1\",\"0\"],\n  [\"1\",\"1\",\"0\",\"0\",\"0\"],\n  [\"0\",\"0\",\"0\",\"0\",\"0\"]\n]\nOutput: 1\n```\n\n### Constraints:\n- `m == grid.length`\n- `n == grid[i].length`\n- `1 <= m, n <= 300`\n- `grid[i][j]` is `'0'` or `'1'`.",
    constraints: "1 <= m, n <= 300\ngrid[i][j] is '0' or '1'.",
    hints: "Traverse each cell. Whenever you encounter '1', increment the island count and run DFS/BFS to sink the entire island (turn connected '1's into '0's).",
    editorial: "Iterate through each cell (i, j). When grid[i][j] == '1', increment island count and call dfs(i, j) to mark all horizontally and vertically connected '1's as visited.",
    examples: {
      "C++": { input: "4 5\n1 1 1 1 0\n1 1 0 1 0\n1 1 0 0 0\n0 0 0 0 0", output: "1", explanation: "All 1s form a single connected island." },
      "JAVA": { input: "4 5\n1 1 1 1 0\n1 1 0 1 0\n1 1 0 0 0\n0 0 0 0 0", output: "1", explanation: "All 1s form a single connected island." },
      "PYTHON": { input: "4 5\n1 1 1 1 0\n1 1 0 1 0\n1 1 0 0 0\n0 0 0 0 0", output: "1", explanation: "All 1s form a single connected island." },
      "JAVASCRIPT": { input: "4 5\n1 1 1 1 0\n1 1 0 1 0\n1 1 0 0 0\n0 0 0 0 0", output: "1", explanation: "All 1s form a single connected island." }
    },
    codeSnippets: {
      "C++": `#include <iostream>
#include <vector>
using namespace std;

class Solution {
public:
    int numIslands(vector<vector<char>>& grid) {
        // Write your code here
        return 0;
    }
};

int main() {
    int m, n;
    if (cin >> m >> n) {
        vector<vector<char>> grid(m, vector<char>(n));
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) cin >> grid[i][j];
        }
        Solution sol;
        cout << sol.numIslands(grid) << endl;
    }
    return 0;
}`,
      "JAVA": `import java.util.*;

class Solution {
    public int numIslands(char[][] grid) {
        // Write your code here
        return 0;
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextInt()) {
            int m = sc.nextInt();
            int n = sc.nextInt();
            char[][] grid = new char[m][n];
            for (int i = 0; i < m; i++) {
                for (int j = 0; j < n; j++) grid[i][j] = sc.next().charAt(0);
            }
            Solution sol = new Solution();
            System.out.println(sol.numIslands(grid));
        }
        sc.close();
    }
}`,
      "PYTHON": `import sys
from typing import List

class Solution:
    def numIslands(self, grid: List[List[str]]) -> int:
        # Write your code here
        return 0

if __name__ == "__main__":
    lines = sys.stdin.read().splitlines()
    if lines:
        m, n = map(int, lines[0].strip().split())
        grid = []
        for i in range(1, m + 1):
            grid.append(lines[i].strip().split())
        sol = Solution()
        print(sol.numIslands(grid))`,
      "JAVASCRIPT": `const readline = require('readline');

class Solution {
  numIslands(grid) {
    // Write your code here
    return 0;
  }
}

const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });
const lines = [];
rl.on('line', (l) => lines.push(l.trim()));
rl.on('close', () => {
  if (!lines.length) return;
  const [m, n] = lines[0].split(/\\s+/).map(Number);
  const grid = [];
  for (let i = 1; i <= m; i++) {
    grid.push(lines[i].split(/\\s+/));
  }
  const sol = new Solution();
  console.log(sol.numIslands(grid));
});`
    },
    referenceSolutions: {
      "C++": `#include <iostream>
#include <vector>
using namespace std;
void dfs(vector<vector<char>>& grid, int r, int c, int m, int n) {
    if (r < 0 || r >= m || c < 0 || c >= n || grid[r][c] != '1') return;
    grid[r][c] = '0';
    dfs(grid, r + 1, c, m, n);
    dfs(grid, r - 1, c, m, n);
    dfs(grid, r, c + 1, m, n);
    dfs(grid, r, c - 1, m, n);
}
int main() {
    int m, n;
    if (cin >> m >> n) {
        vector<vector<char>> grid(m, vector<char>(n));
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) cin >> grid[i][j];
        }
        int count = 0;
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (grid[i][j] == '1') {
                    count++;
                    dfs(grid, i, j, m, n);
                }
            }
        }
        cout << count << endl;
    }
    return 0;
}`,
      "JAVA": `import java.util.*;
public class Main {
    static void dfs(char[][] g, int r, int c, int m, int n) {
        if (r < 0 || r >= m || c < 0 || c >= n || g[r][c] != '1') return;
        g[r][c] = '0';
        dfs(g, r + 1, c, m, n);
        dfs(g, r - 1, c, m, n);
        dfs(g, r, c + 1, m, n);
        dfs(g, r, c - 1, m, n);
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextInt()) {
            int m = sc.nextInt(); int n = sc.nextInt();
            char[][] grid = new char[m][n];
            for (int i = 0; i < m; i++) {
                for (int j = 0; j < n; j++) grid[i][j] = sc.next().charAt(0);
            }
            int count = 0;
            for (int i = 0; i < m; i++) {
                for (int j = 0; j < n; j++) {
                    if (grid[i][j] == '1') { count++; dfs(grid, i, j, m, n); }
                }
            }
            System.out.println(count);
        }
        sc.close();
    }
}`,
      "PYTHON": `import sys
sys.setrecursionlimit(200000)
def dfs(g, r, c, m, n):
    if r < 0 or r >= m or c < 0 or c >= n or g[r][c] != '1':
        return
    g[r][c] = '0'
    dfs(g, r + 1, c, m, n)
    dfs(g, r - 1, c, m, n)
    dfs(g, r, c + 1, m, n)
    dfs(g, r, c - 1, m, n)

if __name__ == "__main__":
    lines = sys.stdin.read().splitlines()
    if lines:
        m, n = map(int, lines[0].strip().split())
        grid = [lines[i].strip().split() for i in range(1, m + 1)]
        count = 0
        for i in range(m):
            for j in range(n):
                if grid[i][j] == '1':
                    count += 1
                    dfs(grid, i, j, m, n)
        print(count)`,
      "JAVASCRIPT": `const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });
const lines = [];
rl.on('line', (l) => lines.push(l.trim()));
rl.on('close', () => {
  if (!lines.length) return;
  const [m, n] = lines[0].split(/\\s+/).map(Number);
  const grid = [];
  for (let i = 1; i <= m; i++) grid.push(lines[i].split(/\\s+/));
  function dfs(r, c) {
    if (r < 0 || r >= m || c < 0 || c >= n || grid[r][c] !== '1') return;
    grid[r][c] = '0';
    dfs(r + 1, c); dfs(r - 1, c); dfs(r, c + 1); dfs(r, c - 1);
  }
  let count = 0;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === '1') {
        count++;
        dfs(i, j);
      }
    }
  }
  console.log(count);
});`
    },
    testCases: [
      { input: "4 5\n1 1 1 1 0\n1 1 0 1 0\n1 1 0 0 0\n0 0 0 0 0", output: "1", isHidden: false },
      { input: "4 5\n1 1 0 0 0\n1 1 0 0 0\n0 0 1 0 0\n0 0 0 1 1", output: "3", isHidden: false },
      { input: "1 1\n1", output: "1", isHidden: false },
      { input: "1 1\n0", output: "0", isHidden: true },
      { input: "3 3\n1 0 1\n0 1 0\n1 0 1", output: "5", isHidden: true }
    ]
  }
];

export async function seedStriver() {
  console.log("Starting seeding of 14 Striver A2Z problems...");
  const adminUser = await db.user.findFirst({ where: { role: "ADMIN" } }) || await db.user.findFirst();
  if (!adminUser) throw new Error("No user found in the database to associate problems with.");

  console.log(`Using user account: ${adminUser.email || adminUser.name} (ID: ${adminUser.id})`);

  for (const problemData of striverProblems) {
    console.log(`Processing: "${problemData.title}"...`);
    const testcasesJson = problemData.testCases.map((tc) => ({ input: tc.input, output: tc.output }));

    let existing = await db.problem.findFirst({
      where: { title: { equals: problemData.title, mode: "insensitive" } }
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

    await db.testCase.deleteMany({ where: { problemId } });
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
  console.log("All 14 Striver A2Z problems seeded successfully!");
}

if (process.argv[1] && process.argv[1].includes("seedStriver.js")) {
  seedStriver()
    .catch((err) => {
      console.error("Error seeding Striver problems:", err);
      process.exit(1);
    })
    .finally(() => process.exit(0));
}
