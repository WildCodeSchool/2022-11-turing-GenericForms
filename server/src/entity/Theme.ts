import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { ObjectType, InputType, Field } from "type-graphql";

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



