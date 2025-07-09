# 📝 Full Stack To-Do App (React + Spring Boot)


## 🔑 Features

- 📝 Add and view personal tasks
- ✅ Mark tasks as completed
- 🔐 Login with JWT authentication
- 🔒 Route protection and session management
- 🔁 Secure API communication between frontend and backend
- 🗂️ Proper modular structure
- 📱 Responsive UI

---

## 🛠️ Tech Stack

### 🔷 Frontend (React.js)
- ReactJS with functional components
- React Router for navigation
- Axios and Fetch for HTTP requests
- 📦 Stores token in `localStorage` / `sessionStorage`
- 🚫 Handles session expiry
- CSS for styling
- 📱 Fully responsive design

### 🟦 Backend (Spring Boot)
- Spring Boot (Java)
- Spring Security + JWT
- RESTful APIs for tasks and user authentication
- MySQL (or any RDBMS)
- IntelliJ IDEA as development IDE

---

---

## 📁 Folder Structure

### React Frontend (`client/`)

Todo App/

  ├── client/

     │ ├── public/

     │ ├── src/

     │ │ ├── assets/css/

     │ │ ├── components/

     │ │ ├── App.jsx, index.js, etc.

      │ ├── package.json


### Backend (`server/`)

Todo App/

   ├── server/
   
    │ ├── src/
    
    │ │ ├── main/
    
    │ │ │ ├── java/com/yourapp/
    
    │ │ │ │ ├── controller/
    
    │ │ │ │ ├── model/
    
    │ │ │ │ ├── repository/
    
    │ │ │ │ ├── service/
    
    │ │ │ │ └── config/
    
    │ │ │ └── Application.java
    
    │ │ └── resources/
    
    │ │ └── application.properties
    
    │ ├── pom.xml






## 🧪 How to Run - Frontend

### Step 1: Clone the Repo

git clone https://github.com/iswarya-7/To-Do-App.git
cd "Todo App/client"

### Step 2: Install Dependencies
npm install

### Step 2: Run App
npm run dev






## 🧪 How to Run - Backend


**Backend Setup (Spring Boot using IntelliJ)**

**Step 1:** Open server/ folder in IntelliJ IDEA

**Step 2 :**  Ensure MySQL is running and **application.properties** is properly configured:

spring.datasource.url=jdbc:mysql://localhost:3306/todoapp
spring.datasource.username=root
spring.datasource.password=yourpassword
jwt.secret=yourSecretKey

**Step 3 :**  Click Run 


   



**Sample Outputs :**

**1. 🏠 Home Page**
   
 ![image](https://github.com/user-attachments/assets/10154259-7c88-47aa-a7d6-1c5ef3902d67)



**2.📝 Register Page**

![image](https://github.com/user-attachments/assets/2e44765c-5052-4f9f-92ac-c4e62adea441)



**3. 🔐 Login Page**

 ![image](https://github.com/user-attachments/assets/30bf5edb-8256-49c1-8b3a-1fc3e59be8c5)



**4. 📋 Dashboard**

![Screenshot (602)](https://github.com/user-attachments/assets/82b2611a-737e-4283-a3ef-a95094419be9)




**5.➕ Add/Update Task Modal**


**Add Task**

![image](https://github.com/user-attachments/assets/41a1ee16-ef53-4362-b126-20d855b80c98)


**Update Task**
![Screenshot (604)](https://github.com/user-attachments/assets/1414f31d-e018-4a41-b48e-d0ca4618bdfe)




**6. ✅ Final Dashboard with Tasks**

![image](https://github.com/user-attachments/assets/4692fc71-681b-40df-95d4-37e64a6f8f24)





**🧠 What I Learned**
 - How to create functional components and use React Hooks like useState
 - Managing UI state and props in a React app
 - Using localStorage to persist user data
 - Building responsive layouts using CSS








**About Me**
I'm Iswarya, an aspiring Java Full Stack Developer passionate about building user-friendly web applications.

**GitHub:** @iswarya-7
**LinkedIn:** linkedin.com/in/iswarya28



