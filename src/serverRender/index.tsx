import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import { PageParser } from "./pageParser";


export function Parser(props: any) {

    const renderRoutes = (pages: any, defaultPageKey: string, mainPageKeys: Array<string>, mainPageNames: Array<string>) => {
        let routes = [];
        console.log(mainPageNames);
        for(let pageKey in pages) {
            //if(!pages[pageKey]) continue;
            if(pageKey === defaultPageKey) {
                routes.push(<Route 
                    //index
                    path={`/`} 
                    element={<PageParser 
                        pageKey={pageKey} 
                        components={pages[pageKey]} 
                        mainPageKeys={mainPageKeys}
                        mainPageNames={mainPageNames}
                        pages={props.parserPages}
                    />}
                />);
            }
            else {
                console.log(pageKey);
                routes.push(<Route 
                    path={`/${pageKey}`} 
                    element={<PageParser 
                        pageKey={pageKey} 
                        components={pages[pageKey]} 
                        mainPageKeys={mainPageKeys}
                        mainPageNames={mainPageNames}
                        pages={props.parserPages}
                    />}
                />);
            }
        }
        return routes;
    }

    return (
        <Routes>
            {renderRoutes(props.parserInput.parserPages, props.parserInput.defaultPage, props.parserInput.mainPageKeys, props.parserInput.mainPageNames)}
        </Routes>
    )
}