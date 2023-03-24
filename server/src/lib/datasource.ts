import { DataSource } from "typeorm";
import Form from "../entity/Form";
import * as dotenv from "dotenv";
import User from "../entity/User";
import Question from "../entity/Question";
import Answer from "../entity/Answer";
import Theme from "../entity/Theme";
import Choice from "../entity/Choice";

dotenv.config();

let port: number | undefined;

const getHost = (): string | undefined => {
  if(process.argv.includes("--local")) {
    port = 5432;
    return process.env.DB_HOST_LOCAL;
  };
  if (process.env.SCRIPT === "startWithTest") {
    port = 5432;
    return process.env.DB_HOST_TEST;
  };
  return process.env.DB_HOST;
};

export default new DataSource({
  type: "postgres",
  host: getHost(),
  port,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  entities: [Form, User, Question, Answer, Theme, Choice],
  logging: ["query", "error"],
});
