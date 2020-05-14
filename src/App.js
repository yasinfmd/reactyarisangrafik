import React, {useContext, useEffect} from 'react';
import './App.css';
import Area from "./components/Area";
import Bar from "./components/Bar";
import {BarDataContext, BigBarDataContext, YearDataContext} from "./Store"
/* kullanılacak componentlerin import edilmesi */

/*storeda kullanılacak dataların import edilmesi*/

/*ilgili react hooklarının import edilmesi*/
function App() {
    /*grafik verilerinin context üzerinden alınması*/
    const [barData, setBarData] = useContext(BarDataContext)

    /*grafik yıllarının context üzerinden alınması*/
    const [yearData, setYearData] = useContext(YearDataContext)
    /*en büyük grafik değernini context üzerinden alınması*/
    const [biggestBarData, setBiggestBardData] = useContext(BigBarDataContext)
    useEffect(function () {
        /*grafik değeri ve yıl değiştiğinde render edilmesi*/
        let timerId;
        /*timer tanımlanması yıl varsayılan olarak 2010 dan başlayıp 2020 gelmektedir*/

        /*yıl bu yıla geldi ise timerin durdurulması*/
        if (yearData === +new Date().toLocaleDateString().split(".")[2]) {
            clearInterval(timerId);
        } else {
            /*timerin çalıştırılması her 1  saniyede*/
            timerId = setInterval(() => {
                /*grafik verilerinin değiştirilmesi*/
                setBarDataWithRandomNumber()
                /*yılın değiştirilmesi*/
                setYearData(yearData + 1)
            }, 1000);
        }
        return () => clearInterval(timerId);
    }, [barData, yearData])

    const setBarDataWithRandomNumber = () => {
        /*mevcut datanın örneğinin tutmaması için JSON.parse JSON.stringy yapıldı*/
        let data = JSON.parse(JSON.stringify(barData));
        /*veriler üzerinde dönerek her elemanın değerine rast gele numaralar gelecek şekilde artırma işleminin yapılması*/
        data.forEach((barItem) => {
            barItem.value += getRandomNumber()
        })
        /*verilerin güncellenmesi*/
        setBarData(data)
    }
    /*grafik değerlerinin rast gele değişimi için sayı üretilmesi*/
    const getRandomNumber = () => {
        return Math.floor(Math.random() * 30 + 1)
    }
    /*grafik elemanlarının render edilmesi*/
    const renderBarItem = (barItem, index) => {
        /* her bir elemano en büyük elemana göre konumlandırmak için oranının bulunması*/
        let rate = barItem.value / biggestBarData

        /*bulunan oranı Area componentinin  genişliğinin(800px) yarısı ile çarpımı*/
        let barWidth = rate * 400;

        /*bar componentnini animasyonlu olarak y eksenin de hareket etmektedir
        * bunun için gelen her elemanı ilk elemana 10 birim padding şeklinde
        * diğer eleman barların genişliği (50px) + 10 a birim şeklinde birbiri arasındaki uzaklık hesaplanması*/
        /*componente ilgili parametrelerin verilmesi*/
        return (
            <Bar key={barItem.id} bartitle={barItem.title}
                 barwidth={barWidth + 'px'}
                 rotate={index === 0 ? 10 : (index * 50) + 10}
                 imageUri={barItem.imageUri}
                 backgroundcolor={barItem.color}
                 barcount={barItem.value}></Bar>
        )
    }


    return (

        <Area>
            {/*Yılların gösterimi*/}
            <p className="year">{yearData}</p>
            {/*grafik datasının render edilmesi*/}
            {barData.map((barItem, index) => renderBarItem(barItem, index))}
        </Area>
    )
}

export default App
