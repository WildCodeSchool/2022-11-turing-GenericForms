import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { ObjectType, InputType, Field } from "type-graphql";
import Question from "./Question";

@ObjectType()
@Entity("choices")
export default class Choice {

    @Field() // definition for TypeGraphQL
    @PrimaryGeneratedColumn() // definition for TypeORM
    choiceId: number;

    @Field({nullable: true})
    @Column({nullable: true})
    text?: string;

    @Field()
    @Column()
    questionId: number;

    @Field(() => Question)
    @ManyToOne((_type) => Question, (question: Question) => question.questionId, {onDelete: "CASCADE"})
    @JoinColumn({ name: "questionId" })
    question: Question;
}

@InputType({description: "create choice input"})
export class CreateChoiceInput implements Partial<Choice> {
    @Field()
    questionId: number;

    @Field({nullable: true})
    text: string;
}

@InputType({description: "update choice input"})
export class UpdateChoiceInput implements Partial<Choice> {
    @Field()
    choiceId: number;

    @Field({nullable: true})
    text: string;
}



