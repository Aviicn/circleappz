import db from "../db";

class FollowsService {
  async find(
    loginSession: any,
    queryType?: string,
    queryLimit?: number
  ): Promise<any> {
    try {
      console.log(JSON.stringify(loginSession.user));
      let follows;

      if (queryType === "followings") {
        follows = await db.follow.findMany({
          take: queryLimit,
          where: {
            followerId: loginSession.user.id,
          },
          include: {
            following: true,
          },
        });

        return follows.map((follow) => ({
          id: follow.id,
          user_id: follow.following.id,
          username: follow.following.username,
          fullname: follow.following.fullname,
          email: follow.following.email,
          picture: follow.following.image,
          description: follow.following.description,
          is_followed: true,
        }));
      } else if (queryType === "followers") {
        follows = await db.follow.findMany({
          take: queryLimit,
          where: {
            followingId: loginSession.user.id,
          },
          include: {
            follower: true,
          },
        });

        return await Promise.all(
          follows.map(async (follow) => {
            const isFollowed = await db.follow.count({
              where: {
                followerId: loginSession.user.id,
                followingId: follow.followerId,
              },
            });

            return {
              id: follow.follower.id,
              user_id: follow.follower.id,
              username: follow.follower.username,
              fullname: follow.follower.fullname,
              email: follow.follower.email,
              picture: follow.follower.image,
              description: follow.follower.description,
              is_followed: isFollowed > 0,
            };
          })
        );
      }

      return {
        message: `Please specify valid query "type" (followers / followings)`,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async create(reqBody: any, loginSession: any): Promise<any> {
    try {
      const isFollowExist = await db.follow.count({
        where: {
          followerId: loginSession.user.id,
          followingId: reqBody.followed_user_id,
        },
      });

      if (isFollowExist > 0) {
        throw new Error("You already follow this user!");
      }

      if (reqBody.followed_user_id === loginSession.user.id) {
        throw new Error("You can't follow yourself!");
      }

      const isUserExist = await db.user.count({
        where: {
          id: reqBody.followed_user_id,
        },
      });

      if (isUserExist <= 0) {
        throw new Error("This user doesn't exist!");
      }

      const follow = await db.follow.create({
        data: {
          follower: {
            connect: {
              id: loginSession.user.id,
            },
          },
          following: {
            connect: {
              id: reqBody.followed_user_id,
            },
          },
        },
      });

      return {
        message: "You follow this user!",
        follow: follow,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async delete(followedUserId: number, loginSession: any): Promise<any> {
    try {
      const follow = await db.follow.findFirst({
        where: {
          followerId: loginSession.user.id,
          followingId: followedUserId,
        },
      });

      if (!follow) {
        throw new Error("You didn't follow this user!");
      }

      await db.follow.deleteMany({
        where: {
          followerId: loginSession.user.id,
          followingId: followedUserId,
        },
      });

      return {
        message: "You unfollow this user!",
        follow: "follow",
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default new FollowsService();
