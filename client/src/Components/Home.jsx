import {Link} from 'react-router-dom';

const Home =() => {
    return (
        <div className="home-page">
            <h1>Welcome to the Home Page</h1>
            <div className="home-page-buttons">
            <Link className="home-page-btn" to="/transport">Go to Transport</Link>
            <Link className="home-page-btn" to="/shipment">Go to Shipment</Link>
            <Link className="home-page-btn" to="/vehicle">Go to Vehicle</Link>
            <Link className="home-page-btn" to="/material">Go to Material</Link>
            </div>
        </div>
    )
}

export default Home;