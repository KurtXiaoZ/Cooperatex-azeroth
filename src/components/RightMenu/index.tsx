import { useState } from 'react';
import './index.less';
import { RightMenuFrontends } from './RightMenuFrontends';
import { RightMenuPages } from './RightMenuPages';

export function RightMenu(props: any) {
    const [tab, setTab] = useState(false);

    return <div className='right-menu'>
        <div className='right-menu-tabs'>
            <span className='right-menu-tab' style={{color: tab ? 'white': 'rgba(255, 255, 255, 0.3)'}} onClick={() => setTab(true)}>Pages</span>
            <span className='right-menu-tab' style={{color: !tab ? 'white': 'rgba(255, 255, 255, 0.3)'}} onClick={() => setTab(false)}>Frontends</span>
        </div>
        {tab ? <RightMenuPages /> : <RightMenuFrontends key={Math.random()} />}
    </div>
}