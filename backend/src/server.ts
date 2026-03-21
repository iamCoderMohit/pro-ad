import { app } from ".";
import { startSpendSimulator } from "./jobs/spendSimulator";

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log("server is listening on PORT", PORT)
    startSpendSimulator()
})