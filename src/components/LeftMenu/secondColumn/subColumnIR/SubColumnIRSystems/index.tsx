import Icon from 'components/common/Icon';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import { withinCanvas } from 'utils/draggable';
import { IRModel } from '../IRModel';
import { SubColumnIRSystem } from '../SubColumnIRSystem';
import { URL, TOKEN, TEST_APP_ID } from 'services';
import { setSystems } from 'redux/irReducer';

export function SubColumnIRSystems(props: any) {

    const dispatch = useDispatch();

    useEffect(() => {
        fetch(URL + `/azeroth/system/${TEST_APP_ID}.html`, {
            method: 'GET',
            headers: {
                token: TOKEN,
            }
        }).then(response => response.json())
        .then(data => {
            dispatch(setSystems(data.data));
        });
    }, []);

    const systems = useSelector((state: RootState) => state.ir.systems);

    const renderIRs = () => {
        let IRs = [];
        for(let systemId in systems) {
            IRs.push(
                <SubColumnIRSystem systemId={systemId} key={systemId}/>
            );
        }
        return IRs;
    }

    return (<div className='sub-column-IR-system'>
        {renderIRs()}
    </div>)
}