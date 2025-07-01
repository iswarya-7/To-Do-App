import React from 'react'

let notFound = {
    backgroundColor: "white",
    width: "100%",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    paddingTop: "50px"
}

const NotFound = () => {
    return (
        <>
            <div style={notFound}>
                <h2 style={{ color: "black", fontWeight: "bold" }}>404 - Page Not Found</h2>
            </div>
        </>
    )
}

export default NotFound