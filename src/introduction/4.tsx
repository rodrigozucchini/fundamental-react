/*
  PROPS
  -----
  Props (properties) are inputs passed from a parent component
  to a child component.

  They are:
  - Read-only
  - Typed in TypeScript
  - Used to customize components
*/
import type { JSX } from "react"

// Define the props type for the child component
type ProductProps = {
  name: string
  price: number
  available: boolean
}

/*
  CHILD COMPONENT
  ---------------
  This component RECEIVES props.
  It does not control the data, it only consumes it.
*/
function ProductCard(props: ProductProps): JSX.Element {
  return (
    <section style={{ border: "1px solid #ccc", padding: "16px" }}>
      <h2>Product</h2>

      {/* Reading values from props */}
      <p>Name: {props.name}</p>
      <p>Price: ${props.price}</p>

      {/* Rendering UI based on a boolean prop */}
      <p>Status: {props.available ? "Available" : "Out of stock"}</p>
    </section>
  )
}

/*
  PARENT COMPONENT
  ----------------
  This component OWNS the data.
  It sends data to the child component via props.
*/
function PropsExample(): JSX.Element {
  return (
    <main>
      <ProductCard
        name="Mechanical Keyboard"
        price={120}
        available={true}
      />

      <ProductCard
        name="Wireless Mouse"
        price={60}
        available={false}
      />
    </main>
  )
}

export default PropsExample
