import React from 'react'
import { PieChart } from 'react-minimal-pie-chart';
const GraphData = ({data, turnOnAnimation, alertMessage}) => {
    
    const shiftSize = 1;
    if(data){
        if (data.length === 0) {
            if(!alertMessage)
                return(<p id="graphData" className="alert alert-info">{`No data, add something!`}</p>);
            else
                return(<p id="graphData" className="alert alert-warning">{alertMessage}</p>);
        }
    }else{
        return(<p>Cargando...</p>);
    }
    const getDataToChart = () => {
        const total = data.reduce((acc, {participation})=>(acc + Number(participation)), 0);
        if (total < 100){
            return [...data,{ value: (100 - total)}]
        }
        return data;
    }
    return (
        <div className="row mt-5" id="graphData">
            <div className="col-sm-12 col-md-6">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <td></td>
                            <td className="text-left">First Name</td>
                            <td className="text-left">Last Name</td>
                            <td>Participation</td>
                        </tr>
                    </thead>
                    <tbody>
                            {data.map((row, i)=>(
                                <tr key={i} >
                                    <td>
                                        { i + 1 }
                                    </td>
                                    <td className="text-left" id={`dataElement${i}`}>{row.firstName}</td>
                                    <td className="text-left">{row.lastName}</td>
                                    <td>{`${row.participation} %`}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
            <div className="col-sm-12 col-md-6 row">
                <div className="col-sm-6">
                    {turnOnAnimation && <PieChart
                        data={getDataToChart()}
                        radius={45}
                        segmentsShift={(index) => (index === 0 ? shiftSize : 0.5)}
                        animate
                        lineWidth={50}
                    />}
                </div>
                <div className="col-sm-6">
                    <ul className="list-unstyled">
                        {data.map(element=>(
                            <li key={element.color} className="d-flex align-self-center">
                                <label className="listColorLabel mr-1" style={{
                                    backgroundColor: `${element.color}`
                                }}></label>
                                <span className="mg-neg">
                                    {`${element.firstName} ${element.lastName} `}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default GraphData;
