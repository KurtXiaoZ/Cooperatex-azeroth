import { SecondColumnOption } from '../SecondColumnOption';
import './index.less';


export function SecondColumnInteractive(props: any) {
    return <>
        <SecondColumnOption type='switcher'/>
        <SecondColumnOption type='banner'/>
    </>
}