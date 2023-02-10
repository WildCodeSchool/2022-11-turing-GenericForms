import { ObjectType, Field, InputType } from "type-graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
  title: string;

  @Field()
  @Column()
  description: string;

  @Field()
  @Column()
  type: string;
}

@InputType({ description: "creat a question input" })
export class CreatQuestionInput implements Partial<Question> {
  @Field()
  formId: number;

  @Field()
  title: string;

  @Field()
  description: string;

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
  title: string;

  @Field()
  description: string;

  @Field()
  type: string;
}
