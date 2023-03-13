import axios from "axios"
import { useState,useEffect } from 'react';
import AddModal from "./components/AddModal";
import EditModal from "./components/EditModal";
import sortTable from "./utils/sortTable";


function App() {
	//==== CONSTANTS
	const addInput = document.getElementById('addInput')

	//==== STATES
	const [words, setWords] = useState([]);				
	const [editModal, setEditModal] = useState(false);				
	const [addModal, setAddModal] = useState(false);				
	const [editID, setEditID] = useState("");				

	//==== GET ALL WORDS
	 async function getWords() {
	 	try {		
	 		const res = await axios.get(process.env.REACT_APP_URI+"getWords")
	 		setWords(res.data)
	 	} catch (error) {
	 		console.log({message: error.message})
	 	}
	 }

	//==== CREATE REGISTER
	const handleNewValue = ()=>{
		setAddModal(true)
	}

	//==== DELETE REGISTER
	const deleteRecord = async (id) => {
		try {			
			const res = await axios.delete(process.env.REACT_APP_URI+"delete/"+id)
			console.log(res)
			getWords()
		} catch (error) {
			console.log({message: error.message})
		}

	}
	
	//==== EFFECTS
	useEffect(()=>{
		getWords()
	},[])

	useEffect(()=>{
		sortTable(0)
	},[words])

	//==== MODAL

	console.log("words",words);
  return (
    <div className="App">
			{editModal ? <EditModal setEditModal = {setEditModal} getWords={getWords} editID={editID} /> : ""}
			{addModal ? <AddModal setAddModal = {setAddModal} getWords={getWords} /> : ""}
			{addModal||editModal ? <div className="overlay"></div> : ""}
			<div className="container">
				<div className="addSection">
					<button className="btn " id="addButton" onClick={()=>handleNewValue()}>+ Nueva palabra</button>
				</div>
				<div className="table_container">
							<table className="table" id="table">
								<thead className="table-primary">
									<tr>
										<th>Español</th>
										<th>Italiano</th>
										<th>Actions</th>
									</tr>
								</thead>
								<tbody>
									{words.map((word)=>{
										console.log(word);
										return(
											<tr key={word._id}>
												<td className="spanishValue" id={word._id+"_es"}>
													{word.spanishValue}
												</td>
												<td className="italianValue" id={word._id+"_it"}>
													{word.italianValue}
												</td>
												<td className="actions_td">
													<button id={word._id+"_editBtn"} className="action_btn btn-open" onClick={()=>{setEditID(word._id);setEditModal(true)}}>Editar</button>
													<button id={word._id+"_deleteBtn"} className="action_btn" onClick={()=>deleteRecord(word._id)}>Eliminar</button>
												</td>
											</tr>
										)
									})}
								</tbody>
							</table>
				</div>
			</div>
    </div>
  );
}

export default App;
