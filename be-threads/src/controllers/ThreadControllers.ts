import { Request, Response } from "express";
import ThreadServices from "../services/ThreadServices";
import { createThreadSchema } from "../utils/validator/Thread";
import cloudinary from "../libs/cloudinary";

export default new (class ThreadControllers {
  async find(req: Request, res: Response) {
    try {
      const loginSession = res.locals.loginSession;

      const response = await ThreadServices.find(req.query, loginSession);
      // console.log("HASIL >>>>>>>>>>>>>", JSON.stringify(response));

      return res.status(200).json(response);
    } catch (err) {
      // console.log("ERR", err);
      return res
        .status(500)
        .json({ error: "Something went wrong on the server!" });
    }
  }

  async findOne(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);

      const response = await ThreadServices.findOne(id);
      return res.status(200).json(response);
    } catch (err) {
      return res
        .status(500)
        .json({ error: "Something went wrong on the server!" });
    }
  }

  async findOneByUserId(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);

      const response = await ThreadServices.findOneByUserId(id);
      return res.status(200).json(response);
    } catch (err) {
      return res
        .status(500)
        .json({ error: "Something went wrong on the server!" });
    }
  }

  // create(req: Request, res: Response) {
  //   console.log("REQ", req.body);

  //   ThreadQueue.create(req, res);
  // }

  async create(req: Request, res: Response) {
    try {
      // console.log(
      //   "MASUK CTLR",
      //   JSON.stringify(res.locals.loginSession.user.id)
      // );

      const userId = res.locals.loginSession.user.id; //nih // apa ini di tmbhin?
      const data = {
        content: req.body.content,
        image: res.locals.filename,
      };
      // console.log("MASUK DATA", JSON.stringify(data));

      const { error, value } = createThreadSchema.validate(data);

      if (error) return res.status(400).json(error.details[0].message);
      // console.log("MASUK validate", JSON.stringify(value));
      cloudinary.upload();
      const cloudinaryRes = await cloudinary.destination(req.file.filename);
      // console.log("MASUK Cloudinary", JSON.stringify(cloudinary));
      const obj = {
        ...value,
        userId: userId,
        image: cloudinaryRes,
      };
      // console.log("looooog", JSON.stringify(obj));
      const response = await ThreadServices.createThread(obj);
      return res.status(201).json(response);
    } catch (error) {
      console.error("Error creating Thread:", error);
      return res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  }
})();
