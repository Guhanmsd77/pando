import Hamburger from "./HamBurgerMenu";
import {useState,useEffect} from 'react';

const Shipment = () => {
    const[isOpen, setIsOpen] = useState(false);
    const [tableData, setTableData] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [showCsvUpload, setShowCsvUpload] = useState(false);
    const [showGroupDetail, setShowGroupDetail] = useState(false);
    const [selectedGroupDetail, setSelectedGroupDetail] = useState(null);
    const [vehicleTypes, setVehicleTypes] = useState([]);
    const [materialTypes, setMaterialTypes] = useState([]);
    const [newVehicleInput, setNewVehicleInput] = useState('');
    const [newMaterialInput, setNewMaterialInput] = useState('');
    const [groupVehicleTypes, setGroupVehicleTypes] = useState([]);
    const [groupMaterialTypes, setGroupMaterialTypes] = useState([]);
    const [formData, setFormData] = useState({
        source: '',
        destination: '',
        vehicleType: '',
        materialType: '',
        materials: '',
        totalWeightInKg: '',
        totalVolume: '',
        groupId: ''
    });
    const [csvFile, setCsvFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState('');

    useEffect(()=>{
        const fetchTableData = async() => {
            try {
                const response = await fetch('http://localhost:4000/api/shipments');
                const data = await response.json();
                setTableData(data.allShipmentData);
                extractDropdownOptions(data.allShipmentData);
            }catch(err) {
                console.error("Error fetching shipments:", err);
            }
        }
        fetchTableData();
    },[]);

    const extractDropdownOptions = (data) => {
        const vehicles = [...new Set(data.map(item => item.vehicleType))].filter(Boolean);
        const materials = [...new Set(data.map(item => item.materialType))].filter(Boolean);
        setVehicleTypes(vehicles);
        setMaterialTypes(materials);
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }

    const addShipmentData = () => {
        setShowAddForm(true);
        setShowCsvUpload(false);
    }

    const handleAddCsv = () => {
        setShowCsvUpload(true);
        setShowAddForm(false);
    }

    const handleOpenGroupDetail = (groupId) => {
        const groupShipments = tableData.filter(s => s.groupId === groupId);
        const detail = {
            groupId,
            shipmentCount: groupShipments.length,
            shipments: groupShipments
        };
        setSelectedGroupDetail(detail);
        const uniqueVehicles = [...new Set(groupShipments.map(s => s.vehicleType))];
        const uniqueMaterials = [...new Set(groupShipments.map(s => s.materialType))];
        setGroupVehicleTypes(uniqueVehicles);
        setGroupMaterialTypes(uniqueMaterials);
        setNewVehicleInput('');
        setNewMaterialInput('');
        setShowGroupDetail(true);
    }

    const handleCloseGroupDetail = () => {
        setShowGroupDetail(false);
        setSelectedGroupDetail(null);
        setGroupVehicleTypes([]);
        setGroupMaterialTypes([]);
        setNewVehicleInput('');
        setNewMaterialInput('');
    }

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const handleFormSubmit = async(e) => {
        e.preventDefault();
        try {
            const submitData = {
                ...formData,
                materials: formData.materials ? formData.materials.split(',').map(m => m.trim()) : [],
                totalWeightInKg: Number(formData.totalWeightInKg),
                totalVolume: Number(formData.totalVolume)
            };
            
            const response = await fetch('http://localhost:4000/api/shipments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(submitData)
            });

            if (response.ok) {
                setShowAddForm(false);
                const fetchResponse = await fetch('http://localhost:4000/api/shipments');
                const data = await fetchResponse.json();
                setTableData(data.allShipmentData);
                extractDropdownOptions(data.allShipmentData);
            }
        }catch(err) {
            console.error("Error submitting shipment:", err);
        }
    }

    const handleCsvFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type === 'text/csv') {
            setCsvFile(file);
            setUploadStatus('');
        } else {
            setUploadStatus('Please select valid CSV file');
        }
    }

    const handleCsvUpload = async(e) => {
        e.preventDefault();
        if (!csvFile) {
            setUploadStatus('Please select a CSV file');
            return;
        }

        try {
            const formDataToSend = new FormData();
            formDataToSend.append('file', csvFile);

            const response = await fetch('http://localhost:4000/api/shipments/upload', {
                method: 'POST',
                body: formDataToSend
            });

            const result = await response.json();
            if (response.ok) {
                setUploadStatus('CSV uploaded successfully!');
                setCsvFile(null);
                setShowCsvUpload(false);
                const fetchResponse = await fetch('http://localhost:4000/api/shipments');
                const data = await fetchResponse.json();
                setTableData(data.allShipmentData);
            } else {
                setUploadStatus('Failed to upload');
            }
        }catch(err) {
            console.error("Error uploading CSV:", err);
            setUploadStatus('Error uploading file');
        }
    }

    const finalTableData = tableData.map((row) => [
        row.source,
        row.destination,
        row.vehicleType,
        row.materialType,
        row.materials ? row.materials.join(', ') : '',
        row.totalWeightInKg,
        row.totalVolume,
        row.groupId
    ]);

    const TableColumns = ['Source', 'Destination', 'Vehicle Type', 'Material Type', 'Materials', 'Total Weight (Kg)', 'Total Volume', 'Group ID'];

    const groupedShipments = {};
    tableData.forEach(shipment => {
        if (!groupedShipments[shipment.groupId]) {
            groupedShipments[shipment.groupId] = [];
        }
        groupedShipments[shipment.groupId].push(shipment);
    });

    const shipmentTableRows = tableData.map((shipment, idx) => ({
        data: finalTableData[idx],
        groupId: shipment.groupId,
        shipmentCount: groupedShipments[shipment.groupId].length
    }));

    const handleRowClick = (rowIndex) => {
        const row = shipmentTableRows[rowIndex];
        handleOpenGroupDetail(row.groupId);
    }

    const handleAddVehicleType = async () => {
        if (!newVehicleInput.trim()) {
            alert('Please enter a vehicle type');
            return;
        }

        if (groupVehicleTypes.includes(newVehicleInput)) {
            alert('This vehicle type already exists');
            return;
        }

        try {
            const updatedVehicleTypes = [...groupVehicleTypes, newVehicleInput];
            const response = await fetch(`http://localhost:4000/api/shipments/group/${selectedGroupDetail.groupId}/types`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    vehicleTypes: updatedVehicleTypes,
                    materialTypes: groupMaterialTypes
                })
            });

            if (response.ok) {
                setGroupVehicleTypes(updatedVehicleTypes);
                setNewVehicleInput('');
            } else {
                alert('Failed to add vehicle type');
            }
        } catch(err) {
            console.error("Error adding vehicle type:", err);
            alert('Error adding vehicle type');
        }
    }

    const handleAddMaterialType = async () => {
        if (!newMaterialInput.trim()) {
            alert('Please enter a material type');
            return;
        }

        if (groupMaterialTypes.includes(newMaterialInput)) {
            alert('This material type already exists');
            return;
        }

        try {
            const updatedMaterialTypes = [...groupMaterialTypes, newMaterialInput];
            const response = await fetch(`http://localhost:4000/api/shipments/group/${selectedGroupDetail.groupId}/types`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    vehicleTypes: groupVehicleTypes,
                    materialTypes: updatedMaterialTypes
                })
            });

            if (response.ok) {
                setGroupMaterialTypes(updatedMaterialTypes);
                setNewMaterialInput('');
            } else {
                alert('Failed to add material type');
            }
        } catch(err) {
            console.error("Error adding material type:", err);
            alert('Error adding material type');
        }
    }

    return(
        <div className="shipment">
            <Hamburger isOpen={isOpen} toggleMenu={toggleMenu} />
            <h1>Shipment Management</h1>
            
            <div className="action-buttons">
                <button type="button" onClick={addShipmentData}>Add Shipment Data</button>
                <button type="button" onClick={handleAddCsv}>Upload CSV</button>
            </div>

            {showAddForm && (
                <form className="shipment-form" onSubmit={handleFormSubmit}>
                    <input 
                        type="text" 
                        name="source" 
                        placeholder="Source" 
                        value={formData.source}
                        onChange={handleFormChange}
                        required
                    />
                    <input 
                        type="text" 
                        name="destination" 
                        placeholder="Destination" 
                        value={formData.destination}
                        onChange={handleFormChange}
                        required
                    />
                    <input 
                        type="text" 
                        name="vehicleType" 
                        placeholder="Vehicle Type" 
                        value={formData.vehicleType}
                        onChange={handleFormChange}
                        required
                    />
                    <input 
                        type="text" 
                        name="materialType" 
                        placeholder="Material Type" 
                        value={formData.materialType}
                        onChange={handleFormChange}
                        required
                    />
                    <input 
                        type="text" 
                        name="materials" 
                        placeholder="Materials (comma separated)" 
                        value={formData.materials}
                        onChange={handleFormChange}
                    />
                    <input 
                        type="number" 
                        name="totalWeightInKg" 
                        placeholder="Total Weight (Kg)" 
                        value={formData.totalWeightInKg}
                        onChange={handleFormChange}
                        required
                    />
                    <input 
                        type="number" 
                        name="totalVolume" 
                        placeholder="Total Volume" 
                        value={formData.totalVolume}
                        onChange={handleFormChange}
                        required
                    />
                    <input 
                        type="text" 
                        name="groupId" 
                        placeholder="Group ID" 
                        value={formData.groupId}
                        onChange={handleFormChange}
                        required
                    />
                    <button type="submit">Submit</button>
                    <button type="button" onClick={() => setShowAddForm(false)}>Cancel</button>
                </form>
            )}

            {showCsvUpload && (
                <form className="csv-upload-form" onSubmit={handleCsvUpload}>
                    <input 
                        type="file" 
                        accept=".csv" 
                        onChange={handleCsvFileChange}
                        required
                    />
                    <button type="submit">Upload CSV</button>
                    <button type="button" onClick={() => setShowCsvUpload(false)}>Cancel</button>
                    {uploadStatus && <p className="upload-status">{uploadStatus}</p>}
                </form>
            )}

            <h2>Shipments List</h2>
            <p className="shipment-hint">Click on any row to view group details</p>
            <div className="shipments-table-wrapper">
                <table className="data-table shipments-table">
                    <thead className='table-heading'>
                        <tr>
                            {TableColumns.map(col => <th key={col}>{col}</th>)}
                        </tr>
                    </thead>
                    <tbody className='table-data'>
                        {shipmentTableRows.map((row, idx) => (
                            <tr 
                                key={idx} 
                                onClick={() => handleRowClick(idx)}
                                className="clickable-row"
                                style={{ cursor: 'pointer' }}
                            >
                                {row.data.map((cell, cellIdx) => (
                                    <td key={cellIdx}>{cell}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showGroupDetail && selectedGroupDetail && (
                <div className="modal-overlay" onClick={handleCloseGroupDetail}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Group Details - {selectedGroupDetail.groupId}</h2>
                            <button className="close-btn" onClick={handleCloseGroupDetail}>×</button>
                        </div>
                        <div className="modal-body">
                            {selectedGroupDetail.shipmentCount === 1 ? (
                                <div className="single-shipment-detail">
                                    <h3>Shipment Details</h3>
                                    {selectedGroupDetail.shipments.map((shipment, idx) => (
                                        <div key={idx} className="detail-section">
                                            <p><strong>Source:</strong> {shipment.source}</p>
                                            <p><strong>Destination:</strong> {shipment.destination}</p>
                                            <p><strong>Vehicle Type:</strong> {shipment.vehicleType}</p>
                                            <p><strong>Material Type:</strong> {shipment.materialType}</p>
                                            <p><strong>Materials:</strong> {shipment.materials ? shipment.materials.join(', ') : 'N/A'}</p>
                                            <p><strong>Total Weight:</strong> {shipment.totalWeightInKg} Kg</p>
                                            <p><strong>Total Volume:</strong> {shipment.totalVolume}</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="multi-shipment-summary">
                                    <h3>Multi-Trip Summary</h3>
                                    <div className="summary-section">
                                        <p>
                                            <strong>Route:</strong> {selectedGroupDetail.shipments[0].source} → {selectedGroupDetail.shipments[selectedGroupDetail.shipmentCount - 1].destination}
                                        </p>
                                        <p><strong>Total Shipments:</strong> {selectedGroupDetail.shipmentCount}</p>
                                        <p>
                                            <strong>Total Weight:</strong> {
                                                selectedGroupDetail.shipments.reduce((sum, s) => sum + s.totalWeightInKg, 0)
                                            } Kg
                                        </p>
                                        <p>
                                            <strong>Total Volume:</strong> {
                                                selectedGroupDetail.shipments.reduce((sum, s) => sum + s.totalVolume, 0)
                                            }
                                        </p>
                                    </div>

                                    <div className="types-management-section">
                                        <h4>Vehicle Types in this Multi-Trip</h4>
                                        <div className="types-list">
                                            {groupVehicleTypes.length > 0 ? (
                                                <ul>
                                                    {groupVehicleTypes.map((vt, idx) => (
                                                        <li key={idx}>{vt}</li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <p className="no-types">No vehicle types added yet</p>
                                            )}
                                        </div>
                                        <div className="add-type-input">
                                            <input 
                                                type="text" 
                                                placeholder="Enter vehicle type" 
                                                value={newVehicleInput}
                                                onChange={(e) => setNewVehicleInput(e.target.value)}
                                                onKeyPress={(e) => e.key === 'Enter' && handleAddVehicleType()}
                                            />
                                            <button className="add-btn" onClick={handleAddVehicleType}>Add Vehicle</button>
                                        </div>

                                        <h4>Material Types in this Multi-Trip</h4>
                                        <div className="types-list">
                                            {groupMaterialTypes.length > 0 ? (
                                                <ul>
                                                    {groupMaterialTypes.map((mt, idx) => (
                                                        <li key={idx}>{mt}</li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <p className="no-types">No material types added yet</p>
                                            )}
                                        </div>
                                        <div className="add-type-input">
                                            <input 
                                                type="text" 
                                                placeholder="Enter material type" 
                                                value={newMaterialInput}
                                                onChange={(e) => setNewMaterialInput(e.target.value)}
                                                onKeyPress={(e) => e.key === 'Enter' && handleAddMaterialType()}
                                            />
                                            <button className="add-btn" onClick={handleAddMaterialType}>Add Material</button>
                                        </div>
                                    </div>
                                    
                                    <h4>Shipment Details</h4>
                                    <table className="data-table detail-table">
                                        <thead className='table-heading'>
                                            <tr>
                                                <th>Source</th>
                                                <th>Destination</th>
                                                <th>Vehicle Type</th>
                                                <th>Material Type</th>
                                                <th>Weight (Kg)</th>
                                                <th>Volume</th>
                                            </tr>
                                        </thead>
                                        <tbody className='table-data'>
                                            {selectedGroupDetail.shipments.map((shipment, idx) => (
                                                <tr key={idx}>
                                                    <td>{shipment.source}</td>
                                                    <td>{shipment.destination}</td>
                                                    <td>{shipment.vehicleType}</td>
                                                    <td>{shipment.materialType}</td>
                                                    <td>{shipment.totalWeightInKg}</td>
                                                    <td>{shipment.totalVolume}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Shipment;


