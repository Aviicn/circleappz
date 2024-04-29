import db from "../db";

class ReplyServices {
  async find(reqQuery: any): Promise<any> {
    try {
      const threadId = parseInt(reqQuery.thread_id as string);

      const replies = await db.reply.findMany({
        where: {
          threadId: threadId,
        },
        include: {
          user: true,
        },
        orderBy: {
          id: "desc",
        },
      });

      return replies;
    } catch (err) {
      throw new Error("Something wrong in server!");
    }
  }

  async create(reqBody: any, loginSession: any): Promise<any> {
    try {
      const reply = await db.reply.create({
        data: {
          content: reqBody.content,
          userId: loginSession.user.id,
          threadId: reqBody.thread_id,
        },
      });

      return reply;
    } catch (err) {
      throw new Error("Something wrong in server!");
    }
  }
}

export default new ReplyServices();
