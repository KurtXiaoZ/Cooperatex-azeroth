import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import store, { RootState } from 'redux/store';
import { request, TEST_APP_ID, TOKEN, URL } from 'services';
import {SortableContainer, SortableElement, SortableHandle} from 'react-sortable-hoc';
import CloseIcon from './icons/close.svg';
import SearchIcon from './icons/search.svg';
import DownArrowIcon from './icons/downArrow.svg';
import RightArrowIcon from './icons/rightArrow.svg';
import SortHandle from './icons/sortHandle.svg';
import DeleteRule from './icons/deleteRule.svg';
import Warning from './icons/warning.svg';
import './index.less';
import { ParseDetail, RangeParser, SummaryParser } from './utils';
import { addEditChosenRuleId, clearEdit, clearEditChosenRuleIds, clearEditRulesToNames, editRemoveChosenRuleId, editSetRuleIdName, reorderEditChosenRuleIds, setEditRule } from 'redux/irReducer';
import { addComponent, removeComponent, setComponent } from 'redux/pagesReducer';

export function IREditModel(props: any) {
    //const editPageKey = useSelector((state: RootState) => state.ir.editPageKey);
    //const editComponentKey = useSelector((state: RootState) => state.ir.editComponentKey);
    //const compoenent = useSelector((state: RootState) => state.pages[editPageKey].components[editComponentKey]);
    const editSelectedRuleId = useSelector((state: RootState) => state.ir.editSelectedRuleId);
    const dispatch = useDispatch();

    const [type, setType] = useState(1);
    const [title, setTitle] = useState("");

    const close = () => {
        setType(1);
        dispatch(clearEdit());
    }

    const render = () => {
        if(editSelectedRuleId === "") return <></>
        switch (type) {
            case 1:
                return <IRModelInitial close={close} title={title} setTitle={setTitle} ruleId={editSelectedRuleId} setType={setType}/>
            case 2:
                return <IRModelMerge close={close} title={title} ruleId={editSelectedRuleId} setType={setType} />
            case 3:
                return <IRModelFinal close={close} title={title} setType={setType} ruleId={editSelectedRuleId}/>
            default:
                return <></>
        }
    }
    
    return render();
}

function IRModelInitial(props: any) {
    const editRuleIdsToNames = useSelector((state: RootState) => state.ir.editRuleIdsToNames);
    const editChosenRuleIds = useSelector((state: RootState) => state.ir.editChosenRuleIds);
    const [data, setData] = useState<any>(null);
    const [codeName, setCodeName] = useState("");
    const [summary, setSummary] = useState("");
    const [range, setRange] = useState("");
    const [showDetail, setShowDetail] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        fetch(`${URL}/assetflow/rule/${props.ruleId}.html`, {
            method: 'GET',
            headers: {
                token: TOKEN,
            },
        }).then(response => response.json()).then(res => {
            props.setTitle(res.data.ruleName);
            const [curCodeName, curSummary] = SummaryParser(res.data);
            setSummary(curSummary);
            setCodeName(curCodeName);
        });
        fetch(`${URL}/assetflow/rule/allow/${props.ruleId}.html`, {
            method: 'GET',
            headers: {
                token: TOKEN,
            },
        }).then(response => response.json()).then(res => {
            if(res.code !== 100) return;
            setData(res.data);
            setRange(RangeParser(res.data));
        });
    }, []);

    const confirm = () => {
        props.close();
    }

    return <div className='ir-model'>
        <div className='ir-model-header'>
            <span className='ir-model-header-title'>{props.title}</span>
            <img src={CloseIcon} className='ir-model-header-close' onClick={props.close}/>
        </div>
        {showDetail ? 
        <div className='ir-model-content'>
            <span className='detail-title'>IR Detail</span>
            <div className='ir-model-content-summary'>{summary}</div>
            <div style={{padding: '4px 8px'}}>{ParseDetail(data, codeName)}</div>
        </div>
        :
        <div className='ir-model-content'>
            <div className='ir-model-content-summary'>{summary}</div>
            <div className='ir-model-content-summary' style={{display: range === "" ? "none" : 'block'}}>
                Allowed range of <span style={{color: '#D790F9'}}>UIV</span> = {range}
            </div>
        </div>
        }
        <div className='ir-detail  detail-color' onClick={() => setShowDetail(!showDetail)}>{showDetail ? 'Fold IR Detail' : 'Show IR Detail'}</div>
        <div className='ir-model-footer'>
            <span className='ir-model-footer-title merge-tip merge-color' onClick={() => props.setType(2)}>Merge Same Type IRs</span>
            <div className='ir-model-footer-close' onClick={confirm}>Done</div>
        </div>
    </div>
}

