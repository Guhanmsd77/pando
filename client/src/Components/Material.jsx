import Hamburger from "./HamBurgerMenu";
import {useState,useEffect} from 'react';
import Table from './Table';

const Materials = () => {
    const[isOpen, setIsOpen] = useState(false);
    const [tableData, setTableData] = useState([]);
    const [showaddForm, setShowAddForm] = useState(false);
    const [values,setValues] = useState({
        name: '',
        category: '',
        description: '',
    });

    useEffect(()=>{
        const fetchTableData = async() => {
            try {
                const response = await fetch('http://localhost:4000/api/materials');
                console.log(response);
                const data = await response.json();
                console.log(data);
                setTableData(data.allMaterials);
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
        row.category,
        row.description,
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
            };

            console.log("submitdata",submitData);
            
            const response = await fetch('http://localhost:4000/api/materials', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(submitData)
            });

            if (response.ok) {
                setShowAddForm(false);
                const fetchResponse = await fetch('http://localhost:4000/api/materials');
                const data = await fetchResponse.json();
                setTableData(data.allMaterials);
                console.log("final",tableData);
            }
        }catch(err) {
            console.log("error", err);
        }
    }   

    const TableColumns = ['Name', 'category', 'description'];
    console.log("finalTableData",finalTableData);
    return(
        <div className="transport">
            <Hamburger isOpen={isOpen} toggleMenu={toggleMenu} />
            <h1>Materials Service Component</h1>
            <button type="button" onClick={addTransportData}>Add Materials Data</button>
            {showaddForm && (
                <form className="transport-form" onSubmit={handleFormSubmit}>
                    <input type="text" name="name" placeholder="Name" required onChange={handleChange} value={values.name} />
                    <input type="text" name="category" placeholder="category" required onChange={handleChange} value={values.category} />
                    <input type="text" name="description" placeholder="description" required onChange={handleChange} value={values.description} />
                    <button type="submit">Submit</button>
                </form>
            )}
            <Table columns={TableColumns} data={finalTableData} />
        </div>
    )
}

export default Materials;