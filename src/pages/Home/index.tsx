import LeftMenu from 'components/LeftMenu/index';
import Systems from 'components/Systems/index';
import Layout from 'Layout';
import './index.less';
import { RightMenu } from 'components/RightMenu';
import { Canvas } from 'components/canvas/Canvas';
import { Provider } from 'react-redux';
import store from '../../redux/store';
import { Setter } from 'components/canvas/CanvasComponent/Setter';
import { IRModel } from 'components/LeftMenu/secondColumn/subColumnIR/IRModel';
import { DetailDisplayer } from 'components/canvas/specificComponents/ir/DetailDisplayer';
import { IREditModel } from 'components/LeftMenu/secondColumn/subColumnIR/IREditModel';


const Home = () => {
  return (
    <Provider store={store}>
      <div id="block-events" style={{display: 'none'}}></div>
      <section className="azeroth-content">
        <aside className="pages-config-aside">
          <LeftMenu />
        </aside>
        <main className="main-canvas">
          <div className="system-wrap">
            <Systems />
          </div>
          <div className="editor-content">
            <Canvas/>
            <Setter />
            <IRModel />
            <IREditModel />
            <DetailDisplayer />
          </div>
        </main>
        <aside className="visual-editor-aside">
          <RightMenu />
        </aside>
      </section>
    </Provider>
  );
}

const HomePage = () => {
  return (
    <Layout>
      <Home />
    </Layout>
  )
}

export default HomePage;