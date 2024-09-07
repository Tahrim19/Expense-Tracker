import { useState } from "react";

export function useFilter(dataList,callback) {
    const[query , setQuery] = useState('')
    const filteredData = dataList.filter((data) =>
        callback(data).toLowerCase().includes(query)
    )
    return [filteredData,setQuery]
}


// hook is always exported as export not as export default
// we'll take what we need to filter through callback