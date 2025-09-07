import React from "react"
import { createRoot } from "react-dom/client"

function App() {
  return <h1>Hello, React + Vite + TS 👋</h1>
}

const container = document.getElementById("root")
if (!container) throw new Error("Root element not found")

createRoot(container).render(<App />)
