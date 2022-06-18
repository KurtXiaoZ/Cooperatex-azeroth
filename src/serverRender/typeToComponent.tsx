import { Menu } from "./components/Menu"

export function typeToComponent(pageKey: string, pages: object, type: string, style: object, mainPageNames: Array<string>, mainPageKeys: Array<string>) {
    switch(type) {
        case 'menu':
            return <Menu style={style} pageKey={pageKey} mainPageNames={mainPageNames} mainPageKeys={mainPageKeys} pages={pages}/>
        default:
            return <div></div>
    }
}