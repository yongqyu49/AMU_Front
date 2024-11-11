import {useEffect, useState} from "react";
import axios from "axios";

function App() {
  const [hello, setHello] = useState('');
  const [user, setUser] = useState('');

    axios.get('/api/test')
        .then((res) => {
        setHello(res.data);
    })
  axios.post('/api/getOneUser')
      .then((res) => {
          setUser(res.data);
      })
  return (
      <div className="App">
        백엔드 데이터 : {hello}
          유저: {user.id}, {user.artist}
      </div>
  );
}

export default App;