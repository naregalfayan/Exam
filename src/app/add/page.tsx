"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddUserPage() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");
  const [salary, setSalary] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);

    const response = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        surname,
        username,
        salary: parseInt(salary),
      }),
    });

    if (response.ok) {
      router.push("/");
    } else {
      const data = await response.json();
      setErrors(data.errors);
    }
  };

  return (
    <>
      <div>
        <h1>Add User</h1>
        <br />
        <form onSubmit={handleSubmit}>
          <div className="label_container">
            <label>
              Name:
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
          </div>
          <br />
          <div className="label_container">
            <label>
              Surname:
              <input
                type="text"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
              />
            </label>
          </div>
          <br />
          <div className="label_container">
            <label>
              Username:
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
          </div>
          <br />
          <div className="label_container">
            <label>
              Salary:
              <input
                type="number"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
              />
            </label>
          </div>
          <br />
          <button type="submit">Add User</button>
          {errors.length > 0 && (
            <div>
              <ul>
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}
        </form>
      </div>
    </>
  );
}
