import dotenv from "dotenv";

if (process.env.NODE_ENV !== "production") {
  dotenv.config(); 
}

import app from "./app";

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

