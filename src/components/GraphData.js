import React from 'react'
import { PieChart } from 'react-minimal-pie-chart';
const GraphData = ({data, turnOnAnimation}) => {
    
    const shiftSize = 1;
    return (
        <div className="row mt-5">
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
                                <tr key={i}>
                                    <td>
                                        { i + 1 }
                                    </td>
                                    <td className="text-left">{row.firstName}</td>
                                    <td className="text-left">{row.lastName}</td>
                                    <td>{`${row.participation} %`}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
            <div className="col-sm-12 col-md-6 row">
                <div className="col-sm-6">
                    <PieChart
                        data={data}
                        radius={45}
                        segmentsShift={(index) => (index === 0 ? shiftSize : 0.5)}
                        animate={turnOnAnimation}
                        lineWidth={50}
                    />
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
