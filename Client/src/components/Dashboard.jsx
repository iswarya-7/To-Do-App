import { useEffect, useState } from 'react'
import { FaPlus } from "react-icons/fa6";
import { MdOutlinePersonOutline } from "react-icons/md";
import { IoLogOutOutline } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { CiCalendar } from "react-icons/ci";
import { IoMdTime } from "react-icons/io";
import Button from 'react-bootstrap/Button';
import './Dashboard.css'
import TaskModal from './TaskModal';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {

    const navigate = useNavigate();

    let addTaskbtn = {
        // backgroundColor: "black",
        height: "100px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        margin: "20px",
        lineHeight: "10px",
        cursor: "pointer"
    }

    // get the token 
    const token = sessionStorage.getItem("token");


    // state for add task modal
    const [modalAddShow, setModalAddShow] = useState(false);
    const [modalUpdateShow, setModalUpdateShow] = useState(false);

    // user data storing
    const userName = sessionStorage.getItem("userName");
    const userId = sessionStorage.getItem("userId");
    let [selectedTask, setSelectedTask] = useState(null);

    // state for storing taskData
    let [taskDatas, SetTaskDatas] = useState([])
    let [error, setError] = useState("")



    //set the dashboard timeout
    useEffect(() => {
        const timeout = setTimeout(() => {
            localStorage.clear();
            sessionStorage.clear();
            alert("Session expired. Please log in again.");
            navigate('/login');
        }, 5 * 60 * 1000); // 5 minutes

        return () => clearTimeout(timeout);
    }, []);



    




    // state for counting the all,pending,completed tasks
    // to retrieve the data
    useEffect(() => {
        fetch(`http://localhost:8080/users/task/${userId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                if (response.status === 401) {
                        alert("Session expired. Please log in again.");
                        sessionStorage.clear();
                        localStorage.clear();
                        navigate('/login');
                        // STOP the chain!
                        throw new Error("Unauthorized");
                    }
                return response.json()
            })
            .then((data) => SetTaskDatas(data))
            .catch((error) => setError(error.message))

    }, [])



    // handle Update
    // used to refresh the data after updating the value
    const refreshTasks = () => {
        fetch(`http://localhost:8080/users/task/${userId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                if (response.status === 401) {
                        alert("Session expired. Please log in again.");
                        sessionStorage.clear();
                        localStorage.clear();
                        navigate('/login');
                        // STOP the chain!
                        throw new Error("Unauthorized");
                    }
                return response.json()
            })
            .then((data) => SetTaskDatas(data))
            .catch((error) => setError(error.message));
    };

    console.log(taskDatas);

    let handleComplete = (taskId) => {
        axios.put(`http://localhost:8080/task/updateStatus/${taskId}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                if (res.status === 401) {
                    alert("Session expired. Please log in again.");
                    sessionStorage.clear();
                    localStorage.clear();
                    navigate('/login');
                    // STOP the chain!
                    throw new Error("Unauthorized");
                }

                alert("Task marked as completed");
                refreshTasks(); // reloads latest task list
            })
            .catch((err) => {
                if (err.message !== "Unauthorized") {
                    alert("Failed to Updating Status");
                }
                console.error("Error updating status", err.message);
            });
    }

    //  handle logout
    let handleLogout = () => {
        localStorage.clear();
        alert("Logged out successfully !");
        navigate('/')
    }


    // task count storing
    const totalTasks = taskDatas.length;
    const pendingTasks = taskDatas.filter(task => task.status === "Pending").length;
    const completedTasks = taskDatas.filter(task => task.status === "Completed").length;


    const handleDelete = (taskId) => {
        fetch(`http://localhost:8080/users/deleteTask/${taskId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {

                if (response.status === 401) {
                    alert("Session expired. Please log in again.");
                    sessionStorage.clear();
                    localStorage.clear();
                    navigate('/login');
                    // STOP the chain!
                    throw new Error("Unauthorized");
                }
                // return response.json()

                if (!response.ok) {
                    throw new Error("Failed to delete task");
                }
                return response.text();
            })
            .then(() => {
                alert("Task deleted successfully");

                // Update UI after delete
                SetTaskDatas((prevTasks) => prevTasks.filter(task => task.id !== taskId));
            })
            .catch((error) => {
                if (err.message !== "Unauthorized") {
                    alert("Failed to Delete task");
                }
                console.error("Error deleting task:", error.message);
            });
    }

    return (
        <>
            <div className="main-dashboard">
                <div className="header">
                    <h3>ToDo Dashboard</h3>

                    <div className="right">

                        {/* modal for add task btn */}
                        <Button onClick={() => {
                            setModalAddShow(true)
                        }}>
                            <FaPlus /> Add Task
                        </Button>
                        <TaskModal
                            show={modalAddShow}
                            onHide={() => setModalAddShow(false)}
                            refreshTasks={refreshTasks}
                            mode='add'
                        />


                        {/* <button type='button' className='btn' > */}

                        {/* </button> */}
                        <button type='button' className='btn' onClick={handleLogout}>
                            <IoLogOutOutline />
                        </button>

                        <span style={{ marginLeft: "20px", color: "red", fontSize: "18px", fontWeight: "500" }}>
                            <MdOutlinePersonOutline />
                            {userName}
                        </span>
                    </div>
                </div>
                <div className="chart">
                    <div className="count-card">
                        <h5>Total Tasks</h5>
                        <h4>{totalTasks}</h4>
                    </div>
                    <div className="count-card">
                        <h5>Completed</h5>
                        <h4>{completedTasks}</h4>
                    </div>
                    <div className="count-card">
                        <h5>Pending</h5>
                        <h4>{pendingTasks}</h4>
                    </div>
                </div>

                <div className="tasks">
                    <h4>Your Tasks</h4>
                    {taskDatas.length === 0 && (
                        <div style={addTaskbtn}>
                            <p>Click the <strong>"Add Task"</strong> button to create your first task and get started!</p>
                            <Button style={{ backgroundColor: "black", color: "white", border: "none" }} onClick={() => {
                                setModalAddShow(true);
                            }}>
                                <FaPlus /> Add Task
                            </Button>
                        </div>
                    )}




                    {console.log("Task:", taskDatas)}
                    {taskDatas.map((taskData, index) => (
                        <div className="task" key={index}>
                            <div className='task-card'>
                                <div className='task-center'>
                                    <div className="task-top-left" >
                                        <h4 ><span>#{index + 1}</span></h4>
                                        <h3
                                            style={{
                                                textDecoration: taskData.status === "Completed" ? "line-through" : "none"
                                            }}><span style={{ color: "black" }} >{taskData.title}</span></h3>
                                        <h3>
                                            <span style={{
                                                backgroundColor: taskData.status === "Completed" ? "#d4edda" : "#fff3cd",  // light green or light yellow
                                                color: taskData.status === "Completed" ? "#155724" : "#856404",           // dark green or dark yellow
                                                padding: "4px 10px",
                                                borderRadius: "20px",
                                                fontWeight: "600",
                                                fontSize: "13px",
                                                display: "inline-block",
                                                minWidth: "80px",
                                                textAlign: "center",
                                            }}>
                                                {taskData.status}
                                            </span>
                                        </h3>



                                    </div>
                                    <div className="options">
                                        {/* Mark complete task */}
                                        <button type='button' style={{ width: "max-content", height: "max-content", padding: "10px 10px" }} onClick={() => { handleComplete(taskData.id); }}>{taskData.status === "Pending" ? "Mark Complete" : "Task Completed"}</button>

                                        {/* Edit button */}
                                        <Button style={{ width: "max-content", height: "max-content", padding: "8px 8px" }} onClick={() => {
                                            setSelectedTask(taskData);
                                            setModalUpdateShow(true);
                                        }}>
                                            <FaRegEdit style={{ height: "16px", width: "20px" }} />

                                        </Button>



                                        {/* Delete button*/}
                                        <Button style={{ width: "max-content", height: "max-content", padding: "8px 8px" }} onClick={() => handleDelete(taskData.id)}>
                                            <MdOutlineDelete color='red' style={{ height: "16px", width: "20px" }} />
                                        </Button>
                                    </div>
                                </div>

                                <div className="desc">
                                    <h5>{taskData.description}</h5>
                                    <div className='date'>
                                        <h5><CiCalendar /> {taskData.dueDate}</h5>
                                        <h5><IoMdTime /> {taskData.dueTime}</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}


                </div>

                <TaskModal
                    show={modalUpdateShow}
                    onHide={() => setModalUpdateShow(false)}
                    task={selectedTask}
                    refreshTasks={refreshTasks}
                    mode='edit'
                />
            </div >
        </>
    )
}


export default Dashboard