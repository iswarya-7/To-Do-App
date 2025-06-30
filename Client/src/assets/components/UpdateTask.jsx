import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Row, Col } from 'react-bootstrap';
import './Register.css'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const UpdateTask = ({ show, onHide, task ,refreshTasks}) => {

    // navigate
    const naviagte = useNavigate();
    // get the userId from the localStorage

    const userId = localStorage.getItem("userId");
    console.log("User ID from storage:", localStorage.getItem("userId"));


    let [updateTask, setUpdateTask] = useState({
        title: "",
        description: "",
        dueDate: "",
        dueTime: "",
        user: {
            userId: parseInt(userId) //only the Id here
        }
    })

    // check the task is there if it is use the task value
    useEffect(() => {
        if (task) {
            console.log(task);
            setUpdateTask({
                id: task.id,
                title: task.title,
                description: task.description,
                dueDate: task.dueDate,
                dueTime: task.dueTime,
                userId: parseInt(userId)
            })
        }
    }, [task])

    // form submission for add task
    let handleUpdateTask = (e) => {
        e.preventDefault();

        fetch("http://localhost:8080/users/update", {
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(updateTask)
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
    }


    // useEffect(() => {
    //     // Only run if all required fields are filled
    //     if (
    //         addTask.title &&
    //         addTask.description &&
    //         addTask.dueDate &&
    //         addTask.dueTime &&
    //         addTask.user.userId
    //     ) {
    //         fetch("http://localhost:8080/users/addTask", {
    //             method: "POST",
    //             headers: {
    //                 "Content-type": "application/json"
    //             },
    //             body: JSON.stringify(addTask)
    //         })
    //             .then((response) => {
    //                 if (!response.ok) {
    //                     throw new Error("Failed to add task");
    //                 }
    //                 return response.json();
    //             })
    //             .then((data) => {
    //                 console.log("Task added:", data);
    //                 alert("Successfully Task Added!");
    //                 naviagte('/dashboard');
    //                 setAddTask({
    //                     title: "",
    //                     description: "",
    //                     dueDate: "",
    //                     dueTime: "",
    //                     user: { userId: "" }
    //                 });
    //             })
    //             .catch((err) => {
    //                 alert("Failed to add task");
    //                 console.error(err);
    //             });
    //     }
    // }, []);


    // to other input fields



    let handleClick = (e) => {
        setUpdateTask(
            { ...updateTask, [e.target.name]: e.target.value })
    }


    return (
        <Modal show={show} onHide={onHide} size="md" centered>
            <Modal.Body  >

                <div className="register1">

                    <form action="" method='post' onSubmit={handleUpdateTask}>
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
                            <h3 className='d-flex f-right '>Update Task</h3>
                        </  div>


                        <div className="input-fields">
                            <div className="input">
                                <label htmlFor="name">Title</label>
                                <input type="text" value={updateTask.title} name="title" placeholder='Enter task title' onChange={handleClick} />
                            </div>
                            {/* email */}
                            <div className="input">
                                <label >Description</label>
                                <textarea rows={3} placeholder="Enter Task Description" value={updateTask.description} name="description" onChange={handleClick}></textarea>
                            </div>
                            {/* dueDate and Duetime */}
                            <div className="input">

                                <Row  >
                                    <Col xs={12} md={6} >
                                        <label >Due Date</label>
                                        <input type="date" value={updateTask.dueDate} name="dueDate" onChange={handleClick} />

                                    </Col>
                                    <Col xs={12} md={6}  >
                                        <label >Due Time</label>
                                        <input type="time" name="dueTime" value={updateTask.dueTime} onChange={handleClick} />
                                    </Col>
                                </Row>
                            </div>

                        </div>


                        <div className="submit addTask" >
                            <button type='button' onClick={onHide} >Cancel</button>
                            <button type='submit' >Update Task</button>
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

export default UpdateTask