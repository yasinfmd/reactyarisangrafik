import React from "react";
/*grafik olarak kullanılacak bar componenti*/
const Bar = (props) => {
    return (
        /* Y Ekseninde kaydırmak için */
        <div className="item" style={{
            transform: 'translateY(' + props.rotate + 'px)'
        }}>
            {/*grafik verilerindeki resim*/}
            <img src={props.imageUri}/>
            {/* Bar elemanlarının genişliklerinin en büyük elemana göre değiştirilmesi */}
            <p style={{backgroundColor: props.backgroundcolor, width: props.barwidth}}>
                {/*grafik verilerindeki başlık */}
                {props.bartitle}
            </p>
            <span>
                {/*grafik verilerindeki değer  */}
                <i>{props.barcount}</i>
                    </span>
        </div>
    )
}

export default Bar
