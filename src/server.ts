import "./config/env"
import app from "./app"

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Dispatchly backend running on port ${PORT}`);
    console.log(`http://localhost:${PORT}`);
 })
