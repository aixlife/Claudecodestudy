import { Router, type IRouter, type Request, type Response } from "express";
import { db, postsTable, commentsTable, postLikesTable, assignmentsTable, userProgressTable, usersTable } from "@workspace/db";
import { eq, desc, and, sql } from "drizzle-orm";

const router: IRouter = Router();

function requireAuth(req: Request, res: Response): boolean {
  if (!req.isAuthenticated()) {
    res.status(401).json({ error: "로그인이 필요합니다" });
    return false;
  }
  return true;
}

router.get("/community/members", async (req: Request, res: Response) => {
  try {
    const members = await db
      .select({
        id: usersTable.id,
        firstName: usersTable.firstName,
        lastName: usersTable.lastName,
        profileImageUrl: usersTable.profileImageUrl,
        isVerified: userProgressTable.isVerified,
        completedSteps: userProgressTable.completedSteps,
        verifiedAt: userProgressTable.verifiedAt,
        joinedAt: usersTable.createdAt,
      })
      .from(usersTable)
      .leftJoin(userProgressTable, eq(usersTable.id, userProgressTable.userId))
      .orderBy(desc(usersTable.createdAt));
    res.json({ members });
  } catch (err) {
    res.status(500).json({ error: "서버 오류" });
  }
});

router.get("/community/posts/:boardType", async (req: Request, res: Response) => {
  const { boardType } = req.params;
  const validBoards = ["notice", "tools", "qa", "discussion"];
  if (!validBoards.includes(boardType)) {
    res.status(400).json({ error: "잘못된 게시판" });
    return;
  }
  try {
    const posts = await db
      .select({
        id: postsTable.id,
        title: postsTable.title,
        content: postsTable.content,
        isPinned: postsTable.isPinned,
        isAnonymous: postsTable.isAnonymous,
        viewCount: postsTable.viewCount,
        likeCount: postsTable.likeCount,
        externalUrl: postsTable.externalUrl,
        createdAt: postsTable.createdAt,
        authorId: postsTable.authorId,
        authorFirstName: usersTable.firstName,
        authorLastName: usersTable.lastName,
        authorProfileImage: usersTable.profileImageUrl,
      })
      .from(postsTable)
      .leftJoin(usersTable, eq(postsTable.authorId, usersTable.id))
      .where(eq(postsTable.boardType, boardType as "notice" | "tools" | "qa" | "discussion"))
      .orderBy(desc(postsTable.isPinned), desc(postsTable.createdAt));
    res.json({ posts });
  } catch (err) {
    res.status(500).json({ error: "서버 오류" });
  }
});

router.get("/community/posts/:boardType/:postId", async (req: Request, res: Response) => {
  const { postId } = req.params;
  try {
    const [post] = await db
      .select({
        id: postsTable.id,
        title: postsTable.title,
        content: postsTable.content,
        boardType: postsTable.boardType,
        isPinned: postsTable.isPinned,
        isAnonymous: postsTable.isAnonymous,
        viewCount: postsTable.viewCount,
        likeCount: postsTable.likeCount,
        externalUrl: postsTable.externalUrl,
        createdAt: postsTable.createdAt,
        authorId: postsTable.authorId,
        authorFirstName: usersTable.firstName,
        authorLastName: usersTable.lastName,
        authorProfileImage: usersTable.profileImageUrl,
      })
      .from(postsTable)
      .leftJoin(usersTable, eq(postsTable.authorId, usersTable.id))
      .where(eq(postsTable.id, parseInt(postId)));

    if (!post) { res.status(404).json({ error: "없는 글" }); return; }

    await db.update(postsTable).set({ viewCount: post.viewCount + 1 }).where(eq(postsTable.id, parseInt(postId)));

    const comments = await db
      .select({
        id: commentsTable.id,
        content: commentsTable.content,
        isAnonymous: commentsTable.isAnonymous,
        createdAt: commentsTable.createdAt,
        authorId: commentsTable.authorId,
        authorFirstName: usersTable.firstName,
        authorLastName: usersTable.lastName,
        authorProfileImage: usersTable.profileImageUrl,
      })
      .from(commentsTable)
      .leftJoin(usersTable, eq(commentsTable.authorId, usersTable.id))
      .where(eq(commentsTable.postId, parseInt(postId)))
      .orderBy(commentsTable.createdAt);

    let isLiked = false;
    if (req.isAuthenticated()) {
      const like = await db.select().from(postLikesTable)
        .where(and(eq(postLikesTable.postId, parseInt(postId)), eq(postLikesTable.userId, req.user.id)));
      isLiked = like.length > 0;
    }

    res.json({ post, comments, isLiked });
  } catch (err) {
    res.status(500).json({ error: "서버 오류" });
  }
});

