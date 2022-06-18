import { Menu } from "./menu/Menu"
import { Text } from "./text/Text";
import { MenuSetterStyleIcon } from "./menu/MenuSetterStyleIcons"
import { TextSetterEditIcon } from "./text/TextSetterEditIcon";
import { TextSetterStyleIcon } from "./text/TextSetterStyleIcon";
import { Line, DashLine, DotLine, ArrowLine } from "./decorative/line/Line";
import { LineSetterStyleIcon } from "./decorative/line/LineSetterStyleIcon";
import { Circle, Rect, RoundRect } from "./decorative/shape/Shape";
import { ShapeSetterStyleIcon } from "./decorative/shape/ShapeSetterStyleIcon";
import { LinkIcon } from "./common/LinkIcon";
import { ArrowR1C1 } from "./decorative/arrow/Arrow";
import { ArrowSetterStyleIcon } from "./decorative/arrow/ArrowSetterStyleIcon";
import { CustomImage } from "./image/custom/CustomImage";
import { ImageSetterStyleIcon } from "./image/custom/ImageStyleIcon";
import { Switcher1 } from "./interactive/Switcher1";
import { SwitcherSetterManageIcon } from "./interactive/SwitcherSetterManageIcon";
import { SwitcherSetterStyleIcon } from "./interactive/SwitcherSetterStyleIcon";
import { IR } from "./ir/IR";
import { IRSetterStyleIcon } from "./ir/IRSetterStyleIcon";
import { IRSetterTextIcon } from "./ir/IRSetterTextIcon";
import { IRSetterManageIcon } from "./ir/IRSetterManageIcon";
import { UnmergedClickIR } from "./ir/IR/UnmergedClickIR";
import { UnmergedNonclickIR } from "./ir/IR/UnmergedNonclickIR";
import { MergedClickIR } from "./ir/IR/MergedClickIR";
import { MergedNonclickIR } from "./ir/IR/MergedNonclickIR";

export function typeToComponent(pageKey: string, componentKey: string, source: any, nodeRef: any, type: string, frontendKey: string, canvasRef: any) {
    switch(type) {
        case 'menu':
            return <Menu canvasRef={canvasRef} style={source.style} pageKey={pageKey} componentKey={componentKey} frontendKey={frontendKey}/>;
        case 'text':
            return <Text pageKey={pageKey} componentKey={componentKey} source={source} nodeRef={nodeRef}/>
        case 'line':
            return <Line pageKey={pageKey} componentKey={componentKey} source={source} nodeRef={nodeRef}/>
        case 'dashLine':
            return <DashLine pageKey={pageKey} componentKey={componentKey} source={source} nodeRef={nodeRef}/>
        case 'dotLine':
            return <DotLine pageKey={pageKey} componentKey={componentKey} source={source} nodeRef={nodeRef}/>
        case 'arrowLine1': case 'arrowLine2':
            return <ArrowLine pageKey={pageKey} componentKey={componentKey} source={source} nodeRef={nodeRef}/>
        case 'circle':
            return <Circle pageKey={pageKey} componentKey={componentKey} source={source} nodeRef={nodeRef}/>
        case 'rect':
            return <Rect pageKey={pageKey} componentKey={componentKey} source={source} nodeRef={nodeRef}/>
        case 'roundRect':
            return <RoundRect pageKey={pageKey} componentKey={componentKey} source={source} nodeRef={nodeRef}/>
        case 'arrowR1C1':
            return <ArrowR1C1 pageKey={pageKey} componentKey={componentKey} source={source} nodeRef={nodeRef}/>
        case 'customImage':
            return <CustomImage pageKey={pageKey} componentKey={componentKey} source={source} nodeRef={nodeRef}/>
        case 'switcher1':
            return <Switcher1 pageKey={pageKey} componentKey={componentKey} source={source} nodeRef={nodeRef}/>
        case 'unmergedClick':
            return <UnmergedClickIR pageKey={pageKey} componentKey={componentKey} source={source} nodeRef={nodeRef}/>
        case 'unmergedNonclick':
            return <UnmergedNonclickIR pageKey={pageKey} componentKey={componentKey} source={source} nodeRef={nodeRef}/>
        case 'mergedClick':
            return <MergedClickIR pageKey={pageKey} componentKey={componentKey} source={source} nodeRef={nodeRef}/>
        case 'mergedNonclick':
            return <MergedNonclickIR pageKey={pageKey} componentKey={componentKey} source={source} nodeRef={nodeRef}/>
        default:
            return <div></div>
    }
}

export function renderSetterIcons(type: string) {
    switch (type) {
        case 'menu':
            return <MenuSetterStyleIcon />
        case 'text':
            return <div key={Math.random()}>
                <TextSetterEditIcon />
                <TextSetterStyleIcon />
            </div>
        case 'line': case 'dashLine': case 'dotLine': case 'arrowLine1': case 'arrowLine2':
            return <LineSetterStyleIcon key={Math.random()}/>
        case 'circle': case 'rect': case 'roundRect':
            return <div>
                <ShapeSetterStyleIcon />
                <LinkIcon />
            </div>
        case 'arrowR1C1':
            return <div>
                <ArrowSetterStyleIcon />
                <LinkIcon />
            </div>
        case 'customImage':
            return <div>
                <ImageSetterStyleIcon />
                <LinkIcon />
            </div>
        case 'switcher1': case 'switcher2':
            return <div>
                <SwitcherSetterManageIcon />
                <SwitcherSetterStyleIcon />
            </div>
        case 'unmergedClick': case 'unmergedNonclick': case 'mergedClick': case 'mergedNonclick':
            return <div>
                <IRSetterStyleIcon />
                <IRSetterTextIcon />
                <IRSetterManageIcon />
            </div>
        default:
            return <div></div>
    }
}