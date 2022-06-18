import React from 'react';
import { StoreProvider } from 'store'
import { BrowserRouter, Route, Routes, useLocation, useNavigate, useParams } from "react-router-dom";
import { Transition, animated, useTransition } from '@react-spring/web'
import pages from './pages';
import './App.css';
import { Parser } from './serverRender/index';
import store, { RootState } from 'redux/store';
import { useSelector } from 'react-redux';

export interface RouteProps {
  params: any,
  location: any,
  navigate: any
}
export function withRouter(Component: any) {

  return (props: any) => (
    <Component
      {...props}
      params={useParams()}
      location={useLocation()}
      navigate={useNavigate()}
    />
  );
}

function App() {
  const frontendKey = store.getState().rightMenu.frontendKeys[store.getState().rightMenu.selectedFrontEnd];
  const pageKey = store.getState().frontends[frontendKey].pages.selectedPage;
  const components = store.getState().pages[pageKey].components;
  let mainPageKeys = store.getState().frontends[frontendKey].pages.mainPageKeys;
  let mainPageNames = mainPageKeys.map((mainPageKey: string) => {
      return store.getState().pages[mainPageKey].name;
  });

  const constructParserInput = () => {
    let parserPages = {};
    let pages = store.getState().pages;
    const frontendKey = store.getState().rightMenu.frontendKeys[store.getState().rightMenu.selectedFrontEnd];
    let frontend = store.getState().frontends[frontendKey].pages;
    frontend.mainPageKeys.forEach((pageKey: string) => {
      parserPages[pageKey] = pages[pageKey].canvas;
    });
    frontend.subPageKeys.forEach((pageKey: string) => {
      parserPages[pageKey] = pages[pageKey].canvas;
    });
    frontend.subFolderKeys.forEach((subFolderKey: string) => {
      frontend.subFolders[subFolderKey].subpages.forEach((pageKey: string) => {
        parserPages[pageKey] = pages[pageKey].canvas;
      })
    });
    let mainPageKeys = [...frontend.mainPageKeys];
    return {
      parserPages: parserPages,
      defaultPage: frontend.mainPageKeys[0],
      mainPageNames: mainPageNames,
      mainPageKeys: mainPageKeys
    };
  }

  return (
    <div className="App">
      {/* Azeroth */}
      <StoreProvider>
        <BrowserRouter>
          {/* {transitions((props, item) => (
            <animated.div style={props}>
              <Routes location={item}>
                <Route path='/azeroth' element={(<div children="hi Azeroth" />)} />
                {Array.from(pages).map((page) => (
                  <Route key={page[0]} path={`/${page[0]}`} element={React.createElement(page[1])} />
                ))}
              </Routes>
            </animated.div>)
          )} */}
          <Routes>
            <Route path='/azeroth' element={(<div children="hi Azeroth" />)} />
            {Array.from(pages).map((page) => (
              <Route key={page[0]} path={`/${page[0]}`} element={React.createElement(page[1])} />
            ))}
          </Routes>
          <Routes>
            <Route index element={<Parser components={components} parserInput={constructParserInput()} />} />
          </Routes>
        </BrowserRouter>
      </StoreProvider >
    </div>
  );
}

export default App;
