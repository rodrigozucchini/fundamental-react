import React, {
  ReactNode,
  useState,
  createContext,
  useContext,
  FC,
} from "react";

/==================================================
1. COMPOSITION OVER INHERITANCE
==================================================*/

/*
In React, components are not extended via inheritance.
Instead, we build new components by combining smaller ones.

TypeScript helps by explicitly defining props contracts.
*/

type ButtonProps = {
  children: ReactNode;
};

// Reusable base component.
// It only knows how to render a button with content inside.
const Button: FC<ButtonProps> = ({ children }) => {
  return <button>{children}</button>;
};

// Specialized component created by composing Button.
// It reuses behavior without modifying Button itself.
const SaveButton: FC = () => {
  return <Button>Save</Button>;
};

/*
Key idea:
- Button is generic and reusable.
- SaveButton composes Button instead of extending it.
- This keeps components small and predictable.
*/


/==================================================
2. CHILDREN AS API
==================================================*/

/*
The "children" prop allows a component to define structure
while delegating content to its parent.

This creates flexible layout components.
*/

type LayoutProps = {
  children: ReactNode;
};

// Layout defines structure only.
// It exposes a slot (children) where content will be injected.
const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <header>My Application</header>
      <main>{children}</main>
    </>
  );
};

// The parent controls what goes inside Layout.
const LayoutExample: FC = () => {
  return (
    <Layout>
      <p>Main content</p>
    </Layout>
  );
};

/*
Key idea:
- Layout owns structure.
- Parent owns content.
- This separation increases reusability.
*/


/==================================================
3. STATE PLACEMENT STRATEGIES
==================================================*/

/*
State should live:
- As low as possible
- But high enough to be shared

If multiple components need the same state,
move it to their closest common ancestor.
*/

const Form: FC = () => {
  const [value, setValue] = useState<string>("");

  return (
    <>
      <TextInput value={value} onChange={setValue} />
      <Preview value={value} />
    </>
  );
};

type TextInputProps = {
  value: string;
  onChange: (value: string) => void;
};

// Controlled component.
// It receives state and update logic from parent.
const TextInput: FC<TextInputProps> = ({ value, onChange }) => {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

type PreviewProps = {
  value: string;
};

// Pure presentational component.
// It only displays data.
const Preview: FC<PreviewProps> = ({ value }) => {
  return <p>{value}</p>;
};

/*
Key idea:
- Form owns the state.
- TextInput updates it.
- Preview reads it.
- No duplicated state.
*/


/==================================================
4. PRESENTATIONAL VS CONTAINER PATTERN
==================================================*/

/*
Separation of concerns:

Container:
- Handles state and logic

Presentational:
- Handles UI rendering only
*/

type User = {
  name: string;
  email: string;
};

type UserViewProps = {
  user: User;
};

// Presentational component.
// No state, no side effects.
const UserView: FC<UserViewProps> = ({ user }) => {
  return (
    <>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
    </>
  );
};

// Container component.
// Responsible for creating and managing data.
const UserContainer: FC = () => {
  const [user] = useState<User>({
    name: "John Doe",
    email: "john@email.com",
  });

  return <UserView user={user} />;
};

/*
Key idea:
- UserContainer owns the data.
- UserView is reusable because it is logic-free.
- This improves testability and maintainability.
*/


/==================================================
5. ELIMINATING CONTEXT VIA CUSTOM HOOKS
==================================================*/

/*
Instead of consuming context directly everywhere,
we wrap it inside a custom hook.

This:
- Hides implementation details
- Prevents tight coupling
- Improves maintainability
*/

type UserContextType = {
  user: User;
};

const UserContext = createContext<UserContextType | null>(null);

// Custom hook abstracts useContext usage.
const useUser = (): UserContextType => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used inside UserProvider");
  }

  return context;
};

// Provider encapsulates how the value is created.
type UserProviderProps = {
  children: ReactNode;
};

const UserProvider: FC<UserProviderProps> = ({ children }) => {
  const user: User = {
    name: "John Doe",
    email: "john@email.com",
  };

  return (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
  );
};

// Consumer component.
// It does not know about UserContext directly.
const Profile: FC = () => {
  const { user } = useUser();
  return <p>{user.name}</p>;
};

/*
Key idea:
- Components depend on the hook, not the context.
- Context implementation can change internally.
- This reduces coupling.
*/


/==================================================
ROOT APPLICATION (FULL COMPOSITION EXAMPLE)
==================================================*/

/*
App composes everything together.

Each component:
- Has a single responsibility
- Is reusable
- Is loosely coupled
*/

const App: FC = () => {
  return (
    <UserProvider>
      <Layout>
        <SaveButton />
        <LayoutExample />
        <Form />
        <UserContainer />
        <Profile />
      </Layout>
    </UserProvider>
  );
};

export default App;