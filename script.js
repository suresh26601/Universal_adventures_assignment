let editId = 0

let todos=(localStorage.getItem("mytodos"))?JSON.parse(localStorage.getItem("mytodos")):[];

// ###############
const showTodos=async()=>{
    await localStorage.setItem("mytodos",JSON.stringify(todos));
    document.getElementById("todoListHeading").innerHTML= (todos.length > 0)? "All ToDo List" : "Nothing to display..";
    let allTodos ='';
    todos.forEach((todoEle,ind)=>{
        allTodos+=`<div id="${todoEle.id}">
                        <p> ${todoEle.task}</p>
                        <i class="fa fa-edit" onclick="editBtn(event)"></i>
                        <i class="fa fa-trash" onclick="delBtn(event)"></i>
                    </div>`
    })
    document.querySelector('#art2').innerHTML=allTodos;
}
showTodos();


// ############
const addTodo=()=>{
    let todoInput = document.querySelector('#todoInput');
    if(editId===0){
        if(todoInput.value){
            let todo = {
                id: todos.length>0?todos[todos.length-1].id+1:1,
                task: todoInput.value
            }
            todos = [...todos,todo];
        }
    }
    else{
        todos.forEach(ele=>{
            if (ele.id==editId){
                ele.task = todoInput.value;
            }
        })
        editId=0;

    }
    todoInput.value='';
    showTodos()

}
// ###########

const delBtn = event =>{
    todos=todos.filter((ele)=>{
        return ele.id!==Number(event.target.parentElement.id);
    })
    showTodos();
    
}

// ############
const editBtn = (event )=>{
    editId = Number(event.target.parentElement.id)
    todos.forEach(ele=>{
        if(ele.id==editId){
            document.querySelector('#todoInput').value = ele.task;
        }
    })

}

// ###################
