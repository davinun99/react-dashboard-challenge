import React, { useEffect } from 'react';
import { useState } from 'react';
import AddData from './components/AddData';
import GraphData from './components/GraphData';
const App = () => {
    const [animate, setAnimate] = useState(true);
    const getRandomColor = () =>{
        var randomColor = "#000000".replace(/0/g, function () {
            return (~~(Math.random() * 16)).toString(16);
          });
          return randomColor;
    }
    const [data, setData] = useState(null);
    const [alertMessage, setAlertMessage] = useState(null);
    useEffect(()=>{
        const getData = async()=>{
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/data`);
                
                const obj = await response.json();
                let stateData = [];
                stateData = obj.data.map(el=>({
                    ...el,
                    title:`${el.firstName} ${el.lastName}`,
                    value: el.participation,
                    color: getRandomColor()
                }));
                setAlertMessage(null);
                setData(stateData);    
            } catch (error) {
                
                setData([]);
                setAlertMessage('Error retrieving data, please try later');
            }
            
        }
        getData();
        // eslint-disable-next-line
    },[]);
    const addToState = async (element) =>{
        try {
            const requestHeaders = new Headers();
            requestHeaders.append("Content-Type", "application/json");
            const req = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/data`, {
                method: 'POST',
                headers: requestHeaders,
                body: JSON.stringify(element),
                redirect: 'follow'
            });    
            setData([
                ...data,
                {
                    ...element,
                    title: element.firstName,
                    value: Number(element.participation),
                    color: getRandomColor()
                }
            ]);
            setAnimate(false);
            setAnimate(true);
            //console.log(req);
        } catch (error) {
            console.error(error);
            window.location.reload(false);
        }
    }
    
    return (
        <div className="flex-container">
            <AddData afterSubmit={addToState} actualData={data}/>
            <main className="text-center mt-3 container">
                <h1 className="mt-5" id="title1">DATA</h1>
                <p className="mt-3"  id="subtitle1">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <GraphData 
                    data={data}
                    turnOnAnimation={animate}
                    alertMessage={alertMessage}
                />
            </main>
        </div>
    )
}

export default App;