router.post("/community/posts", async (req: Request, res: Response) => {
  if (!requireAuth(req, res)) return;
  const { boardType, title, content, isPinned, isAnonymous, externalUrl } = req.body;
  const validBoards = ["notice", "tools", "qa", "discussion"];
  if (!validBoards.includes(boardType) || !title || !content) {
    res.status(400).json({ error: "필수 항목 누락" });
    return;
  }
  try {
    const [post] = await db.insert(postsTable).values({
      boardType,
      authorId: req.user.id,
      title,
      content,
      isPinned: isPinned || false,
      isAnonymous: isAnonymous || false,
      externalUrl: externalUrl || null,
    }).returning();
    res.json({ post });
  } catch (err) {
    res.status(500).json({ error: "서버 오류" });
  }
});

router.post("/community/posts/:postId/comments", async (req: Request, res: Response) => {
  if (!requireAuth(req, res)) return;
  const { postId } = req.params;
  const { content, isAnonymous } = req.body;
  if (!content) { res.status(400).json({ error: "내용 필수" }); return; }
  try {
    const [comment] = await db.insert(commentsTable).values({
      postId: parseInt(postId),
      authorId: req.user.id,
      content,
      isAnonymous: isAnonymous || false,
    }).returning();
    res.json({ comment });
  } catch (err) {
    res.status(500).json({ error: "서버 오류" });
  }
});

router.post("/community/posts/:postId/like", async (req: Request, res: Response) => {
  if (!requireAuth(req, res)) return;
  const { postId } = req.params;
  try {
    const existing = await db.select().from(postLikesTable)
      .where(and(eq(postLikesTable.postId, parseInt(postId)), eq(postLikesTable.userId, req.user.id)));
    if (existing.length > 0) {
      await db.delete(postLikesTable).where(and(eq(postLikesTable.postId, parseInt(postId)), eq(postLikesTable.userId, req.user.id)));
      await db.update(postsTable).set({ likeCount: sql`${postsTable.likeCount} - 1` }).where(eq(postsTable.id, parseInt(postId)));
      res.json({ liked: false });
    } else {
      await db.insert(postLikesTable).values({ postId: parseInt(postId), userId: req.user.id });
      await db.update(postsTable).set({ likeCount: sql`${postsTable.likeCount} + 1` }).where(eq(postsTable.id, parseInt(postId)));
      res.json({ liked: true });
    }
  } catch (err) {
    res.status(500).json({ error: "서버 오류" });
  }
});

router.get("/community/assignments/my", async (req: Request, res: Response) => {
  if (!requireAuth(req, res)) return;
  try {
    const assignments = await db.select().from(assignmentsTable)
      .where(eq(assignmentsTable.userId, req.user.id))
      .orderBy(desc(assignmentsTable.submittedAt));
    res.json({ assignments });
  } catch (err) {
    res.status(500).json({ error: "서버 오류" });
  }
});

router.post("/community/assignments", async (req: Request, res: Response) => {
  if (!requireAuth(req, res)) return;
  const { title, description, projectUrl, screenshotUrl } = req.body;
  if (!title || !description) { res.status(400).json({ error: "제목, 설명 필수" }); return; }
  try {
    const [assignment] = await db.insert(assignmentsTable).values({
      userId: req.user.id,
      title,
      description,
      projectUrl: projectUrl || null,
      screenshotUrl: screenshotUrl || null,
    }).returning();
    res.json({ assignment });
  } catch (err) {
    res.status(500).json({ error: "서버 오류" });
  }
});

router.get("/community/my-progress", async (req: Request, res: Response) => {
  if (!requireAuth(req, res)) return;
  try {
    const [progress] = await db.select().from(userProgressTable)
      .where(eq(userProgressTable.userId, req.user.id));
    res.json({ progress: progress || null });
  } catch (err) {
    res.status(500).json({ error: "서버 오류" });
  }
});

router.post("/community/sync-progress", async (req: Request, res: Response) => {
  if (!requireAuth(req, res)) return;
  const { completedSteps } = req.body;
  try {
    const existing = await db.select().from(userProgressTable)
      .where(eq(userProgressTable.userId, req.user.id));
    if (existing.length > 0) {
      await db.update(userProgressTable)
        .set({ completedSteps: JSON.stringify(completedSteps), updatedAt: new Date() })
        .where(eq(userProgressTable.userId, req.user.id));
    } else {
      await db.insert(userProgressTable).values({
        userId: req.user.id,
        completedSteps: JSON.stringify(completedSteps),
      });
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "서버 오류" });
  }
});

export default router;
