import { NextApiRequest, NextApiResponse } from "next";
import { Prisma } from "@prisma/client";
import bcrypt from "bcrypt";
import prisma from "../../../src/lib/prisma";

const createNewUser = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== "POST") return res.status(405);

    const data: Prisma.UserCreateInput = {
      email: req.body.email,
      name: req.body.name,
      password: await bcrypt.hash(req.body.password, 8),
    };

    const user = await prisma.user.create({ data });

    res.status(201).json({ user });
  } catch (err: any) {
    console.log(err.message);
    res.status(500).json({ statusCode: 500, message: "Something went wrong!" });
  }
};

export default createNewUser;
