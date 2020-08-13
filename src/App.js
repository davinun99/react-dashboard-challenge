import React from 'react';
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
    const [data, setData] = useState([
        { firstName: "David", lastName: "Nuñez", participation: 30, title: "David", value: 30, color:getRandomColor() },
        { firstName: "Vero", lastName: "Almiron", participation: 50, title: "Vero", value: 50, color:getRandomColor()  },
    ]);
    
    const addToState = (element) =>{
        setData([
            ...data,
            {
                ...element,
                title: element.firstName,
                value: Number(element.participation),
                color: getRandomColor()
            }
        ])
        setAnimate(true);
    }
    
    return (
        <div className="flex-container">
            <AddData afterSubmit={addToState} actualData={data}/>
            <main className="text-center mt-3 container">
                <h1 className="mt-5">DATA</h1>
                <p className="mt-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
                <GraphData 
                    data={data}
                    turnOnAnimation={animate}
                />
                    
                
            </main>
        </div>
    )
}

export default App;