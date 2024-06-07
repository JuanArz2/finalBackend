import "dotenv/config";
import "./conectionDB.js";
import server from "./server.js";

server.listen(2998, () => {
  console.log("Server Port: 2998");
});
