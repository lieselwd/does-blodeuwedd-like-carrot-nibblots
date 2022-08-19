import axios from 'axios';
import { isEqual } from 'lodash';
import TextTransition, { presets } from "react-text-transition";
import './app.css';
import { useCallback, useEffect, useState } from 'react';
import { createGrouping, Grouping } from './types/Grouping';
import GroupingSeats from './components/GroupingSeats';

function Overlay() {
    const [time, setTime] = useState<string>("");
    const [groupings, setGroupings] = useState<Grouping[]>([]);
    
    const fetchGroupings = () => {
        axios.get<Grouping[]>('http://localhost:8000/api/groupings')
            .then(res => {
                setGroupings((prev) => {
                    if (!isEqual(res.data, prev)) {
                        return res.data;
                    } else {
                        return prev;
                    }
                })
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

    return (
        <div className="absolute bottom-0 w-screen bg-gray-300 h-[143px] text-[30px] select-none">
            <div className="container mx-auto w-[1374px] h-[106px]">
                <div className="h-[53px]">
                    <div className="flex flex-row h-[53px] min-w-full bg-gray-200">
                        <div className="flex flex-none items-center px-4 pr-12">
                            UK Seats
                        </div>
                        {groupings.length > 0 ?
                            <>
                                {groupings.map((grouping, i) => {
                                    return (<GroupingSeats key={i} grouping={grouping} />)
                                })}
                            </>
                            :
                            <>
                            <div>NO DATA</div>
                            </>
                        }
                    </div>
                </div>
                <div className="h-[53px]">
                    <div className="">
                        <div className="flex flex-row justify-between items-center">
                            <div className="text-gray-700 text-[26px] px-4">
                                Mayo Porridge delivers 10000th train to rabbits across the world
                            </div>
                            <div className="h-[48px] w-[121px] bg-[#AE0000] text-white flex items-center justify-center">
                                <div>
                                    <TextTransition springConfig={presets.gentle} style={{
                                        marginTop: '-22px'
                                    }}>
                                        <span>{time}</span>
                                    </TextTransition>
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