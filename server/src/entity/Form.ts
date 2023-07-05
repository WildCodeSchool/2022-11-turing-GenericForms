import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { ObjectType, InputType, Field } from "type-graphql";
import Theme from "./Theme";
import Question from "./Question";
import User from "./User";

@ObjectType()
@Entity("forms")
export default class Form {
  @Field() // definition for TypeGraphQL
  @PrimaryGeneratedColumn() // definition for TypeORM
  formId: number;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  themeId: number;

  @Field()
  @Column()
  visibility: boolean;
  
  @Field()
  @Column()
  userId: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  category?: string;

  @Field(() => Theme)
  @ManyToOne((_type) => Theme, (theme: Theme) => theme.themeId, {eager: true})
  @JoinColumn({ name: "themeId" })
  theme: Theme;

  @Field(() => [Question])
  @OneToMany((_type) => Question, (question: Question) => question.form, {eager: true, cascade: true})
  questions: Question[];

  @Field(() => User)
  @ManyToOne((_type) => User, (user: User) => user.userId)
  @JoinColumn({ name: "userId" })
  user: User;
}

@InputType({ description: "create a form input" })
export class CreateFormInput implements Partial<Form> {
  @Field()
  title: string;

  @Field()
  userId: number;

  @Field()
  themeId: number;

  @Field()
  visibility?: boolean;

  @Field({ nullable: true })
  category?: string;
}

@InputType({ description: "update a form input" })
export class UpdateFormInput implements Partial<Form> {
  @Field()
  formId: number;

  @Field({ nullable: true })
  title?: string;

  @Field()
  themeId: number;

  @Field()
  visibility?: boolean;

  @Field({ nullable: true })
  category?: string;
}

@InputType({ description: "add a question to a form input" })
export class AddOrRemoveQuestionInput {
  @Field()
  formId: number;

  @Field()
  questionId: number;
}
