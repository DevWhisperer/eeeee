import "./App.css";
import { useState } from "react";

function CustomButton(props) {
  return (
    <button
      style={{ background: props.color, color: "white" }}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}

//  User 컴포넌트를 분리해서 구현
function User(props) {
  return (
    <div className="user-card">
      <div>{props.user.age}살 - </div>
      <div>{props.user.name}</div>
      <CustomButton onClick={() => props.handleDelete(props.user.id)}>
        삭제하기
      </CustomButton>
    </div>
  );
}

const App = () => {
  const [users, setUsers] = useState([
    { id: 1, age: 30, name: "송중기" },
    { id: 2, age: 24, name: "송강" },
    { id: 3, age: 21, name: "김유정" },
    { id: 4, age: 29, name: "구교환" },
  ]);
  const [name, setName] = useState(""); // <-- 유저의 입력값을 담을 상태
  const addUserHandler = () => {
    const newUser = {
      id: users.length + 1,
      age: 30,
      name: name,
    };

    setUsers([...users, newUser]);
  };
  const deleteUserHandler = (id) => {
    const newUserList = users.filter((user) => user.id !== id);
    setUsers(newUserList);
  };
  return (
    <div className="app-container">
      <input
        placeholder="이름을 입력해주세요"
        value={name}
        // 인풋 이벤트로 들어온 입력 값을 name의 값으로 업데이트
        onChange={(e) => setName(e.target.value)}
      />
      {users.map((user) => {
        if (user.age < 25) {
          return (
            <User user={user} key={user.id} handleDelete={deleteUserHandler} />
          );
        } else {
          return null;
        }
      })}
      <CustomButton color={"red"} onClick={addUserHandler}>
        추가하기
      </CustomButton>
    </div>
  );
};

export default App;
