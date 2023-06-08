import React, { Component } from 'react'
import "./TodoApp.css";
export  class TodoApp extends Component {
  state={
    input:"",
    items:[],
    selectedTodo:null,
    editMode:false,
    editIndex:null,
  };
  handleChange=(event )=>{
    this.setState({
      input:event.target.value
    })
  };
  editItem = (index) => {
    const { items } = this.state;
    const selectedTodo = items[index];
    this.setState({
      selectedTodo,
      editMode: true,
      editIndex: index
    });
  };

  editInputChange = (event) => {
    let { selectedTodo } = this.state;
    selectedTodo = event.target.value;
    this.setState({
      selectedTodo
    });
  };

  editSubmit = (event) => {
    event.preventDefault();
    const { editIndex, selectedTodo, items } = this.state;
    const updatedItems = [...items];
    updatedItems[editIndex] = selectedTodo;
    this.setState({
      items: updatedItems,
      selectedTodo: null,
      editMode: false,
      editIndex: null
    });
  };


  deleteItem=(key)=>{
    if(!window.confirm("Are you sure you want to delete this.?")){
      return;
  }
    const allItems=this.state.items;
    allItems.splice(key,1);
    this.setState({
      items:allItems
    });

  }

  storeItems=(event)=>{
    event.preventDefault();
    const{input}=this.state;

    if (input.trim() === '') { // Check if the input is empty or contains only whitespace
      alert('Please enter a valid item.');
      return;
    }
    
    if (this.state.items.includes(input)) {
      alert('Item already exists in the list.');
      return;
    }

   
    this.setState({
      items:[...this.state.items,input],
      input:""
    });
  }
  render() {
    const {input,items,selectedTodo,editMode}=this.state;
    return (
      
      <div className="todo-container">
  
        <form className='input-section'onSubmit={this.storeItems}>
        <h1>TodoApp</h1>
          <input value={input} type='text'onChange={this.handleChange
          } placeholder='Enter items '/>
         
        </form>
        <ul>
          {items.map((data, index) => (
            <li key={index}>
              {editMode && selectedTodo && index === this.state.editIndex ? (
                <form onSubmit={this.editSubmit}>
                  <input
                    value={selectedTodo}
                    type='text'
                    onChange={this.editInputChange}
                  />
                </form>
                
              ) : (
                <span>{data}</span>
           
              )}
              <i className="fa-solid fa-trash-can" onClick={() => this.deleteItem(index)}></i>
              <i className="fa-solid fa-edit" onClick={() => this.editItem(index)}></i>
              <span className="date">{data.date}</span>
                <span className="time">{data.time}</span>
              
            </li>
          ))}
        </ul> 
      </div>
    )
  }
}

export default TodoApp