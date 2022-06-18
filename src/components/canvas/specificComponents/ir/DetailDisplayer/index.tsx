import { ParseDetail, RangeParser, SummaryParser } from 'components/LeftMenu/secondColumn/subColumnIR/IRModel/utils';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedKey } from 'redux/canvasReducer';
import { RootState } from 'redux/store';
import { request, TEST_APP_ID, TOKEN, URL } from 'services';
import CloseIcon from '../icons/close.svg';
import './index.less';

export function DetailDisplayer(props: any) {
    const selectedFrontend = useSelector((state: RootState) => state.rightMenu.selectedFrontEnd);
    const frontendKey = useSelector((state: RootState) => state.rightMenu.frontendKeys[selectedFrontend]);
    const pageKey = useSelector((state: RootState) => state.frontends[frontendKey].pages.selectedPage);
    const componentKey = useSelector((state: RootState) => state.canvas.selectedKey);
    const component = useSelector((state: RootState) => state.pages[pageKey].components[componentKey]);
    const setterType: any = useSelector((state: RootState) => state.canvas.setterType);
    const [summary, setSummary] = useState("");
    const [codeName, setCodeName] = useState("");
    const [range, setRange] = useState("");
    const [title, setTitle] = useState("");
    const [data, setData] = useState(null);
    const [showDetail, setShowDetail] = useState(false);

    const dispatch = useDispatch();

    const valid = (setterType: any, componentType: any) => {
        return (setterType === "" && 
        (component?.type === 'unmergedClick' || component?.type === 'unmergedNonclick' 
        || component?.type === 'mergedClick'  || component?.type === 'mergedNonclick'));
    }

    useEffect(() => {
        if(valid(setterType, component?.type)) {
            fetch(`${URL}/assetflow/rule/${component?.ruleId}.html`, {
                method: 'GET',
                headers: {
                    token: TOKEN,
                },
            }).then(response => response.json()).then(res => {
                if(res.code !== 100) return;
                const [curCodeName, curSummary] = SummaryParser(res.data);
                setSummary(curSummary);
                setCodeName(curCodeName);
                setTitle(res.data.ruleName);
            });
            fetch(`${URL}/assetflow/rule/allow/${component.ruleId}.html`, {
                method: 'GET',
                headers: {
                    token: TOKEN,
                },
            }).then(response => response.json()).then(res => {
                if(res.code !== 100) return;
                setData(res.data);
                setRange(RangeParser(res.data));
            });
        }
    }, [component, setterType]);

    const close = () => {
        dispatch(setSelectedKey(""));
    }

    return <div className='ir-detail-displayer-wrapper' style={{display: valid(setterType, component?.type) ? 'block' : 'none'}}>
        <div 
            className='ir-detail-displayer'
        >
            <div className='ir-detail-displayer-header'>
                <span className='ir-detail-displayer-header-title'>{title}</span>
                <img src={CloseIcon} className='ir-detail-displayer-header-close' onClick={close}/>
            </div>
            <div className='ir-detail-displayer-body'>
                {showDetail ? 
                    <>
                        <div className='ir-detail-displayer-body-detail-title'>IR Detail</div>
                        <div>{ParseDetail(data, codeName)}</div>
                    </>
                :
                    <div className='ir-detail-displayer-body-summary'>{summary}</div>
                }
            </div>
            <div className='ir-detail-displayer-footer' onClick={() => setShowDetail(!showDetail)}>
                {showDetail ? 'Fold IR detail' : 'Show IR detail'}
            </div>
        </div>
    </div>
}