import React,{useState} from 'react'
import { useAtom } from 'jotai'
import { shoppingListAtom } from '../lib/store'
import uniqid from "uniqid"

const ShoppingList = () => {
    const [item, setItem] = useState('');
    const [id, setId] = useState('')
    const [itemForUpdate, setItemForUpdate] = useState('')
    const [shoppingList, setShoppingList] = useAtom(shoppingListAtom);
    const addItem = () =>{
        if(item){
            setShoppingList((prevValue => [...prevValue, {id:uniqid(),item:item}]));
            setItem("")
        }
    }
    const getItem = (id) =>{
        const list = shoppingList.filter(item => item.id ===id)
        setItemForUpdate(list[0].item);
        setId(id)
    }

    const updateItem = () =>{
        const index = shoppingList.findIndex(item => item.id === id);
        shoppingList[index].item = itemForUpdate;
        setShoppingList([...shoppingList])
        setItemForUpdate('')
    }

    const deleteItem = (id) =>{
        const updatedItems = shoppingList.filter(item => item.id !== id);
        setShoppingList(updatedItems)
    }

    return (
    <>
    <div>
        <input type="text" value={item} onChange={(e) => setItem(e.target.value)} />
        <button onClick={addItem}>add item</button>
        <div>
            <input type="text" value={itemForUpdate} onChange={(e) => setItemForUpdate(e.target.value)} />
            <button onClick={updateItem}>update</button>
        </div>
    </div>
    {shoppingList.map((item,index) =>(
        <div key={index}>
            <li>{item.item}</li>
            <span><button onClick={() => getItem(item.id)}>update</button></span>
            <span><button onClick={()=>deleteItem(item.id)}>delete</button></span>
        </div>
    ))}
    </>
  )
}

export default ShoppingList