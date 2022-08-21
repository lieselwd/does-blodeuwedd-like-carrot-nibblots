import axios from 'axios';
import { isEqual } from 'lodash';
import TextTransition, { presets } from "react-text-transition";
import './app.css';
import { createRef, useCallback, useEffect, useState } from 'react';
import { createGrouping, Grouping } from './types/Grouping';
import GroupingSeats from './components/GroupingSeats';
import GroupingVotes from './components/GroupingVotes';

function Overlay() {
    const barModes = ["total", "previous", "votes"];
    const [time, setTime] = useState<string>("");
    const [groupings, setGroupings] = useState<Grouping[]>([]);
    const [ticker, setTicker] = useState<string>("");
    const [barModeIndex, setBarModeIndex] = useState<number>(0);
    const endpoint = import.meta.env.VITE_CPENDPOINT;
    
    const fetchGroupings = () => {
        axios.get<Grouping[]>(`${endpoint}/api/groupings`)
            .then(res => {
                setGroupings((prev) => {
                    if (!isEqual(res.data, prev)) {
                        return res.data;
                    } else {
                        return prev;
                    }
                });
            });
    }

    const fetchTicker = () => {
        axios.get<string>(`${endpoint}/api/ticker-lines`)
            .then(res => {
                setTicker((prev) => {
                    if (!isEqual(res.data, prev)) {
                        return res.data;
                    } else {
                        return prev;
                    }
                });
            });
    }

    useEffect(() => {
        const timeInterval = setInterval(() => {
            const date: Date = new Date();
            const formatted: string = date.toLocaleString("en-gb", {
                hour: "2-digit",
                minute: "2-digit"

            });
            setTime(formatted);
        }, 2000);

        return () => clearInterval(timeInterval);
    }, []);

    useEffect(() => {
        const groupingsInterval = setInterval(() => {
            fetchGroupings();
        }, 2000);

        return () => clearInterval(groupingsInterval);
    }, []);

    useEffect(() => {
        const tickerInterval = setInterval(() => {
            fetchTicker();
        }, 3000);

        return () => clearInterval(tickerInterval);
    }, []);

    useEffect(() => {
        const switchModeInterval = setInterval(() => {
            setBarModeIndex(prev => ((prev + 1) % barModes.length));
        }, 10000);

        return () => clearInterval(switchModeInterval);
    }, []);

    return (
        <div className="absolute bottom-0 w-screen bg-gray-300 h-[143px] text-[30px] select-none">
            <div className="container mx-auto w-[1374px] h-[106px]">
                <div className="h-[53px]">
                    <div className="flex flex-row h-[53px] min-w-full bg-gray-200">
                        {barModes[barModeIndex] === "total" && 
                            <>
                                <div className="flex flex-none items-center px-4 pr-12">
                                    UK Seats
                                </div>
                                {groupings.length > 0 ?
                                    <>
                                        {groupings.map((grouping, i) => {
                                            return (<GroupingSeats key={i} grouping={grouping} previous={false} />)
                                        })}
                                    </>
                                    :
                                    <>
                                    <div>Dataless</div>
                                    </>
                                }
                            </>
                        }
                        {barModes[barModeIndex] === "previous" &&
                            <>
                                <div className="flex flex-none items-center px-4 pr-12">
                                    Previous Seats
                                </div>
                                {groupings.length > 0 ?
                                    <>
                                        {groupings.map((grouping, i) => {
                                            return (<GroupingSeats key={i} grouping={grouping} previous={true} />)
                                        })}
                                    </>
                                    :
                                    <>
                                    <div>Dataless</div>
                                    </>
                                }
                            </>
                        }
                        {barModes[barModeIndex] === "votes" &&
                            <>
                                <div className="flex flex-none items-center px-4 pr-12">
                                    Vote Share
                                </div>
                                {groupings.length > 0 ?
                                    <>
                                        {groupings.map((grouping, i) => {
                                            return (<GroupingVotes key={i} grouping={grouping} />)
                                        })}
                                    </>
                                    :
                                    <>
                                        <div>Dataless</div>
                                    </>
                                }
                            </>
                        }
                    </div>
                </div>
                <div className="h-[53px]">
                    <div className="">
                        <div className="flex flex-row justify-between items-center">
                            <div className="text-gray-700 text-[26px] px-4">
                                <TextTransition springConfig={presets.gentle} style={{
                                        marginTop: '-20px'
                                    }}>
                                    {ticker}
                                </TextTransition>
                            </div>
                            <div className="h-[48px] w-[121px] bg-[#AE0000] text-white flex items-center justify-center">
                                <div>
                                    <span>{time}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Overlay