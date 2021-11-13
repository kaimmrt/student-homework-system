import React, { useState, useEffect } from 'react'
import { Upload, Button } from 'antd';
import { getURL, post } from '../../networking/Server'
import { useSelector } from "react-redux";

const GiveHomework = () => {

    const authUser = useSelector(({ auth }) => auth.authUser);
    const [file, setFile] = useState("")

    const SendHomework = () => {
        post("/api/homework/send-data", {
            file,
            class_id: authUser.class_id
        }).then((res) => {
            window.location.reload()
        })
    }

    return (
        <div className="dashboard-container">
            <Upload
                maxCount={1}
                v
                disabled={false}
                action={getURL() + "api/upload_file/set"}
                headers={{
                    "x-access-token": "Bearer " + localStorage.getItem("token"),
                }}
                onChange={(file) => {
                    setFile(file.file.response.uuid.filename)
                    console.log(file)
                }}
            >
                <Button>Click to Upload</Button>
            </Upload>


            <Button onClick={() => SendHomework()} className="send-homework-btn">
                Send Homework
            </Button>
        </div>
    )
}

export default GiveHomework
