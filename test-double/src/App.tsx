import { Outlet } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <nav className="gnb">
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            Test
            <ul>
              <li>
                <a href="/dummy">Dummy</a>
              </li>
              <li>
                <a href="/stub">Stub</a>
              </li>
              <li>
                <a href="/spy">Spy</a>
              </li>
              <li>
                <a href="/fake">Fake</a>
              </li>
              <li>
                <a href="/mock">Mock</a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
      <div style={{ padding: "1rem", maxHeight: "100dvh", overflow: "auto" }}>
        <Outlet />
      </div>
    </>
  );
}

export default App;
