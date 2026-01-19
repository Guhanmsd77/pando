import Hamburger from "./HamBurgerMenu";
import {useState,useEffect} from 'react';
import Table from './Table';

const TransportService = () => {
    const[isOpen, setIsOpen] = useState(false);
    const [tableData, setTableData] = useState([]);
    const [showaddForm, setShowAddForm] = useState(false);
    const [values,setValues] = useState({
        name: '',
        gstNo: '',
        email: '',
        address: ''
    });

    useEffect(()=>{
        const fetchTableData = async() => {
            try {
                const response = await fetch('http://localhost:4000/api/transports');
                console.log(response);
                const data = await response.json();
                console.log(data);
                setTableData(data.allTransportData);
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
        row.gstNo,
        row.email,
        row.address
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
                gstNo: Number(values.gstNo)
            }
            const response = await fetch('http://localhost:4000/api/transports', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(submitData)
            });

            if (response.ok) {
                setShowAddForm(false);
                const fetchResponse = await fetch('http://localhost:4000/api/transports');
                const data = await fetchResponse.json();
                setTableData(data.allTransportData);
                console.log("final",tableData);
            }
        }catch(err) {
            console.log("error", err);
        }
    }   

    const TableColumns = ['Name', 'gstNo', 'Email', 'Address'];
    return(
        <div className="transport">
            <Hamburger isOpen={isOpen} toggleMenu={toggleMenu} />
            <h1>Transport Service Component</h1>
            <button type="button" onClick={addTransportData}>Add Transport Data</button>
            {showaddForm && (
                <form className="transport-form" onSubmit={handleFormSubmit}>
                    <input type="text" name="name" placeholder="Name" required onChange={handleChange} value={values.name} />
                    <input type="text" name="gstNo" placeholder="Gst Number" required onChange={handleChange} value={values.gstNo} />
                    <input type="email" name="email" placeholder="Email" required onChange={handleChange} value={values.email} />
                    <input type="text" name="address" placeholder="Address" onChange={handleChange} value={values.address} />
                    <button type="submit">Submit</button>
                </form>
            )}
            <Table columns={TableColumns} data={finalTableData} />
        </div>
    )
}

export default TransportService;