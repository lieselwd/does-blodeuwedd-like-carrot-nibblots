import axios from 'axios';
import { isEqual } from 'lodash';
import TextTransition, { presets } from "react-text-transition";
import './app.css';
import { createRef, useCallback, useEffect, useState } from 'react';

function Overlay() {
    const barModes = ["total", "total", "total", "previous"];
    const [doesShe, setDoesShe] = useState<string>("true");
    const endpoint = import.meta.env.VITE_CPENDPOINT;
    
    const fetchDoesShe = () => {
        axios.get<string>(`${endpoint}/dblcn.txt`)
            .then(res => {
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
        }, 100000);

        return () => clearInterval(doeSheInterval);
    }, []);

    return (
        <div className="flex h-screen justify-center items-center">
            <div className="text-center">
                <h1 className="text-lg">Blodeuwedd {doesShe == "true" ? 'does' : 'does not'} like carrot nibblots.</h1>
            </div>
        </div>
    )
}

export default Overlay