import { Arg, Mutation, Query, Resolver } from "type-graphql";
import Theme, { CreateThemeInput } from "../../entity/Theme";
import { ResponseMessage } from "../../services/common.type";
import ThemeService from "../../services/theme.service";


@Resolver(Theme)
export default class ThemeResolver {

    @Query(() => [Theme])
    async readThemes(): Promise<Theme[]> {
        return await new ThemeService().read();
    }

    @Query(() => Theme)
    async readOneTheme(@Arg("themeId") themeId: number): Promise<Theme> {
        return await new ThemeService().readOne(themeId);
    }

    @Mutation(() => Theme)
    async createTheme(@Arg("createThemeInput") createThemeInput: CreateThemeInput): Promise<Theme> {
        return await new ThemeService().create({...createThemeInput});
    }

    @Mutation(() => ResponseMessage)
    async deleteTheme(@Arg("themeId") themeId: number): Promise<ResponseMessage> {
        return await new ThemeService().delete(themeId);
    }
    
}