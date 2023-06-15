import { useState } from 'react';

import "./Portfolio.css";
import Tile from './Tile.jsx';


export default function Portfolio() {
    
    const [data, setData] = useState({});
    fetch("../assets/data/projects.json")
        .then((response) => response.json())
        .then((res) => setData((old) => ({ ...old, ...res })));

    // console.log(data)

    return (
        <div>
            <div className='main-intro'>
                <a>Arnav Bista</a>
                <a>2nd Year CS student at The University of St Andrews</a>
                <a>This is my Portfolio.</a>
                <a>(This is a work in progress)</a>
            </div>
            <div className='main-content'>
                {
                    Object.keys(data).length !== 0 &&
                    data.sections.map(
                        (section) => {
                            return (
                                <div className='section'>
                                    <a>{section.title}</a>
                                    <ul>
                                        {
                                            section.data.map(
                                                (tileData, index) => <li key={index}><Tile  data={tileData} /></li>
                                            )
                                        }
                                    </ul>
                                </div>
                            );
                        }
                    )
                }
            </div>
        </div>
    );
};
