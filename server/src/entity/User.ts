import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { ObjectType, InputType, Field } from "type-graphql";

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