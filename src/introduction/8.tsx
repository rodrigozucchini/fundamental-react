import { useEffect, useState } from "react";

/*
  Custom hook:
  Checks if an API is online (health check)
*/
function useApiStatus() {
  const [isOnline, setIsOnline] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/posts/1");
        setIsOnline(res.ok);
      } catch {
        setIsOnline(false);
      } finally {
        setLoading(false);
      }
    };

    checkStatus();
  }, []);

  return { isOnline, loading };
}

/*
  Component that uses the custom hook
*/
export default function ApiStatus() {
  const { isOnline, loading } = useApiStatus();

  if (loading) return <p>Checking API...</p>;

  return (
    <p>
      API status: {isOnline ? "Online" : "Offline"}
    </p>
  );
}