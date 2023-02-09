import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { ObjectType, InputType, Field } from "type-graphql";
import Theme from "./Theme";

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

    @Field({ nullable: true }) 
    @Column({ nullable: true }) 
    category?: string;

    @Field(() => Theme)
    @ManyToOne((_type) => Theme, (theme: Theme) => theme.themeId)
    @JoinColumn({ name: "themeId" })
    theme: Theme;

    // Add a many to one relationship with the Question entity
    // @Field(() => [Grade])
    // @OneToMany(() => Grade, (grade) => grade.wilder)
    // grades: Grade[];
}

@InputType({description: "create a form input"})
export class CreateFormInput implements Partial<Form> {
    @Field()
    title: string;

    @Field()
    themeId: number;

    @Field({ nullable: true })
    category?: string;
}

@InputType({description: "update a form input"})
export class UpdateFormInput implements Partial<Form> {
    @Field()
    formId: number;

    @Field({ nullable: true })
    title?: string;

    @Field()
    themeId: number;

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



