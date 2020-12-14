const express = require("express")
const app = express()
const router = require("./routers/routers.js")
const port = 8087

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api", router)

app.listen(port, () => {
    console.log(`listen at localhost:${port}`)
})

