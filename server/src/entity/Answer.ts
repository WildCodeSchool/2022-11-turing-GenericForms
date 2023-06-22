import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { ObjectType, Field, InputType } from "type-graphql";
import Question from "./Question";

@ObjectType()
@Entity("answers")
export default class Answer {

    @Field()
    @PrimaryGeneratedColumn()
    answerId: number;
    
    @Field()
    @Column()
    userId: number;
    
    @Field()
    @Column()
    questionId: number;
    
    @Field({ nullable: true })
    @Column({ nullable: true })
    answerText?: string;

    // Date not implemented yet, to check if needed or not

    // @Field()
    // @Column()
    // createdAt: Date;

    // @Field({ nullable: true })
    // @Column({ nullable: true})
    // updatedAt: Date;

    @Field(() => Question)
    @ManyToOne((_type) => Question, (question: Question) => question.questionId)
    @JoinColumn({ name: "questionId" })
    question: Question;
}

@InputType({description: "create an answer input"})
export class CreateAnswerInput implements Partial<Answer> {
    @Field()
    userId: number;

    @Field()
    questionId: number;
    
    @Field({ nullable: true })
    answerText?: string;
}

@InputType({description: "update an answer input"})
export class UpdateAnswerInput implements Partial<Answer> {
    @Field()
    answerId: number;

    @Field({ nullable: true })
    answerText: string;
}