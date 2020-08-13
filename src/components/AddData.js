import React, { useState } from 'react'

const AddData = ({afterSubmit, actualData}) => {
    const initialState = {
        firstName: "",
        lastName: "",
        participation: "",
    }
    const[errorMessagge, setErrorMessage] = useState(null);
    const [newData, setNewData] = useState(initialState);
    const handleChange = (e) => {
        setNewData({
            ...newData,
            [e.target.name]: e.target.value
        });
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log(actualData);
        const actualSum = actualData.reduce((acc, {participation})=>
            (acc + Number(participation))
        , 0);
        const possibleSum = actualSum + Number(newData.participation);
        console.log(possibleSum);
        if ( possibleSum > 100){
            setErrorMessage(<div className="custonInvalid">La suma final debe ser menor a 100</div>);
        }else{
            afterSubmit(newData);
            setNewData(initialState);
            setErrorMessage(null);
        }
    }
    return (
        <header className="justify-content-center">
            <form className="container h-100" onSubmit={handleSubmit}>
                <div className="d-flex justify-content-center h-100 d-flex align-items-center">
                    <input name="firstName" className="mr-sm-1 mr-md-3 form-control textInput" value={newData.firstName}
                        placeholder="First name" type="text" onChange={handleChange} required
                    />
                    <input name="lastName" className="mr-sm-1 mr-md-3 form-control textInput" value={newData.lastName} 
                        placeholder="Last name" type="text" onChange={handleChange} required
                    />
                    <input name="participation" className="mr-sm-1 mr-md-3 form-control textInput" value={newData.participation}
                        placeholder="Participation" type="number" onChange={handleChange} required max={100}
                    />
                        {errorMessagge}
                    <input className="btn btn-block text-white" type="submit" value="SEND" name="" id="button"/>
                </div>
            </form>
        </header>
    )
}

export default AddData;
