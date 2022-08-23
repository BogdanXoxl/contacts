import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../../src/lib/prisma";

const deleteContact = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await getSession({ req });

    if (req.method !== "DELETE") return res.status(405).json({ message: "Method not allowed!" });
    if (!session?.user) return res.status(401).json({ message: "Unauthorized error!" });

    const user = prisma.contact.delete({ where: { id: req.body.id } });

    res.status(200).json({ user });
  } catch (err: any) {
    console.log(err.message);
    res.status(500).json({ statusCode: 500, message: "Something went wrong!" });
  }
};

export default deleteContact;
