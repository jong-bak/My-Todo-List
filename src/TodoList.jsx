import TodoItem from './TodoItem'
import styled from 'styled-components'

const TodoList = ({TodoList, onRemove, onEdit})=>{  
  return(
    <Container>
    <div className='TodoList'>      
      <h2>Todo List</h2>
      <h4>{TodoList.length}개의 할 일이 있습니다.</h4>
      <div>
        {TodoList.map((it)=>(          
            <TodoItem key={it.id} {...it} onRemove={onRemove} onEdit={onEdit}/>          
        ))}
      </div>
    </div>
    </Container>
  )
}
TodoList.defaultProps ={
  TodoList:[],
}
const Container = styled.div`
.TodoList {
  border: 1px solid gray;
  padding: 20px;
  margin-top: 20px;
}

.TodoList h2{
  text-align: center;  
}
`

export default TodoList;