import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { post, getURL } from '../../networking/Server'
import { Upload, Button } from 'antd';
import { useSelector } from "react-redux";

const UploadHomework = () => {
    const authUser = useSelector(({ auth }) => auth.authUser);

    const [data, setData] = useState("")
    const [user_homework_data, setUserHomeworkData] = useState("")
    const [file, setFile] = useState("")

    const { homework_id } = useParams();

    const FetchHomework = () => {
        post(`/api/homework/homework`, {
            homework_id
        }).then((res) => {
            setData(res)
            console.log(res.file)
        })
    }

    const FetchHomeworkStudent = () => {
        post(`/api/homework/homework-student`, {
            homework_id
        }).then((res) => {
            setUserHomeworkData(res)
        })
    }

    const SendHomework = () => {
        post("/api/homework/homework-student/send-data", {
            file,
            homework_id,
        }).then((res) => {
            window.location.reload()
        })
    }

    useEffect(() => {
        FetchHomeworkStudent()
        FetchHomework()
    }, [])


    return (
        <div className="dashboard-container" style={{ display: 'flex', justifyContent: 'space-between', paddingRight: 200 }}>
            <div>
                <h3>Homework file uploaded by the teacher</h3>
                <img src={data.file} alt="" style={{ width: 300, height: 300 }} />
            </div>

            <div>
                <div>
                    <h3>Student uploaded homework</h3>
                    {
                        user_homework_data != ""
                            ?

                            <img src={getURL() + "uploads/" + user_homework_data.file} alt="" style={{ width: 300, height: 300 }} />
                            : null
                    }
                </div>

                {authUser.user_type_id == 3 ?
                    <div>
                        <Upload
                            maxCount={1}
                            disabled={false}
                            action={getURL() + "api/upload_file/set"}
                            headers={{
                                "x-access-token": "Bearer " + localStorage.getItem("token"),
                            }}
                            onChange={(file) => {
                                if (file.file.response) {
                                    setFile(file.file.response.uuid.filename)
                                }

                            }}
                        >
                            <Button>Click to Upload</Button>
                        </Upload>


                        <Button onClick={() => SendHomework()} className="send-homework-btn">
                            Send Homework
                        </Button>
                    </div>
                    :
                    null
                }

            </div>

        </div>
    )
}

export default UploadHomework
