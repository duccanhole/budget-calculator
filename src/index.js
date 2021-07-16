import React,{useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.css';
//-----------------------Budget Calculator-----------------------
//user can add name and price of item 
//user can delete or clear list of item 
//user can edit data
//check total cost of item
function App(){
    const [value1,setValue1] = useState('');
    const [value2,setValue2] = useState('');
    //declare data of item
    const [data,setData] = useState([]);
    //caculate total cost
    const [total,setTotal] = useState(0);
    //add item to data
    const addItem=(e)=>{
        e.preventDefault();
        //get name and price of item
        let name=value1;
        let price=parseInt(value2);
        if(price<0) {alert('price must be a positive number'); return;}
        let newItem = {
            Name: name,
            Cost: price,
        }
        //caculate total cost
        setTotal(total+newItem.Cost);
        let itemList = data.slice();
        itemList.push(newItem);
        setData(itemList);
        //clear input
        setValue1('');setValue2('');
    }
    //edit the price of item
    const editPrice=(item)=>{
        let price = prompt('change price of item here (price must be positive number)');
        //check iput price
        price=parseInt(price);
        if(isNaN(price)||price<0) return;
        let tmp = data.slice(),position=tmp.indexOf(item),sum=0;
        tmp[position].Cost=price;
        setData(tmp);
        for(let x of data) sum+=x.Cost;
        setTotal(sum);
    }
    //function change name of item
    const editName=(item)=>{
        let name = prompt('change name of item here');
        if(name===''){alert('Name not be empty '); return;}
        let tmp = data.slice(),position=tmp.indexOf(item);
        tmp[position].Name=name;
        setData(tmp);
    }
    const Delete=(item)=>{
        let c = window.confirm("Are you sure?");
        if(c){
            setData(data.filter((thisItem)=>thisItem!==item))
            setTotal(total-item.Cost);
        }
    }
    //clear all data
    const clearAll=()=>{
        if(data===[]) return;
        let c = window.confirm('Clear all data of item?');
        if(c){
            setData([]);
            setTotal(0);
        }
    }
    return(
        <div>
            <form className="form-group m-2 p-2 bg-info" onSubmit={addItem}>
                <div className="d-inline ">
                <input className="d-inline form-control w-25" type="text" onChange={(e) => setValue1(e.target.value)}
                placeholder="name of item" value={value1} required>
                </input>
                <input className="d-inline form-control w-25" type="number" onChange={(e) => setValue2(e.target.value)}
                placeholder="cost of item($)" value={value2} required>
                </input>
                </div>
                <button className="btn btn-success m-2" type="submit">Add item</button>
                <button className="btn btn-warning" onClick={clearAll}>Clear all</button>
            </form>
            <div>
               {data.map((component,id)=>(
                   <div className="bg-secondary m-2">
                       <li className="text-white p-2" key={id}>
                           <b>Item:</b> {component.Name} 
                           <span className="btn btn-sm btn-primary" onClick={()=>editName(component)}>
                           <i class="fa fa-pencil" aria-hidden="true"></i>
                           </span>
                           <b>Price:</b> {component.Cost}$
                           <span className="btn btn-sm btn-primary" onClick={()=>editPrice(component)}>
                            <i class="fa fa-pencil" aria-hidden="true"></i>
                           </span>
                           <span className="btn btn-danger btnDel" onClick={()=>Delete(component)}><i class="fa fa-trash" aria-hidden="true"></i></span>
                        </li>
                   </div>
               ))} 
            </div>
            <hr/>
            <h3 className="container">Total: {total}$</h3>
        </div>
    );
}
export default App;
ReactDOM.render(<App />, document.getElementById('root'));