function IRModelMerge(props: any) {
    const [data, setData] = useState<any>(null);
    const [whenType, setWhenType] = useState("");
    const [thenType, setThenType] = useState("");
    const [searchInput, setSearchInput] = useState("");
    const editChosenRuleIds = useSelector((state: RootState) => state.ir.editChosenRuleIds);
    const inputRef: any = useRef();

    useEffect(() => {
        fetch(`${URL}/assetflow/rule/${props.ruleId}.html`, {
            method: 'GET',
            headers: {
                token: TOKEN,
            },
        }).then(response => response.json()).then(res => {
            if(res.code.toString() !== '100') return;
            setWhenType(res.data.whenType);
            setThenType(res.data.thenType);
        });
        fetch(URL + `/azeroth/system/${TEST_APP_ID}.html`, {
            method: 'GET',
            headers: {
                token: TOKEN,
            }
        }).then(response => response.json())
        .then(res => setData(res.data));
    }, []);

    const searchRule = (e: any) => {
        setSearchInput(e.target.value);
    }

    return <div className='ir-model' style={{width: '470px', top: '50%'}}>
        <div className='ir-model-header'>
            <span className='ir-model-header-title'>Choose IRs</span>
            <img src={CloseIcon} className='ir-model-header-close' onClick={props.close}/>
        </div>
        <div className='ir-model-content merge-options'>
            <div className='ir-model-content-search'>
                <img src={SearchIcon} />
                <input className='ir-model-content-search-input' placeholder='Search IR name' ref={inputRef} onChange={searchRule}/>
            </div>
            <div className='ir-model-content-merge-options'>
                {searchInput === "" ?
                data?.map((system: any, index: any) => {
                    return <System system={system} defaultDisplay={index === 0} whenType={whenType} thenType={thenType}/>;
                })
                :
                <SearchResult searchInput={searchInput} data={data} whenType={whenType} thenType={thenType}/>
                }
            </div>
        </div>
        <div className='ir-model-footer'>
            <div className={editChosenRuleIds.length === 0 ? 'ir-model-footer-close-disable' : 'ir-model-footer-close'} onClick={editChosenRuleIds.length === 0 ? undefined : () => props.setType(3)}>Done</div>
        </div>
    </div>
}

function SearchResult(props: any) {
    const render = () => {
        const res: any = [];
        props.data?.forEach((system: any) => {
            system.rules?.forEach((rule: any) => {
                if(rule.ruleName.includes(props.searchInput)) {
                    res.push(<Rule rule={rule} whenType={props.whenType} thenType={props.thenType}/>);
                }
            });
        })
        return res;
    }

    return render();
}

function System(props: any) {
    const [showRules, setShowRules] = useState(props.defaultDisplay);
    return <div className='ir-model-system'>
        <div className='ir-model-system-header' onClick={() => setShowRules(!showRules)}>
            <img src={showRules ? DownArrowIcon : RightArrowIcon}/>
            <span className='ir-model-system-name'>{props.system.systemName}</span>
        </div>
        <div>
            {showRules && props.system?.rules.map((rule: any) => {
                return <Rule rule={rule} whenType={props.whenType} thenType={props.thenType}/>;
            })}
        </div>
    </div>
}

