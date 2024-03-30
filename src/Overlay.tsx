import axios from 'axios';
import { isEqual } from 'lodash';
import TextTransition, { presets } from "react-text-transition";
import './app.css';
import { createRef, useCallback, useEffect, useState } from 'react';

function Overlay() {
    const barModes = ["total", "total", "total", "previous"];
    const [doesShe, setDoesShe] = useState<boolean>(true);
    const endpoint = import.meta.env.VITE_CPENDPOINT;
    
    const fetchDoesShe = () => {
        axios.get<boolean>(`${endpoint}/dblcn.txt`)
            .then(res => {
                console.log(res);
                setDoesShe((prev) => {
                    if (!isEqual(res.data, prev)) {
                        return res.data;
                    } else {
                        return prev;
                    }
                });
            });
    }

    useEffect(() => {
        const doeSheInterval = setInterval(() => {
            fetchDoesShe();
        }, 2000);

        return () => clearInterval(doeSheInterval);
    }, []);

    return (
        <div className="absolute bottom-0 w-screen bg-gray-300 h-[143px] text-[30px] select-none">
            <div className="container mx-auto w-[1374px] h-[106px]">
                {doesShe ??
                    <div>
                        <p>Blodeuwedd does like carrot nibblots.</p>
                    </div>
                }
                {!doesShe ?? 
                    <div>
                        <p>Blodeuwedd does not like carrot nibblots.</p>
                    </div>
                }
            </div>
        </div>
    )
}

export default Overlay