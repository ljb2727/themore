import React,{ useState, useRef, useEffect } from 'react';
import "./damoa.css";

const Damoa = ()=>{
    const [text, setValue] = useState("");
    const [list, setList] = useState([]);
    const nameInput = useRef();
    const onChange = (e)=>{
        setValue(e.target.value)
    }
    const onKeyDown = (e)=>{
        if(e.key === "Enter"){
            showList()
        }
    }
    const showList = ()=>{
        //console.log(text);
        const object = []
        for (let i=1; i<=20; i++){
            const price = i*Number(text);
            const saveValue = ()=>{
                if(price - 5000 >= 0){
                    return Number(String(price - 5000).substr(-3))
                }else{
                    return 0;
                }
            }
            object.push({liter:i, price:price, save:saveValue(), percent:Math.floor((saveValue() / price * 10000)) / 100})
        }
        const sortObject = object.sort((a,b)=>{
            return b.percent - a.percent
        })
        //console.log(sortObject);
        setList(sortObject);
    };
    
    const reset = ()=>{
        console.log("reset");
        setList([]);
        setValue("");
        nameInput.current.focus();
    };

    const DamoaList = ({saveList}) =>{
        return (
            <>
                {saveList.map(({liter,price,save,percent},i) => (
                    <tr key={i}>
                        <td>{liter}리터</td>
                        <td>{price}원</td>
                        <td>{save}원</td>
                        <td>{percent}%</td>
                    </tr>
                ))}
            </>
        )
    }

   

    const showHide = !list.length ? "hide" : "" 

    return (
        <div>
            <div className="container">
                <input type="tel" value={text} onChange={onChange} onKeyDown={onKeyDown} ref={nameInput}/>
                <button onClick={showList}>check</button>
            </div>
            <div className={showHide}>
                <table>
                    <thead>
                        <tr>
                            <th>리터</th>
                            <th>총금액</th>
                            <th>적립액</th>
                            <th>적립률</th>
                        </tr>
                    </thead>
                    <tbody>
                        <DamoaList saveList={list}/>
                    </tbody>
                </table>
                <button onClick={reset}>reset</button>
            </div>
        </div>
    )
}

export default Damoa;