import {useRef,useState} from 'react';
import styled from 'styled-components';

const TodoEditor = ({onCreate})=>{
  const authorInput = useRef();
  const contentInput = useRef();
  
  const [state, setState] = useState({// 기본 인풋들
    author:"",
    content:"",
    emotion:1,
  })
  const handleChangeState = (e)=>{    //state들을 입력한 값으로 변경해주는 함수
    setState({
      ...state,
      [e.target.name]:e.target.value
    })
  }
  const handleSubmit = ()=>{
    if(state.author.length <1){  
      authorInput.current.focus(); //포커스가 author text로 맞춰진다
      return;
    }
    if(state.content.length<3){
      contentInput.current.focus();
      return;
    }    
    onCreate(state.author, state.content, state.emotion)
    alert("Todo Create")
    setState({
      author:'',
      content:'',
      emotion:1,
    })
  }
  return (
  <EditorWrappered>
  <div className='TodoEditor'>
    <h2>Todo</h2>
    <div>
      <input
      ref={authorInput}
      name='author'
      value={state.author}
      placeholder="Name"
      type="text"
      onChange={handleChangeState}/>
    </div>
    <textarea 
    ref={contentInput}
    name='content'
    value={state.content}
    placeholder="Content"
    type="text"
    onChange={handleChangeState}/>
    <div>
    <span>To-Do score  : </span>
    <select
    name='emotion'
    value={state.emotion}
    onChange={handleChangeState}>
      <option value={1}>1</option>
      <option value={2}>2</option>
      <option value={3}>3</option>
      <option value={4}>4</option>
      <option value={5}>5</option>
      <option value={6}>6</option>
      <option value={7}>7</option>
      <option value={8}>8</option>
      <option value={9}>9</option>
      <option value={10}>10</option>      
    </select>
  </div>
  <div>
    <button onClick={handleSubmit}>Create</button>
  </div>
  </div>
  </EditorWrappered>
  )
}
const EditorWrappered = styled.div`
.TodoEditor{
  border: 1px solid gray;
  text-align: center;
  padding: 20px;
}

.TodoEditor input,textarea{
  background-color: white;
  margin-bottom: 20px;
  width: 500px;
  padding: 10px;
}
.TodoEditor textarea{
  height: 100px;
}
.TodoEditor select{
  width: 300px;
  padding: 10px;
  margin-bottom: 20px;
  background-color: white;
}
.TodoEditor button{
  width: 500px;  
  padding: 0;
  cursor: pointer;  
  border-radius: 15px;
  background: #ff7c09;  
  line-height: 42px;  
  border: none;
}
.TodoEditor button:hover{
  box-shadow:  4px 4px 6px 0 rgba(255,255,255,.5),
              -4px -4px 6px 0 rgba(116, 125, 136, .5), 
    inset -4px -4px 6px 0 rgba(255,255,255,.2),
    inset 4px 4px 6px 0 rgba(0, 0, 0, .4);
}
`
export default TodoEditor;