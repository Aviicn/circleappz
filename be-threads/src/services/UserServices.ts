import db from "../db";

class UserService {
  async find(id: number): Promise<any> {
    try {
      const users = await db.user.findMany();

      const following = await db.follow.findMany({
        where: {
          followerId: id,
        },
        include: {
          following: true,
        },
      });

      return this.matchFollowing(users, following);
    } catch (err) {
      throw new Error("Something wrong in find service users !");
    }
  }

  async findOne(id: number): Promise<object | string> {
    try {
      const user = await db.user.findUnique({
        where: { id },
        select: {
          id: true,
          email: true,
          description: true,
          fullname: true,
          username: true,
          image: true,
          cover: true,
        },
      });

      return user;
    } catch (err) {
      throw new Error("Something wrong in find service users !");
    }
  }

  async update(data: any): Promise<object | string> {
    try {
      const updatedUser = await db.user.update({
        where: {
          id: data.id,
        },
        data,
      });

      return updatedUser;
    } catch (err) {
      throw new Error("Something wrong in find service users !");
    }
  }

  private matchFollowing(users: any, following: any): any {
    return users.map((user: any) => {
      const isFollowing = !!following.find(
        (follow: any) => follow.following.id === user.id
      );

      return {
        ...user,
        isFollowing,
      };
    });
  }
}

export default new UserService();
