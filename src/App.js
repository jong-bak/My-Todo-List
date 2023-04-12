import { useState,useRef,useMemo } from 'react';
import TodoList from './TodoList';
import TodoEditor from './TodoEditor';
import './App.css';

function App() {
  const [data,setData] = useState([]);

  const dataId = useRef(0);

//아무상관없이 작성자까지 만들다가 jsonplaceholder에서 받아오는 데이터에 작성자가 없는걸보고 작성자는 없어도 괜찮겠다 생각이 들었다.
  

  const onCreate = (author, content, emotion)=>{
    
    const created_date = new Date().toLocaleString();
    
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id: dataId.current,
    }
    dataId.current+=1
    setData([newItem,...data])
  }
  const onEdit = (targetId, newContent)=>{
    setData(data.map((it)=>it.id===targetId?{...it,content : newContent}:it))
  }

  const onRemove = (targetId) =>{
    console.log(`${targetId}가 삭제되었습니다.`)
    const newDiaryList = data.filter((it)=>it.id !==targetId);
    setData(newDiaryList)
  }

  const getTodoAnalysis = useMemo(() => {
    console.log("분석 시작");
    const goodCount = data.filter((it) => it.emotion >= 3).length;
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / data.length) * 100;
    return { goodCount, badCount, goodRatio };
  }, [data]); // 'data'를 의존성 배열에 추가
  
  const { goodCount, badCount, goodRatio } = getTodoAnalysis;
  return (
    <div className="App">      
      <TodoEditor onCreate={onCreate}/>
      <div>기분 좋은 할 일 개수 : {goodCount}</div>
      <div>기분 나쁜 할 일 개수 : {badCount}</div>
      <div>기분 좋은 할 일 비율 : {goodRatio}</div>
      <TodoList   onRemove={onRemove} TodoList={data} onEdit={onEdit}/>
    </div>
  );
}

export default App;
