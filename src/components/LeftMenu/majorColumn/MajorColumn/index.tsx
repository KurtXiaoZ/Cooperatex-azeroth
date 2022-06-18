import { MajorColumnOption } from '../MajorColumnOption';
import './index.less';

export function MajorColumn(props: any) {

    return <div className="major-column">
        <div className="major-column-empty-top"></div>
        <div className="major-column-content">
            <MajorColumnOption type={'ir'}/>
            <MajorColumnOption type={'image'}/>
            <MajorColumnOption type={'text'}/>
            <MajorColumnOption type={'decorative'}/>
            <MajorColumnOption type={'interactive'}/>
            <MajorColumnOption type={'social'}/>
        </div>
    </div>
}