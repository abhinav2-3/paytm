"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
// import { UserType } from "../app/(dashboard)/users/page";

type User = {
  id: number;
  name: string;
  number: string;
};

const Users = ({ users }: any) => {
  const [input, setInput] = useState<string>("");
  const [filteredUsers, setFilteredUsers] = useState<User[]>(users);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchInput = e.target.value.toLowerCase();
    setInput(searchInput);
  };

  useEffect(() => {
    if (input === "" || !input) {
      setFilteredUsers(users);
    } else {
      const searchedUser = users.filter((u: User) =>
        u?.name.toLowerCase().includes(input)
      );
      setFilteredUsers(searchedUser);
    }
  }, [input]);

  return (
    <div className="w-full px-10 ">
      <input
        type="search"
        name="search"
        placeholder="Search User"
        className="w-full border border-black rounded bg-transparent outline-none px-4 py-1"
        onChange={handleInputChange}
      />
      {filteredUsers?.map((u: User) => {
        return (
          <div
            className="flex justify-between my-4 border-b border-slate-500 items-center"
            key={u.id}
          >
            <h1 className="font-bold  px-4">{u.name}</h1>
            <Link
              href={{
                pathname: "/p2p",
                query: { number: u.number },
              }}
              className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2"
            >
              Send Money
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Users;
