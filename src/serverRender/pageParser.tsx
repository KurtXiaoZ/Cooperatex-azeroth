import { typeToComponent } from "./typeToComponent";


export function PageParser(props: any) {
    return props.components.map((component: object) => {
        return typeToComponent(props.pageKey, props.pages, component['type'], component['style'], props.mainPageNames, props.mainPageKeys);
    });
}