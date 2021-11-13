import React, { useState, useEffect } from 'react'
import { post } from '../../networking/Server'
import { AiOutlineArrowRight } from 'react-icons/ai';
import { useHistory } from 'react-router-dom';

const ClassList = () => {
    const history = useHistory()

    const [data, setData] = useState([])

    const FetchClassList = () => {
        post("/api/class/class-list", {

        }).then(res => {
            setData(res)
        })
    }

    useEffect(() => {
        FetchClassList()
    }, [])


    return (
        <div className="dashboard-container">
            {data.map((value, index) => (
                <div className="table" key={index}>
                    <h1> {value.class_name}</h1>
                    <AiOutlineArrowRight className="table-icon" onClick={() => history.push(`../class/${value.class_id}`)} />
                </div>
            ))}

        </div>
    )
}

export default ClassList
