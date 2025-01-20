import { t } from "elysia";

export const InstructorModel = t.Object({
  number: t.Optional(t.String()),
  hire_date: t.Optional(t.Date()),
  hire_year: t.Optional(t.String()),
  salary: t.Optional(t.Number()),
  academic_degree: t.Optional(t.String()),
});

export type InstructorType = typeof InstructorModel.static;
