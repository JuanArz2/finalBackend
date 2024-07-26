import "dotenv/config";
import "./conectionDB.js";
import server from "./server.js";

server.listen(3000, () => {
  console.log("Server Port: 3000");
});
