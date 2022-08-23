import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { Prisma } from "@prisma/client";
import prisma from "../../../src/lib/prisma";

const createNewContact = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await getSession({ req });
    if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed!" });
    if (!session?.user) return res.status(401).json({ message: "Unauthorized error!" });

    const data: Prisma.ContactCreateInput = {
      name: req.body.name,
      phone: req.body.phone,
      author: { connect: { id: session?.user.id } },
    };

    const contact = await prisma.contact.create({ data });

    res.status(201).json({ contact });
  } catch (err: any) {
    console.log(err.message);
    res.status(500).json({ statusCode: 500, message: "Something went wrong!" });
  }
};

export default createNewContact;
