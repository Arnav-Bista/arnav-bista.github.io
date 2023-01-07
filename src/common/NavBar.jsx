import React, { useState, useEffect } from 'react';
import { Outlet, Route, Link, useLocation } from 'react-router-dom';

import './NavBar.css';

export default function NavBar() {
    const [page, setPage] = useState(0);

    const linkText = ["Portfolio", "About Me", "All Projects", "Tools"];
    const links = ["/", "/aboutme", "/all", "/tools"];

    const currentPage = useLocation().pathname;

    useEffect(() => {
        const height = document.getElementById("navbar").offsetHeight;
        document.getElementById("filler").style.minHeight = height + "px";
    });

    return (
        <div>
            {/* To maintain the same look from the OG Vanilla website. */}
            <div id='filler'/>
            <header id="navbar">
                <div className="container">
                    <Link
                        className="logo-text"
                        to="/"
                    >AB</Link>
                    <nav>
                        <ul>
                            {linkText.map((text, index) => {
                                return (
                                    <li key={index}>
                                        <Link
                                            href={links[index]}
                                            className={currentPage === links[index] ? "selected" : "not"}
                                            to={links[index]}
                                        >{text}</Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>
                </div>
            </header>
            <Outlet />
        </div>
    );
}