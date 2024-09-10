import { useEffect, useState } from "react";

export function useLocalStorage(key,initialData){
    const [data, setData] = useState(initialData);

    // check if data is already in local storage
    // if(existingData){setData(existingData);} 
    // if do this, too many re-renders error occurs. use it in useEffect so that i doesnt mount too many times
    
    useEffect(()=>{
        // fetch data from local storage
        const existingData = JSON.parse(localStorage.getItem(key));

        if(existingData){
            setData(existingData);
        } 
        else{
            localStorage.setItem(key,JSON.stringify(initialData))
        }
    },[])

    const updateLocalStorage = (newData) => {
        if(typeof newData === 'function'){
            localStorage.setItem(key,JSON.stringify(newData(data)));
        }
        else{
            localStorage.setItem(key,JSON.stringify(newData));
        }
        setData(newData);
    }
    return [data , updateLocalStorage]
}