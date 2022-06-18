import React, { useEffect, useState } from 'react';
import Icon from 'components/common/Icon';
import Progress from 'components/common/Progress';
import Tooltip from 'components/common/Tooltip';
import IRModal from 'components/IRModal';
import { SearchSelect } from 'components/IRModal/IRSelect';
import SystemSlider from './SystemSlider';

import './index.less'
import Modal from 'components/common/Modal';
import { getRuleAccessible, getRuleIllustrate, getRuleScenarios, getSystemList, upDateRuleUsed } from 'services/past';
import SearchIrModal from './SearchIrModal';
import { accessibleData, illustrateData, scenariosData } from './data';

/**
 * Helper function that calculates the progress in percentage
 * 
 * @param used    number of used IRs
 * @param total   number of all IRs
 * @returns       progress of IR usage in percentage
 */
 const getProgressPercentage = (used: number, total: number) => {
  return Math.round(100 * used / total) + '%';
}

function Systems({ onSelect, }: any) {

  const [list, setList] = useState<any[]>([])
  const [progress, setProgress] = useState('0%');
  const [progressUsed, setProgressUsed] = useState(0);
  const [progressTotal, setProgressTotal] = useState(0);
  const [modalData, setModalData] = useState<any>({
    visible: false,
    data: []
  })
  const [irSearchVisible, setIrSearchVisible] = useState(false)
  const [irSearchValue, setIrSearchValue] = useState<any>({})



  useEffect(() => {
    getSystemAndRulesList();
    getInitialProgress();
  }, [])

  const getInitialProgress = async () => {
    let total = 0, used = 0;
    let list = await getSystemList();
    if(!list || !(list instanceof Array)) {
      console.log("Error Location: src/components/Systems/index.tsx/getInitialTotalSystem");
      console.log("Error detail:" + list);
      return;
    }
    list.forEach((system) => {
      total += system.ruleTotal;
      used += system.ruleUsedTotal;
    });
    setProgressTotal(total);
    setProgressUsed(used);
  }

  const getSystemAndRulesList = () => {
    getSystemList().then((resData: any) => {
      console.log('------resData:', resData)
      // setProgress()
      setList(resData);

    })

  }

  const handleIRSelect = (IR: any) => {

    // const getRuleIllustratePromise = new Promise((resolve) => {
    //   getRuleIllustrate(IR.ruleId).then((resData: any) => {
    //     resolve(resData)
    //   })
    // })

    // const getRuleScenariosPromise = new Promise((resolve) => {
    //   getRuleScenarios(IR.ruleId).then((resData: any) => {
    //     resolve(resData)
    //   })
    // })

    // const getRuleAccessiblePromise = new Promise((resolve) => {
    //   getRuleAccessible(IR.ruleId).then((resData: any) => {
    //     resolve(resData)
    //   })
    // })


    // Promise.all([getRuleIllustratePromise, getRuleScenariosPromise, getRuleAccessiblePromise]).then((result) => {
    //   if (result.length) {
    //     setModalData({
    //       ...modalData,
    //       visible: true,
    //       data: result
    //     })
    //   }
    // }).catch((error) => {
    //   console.log(error)
    //   setModalData({
    //     ...modalData,
    //     visible: true,
    //     data: [illustrateData, scenariosData, accessibleData]
    //   })
    // })

    setModalData({
      ...modalData,
      visible: true,
      data: [illustrateData, scenariosData, accessibleData]
    })


  }

  const handleChangeIRDone = (newIRData: any) => {
    console.log('--------newIRData:', newIRData)
    // handleIRSelect(newIRData)
    // onSelect && onSelect(newIRData)
    upDateRuleUsed({
      "systemId": "7449103770437",
      "ruleId": "7603872291525"
    }).then((resData: any) => {
      console.log('-----resData:', resData)
    })
  }

  return (
    <div className="system-container">
      <div className="system-content">
        <div className="system-finished-content">
          <div style={{
            color: '#9B9B9B'
          }}>
            <span>Total Progress: {getProgressPercentage(progressUsed, progressTotal)}</span>
          </div>
          <div className="system-finished-progress">
          <Progress percent={getProgressPercentage(progressUsed, progressTotal)} />
          </div>
        </div>
        <div className="system-list-container">
          <div className="system-search">
            <Icon
              name={'search'}
              iconStyle={{
                width: 12
              }}
              onClick={() => {
                setIrSearchVisible(true)
              }}
            />
          </div>
          <div className="system-list">
            <div
              style={{
                width: '100%',
              }}
            >
              <SystemSlider list={list} handleIRSelect={handleIRSelect} />
            </div>
          </div>
        </div>

      </div>

      {irSearchVisible &&
        <SearchIrModal
          title={'Search IR'}
          visible={irSearchVisible}
          onClose={() => setIrSearchVisible(false)}
          theme="dark"
          onSelect={(ir: any) => {
            handleIRSelect(ir)
            setIrSearchVisible(false)
          }}
        />
      }

      {modalData.visible &&
        <Modal
          title={''}
          theme="dark"
          visible={modalData.visible}
          footer={null}
        >
          <IRModal
            IRData={modalData.data}
            onClose={() => setModalData({
              // ...modalData,
              visible: false
            })}
            onDone={handleChangeIRDone}
          />
        </Modal>
      }
    </div>
  );
}

export default Systems;
