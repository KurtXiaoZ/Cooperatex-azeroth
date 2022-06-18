import { useDispatch, useSelector } from 'react-redux';
import store, { RootState } from 'redux/store';
import './index.less';
import OperateIcon from '../../../assets/svgs/operate.svg';
import { setSelectedFrontEnd, deleteFrontendKey } from 'redux/rightMenuReducer';
import EditIcon from '../../../assets/svgs/editFrontend.svg';
import DeleteIcon from '../../../assets/svgs/deleteFrontend.svg';
import CloseIcon from '../../../assets/svgs/closeFrontend.svg';
import { useEffect, useRef, useState } from 'react';
import { deleteFrontend, editFrontendName } from 'redux/frontendsReducer';
import { deletePage } from 'redux/pagesReducer';
import { PopUp } from '../PopUp';

export function RightMenuFrontend(props: any) {
    const [warning, setWarning] = useState(false);
    const [type, setType] = useState('view');
    const name = useSelector((state: RootState) => state.frontends[props.frontendKey]['name']);
    const usedIR = useSelector((state: RootState) => state.frontends[props.frontendKey]['usedIRs']);
    const selectedFrontEnd = useSelector((state: RootState) => state.rightMenu.selectedFrontEnd);
    const dispatch = useDispatch();
    let timeout: any = null;

    const useOutsideAlerter = (ref: any) => {
        useEffect(() => {
            const handleClickOutside = (event: any) => {
                event.stopPropagation();
                if(!ref.current || type !== 'edit') return;
                if (ref.current && !ref.current.contains(event.target)) {
                    dispatch(editFrontendName({
                        key: props.frontendKey,
                        name: ref.current.value || name
                    }));
                    setType('view');
                }
            };
            document.addEventListener("click", handleClickOutside);
            return () => {
                document.removeEventListener("click", handleClickOutside);
            };
        }, [ref, props.index, type]);
    }
    const editSystem = useRef(null);
    useOutsideAlerter(editSystem);

    const renderContent = () => {
        switch(type) {
            case 'view':
                return <>
                    <span className='right-menu-frontend-title'>{name}</span>
                    <span className='right-menu-frontend-IR-usage'>IRs used: {usedIR}</span>
                    <img className='right-menu-frontend-button' src={OperateIcon} onClick={enterSetting}/>
                </>;
            case 'setting':
                return <>
                    <img className='right-menu-frontend-edit' src={EditIcon} onClick={() => setType("edit")}/>
                    <img className='right-menu-frontend-delete' src={DeleteIcon} onClick={displayWarning}/>
                    <img className='right-menu-frontend-close' src={CloseIcon} onClick={() => setType('view')}/>
                </>
            case 'edit':
                return <>
                    <input className='right-menu-frontend-input' placeholder={name} ref={editSystem}/>
                    <span className='right-menu-frontend-IR-usage'>IRs used: {usedIR}</span>
                    <img className='right-menu-frontend-button' src={OperateIcon} onClick={enterSetting}/>
                </>
        }
    }

    const displayWarning = (e: any) => {
        e.stopPropagation();
        if(store.getState().rightMenu.frontendKeys.length <= 1) return;
        setWarning(true);
    }
    const enterSetting = (e: any) => {
        e.stopPropagation();
        setType('setting');
    }
    const deleteConfirm = () => {
        setWarning(false);
        let frontend = store.getState().frontends[props.frontendKey].pages;
        frontend.mainPageKeys.forEach((mainPageKey: string) => {
            dispatch(deletePage(mainPageKey));
        });
        frontend.subPageKeys.forEach((subPageKey: string) => {
            dispatch(deletePage(subPageKey));
        });
        frontend.subFolderKeys.forEach((subFolderKey: string) => {
            frontend.subFolders[subFolderKey].subpages.forEach((subFolderPageKey: string) => {
                dispatch(deletePage(subFolderPageKey));
            });
        });
        dispatch(deleteFrontendKey(props.index));
        dispatch(deleteFrontend(props.frontendKey));
    }
    const deleteCancel = () => {
        setWarning(false);
    }
    const handleClick = (e: any) => {
        clearTimeout(timeout);
        if(e.detail === 1) {
            timeout = setTimeout(() => {
                // onClick
                e.preventDefault();
                if(type === 'view') dispatch(setSelectedFrontEnd(props.index));
            }, 200)
        }
        else if(e.detail === 2) {
            // onDoubleClick
            e.preventDefault();
            setType('edit');
        }
    }

    return <>
        <div className={selectedFrontEnd === props.index ? 'right-menu-frontend-selected' : 'right-menu-frontend'} onClick={handleClick}>
           {renderContent()}
        </div>
        <PopUp 
            display={warning} 
            onConfirm={deleteConfirm} 
            onCancel={deleteCancel}
            text={"This Frontend and all of its content will be deleted, please confirm whether to delete."}
        />
    </>
}