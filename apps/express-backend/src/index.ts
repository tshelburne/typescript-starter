import express from "express"
import cors from "cors"
import morgan from "morgan"

const app = express()
const port = process.env.PORT || 4000

// --- Middleware ---
app.use(cors())
app.use(express.json()) // parse JSON body
app.use(morgan("dev")) // logging

// --- In-memory store ---
const store: Record<string, any> = {}

// --- Routes ---

// --- Health check (is server alive?) ---
app.get("/health", (_req, res) => {
  res.status(200).send("OK")
})

// --- Status (basic metadata) ---
app.get("/status", (_req, res) => {
  res.json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: Date.now(),
    itemsCount: Object.keys(store).length,
  })
})

app.get("/items", (req, res) => {
  res.json(store)
})

app.post("/items", (req, res) => {
  const { key, value } = req.body
  if (!key || value === undefined) {
    return res.status(400).json({ error: "key and value are required" })
  }
  store[key] = value
  res.status(201).json({ message: "Item stored", store })
})

// --- Start server ---
app.listen(port, () => {
  console.log(`🚀 Express server running at http://localhost:${port}`)
})
