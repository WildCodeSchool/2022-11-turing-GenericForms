import { DataSource } from "typeorm";
import Form from "../entity/Form";
import * as dotenv from "dotenv";
import User from "../entity/User";
import Question from "../entity/Question";
import Answer from "../entity/Answer";
import Theme from "../entity/Theme";
import Choice from "../entity/Choice";

// You must add environment vars in docker-compose file (in the server container infos)
dotenv.config();

let port: string | number | undefined = process.env.PORT;

if (port !== undefined) {
  port = +port;
}

export default new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  entities: [Form, User, Question, Answer, Theme, Choice],
  logging: ["query", "error"],
});
