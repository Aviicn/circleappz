import db from "../db";
class LikeServices {
  async create(reqBody: any, loginSession: any): Promise<any> {
    try {
      const checkLike = await db.like.count({
        where: {
          userId: loginSession.user.id,
          threadId: reqBody.thread_id,
        },
      });

      if (checkLike > 0) {
        throw new Error("You already like this thread!");
      }

      const like = await db.like.create({
        data: {
          user: {
            connect: {
              id: loginSession.user.id,
            },
          },
          thread: {
            connect: {
              id: reqBody.thread_id,
            },
          },
        },
      });

      return {
        message: "You liked this thread!",
        like: like,
      };
    } catch (err) {
      throw new Error("Something wrong in server!");
    }
  }

  async delete(threadId: number, loginSession: any): Promise<any> {
    try {
      const like = await db.like.findFirst({
        where: {
          userId: loginSession.user.id,
          threadId: threadId,
        },
      });

      if (!like) {
        throw new Error("You didn't like this thread!");
      }

      await db.like.deleteMany({
        where: {
          userId: like.userId,
          threadId: like.threadId,
        },
      });

      return {
        message: "You unliked this thread!",
        like: like,
      };
    } catch (err) {
      throw new Error("Something wrong in server!");
    }
  }
}

export default new LikeServices();
