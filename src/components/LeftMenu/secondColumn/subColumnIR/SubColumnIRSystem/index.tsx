import Icon from 'components/common/Icon';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedSystemId } from 'redux/leftMenuReducer';
import { RootState } from 'redux/store';
import { SubColumnIRRule } from '../SubColumnIRRule';
import './index.less';

export function SubColumnIRSystem(props: any) {
    const [displaySys, setDisplaySys] = useState(false);
    const systemName = useSelector((state: RootState) => state.ir.systems[props.systemId]['systemName']);
    const rules = useSelector((state: RootState) => state.ir.systems[props.systemId]['rules']);

    const displaySystem = () => {
        setDisplaySys(!displaySys)
    }

    const renderRules = () => {
        return rules.map((rule: any) => {
            return <SubColumnIRRule ruleId={rule['ruleId']} ruleName={rule['ruleName']} ruleUsed={rule['ruleUsed']}/>
        });
    }

    return <div className='sub-column-IR-system'>
        <div className='sub-column-IR-system-preview' onClick={displaySystem}>
            <span className='sub-column-IR-system-title'>{systemName}</span>
            <Icon name={'up'}
                iconStyle={{
                    transform: `rotate(${displaySys ? '180deg' : '90deg'})`,
                    width: 8,
                    marginLeft: 3,
                }}
            />
        </div>
        <div className='sub-column-IR-system-rules' style={{display: displaySys ? "block" : "none"}}>
            {renderRules()}
        </div>
    </div>
}