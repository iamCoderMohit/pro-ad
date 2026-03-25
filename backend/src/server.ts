import { app } from "./index.js";
import { startSpendSimulator } from "./jobs/spendSimulator.js";

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log("server is listening on PORT", PORT)
    startSpendSimulator()
})