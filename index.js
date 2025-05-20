// villan@7667

const express = require("express")
const bodyParser = require("body-parser")
const path = require("path")
const port = process.env.PORT || 8000

const app = express()

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")))

const items = []


app.get("/", (req, res) => {
  res.render("list", { ejes: items })
})

// Add a new task
app.post("/", (req, res) => {
  try {
    const item = req.body.newItem
    if (item && item.trim() !== "") {
      items.push(item.trim())
    }
    res.redirect("/")
  } catch (error) {
    console.error("Error adding task:", error)
    res.status(500).send("An error occurred while adding the task")
  }
})

// Edit an existing task
app.post("/edit", (req, res) => {
  try {
    const index = Number.parseInt(req.body.index)
    const updatedText = req.body.updatedText

    if (!isNaN(index) && index >= 0 && index < items.length && updatedText && updatedText.trim()) {
      items[index] = updatedText.trim()
    }
    res.redirect("/")
  } catch (error) {
    console.error("Error updating task:", error)
    res.status(500).send("An error occurred while updating the task")
  }
})

// Delete a task
app.post("/delete", (req, res) => {
  try {
    const index = Number.parseInt(req.body.index)

    if (!isNaN(index) && index >= 0 && index < items.length) {
      items.splice(index, 1)
    }
    res.redirect("/")
  } catch (error) {
    console.error("Error deleting task:", error)
    res.status(500).send("An error occurred while deleting the task")
  }
})

// API 
app.get("/api/tasks", (req, res) => {
  res.json({ tasks: items })
})

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
