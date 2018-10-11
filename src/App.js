import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import Section from './modules/section/section';
import Detail from './modules/detail/detail';
import LifeCircle from './modules/lifeCircle/lifeCircle';
import InputComp from './modules/inputComp/inputComp';


const navLinks = [
    {path: '/', desc: 'Section', component: Section},
    {path: '/Detail', desc: 'Detail', component: Detail},
    {path: '/LifeCircle', desc: 'LifeCircle', component: LifeCircle},
    {path: '/InputComp', desc: 'InputComp', component: InputComp}
]



const App = () => (
        <Router>
            <div className="body-container">
                <ul className="nav-left">
                    {navLinks.map((item, index) => {
                        return <li key={item.path}>
                            <Link to={item.path}>{item.desc}</Link>
                        </li>
                    })}
                </ul>

                <div className="container-app">
                    {navLinks.map((item, index) => {
                        if (item.path === '/') {
                            return <Route exact path={item.path} component={item.component} key={index} />
                        } else {
                            return <Route path={item.path} component={item.component} key={index} />
                        }
                    })}
                </div>
            </div>
        </Router>
);

export default App;
