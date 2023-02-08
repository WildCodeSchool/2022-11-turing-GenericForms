import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { ObjectType, InputType, Field } from "type-graphql";

@ObjectType()
@Entity("forms")
export default class Form {

    @Field() // definition for TypeGraphQL
    @PrimaryGeneratedColumn() // definition for TypeORM
    formId: number;

    @Field()
    @Column()
    title: string;

    @Field({ nullable: true }) 
    @Column({ nullable: true }) 
    category?: string;

    // Add a many to one relationship with the Question entity
    // @Field(() => [Grade])
    // @OneToMany(() => Grade, (grade) => grade.wilder)
    // grades: Grade[];
}

@InputType({description: "create a form input"})
export class CreateFormInput implements Partial<Form> {
    @Field()
    title: string;

    @Field({ nullable: true })
    category?: string;
}

@InputType({description: "update a form input"})
export class UpdateFormInput implements Partial<Form> {
    @Field()
    formId: number;

    @Field({ nullable: true })
    title?: string;

    @Field({ nullable: true })
    category?: string;
}

@InputType({description: "add a question to a form input"})
export class AddOrRemoveQuestionInput {
    @Field()
    formId: number;

    @Field()
    questionId: number;
}


