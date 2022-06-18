import { useDispatch } from 'react-redux';
import './index.less';
import { MajorColumn } from './majorColumn/MajorColumn';
import { SecondColumn } from './secondColumn/SecondColumn';
import { ThirdColumn } from './thirdColumn/ThirdColumn';

function LeftMenu(props: any) {
  const dispatch = useDispatch();

  



  return <div className='left-menu' id='left-menu'>
    <MajorColumn />
    <SecondColumn />
    <ThirdColumn />
  </div>
}

export default LeftMenu;

