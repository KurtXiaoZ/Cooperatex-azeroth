import { SecondColumnOption } from '../SecondColumnOption';
import './index.less';


export function SecondColumnDecorative(props: any) {
    return <>
        <SecondColumnOption type='lines'/>
        <SecondColumnOption type='shapes'/>
        <SecondColumnOption type='arrows'/>
    </>
}