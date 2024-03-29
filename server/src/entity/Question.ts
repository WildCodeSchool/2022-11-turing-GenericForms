import { ObjectType, Field, InputType } from "type-graphql";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import Choice from "./Choice";
import Form from "./Form";
import Answer from "./Answer";
import Validation from "./Validation";

@ObjectType()
@Entity("questions")
export default class Question {
  @Field()
  @PrimaryGeneratedColumn()
  questionId: number;

  @Field()
  @Column()
  formId: number;

  @Field()
  @Column()
  validationId: number;

  @Field()
  @Column()
  title: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  description?: string;

  @Field()
  @Column()
  type: string;

  @Field(() => Form)
  @ManyToOne((_type) => Form, (form: Form) => form.formId, { onDelete: "CASCADE" })
  @JoinColumn({ name: "formId" })
  form: Form;

  @Field(() => [Choice])
  @OneToMany((_type) => Choice, (choice: Choice) => choice.question, {eager: true})
  choices: Choice[];

  @Field(() => [Answer])
  @OneToMany((_type) => Answer, (answer: Answer) => answer.question, {eager: true})
  answers: Answer[];
  
  @Field(() => Validation)
  @OneToOne((_type) => Validation, (validation: Validation) => validation.question, {eager: true, onDelete: "CASCADE"})
  @JoinColumn({ name: "validationId" })
  validation: Validation;
}

@InputType({ description: "create a question input" })
export class CreateQuestionInput implements Partial<Question> {
  @Field()
  formId: number;

  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  type: string;
}

@InputType({ description: "update a question input" })
export class UpdateQuestionInput implements Partial<Question> {
  @Field()
  questionId: number;

  @Field()
  formId: number;

  @Field()
  validationId: number;

  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  type: string;
}
