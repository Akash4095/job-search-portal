import React from 'react'

const ShowNotification = ({notifyData}) => {
    return (
        <div style={{ width: "35vw" }}>
            {
                (notifyData && notifyData.length > 0) ? notifyData.map((item) => {
                    return (
                        <div>{item.notifytext}</div>
                    )
                }) : <div>{"No Notifications Found"}</div>
            }
        </div>
    )
}

export default ShowNotification