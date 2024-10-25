import { FileCode } from "lucide-react";
import { ReactIcon, JavascriptIcon, PythonIcon, ScalaIcon, Perlicon, HaskellIcon, SvelteIcon, CSharpIcon, RustIcon, ElixirIcon, TypescriptIcon, JavaIcon, SwiftIcon, GoIcon, CssIcon, GraphqlIcon, ExpressIcon, GitIcon, GodotIcon, JsonIcon, KotlinIcon, NestjsIcon, NextjsIcon, NpmIcon, NuxtIcon, PhpIcon, PrismaIcon, VueIcon, BashIcon } from "@/assets/icons";


const languageIcons = [
    { name: "javascript", icon: JavascriptIcon },
    { name: "react", icon: ReactIcon },
    { name: 'python', icon: PythonIcon },
    { name: 'svelte', icon: SvelteIcon },
    { name: 'csharp', icon: CSharpIcon },
    { name: 'rust', icon: RustIcon },
    { name: 'elixir', icon: ElixirIcon },
    { name: 'java', icon: JavaIcon },
    { name: 'go', icon: GoIcon },
    { name: 'css', icon: CssIcon },
    { name: 'graphql', icon: GraphqlIcon },
    { name: 'express', icon: ExpressIcon },
    { name: 'git', icon: GitIcon },
    { name: 'godot', icon: GodotIcon },
    { name: 'json', icon: JsonIcon },
    { name: 'kotlin', icon: KotlinIcon },
    { name: 'nestjs', icon: NestjsIcon },
    { name: 'nextjs', icon: NextjsIcon },
    { name: 'npm', icon: NpmIcon },
    { name: 'nuxt', icon: NuxtIcon },
    { name: 'php', icon: PhpIcon },
    { name: 'prisma', icon: PrismaIcon },
    { name: 'vue', icon: VueIcon },
    { name: 'swift', icon: SwiftIcon },
    { name: 'bash', icon: BashIcon },
    { name: 'typescript', icon: TypescriptIcon },
    { name: 'haskell', icon: HaskellIcon },
    { name: 'perl', icon: Perlicon },
    { name: 'scala', icon: ScalaIcon },
];


export const getLanguageIcon = (language: string) => {
    const iconData = languageIcons.find(item => item.name.toLowerCase() === language.toLowerCase());
    return iconData ? iconData.icon : FileCode;
};