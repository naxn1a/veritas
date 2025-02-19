import Elysia from "elysia";
import { userController } from "@/controllers/users";
import { instructorController } from "@/controllers/instructor";
import { workshopController } from "@/controllers/workshop";

export default new Elysia({ prefix: "api" })
  .use(userController)
  .use(instructorController)
  .use(workshopController);
