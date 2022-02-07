import React from 'react';
import axios from 'axios'
function Todo() {
    const [isLoding, setIsLoding] = React.useState(false)
    const[body,setBody] = React.useState('')
    const [isError, setIsError] = React.useState(false)
    const [data, setData] = React.useState([])
    const [page, setPage] = React.useState(1)
    const [title,setTitle] = React.useState('')
    React.useEffect(() => {
        getTodo(page)
    }, [page]);

    const getTodo = (page=1) => { 
        setIsLoding(true)
      return fetch(`https://gopi-server.herokuapp.com/tasks?_page=${page}&_limit=2`).then((res) => res.json()).then((res) => { 
            setData(res)
        })
        .catch((err) => setIsError(true))
        
        .finally(() => { 
                setIsLoding(false)
         })
    }
    
    const addTodo = (title,body) => {
        const newTodo = {title,body}
        setIsLoding(true)
     return  fetch('https://gopi-server.herokuapp.com/tasks', {
            method: 'POST',
            headers: {
                "Content-Type":"application/json"
            },
            body:JSON.stringify(newTodo)
        }).then((res) => res.json()).then((res) => { 
            console.log(res)
            return getTodo()
        })
        .catch((err) => setIsError(true))
        
        .finally(() => { 
                setIsLoding(false)
         })
    }

    const  deletTodo = (id) =>{ 
        axios.delete(`https://gopi-server.herokuapp.com/tasks/${id}`).then(res => { 
            return getTodo()
        })
    }

    return isLoding ? (<div>Loding...</div>) : isError ? (<div>something went wron</div>) : (
        <div>
            <div>
                <h1 className='title'>Todo...</h1>
               <input value={title} type="text" onChange={(e)=>setTitle(e.target.value)} className="inputTitle" placeholder="Title..."/> 
                <input type="text" value={body} onChange={(e)=>setBody(e.target.value)}placeholder="Add Task..." className="inputBody"/>
                <button onClick={() => addTodo({title,body})}>Add</button>
            </div>
            <ul>
                {data.map((item) => { 
                    return <div key={item.id}>
                    <li >
                        {`${item.title.title} - ${item.title.body}`}
                    </li>
                       <span><button onClick={() => deletTodo(item.id)}>delete</button></span> 
                    </div>
                }
                )}
            </ul>
            <button className='pre' disabled={ page < 1} onClick={()=>setPage(page+1)}>pre</button>
        </div>
    )
}

export default Todo;
