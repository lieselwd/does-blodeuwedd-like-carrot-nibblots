import './app.css';
import { useCallback, useEffect, useState } from 'react';

function Overlay() {
    const [time, setTime] = useState<string>("");

    useEffect(() => {
        const timeInterval = setInterval(() => {
            const date = new Date();
            const formatted = date.toLocaleString("en-gb", {
                hour: "2-digit",
                minute: "2-digit"
            });
            setTime(formatted);
        }, 2000);

        return () => clearInterval(timeInterval);
    }, []);

    return (
        <div className="absolute bottom-0 w-screen bg-gray-300 h-[143px] text-[30px] select-none">
            <div className="container mx-auto w-[1374px] h-[106px]">
                <div className="h-[53px]">
                    <div className="flex flex-row h-[53px] min-w-full bg-gray-200">
                        <div className="flex flex-none items-center px-4 pr-12">
                            UK Seats
                        </div>
                        <div className="bg-red-600 text-white flex flex-auto flex-row justify-between items-center font-semibold px-4">
                            <span>LAB</span>
                            <span>1</span>
                        </div>
                        <div className="bg-red-900 text-white flex flex-auto flex-row justify-between items-center font-semibold px-4">
                            <span>SOL</span>
                            <span>1</span>
                        </div>
                        <div className="bg-amber-500 text-white flex flex-auto flex-row justify-between items-center font-semibold px-4">
                            <span>LD</span>
                            <span>1</span>
                        </div>
                        <div className="bg-teal-900 text-white flex flex-auto flex-row justify-between items-center font-semibold px-4">
                            <span>SLP</span>
                            <span>1</span>
                        </div>
                        <div className="bg-blue-800 text-white flex flex-auto flex-row justify-between items-center font-semibold px-4">
                            <span>CON</span>
                            <span>1</span>
                        </div>
                    </div>
                </div>
                <div className="h-[53px]">
                    <div className="">
                        <div className="flex flex-row justify-between items-center">
                            <div className="text-gray-700 text-[26px] px-4">
                                Ticker eventually.
                            </div>
                            <div className="h-[48px] w-[121px] bg-[#AE0000] text-white flex items-center justify-center">
                                {time}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Overlay