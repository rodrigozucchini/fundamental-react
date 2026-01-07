import React, { createContext, useContext, useState } from "react";

/*
  1️⃣ Define the shape (type) of the context
  This describes what data and functions the context will provide
*/
type ThemeContextType = {
  theme: string;              // Current theme value
  toggleTheme: () => void;    // Function to change the theme
};

/*
  2️⃣ Create the context
  It starts with null because the value will be provided by the Provider
*/
const ThemeContext = createContext<ThemeContextType | null>(null);

/*
  3️⃣ Create the Provider component
  This component holds the shared state and wraps the app
*/
const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // State that will be shared across components
  const [theme, setTheme] = useState("light");

  // Function to update the shared state
  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  };

  // Provide the state and functions to all children
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

/*
  4️⃣ Component that consumes the context
  useContext allows direct access to the shared data
*/
const ThemeButton: React.FC = () => {
  const context = useContext(ThemeContext);

  // Safety check to ensure the component is inside the Provider
  if (!context) {
    throw new Error("ThemeButton must be used inside ThemeProvider");
  }

  const { theme, toggleTheme } = context;

  return (
    <button onClick={toggleTheme}>
      Current theme: {theme}
    </button>
  );
};

/*
  5️⃣ Main App component
  The Provider wraps the components that need access to the context
*/
const App: React.FC = () => {
  return (
    <ThemeProvider>
      <ThemeButton />
    </ThemeProvider>
  );
};

export default App;
