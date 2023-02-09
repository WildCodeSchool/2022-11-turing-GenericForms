import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ObjectType, InputType, Field } from "type-graphql";
import Form from "./Form";

enum Style {
    LIGHT = "light-theme",
    DARK = "dark-theme",
    CUSTOM = "custom-theme"
}

@ObjectType()
@Entity("themes")
export default class Theme {

    @Field() 
    @PrimaryGeneratedColumn() 
    themeId: number;

    @Field()
    @Column()
    name: string;

    @Field()
    @Column()
    style: Style;

    @Field()
    @Column()
    backgroundColor: string;

    @Field()
    @Column()
    primaryColor: string;

    @Field()
    @Column()
    secondaryColor: string;

    @Field(() => [Form])
    @OneToMany((_type) => Form, (form: Form) => form.theme)
    forms: Form[];

    // Add a many to one relationship with the Question entity
    // @Field(() => [Grade])
    // @OneToMany(() => Grade, (grade) => grade.wilder)
    // grades: Grade[];

}

@InputType({description: "create a theme input"})
export class CreateThemeInput implements Partial<Theme> {
    @Field()
    name: string;

    @Field()
    style?: Style;

    @Field()
    backgroundColor?: string;

    @Field()
    primaryColor?: string;

    @Field()
    secondaryColor?: string;

}



