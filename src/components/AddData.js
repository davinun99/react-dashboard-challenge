import React, { useState } from 'react'

const AddData = ({afterSubmit, actualData}) => {
    const initialState = {
        firstName: "",
        lastName: "",
        participation: "",
    }
    const [errorMessagge, setErrorMessage] = useState(null);
    const [newData, setNewData] = useState(initialState);
    const handleChange = (e) => {
        setNewData({
            ...newData,
            [e.target.name]: e.target.value
        });
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        const actualSum = actualData.reduce((acc, {participation})=>
            (acc + Number(participation))
        , 0);
        const possibleSum = actualSum + Number(newData.participation);
        if (newData.firstName === '') {
            setErrorMessage(<div className="alert alert-warning col-sm-11 col-md-6"></div>);
        }
        if (newData.lastName === '') {
            setErrorMessage(<div className="alert alert-warning col-sm-11 col-md-6"></div>);
        }
        if ( possibleSum > 100){
            setErrorMessage(<div className="alert alert-warning col-sm-11 col-md-6">The participation's sum should be less than 100</div>);
            setTimeout(() => {
                setErrorMessage(null);
            }, 2200);
        }else{
            afterSubmit(newData);
            setNewData(initialState);
            setErrorMessage(null);
        }
    }
    return (
        <>
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
                        <input className="btn btn-block text-white"
                            type="submit" value="SEND" name="" id="button"
                        />
                    </div>
                </form>
            </header>
            <div className="row justify-content-center mt-3">
                {errorMessagge}
            </div>
        </>
    )
}

export default AddData;
