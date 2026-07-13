import { db } from "../libs/db.js";

export const getUserProfileData = async (req, res) => {
  const userId = req.user.id;

  try {
    // 1. Fetch user solved stats
    const solvedList = await db.problemSolved.findMany({
      where: { userId },
      include: {
        problem: {
          select: {
            difficulty: true,
          },
        },
      },
    });

    const solvedCounts = {
      EASY: 0,
      MEDIUM: 0,
      HARD: 0,
    };

    solvedList.forEach((item) => {
      if (item.problem && item.problem.difficulty) {
        solvedCounts[item.problem.difficulty]++;
      }
    });

    const totalSolved = solvedList.length;

    // Fetch total system problems by difficulty
    const totalCountByDifficulty = await db.problem.groupBy({
      by: ["difficulty"],
      _count: {
        _all: true,
      },
    });

    const systemCounts = {
      EASY: 0,
      MEDIUM: 0,
      HARD: 0,
    };

    totalCountByDifficulty.forEach((item) => {
      systemCounts[item.difficulty] = item._count._all;
    });

    const totalSystem = Object.values(systemCounts).reduce((a, b) => a + b, 0);

    const stats = {
      solved: {
        total: totalSolved,
        ...solvedCounts,
      },
      total: {
        total: totalSystem,
        ...systemCounts,
      },
    };

    // 2. Fetch recent submissions (last 20)
    const submissions = await db.submission.findMany({
      where: { userId },
      orderBy: {
        createdAt: "desc",
      },
      take: 20,
      include: {
        problem: {
          select: {
            title: true,
          },
        },
      },
    });

    // 3. Fetch user playlists with problem counts
    const playlists = await db.playlist.findMany({
      where: { userId },
      include: {
        _count: {
          select: {
            problems: true,
          },
        },
      },
    });

    return res.status(200).json({
      success: true,
      profile: {
        user: {
          id: req.user.id,
          name: req.user.name,
          email: req.user.email,
          image: req.user.image,
          role: req.user.role,
        },
        stats,
        submissions,
        playlists,
      },
    });
  } catch (error) {
    console.error("Error fetching user profile data:", error);
    return res.status(500).json({
      error: "Error while fetching user profile data",
    });
  }
};
