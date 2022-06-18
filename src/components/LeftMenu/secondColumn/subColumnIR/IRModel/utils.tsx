import { TOKEN } from "services";

function parseNum(numString: string) {
    return numString.substring(5);
}

export function SummaryParser(data: any) {
    let firstHalf = "";
    let secondHalf = "";
    let codeName = "";
    if(data.whenType === '1') firstHalf = "When the user clicks button";
    else if(data.whenType === '2') firstHalf = "When the user inputs data";
    else if(data.whenType === '3') {
        codeName = data?.when?.target[0]['codename'] || "";
        let targets: any = [];
        data.when.target.forEach((item: any) => {
            targets.push(item.systemName + item.poolName + item.percent + '%');
        });
        targets = targets.join(" and ");
        firstHalf = "When the user transfers " + codeName + " to " + targets;
    }
    if(data.thenType === '3') {
        codeName = data?.then?.target[0]['codename'] || "";
        let targets: any = [];
        data.then.target.forEach((item: any) => {
            targets.push(item.systemName + item.poolName + item.percent + '%');
        });
        targets = targets.join(" and ");
        secondHalf = "the user transfers " + codeName + " to " + targets;
    }
    else if(data.thenType === '4') {
        codeName = data?.then?.origin.codename || "";
        secondHalf = "the user receives " + codeName + " from " + data?.then?.origin.systemName + data?.then?.origin.poolName;
    }
    else if(data.thenType === '5') {
        codeName = data.then?.variableName;
        secondHalf = "the system changes " + data.then?.variableName;
    }
    else if(data.thenType === '6') {
        codeName = data?.then?.codename || "";
        secondHalf = "the system burns " + codeName + " from the user's address";
    }

    return [codeName, firstHalf + ", " + secondHalf + "."];
}

export function RangeParser(data: any) {
    let result = "";
    const range = data?.range;
    if(range?.rangeType === '1') {
        if(range.startSymbol === '1') result += '( ';
        else if(range.startSymbol === '2') result += '[ ';
        result += parseNum(range.minValue) + ' , ' + parseNum(range.maxValue);
        if(range.endSymbol == '3') result += ' )';
        else if(range.endSymbol === '4') result += ' ]';
    }
    else if(range?.rangeType === '2') {
        result += '[' + range.values.join(', ').trim() + ']';
    }
    return result;
}

export function ParseDetail(data: any, codeName: string) {
    return data?.scenarios?.map((scenario: any) => {
        if(scenario.last.toString() === '0') {
            return <div className="ir-model-content-text">
                <span style={{color: '#D790F9'}}>Priority level - {scenario.sort} </span>
                {restrictionsParser(scenario.restrictions)}
                {formulasParser(scenario.formulas, codeName)}
            </div>
        }
        else {
            return <div className="ir-model-content-text">
                <div style={{color: '#D790F9'}}>Else </div>
                {restrictionsParser(scenario.restrictions)}
                {formulasParser(scenario.formulas ,codeName)}
            </div>
        }
    })
}

function restrictionsParser(restrictions: any) {
    let res: any = [];
    restrictions.forEach((restriction: any) => {
        res.push(<span style={{color: '#FFFFFF80'}}> and </span>);
        if(restriction.restrictionType.toString() === '1') {
            res.push(<>
            {`${restriction.restriction.callTimes} ${restriction.restriction.callTimes === 1 ? 'time' : 'times'} for each user every ${restriction.restriction.cycleTime === 1 ? 'day' : 'days'}`}
        </>)
        }
        else if(restriction.restrictionType.toString() === '2') {
            res.push(<>
                {`When time is within ${restriction.restriction.duration} ${restriction.restriction.timeType === '3' ? 'hour' : 'day'}${restriction.restriction.duration === 1 ? '' : 's'} after the launch of the App`}
            </>);
        }
        else if(restriction.restrictionType.toString() === '3') {
            res.push(<>
                {"When time is "}
                {restriction.restriction.timeType === "1" ? 
                millisecondToTime(restriction.restriction.pointTime)
                :
                `from ${millisecondToTime(restriction.restriction.startTime)} to ${millisecondToTime(restriction.restriction.endTime)}`
                }
            </>);
        }
        else if(restriction.restrictionType.toString() === '4') {
            res.push(<>{`When the user owns ${restriction.restriction.tagId}`}</>);
        }
        else if(restriction.restrictionType.toString() === '5') {
            res.push(<>{`
                When [${restriction.restriction.variableId}] is in the range ${
                    restriction.restriction.range.rangeType.toString() === '1' ?
                    (restriction.restriction.range.startSymbol.toString() === '1' ? '(' : '[') + parseNum(restriction.restriction.range.minValue)
                    + "," + parseNum(restriction.restriction.range.maxValue) + (restriction.restriction.range.endSymbol.toString() === '3' ? '}' : ']')
                    :
                    "{" + restriction.restriction.range.values.join(",") + "}"}
            `}</>);
        }
        else if(restriction.restrictionType.toString() === '6') {
            res.push(<>{`
                Every ${restriction.restriction.periodWeek === '8' ? 'day' :
                " " + restriction.restriction.periodWeek.split(",").map((item: any) => convertToDay(item.toString())).join(", ")}
                at ${restriction.restriction.periodTime}
            `}</>);
        }
        else if(restriction.restrictionType.toString() === '7') {
            res.push(<>{`
                Every${restriction.restriction.cycleWeek === '8' ? 'day' :
                " " + convertToDay(restriction.restriction.cycleWeek.toString())}
                from ${restriction.restriction.startTime} to ${restriction.restriction.endTime}
            `}</>);
        }
        else if(restriction.restrictionType.toString() === '8') {
            res.push(<>{`
                From every ${convertToDay(restriction.restriction.startWeek.toString())} at ${restriction.restriction.startWeekTime}
                to every ${convertToDay(restriction.restriction.endWeek.toString())} at ${restriction.restriction.endWeekTime}
            `}</>);
        }
        else if(restriction.restrictionType.toString() === '9') {
            res.push(<>{`
                When UIV is in the range ${
                    restriction.restriction.range.rangeType.toString() === '1' ?
                    (restriction.restriction.range.startSymbol.toString() === '1' ? '(' : '[') + parseNum(restriction.restriction.range.minValue)
                    + "," + parseNum(restriction.restriction.range.maxValue) + (restriction.restriction.range.endSymbol.toString() === '3' ? '}' : ']')
                    :
                    "{" + restriction.restriction.range.values + "}"}
            `}</>);
        }
    });
    res.splice(0, 1);
    return res;
}

function formulasParser(formulas: any, codeName: string) {
    return formulas.map((formula: any) => {
        return <div style={{color: '#FFFFFFB2'}}>
            {`Amount of ${codeName} user received = ${formula.formula}`}
        </div>
    });
}

function millisecondToTime(millisecond: any) {
    const date = new Date(millisecond);
    const yyyy = date.getFullYear();
    let mm: any = date.getMonth() + 1; // Months start at 0!
    let dd: any = date.getDate();
    if (dd < 10) dd = '0' + dd; 
    if (mm < 10) mm = '0' + mm;
    return `${dd}/${mm}/${yyyy} ${date.getHours()}:${date.getMinutes()}`;
}

function convertToDay(key: string) {
    switch(key) {
        case '1': return 'Monday';
        case '2': return 'Tuesday';
        case '3': return 'Wednesday';
        case '4': return 'Thursday';
        case '5': return 'Friday';
        case '6': return 'Saturday';
        case '7': return 'Sunday';
    }
}