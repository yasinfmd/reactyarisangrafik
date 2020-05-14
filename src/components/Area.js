import React from "react";

//grafik alanını props olarak gelen elemenlerin div içine yerleştirmesi
const Area = (props) => {
    return (
        <div className="area">
            {props.children}
        </div>
    )
}

export default Area
