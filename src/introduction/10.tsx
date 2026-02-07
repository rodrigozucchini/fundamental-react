import React, { createContext, useState } from "react";

/*
  1️⃣ Define the shape of the context data
*/
type UserContextType = {
  username: string;
};

/*
  2️⃣ Create the Context
  This only defines the data structure, not the values
*/
const UserContext = createContext<UserContextType | null>(null);

/*
  3️⃣ Provider component
  It stores and provides the shared data
*/
const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [username] = useState("Rodrigo");

  return (
    <UserContext.Provider value={{ username }}>
      {children}
    </UserContext.Provider>
  );
};

/*
  4️⃣ Consumer using Context.Consumer (without useContext)
*/
const UserName: React.FC = () => {
  return (
    <UserContext.Consumer>
      {(value) => {
        if (!value) {
          throw new Error("UserName must be used inside UserProvider");
        }

        return <h2>User: {value.username}</h2>;
      }}
    </UserContext.Consumer>
  );
};

/*
  5️⃣ Main App component
*/
const App: React.FC = () => {
  return (
    <UserProvider>
      <UserName />
    </UserProvider>
  );
};

export default App;
