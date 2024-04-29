import db from "../db";
import { Request, Response } from "express";
import {
  createThreadSchema,
  updateThreadSchema,
} from "../utils/validator/Thread";
import { IThread } from "../libs/app";

class ThreadServices {
  async find(reqQuery?: any, loginSession?: any): Promise<any[]> {
    try {
      const threads = await db.thread.findMany({
        include: {
          user: true,
          likes: {
            include: {
              user: true,
            },
          },
          replies: true,
        },
        orderBy: {
          id: "desc",
        },
      });
      // console.log("HASIL ???????????", JSON.stringify(threads));

      let newResponse = threads.map((element: any) => ({
        ...element,
        replies_count: element.replies.length,
        likes_count: element.likes.length,
        is_liked: element.likes.some(
          (like: any) => like.user.id == loginSession.user.id
        ),
      }));

      return newResponse;
    } catch (err) {
      throw new Error("Something went wrong in server!");
    }
  }

  async findOne(id: number): Promise<any[]> {
    try {
      const thread = await db.thread.findMany({
        where: {
          id: id,
        },
        include: {
          user: true,
          replies: true,
          likes: {
            include: {
              user: true,
            },
          },
        },
        orderBy: {
          id: "desc",
        },
      });

      return thread;
    } catch (err) {
      throw new Error("Something wrong in server!");
    }
  }

  async findOneByUserId(id: number): Promise<any[]> {
    try {
      const thread = await db.thread.findMany({
        where: {
          userId: id,
        },
        include: {
          user: true,
          replies: true,
          likes: {
            include: {
              user: true,
            },
          },
        },
        orderBy: {
          id: "desc",
        },
      });

      return thread;
    } catch (err) {
      throw new Error("Something wrong in server!");
    }
  }

  getThread = async (id: number) => {
    return await db.thread.findFirst({
      where: {
        id,
      },
    });
  };

  async update(id: number, reqBody: any): Promise<any> {
    try {
      const thread = await db.thread.findFirst({
        where: {
          id: id,
        },
      });

      if (!thread) {
        throw new Error("Thread ID not found");
      }

      const { error } = updateThreadSchema.validate(reqBody);
      if (error) {
        throw new Error();
      }

      if (reqBody.content != "") {
        thread.content = reqBody.content;
      }

      if (reqBody.image != "") {
        thread.image = reqBody.image;
      }

      const response = await db.thread.update({
        where: {
          id: id,
        },
        data: {
          content: reqBody.content,
          image: reqBody.image,
        },
      });

      return {
        message: "success updated !",
        data: response,
      };
    } catch (err) {
      throw new Error("Something wrong in server!");
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id, 10);

      const thread = await db.thread.findFirst({
        where: {
          id: id,
        },
      });

      if (!thread) {
        return res.status(404).json({ Error: "Thread ID not found" });
      }

      await db.thread.delete({
        where: {
          id: id,
        },
      });

      return res.status(200).json(thread);
    } catch (err) {
      return res.status(500).json({ Error: "Error while deleting thread" });
    }
  }

  async createThread(payload: IThread): Promise<string | Object> {
    // console.log(JSON.stringify(payload))
    const thread = await db.thread.create({
      data: {
        ...payload,
      },
    });
    // const thread=""

    return thread;
  }
}

export default new ThreadServices();
