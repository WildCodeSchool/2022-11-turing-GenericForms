import { ObjectType, Field, InputType } from "type-graphql";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import Question from "./Question";

@ObjectType()
@Entity("validation")
export default class Validation {
  @Field()
  @PrimaryGeneratedColumn()
  validationId: number;

  // @Field()
  // @Column()
  // questionId: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  required: boolean;

  @Field({ nullable: true })
  @Column({ nullable: true })
  multipleChoiceMin?: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  multipleChoiceMax?: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  textCharMin?: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  textCharMax?: number;

  @OneToOne((_type) => Question, (question: Question) => question.validation)
  question: Question;
}

@InputType({ description: "create a validation input" })
export class CreateValidationInput implements Partial<Validation> {
  
    @Field({ nullable: true })
    required: boolean;
  
    @Field({ nullable: true })
    multipleChoiceMin?: number;
  
    @Field({ nullable: true })
    multipleChoiceMax?: number;
  
    @Field({ nullable: true })
    textCharMin?: number;
  
    @Field({ nullable: true })
    textCharMax?: number;
}

@InputType({ description: "update a validation input" })
export class UpdateValidationInput implements Partial<Validation> {
    @Field()
    validationId: number;
  
    @Field()
    required: boolean;
  
    @Field({ nullable: true })
    multipleChoiceMin?: number;
  
    @Field({ nullable: true })
    multipleChoiceMax?: number;
  
    @Field({ nullable: true })
    textCharMin?: number;
  
    @Field({ nullable: true })
    textCharMax?: number;
}
