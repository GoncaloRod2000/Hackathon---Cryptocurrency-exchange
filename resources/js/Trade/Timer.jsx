import { useState, useEffect } from "react";
import { DateTime } from "luxon";
import TradeData from "./TradeData";
;


export default function Timer(){

    // const time = (new DateTime(1364774820)).toFormat('yyyy LL dd, HH:mm')

    const [time, setTime] = useState(null);

    const increaseTime = () => {
        time && setTime(time + 60)
    }

    useEffect(() => {
        // creating a timeout when the component mounts, so...
        const myTimeout = setTimeout(() => {
            increaseTime()
        }, 5000);
        
        console.log(time);
        // ...returning a cleanup function which will be run
        // when the component unmounts
        return () => {
            clearTimeout(myTimeout);
        }
    }, [time])

    return (
        <>
            <p>The time is {time && DateTime.fromSeconds(time).toFormat('yyyy LL dd, HH:mm')}</p>
            <TradeData time={time} setTime={setTime}/>
        </>
    )
}