import { SecondColumnOption } from '../SecondColumnOption';
import './index.less';


export function SecondColumnText(props: any) {
    return <>
        <SecondColumnOption type='titles'/>
        <SecondColumnOption type='paragraphs'/>
        <SecondColumnOption type='data'/>
    </>
}