import '../assets/css/Home.css'
import { FaPlus } from "react-icons/fa";
import { IoTimeOutline } from "react-icons/io5";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';


const Home = () => {
    const navigate = useNavigate();


    return (

        <>
            <div className="home">
                <div className="top">
                    <h2>Welcome to TodoApp</h2>
                    <h4>Organize your tasks and boost your productivity</h4>
                    <div className="start">
                        <button style={{ backgroundColor: "black", color: "white" }} onClick={() => navigate("/register")} >Get Started</button>
                        <button style={{ backgroundColor: "white", color: "black", width: "120px", height: "45px", marginLeft: "20px", borderColor: "#555" }}   onClick={() => navigate("/login")}>Sign In</button>
                    </div>
                </div>
                <div className="bottom">
                    <div className="card">
                        <p><FaPlus color='blue' />
                        </p>
                        <h3>Easy Task Creation</h3>
                        <p>Quickly add tasks with titles, descriptions, and due dates</p>
                    </div>
                    <div className="card">
                        <p><IoTimeOutline color='orange' />
                        </p>
                        <h3>Time Management</h3>
                        <p>Set due dates and times to stay on top of your schedule</p>
                    </div>
                    <div className="card">
                        <p><IoCheckmarkCircleOutline color='green' /></p>
                        <h3>Track Progress</h3>
                        <p>Mark tasks as complete and track your productivity</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home