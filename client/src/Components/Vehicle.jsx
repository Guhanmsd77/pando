import Hamburger from "./HamBurgerMenu";
import {useState,useEffect} from 'react';
import Table from './Table';

const Vechicle = () => {
    const[isOpen, setIsOpen] = useState(false);
    const [tableData, setTableData] = useState([]);
    const [showaddForm, setShowAddForm] = useState(false);
    const [values,setValues] = useState({
        name: '',
        weight: '',
        volume: '',
    });

    useEffect(()=>{
        const fetchTableData = async() => {
            try {
                const response = await fetch('http://localhost:4000/api/vehicles');
                console.log(response);
                const data = await response.json();
                console.log(data);
                setTableData(data.allVechicleData);
                console.log("tableda",tableData);
            }catch(err) {
                console.log("error",err);
            }
        }
        fetchTableData();
},[]);

    const addTransportData = async() => {
        setShowAddForm(true);
    }

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }



    const finalTableData = tableData.map((row) => [
        row.name,
        row.weight,
        row.volume,
    ]);

    const handleChange = (e) => {
        const {name,value} = e.target;
        setValues((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleFormSubmit = async(e) => {
        e.preventDefault();
        try {
            const submitData = {
                ...values,
                weight: Number(values.weight),
                volume: Number(values.volume)
            };

            console.log("submitdata",submitData);
            
            const response = await fetch('http://localhost:4000/api/vehicles', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(submitData)
            });

            if (response.ok) {
                setShowAddForm(false);
                const fetchResponse = await fetch('http://localhost:4000/api/vehicles');
                const data = await fetchResponse.json();
                setTableData(data.allVechicleData);
                console.log("final",tableData);
            }
        }catch(err) {
            console.log("error", err);
        }
    }   

    const TableColumns = ['Name', 'Weight', 'Volume'];
    console.log("finalTableData",finalTableData);
    return(
        <div className="transport">
            <Hamburger isOpen={isOpen} toggleMenu={toggleMenu} />
            <h1>vehicles Service Component</h1>
            <button type="button" onClick={addTransportData}>Add vehicles Data</button>
            {showaddForm && (
                <form className="transport-form" onSubmit={handleFormSubmit}>
                    <input type="text" name="name" placeholder="Name" required onChange={handleChange} value={values.name} />
                    <input type="text" name="weight" placeholder="Weight" required onChange={handleChange} value={values.weight} />
                    <input type="text" name="volume" placeholder="Volume" required onChange={handleChange} value={values.volume} />
                    <button type="submit">Submit</button>
                </form>
            )}
            <Table columns={TableColumns} data={finalTableData} />
        </div>
    )
}

export default Vechicle;