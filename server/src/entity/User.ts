import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ObjectType, InputType, Field } from "type-graphql";
import Form from "./Form";
import Answer from "./Answer";

@ObjectType()
@Entity("users")
export default class User {

    @Field()
    @PrimaryGeneratedColumn()
    userId: number;

    @Field()
    @Column()
    email: string;

    @Field()
    @Column()
    password: string;

    @Field()
    @Column()
    firstName: string;

    @Field()
    @Column()
    lastName: string;

    @Field({nullable: true})
    @Column({nullable: true})
    role: string;

    @Field()
    @Column()
    createdAt: Date;

    @Field({ nullable: true })
    @Column({ nullable: true})
    updatedAt: Date;

    @Field(() => [Form])
    @OneToMany((_type) => Form, (form: Form) => form.user, {eager: true, cascade: true})
    forms: Form[];

    @Field(() => [Answer])
    @OneToMany((_type) => Answer, (answer: Answer) => answer.user, {eager: true, cascade: true})
    answers: Answer[];

}

@InputType({description: "create a user input"})
export class CreateUserInput implements Partial<User> {

    @Field()
    email: string;

    @Field()
    password: string;

    @Field()
    firstName: string;

    @Field()
    lastName: string;

    @Field({ nullable: true})
    role?: string;
}

@InputType({description: "update a user input"})
export class UpdateUserInput implements Partial<User> {
    @Field()
    userId: number;

    @Field({ nullable: true })
    password?: string;

    @Field({ nullable: true })
    firstName?: string;

    @Field({ nullable: true })
    lastName?: string;

    @Field({ nullable: true })
    role?: string;
}

@ObjectType()
export class Login {
  @Field()
  success: boolean;

  @Field()
  token: string;
}

@InputType({ description: "login de l'utilisateur" })
export class LoginInput implements Partial<User> {
  @Field()
  email: string;

  @Field()
  password: string;
}

@ObjectType()
export class ValidationToken {
  @Field()
  valid: boolean;
}