//  1. Components
//  2. JSX
//  3. Virtual DOM
import type { JSX } from "react"
/*
  COMPONENT
  A React component is a JavaScript/TypeScript function
  that returns JSX.

  React applications are built by composing components.
*/
function InfoBox(): JSX.Element {
    // Regular TypeScript variables
    const title: string = "React Core Concepts"
    const subtitle: string = "Components, JSX and Virtual DOM"
    /*
      JSX is NOT HTML.
      It is a syntax that allows us to describe UI declaratively.
      React will transform this JSX into a Virtual DOM structure.
    */
    return (
      <section style={{ border: "1px solid #ccc", padding: "16px" }}>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </section>
    )
  }
  
  /*
    ROOT COMPONENT
    --------------
    This component composes other components.
    Every time a component is rendered:
    - React creates a Virtual DOM representation
    - Compares it with the previous one
    - Updates only the necessary parts of the real DOM
  */
  function CoreExample(): JSX.Element {
    return (
      <main>
        <InfoBox />
        <InfoBox />
      </main>
    )
  }
  export default CoreExample
  