import { useState, useRef } from 'react';
import styled from 'styled-components';

const TodoItem = ({author, content, created_date, emotion, id, onRemove, onEdit}) =>{
  const [isEdit, setIsEdit] = useState(false);
  const toggleIsEdit = ()=> setIsEdit(!isEdit);

  const [localContent, setLocalContent] = useState(content)
  const localContentInput = useRef()

  const handleRemove = ()=>{
    if(window.confirm(`${id+1}번째 할 일을 정말 삭제하시겠습니까?`)){
      onRemove(id)
    }
  } 
  const handleQuitEdit = ()=>{
    setIsEdit(false);
    setLocalContent(content);
  }
  const handleEdit = ()=>{
    if(localContent.length<3){
      localContentInput.current.focus();
      return;
    }
    if(window.confirm(`${id+1}번 째 할 일을 수정하시겠습니까?`)){
      onEdit(id,localContent);
      toggleIsEdit();
    }
    onEdit(id,localContent);
  }
  return (
  <Wrapped>
  <div className='TodoItem'>
    <div className='info'>
      <span>
        작성자 : {author} | 점수 : {emotion}
      </span>
      <br/>
      <span className='date'>{(created_date)}</span>
    </div>
    <div className='content'>{isEdit?<><textarea
    value={localContent}
    onChange={(e)=>setLocalContent(e.target.value)}
    /></>
    :<>{content}</>}</div>

    {isEdit ? <>      
      <button onClick={handleQuitEdit}>수정취소</button>
      <button onClick={handleEdit}>수정완료</button></>
      :
      <>
      <button onClick={handleRemove}>삭제하기</button>
      <button onClick={toggleIsEdit}>수정하기</button></>}
    
  </div>
  </Wrapped>
  )
}
const Wrapped = styled.div`
  .TodoItem {
  border: 2px solid #ff7c09;
  background: #ffe8b6;
  margin-bottom: 10px;
  padding: 20px;
}

.TodoItem .info {
  border-bottom: 1px solid gray;
  padding-bottom: 10px;
  margin-bottom: 10px;
}

.TodoItem .date {
  color: gray;
}

.TodoItem .content {
  font-weight: bold;
  margin: 30px 0px;  
}
.TodoItem button {  
  margin-right: 20px;
  cursor: pointer;  
  border-radius: 15px;
  background: #ff7c09;  
  line-height: 42px;  
  border: none;
}
.TodoItem button:hover{
  box-shadow:  4px 4px 6px 0 rgba(255,255,255,.5),
              -4px -4px 6px 0 rgba(116, 125, 136, .5), 
    inset -4px -4px 6px 0 rgba(255,255,255,.2),
    inset 4px 4px 6px 0 rgba(0, 0, 0, .4);
}
`

export default TodoItem;