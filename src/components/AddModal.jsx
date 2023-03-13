import React from 'react'
import { useState } from 'react';
import axios from "axios"

export default function AddModal(props) {
	const {setAddModal,getWords} = props
	const [spanishValue, setSpanishValue] = useState("");				

	function handleSubmit(){
		//validate
		if(spanishValue == ""){
			alert("Ingrese un valor")
			return
		}
		//translate and add
		const input = document.getElementById('newValEs')
		const URL = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=es&tl=it&dt=t&q=${spanishValue}`
		fetch(URL)
			.then((res)=>res.json())
			.then((json)=>{
				let translation = json[0][0][0];
				addNewWord(spanishValue,translation)
				input.value = ""		
			})
		//close
		setAddModal(false)
	}
	//API call
	async function addNewWord (spanishValue,italianValue){
		try {
			const res = await axios.post(process.env.REACT_APP_URI+"/addWord",{
				spanishValue: spanishValue.toUpperCase(),
				italianValue: italianValue.toUpperCase(),
			})				
			getWords()
		} catch (error) {
			console.log({message: error.message})				
		}
	}

	return (
		<section className="modal">
			<div className="flex">
				<h3>Nueva palabra</h3>
				<button className="btn-close" onClick={()=>setAddModal(false)}>⨉</button>
			</div>
			<div className="modal_inputs">
				<input type="text" id="newValEs" onChange={(e)=>setSpanishValue(e.target.value)} />
			</div>
			<button className="btn" onClick={()=>handleSubmit()}>Guardar</button>
		</section>
	)
}
