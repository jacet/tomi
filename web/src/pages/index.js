import * as React from "react";
import Orb from "../components/orb";


const pageStyles = {
  color: "#232129",
  padding: 96,
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
  background: "#000000",
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  boxSizing: 'border-box',
};
const headingStyles = {
  marginTop: 0,
  marginBottom: 64,
  maxWidth: 320,
}

const IndexPage = () => {
  return (
    <main style={pageStyles}>
      <title>TOMI</title>
      <Orb state="listening"> </Orb>
      
    </main>
  )
}

export default IndexPage;
export const Head = () => <title>Home Page</title>


