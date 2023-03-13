import React from 'react'
import { useState } from 'react';
import axios from "axios"

export default function EditModal(props) {
	const {setEditModal,getWords,editID} = props
	const [spanishValue, setSpanishValue] = useState(document.getElementById(editID+"_es").innerHTML);				
	const [italianValue, setItalianValue] = useState(document.getElementById(editID+"_it").innerHTML);	

	function closeModal(){
		setEditModal(false)
	}

	function handleSubmit(){
		editWord(editID,spanishValue,italianValue)
		closeModal()
	}
	//API call
	async function editWord (id,spanishValue,italianValue){
		try {			
			const res = await axios.put(process.env.REACT_APP_URI+"/edit/"+id,{
				spanishValue: spanishValue,
				italianValue: italianValue,
			})
			console.log(res)
			getWords()
		} catch (error) {
			console.log({message: error.message})
		}
	}

	return (
		<section className="modal">
			<div className="flex">
				<h3>Editar entrada</h3>
				<button className="btn-close" onClick={()=>closeModal()}>⨉</button>
			</div>
			<div className="modal_inputs">
				<input type="text" id="newValEs" defaultValue={spanishValue} onChange={(e)=>setSpanishValue(e.target.value)} />
				<input type="text" id="newValIt" defaultValue={italianValue} onChange={(e)=>setItalianValue(e.target.value)} />
			</div>
			<button className="btn" onClick={()=>handleSubmit()}>Guardar</button>
		</section>
	)
}