function Rule(props: any) {
    const editSelectedRuleId = useSelector((state: RootState) => state.ir.editSelectedRuleId);
    const [valid, setValid] = useState(true/*false*/);
    const editChosenRuleIds = useSelector((state: RootState) => state.ir.editChosenRuleIds);

    const dispatch = useDispatch();

    useEffect(() => {
        fetch(`${URL}/assetflow/rule/${props.rule.ruleId}.html`, {
            method: 'GET',
            headers: {
                token: TOKEN,
            },
        }).then(response => response.json()).then(res => {
            if(res.code.toString() !== '100') return;
            //setValid(res.data.whenType === props.whenType && res.data.thenType === props.thenType && props.rule.ruleId !== selectedRuleId);
        });
    }, []);

    const selectRule = () => {
        if(editChosenRuleIds.indexOf(props.rule.ruleId) === -1) dispatch(addEditChosenRuleId(props.rule.ruleId));
        else dispatch(editRemoveChosenRuleId(props.rule.ruleId));
    }

    return (valid ? <div 
        className={editChosenRuleIds.indexOf(props.rule.ruleId) !== -1 ? 'ir-model-rule-selected' : 'ir-model-rule'} 
        onClick={selectRule} 
        >
        {props.rule.ruleName}
    </div> : <></>)
}

function IRModelFinal(props: any) {
    const pageKey = useSelector((state: RootState) => state.ir.editPageKey);
    const componentKey = useSelector((state: RootState) => state.ir.editComponentKey);
    const [range, setRange] = useState("");
    const [selectedRuleId, setSelectedRuleId] = useState("");
    const [codeName, setCodeName] = useState("");
    const [data, setData] = useState(null);
    const [warnedOptions, setWarnedOptions] = useState<any>([]);
    const optionName = useSelector((state: RootState) => state.ir.editRuleIdsToNames[selectedRuleId]);
    const editRuleIdsToNames = useSelector((state: RootState) => state.ir.editRuleIdsToNames);
    const editChosenRuleIds = useSelector((state: RootState) => state.ir.editChosenRuleIds); 
    const dispatch = useDispatch();

    useEffect(() => {
        if(selectedRuleId === "") return;
        fetch(`${URL}/assetflow/rule/allow/${selectedRuleId}.html`, {
            method: 'GET',
            headers: {
                token: TOKEN,
            },
        }).then(response => response.json()).then(res => {
            if(res.code !== 100) return;
            setData(res.data);
            setRange(RangeParser(res.data));
        });
    }, [selectedRuleId]);

    useEffect(() => {
        if(editChosenRuleIds.length === 1) props.setType(1);
    }, [editChosenRuleIds]);

    const changeOptionName = (e: any) => {
        console.log(selectedRuleId);
        if(warnedOptions.indexOf(selectedRuleId) !== -1 && e.target.value !== "") {
            const tmp = [...warnedOptions];
            tmp.splice(warnedOptions.indexOf(selectedRuleId), 1);
            setWarnedOptions(tmp);
        }
        dispatch(editSetRuleIdName({ruleId: selectedRuleId, name: e.target.value}));
    }

    const sortEnd = (data: any) => {
        dispatch(reorderEditChosenRuleIds({oldIndex: data.oldIndex, newIndex: data.newIndex}));
    }

    const confirm = () => {
        const tmp = [];
        for(let rule in editRuleIdsToNames) {
            if(editRuleIdsToNames[rule] === "") tmp.push(rule);
        }
        if(tmp.length !== 0) setWarnedOptions(tmp);
        else {
            const newComponent = JSON.parse(JSON.stringify(store.getState().pages[pageKey].components[componentKey]));
            newComponent.chosenRuleIds = JSON.parse(JSON.stringify(editChosenRuleIds));
            newComponent.ruleIdsToNames = JSON.parse(JSON.stringify(editRuleIdsToNames));
            dispatch(removeComponent({pageKey: pageKey, componentKey: componentKey}));
            dispatch(addComponent({pageKey: pageKey, componentKey: componentKey, component: newComponent}));
            props.close();
        }
    }

    return <div className='ir-model'>
        <div className='ir-model-header'>
            <span className='ir-model-header-title'>{`Edit Rule: ${props.title}`}</span>
            <img src={CloseIcon} className='ir-model-header-close' onClick={props.close}/>
        </div>
        <div className='ir-model-content'>
            <SortableList 
                setSelectedRuleId={setSelectedRuleId} 
                selectedRuleId={selectedRuleId}
                setCodeName={setCodeName} 
                warnedOptions={warnedOptions}
                onSortEnd={sortEnd}
                useDragHandle 
            />
            <div className='final-detail' style={{display: range === "" ? 'none' : 'block'}}>
                <div className='ir-model-content-summary'>
                    Allowed range of <span style={{color: '#D790F9'}}>UIV</span> = {range}
                </div>
                {ParseDetail(data, codeName)}
            </div>
            {selectedRuleId !== "" && <div className='final-name-setter'>
                <span className='final-name-setter-text'>Option display name </span>
                <input className='final-name-setter-input' placeholder='Insert option name' value={optionName} onChange={changeOptionName}/>
            </div>}
        </div>
        <div className='ir-model-footer' style={{marginTop: '22px'}}>
        <span className='ir-model-footer-title merge-color' onClick={() => props.setType(2)}>Merge More</span>
            <div className='ir-model-footer-close' onClick={confirm}>Done</div>
        </div>
    </div>
}

