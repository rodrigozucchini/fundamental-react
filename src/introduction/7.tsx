import { useEffect, useState } from "react";

// Data type that represents a user
type User = {
  id: number;
  name: string;
};

export function Users() {
  // State to store users fetched from the API
  const [users, setUsers] = useState<User[]>([]);

  /*
    useEffect is used to handle a side effect.
    In this case: an asynchronous operation (API fetch).
    It runs after the render, not during it.
  */
  useEffect(() => {
    // Async function to fetch data
    const fetchUsers = async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const data: User[] = await response.json();

      // Updates state → triggers a re-render
      setUsers(data);
    };

    // Execute the async function
    fetchUsers();

    /*
      Empty dependency array:
      - Effect runs only once
      - Equivalent to "componentDidMount"
    */
  }, []);

  return (
    <ul>
      {/* Pure render: only display data */}
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
