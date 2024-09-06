import React from "react";
import prisma from "@repo/db/client";
import Users from "../../../components/Users";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { handleError } from "../../lib/Exception";

export interface UserType {
  id: number;
  name: string | null;
  number: string;
}

async function getUsers() {
  const session = await getServerSession(authOptions);
  const rawUsers = await prisma.user.findMany({
    select: {
      name: true,
      id: true,
      number: true,
    },
  });
  const users = rawUsers?.filter(
    (u: UserType) => u.id !== Number(session?.user?.id)
  );
  return users?.map((u: UserType) => ({
    name: u.name,
    id: u.id,
    number: u.number,
  }));
}

const page = async () => {
  const users: UserType[] = await getUsers();
  if (!users) throw new handleError();
  return (
    <div className="w-full">
      <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
        All Users
      </div>
      <div>
        <Users users={users} />
      </div>
    </div>
  );
};

export default page;