const DragHandle = SortableHandle(() => <img src={SortHandle} className='option-drag-operator'/>);

const SortableItem = SortableElement((props: any) => {
    const [deleteWarn, setDeleteWarn] = useState(false);
    const [codeName, setCodeName] = useState("");
    const [summary, setSummary] = useState("");
    const optionName = useSelector((state: RootState) => state.ir.editRuleIdsToNames[props.ruleId]);
    const editChosenRuleIds = useSelector((state: RootState) => state.ir.editChosenRuleIds); 
    const dispatch = useDispatch();

    useEffect(() => {
        fetch(`${URL}/assetflow/rule/${props.ruleId}.html`, {
            method: 'GET',
            headers: {
                token: TOKEN,
            },
        }).then(response => response.json()).then(res => {
            const [curCodeName, curSummary] = SummaryParser(res.data);
            setSummary(curSummary);
            setCodeName(curCodeName);
        });
    }, []);

    const unSelectRule = (e: any) => {
        e.stopPropagation();
        if(editChosenRuleIds.length <= 1) return;
        dispatch(editRemoveChosenRuleId(props.ruleId));
    }

    return <div className='ir-model-final-option' onClick={() => {
            props.setCodeName(codeName);
            props.setSelectedRuleId(props.ruleId);
        }}
        style={{
            border: props.selectedRuleId === props.ruleId ? '1.4px solid #D790F9' : '1px solid #FFFFFF4D',
            backgroundColor: deleteWarn ? '#FF5151CC' : undefined
        }}
    >
        <DragHandle />
        <span className='ir-model-final-option-text'>{summary}</span>
        <img src={DeleteRule} className='option-drag-operator delete-icon' onClick={unSelectRule} onMouseEnter={() => setDeleteWarn(true)} onMouseOut={() => setDeleteWarn(false)}/>
        {(props.warnedOptions.indexOf(props.ruleId) !== -1) && <img src={Warning} className='option-drag-operator-warning right-icon'/>}
    </div>
});

const SortableList = SortableContainer((props: any) => {
    const editChosenRuleIds = useSelector((state: RootState) => state.ir.editChosenRuleIds);
    
    return (
      <div className='final-options'>
        {editChosenRuleIds.map((ruleId: any, index: number) => (
          <SortableItem 
            key={`rule-${ruleId}`} 
            index={index} 
            itemIndex={index}
            ruleId={ruleId}
            setCodeName={props.setCodeName} 
            setSelectedRuleId={props.setSelectedRuleId}
            selectedRuleId={props.selectedRuleId}
            warnedOptions={props.warnedOptions}
        />
        ))}
      </div>
    );
});