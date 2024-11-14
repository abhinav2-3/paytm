"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@repo/ui/button";
import SendCard from "./SendCard";
import { Center } from "@repo/ui/center";
import { IoIosCloseCircle } from "react-icons/io";

export type User = {
  id: number;
  name: string;
  number: string;
};

const Users = ({ users }: { users: any }) => {
  const [input, setInput] = useState<string>("");
  const [openBox, setOpenBox] = useState<boolean>(false);
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
          <div className="flex justify-between my-4 items-center" key={u.id}>
            <h1 className="font-bold  px-4">{u.name}</h1>
            <Button onClick={() => setOpenBox(true)}>Send Money</Button>
            {openBox && (
              <div className="md:w-[75%] md:h-[85%] w-[80%] h-[50%] flex flex-col top-48 right-10 md:right-24 rounded-2xl bg-white absolute md:top-16">
                <button
                  className="absolute right-4 p-2 md:p-5 "
                  onClick={() => setOpenBox(false)}
                >
                  <IoIosCloseCircle size={30} />
                </button>
                <Center>
                  <SendCard user={u} closeModel={setOpenBox} />
                </Center>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Users;
