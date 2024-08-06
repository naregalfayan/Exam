"use client";

import { useEffect, useState } from "react";

type User = {
  id: number;
  name: string;
  surname: string;
  username: string;
  salary: number;
};

export default function Page() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <>
      <div>
        <h1>User's List</h1>
        <br />
        <ul>
          {users.map((user) => (
            <li key={user.id} className="users_list">
              <br />
              {user.name} {user.surname} - {user.username} - ${user.salary}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
