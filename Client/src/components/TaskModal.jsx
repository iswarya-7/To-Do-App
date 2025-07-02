import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Row, Col } from 'react-bootstrap';
import '../assets/css/Register.css'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const TaskModal = ({ show, onHide, refreshTasks, mode, task }) => {

    // navigate
    const naviagte = useNavigate();
    // get the userId from the localStorage

    const userId = localStorage.getItem("userId");

    console.log("User ID from storage:", localStorage.getItem("userId"));

    let [tasks, setTasks] = useState({
        title: "",
        description: "",
        dueDate: "",
        dueTime: "",
        user: {
            userId: parseInt(userId) //only the Id here
        }
    })

    useEffect(() => {

        if (mode == 'edit' && task) {
            setTasks({
                id: task.id,
                title: task.title,
                description: task.description,
                dueDate: task.dueDate,
                dueTime: task.dueTime,
                user: {
                    userId: parseInt(userId)
                }
            })
        }
        else {
            setTasks({
                title: "",
                description: "",
                dueDate: "",
                dueTime: "",
                user: {
                    userId: parseInt(userId) //only the Id here
                }
            })
        }
    }, [mode, show, onHide])




    // form submission for add and update
    let handleSubmit = (e) => {
        e.preventDefault();


        if (mode === 'edit') {
            fetch("http://localhost:8080/users/update", {
                method: "PUT",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(tasks)
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Failed to add task");
                    }
                    return response.json();
                })
                .then((data) => {
                    console.log("Updated Data:", data);
                    alert("Successfully Task Updated !");
                    onHide();
                    refreshTasks(); // refresh UI
                    naviagte('/dashboard');
                    // store user or token in localStorage if needed
                    // localStorage.setItem("user", JSON.stringify(data));
                })
                .catch((err) => {
                    alert("Failed to add task");
                    console.error(err);
                });
        } else {
            fetch("http://localhost:8080/users/addTask", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(tasks)
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Failed to add task");
                    }
                    return response.json();
                })
                .then((data) => {
                    console.log("Login success:", data);
                    alert("Successfully Task Added !");
                    refreshTasks();
                    onHide();
                    naviagte('/dashboard');
                    setTasks({
                        title: "",
                        description: "",
                        dueDate: "",
                        dueTime: "",
                        user: {
                            userId: parseInt(localStorage.getItem("userId")) //  Reuse the actual ID
                        }
                    });

                    // store user or token in localStorage if needed
                    // localStorage.setItem("user", JSON.stringify(data));
                })
                .catch((err) => {
                    alert("Failed to add task");
                    console.error(err);
                });
        }


    }


    let handleClick = (e) => {
        setTasks(
            { ...tasks, [e.target.name]: e.target.value })
    }




    return (
        <Modal show={show} onHide={onHide} size="md" centered>
            <Modal.Body  >

                <div className="register1">

                    <form method='post' onSubmit={handleSubmit}>
                        {/* close button */}
                        <div className="d-flex justify-content-end">
                            <button
                                type="button"
                                className="btn-close"
                                aria-label="Close"
                                onClick={onHide}
                            ></button>
                        </div>

                        <div className="form_head">
                            <h3 className='d-flex f-right '> {mode === 'edit' ? "Update Task" : "Add New Task"}    </h3>
                        </  div>


                        <div className="input-fields">
                            <div className="input">
                                <label htmlFor="name">Title</label>
                                <input type="text"
                                    value={tasks.title}
                                    name="title"
                                    placeholder='Enter task title'
                                    onChange={handleClick} />
                            </div>
                            {/* email */}
                            <div className="input">
                                <label >Description</label>
                                <textarea rows={3} placeholder="Enter Task Description" value={tasks.description} name="description" onChange={handleClick}></textarea>
                            </div>
                            {/* dueDate and Duetime */}
                            <div className="input">

                                <Row  >
                                    <Col xs={12} md={6} >
                                        <label >Due Date</label>
                                        <input type="date"
                                            value={tasks.dueDate}
                                            name="dueDate"
                                            onChange={handleClick} />

                                    </Col>
                                    <Col xs={12} md={6}  >
                                        <label >Due Time</label>
                                        <input
                                            type="time"
                                            name="dueTime"
                                            value={tasks.dueTime}
                                            onChange={handleClick} />
                                    </Col>
                                </Row>
                            </div>

                        </div>


                        <div className="submit addTask" >
                            <button type='button' onClick={onHide} >Cancel</button>
                            <button type='submit' >{mode === 'edit' ? "Update Task" : "Add Task"}   </button>
                        </div>

                    </form>
                </div>
            </Modal.Body>
            {/* <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer> */}
        </Modal>
    );

}

export default TaskModal