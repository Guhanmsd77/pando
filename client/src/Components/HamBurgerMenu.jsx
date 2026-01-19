import {useState} from 'react';
import { Link } from 'react-router-dom';
import '../styles/HamBurger.css';
import hamburgerIcon from '../hamburger.png';

const Hamburger = ({ isOpen, toggleMenu }) => {
    const handleHamburger = (e) => {
        e.stopPropagation();
        toggleMenu();
    }

    return(
        
        <div className={`hamburger ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
            <button className="hamburger-button" onClick={handleHamburger}>
                <img src={hamburgerIcon} alt="Menu" style={{ width: '30px', height: '30px' }} />
            </button>
            {isOpen && (
                <div className="hamburger-menu">
                    <div className="hamburger-menu-item">
                    <Link className="btn" to="/transport">Transport</Link><br />
                    <Link className="btn" to="/vehicle">Vehicle</Link><br />
                    <Link className="btn" to="/material">Material</Link><br />
                    <Link className="btn" to="/shipment">Shipment</Link><br />
                    </div>
                </div>
            )}
        </div>
    )
}

export default Hamburger;