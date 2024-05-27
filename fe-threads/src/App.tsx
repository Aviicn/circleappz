import { RootState } from "./store/type/RootState";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { API, setAuthToken } from "./libs/api";
import { useEffect, useState } from "react";
import { AUTH_CHECK, AUTH_ERROR } from "./store/RootReducer";
import { ChakraProvider } from "@chakra-ui/react";
import { Routes, Route, Navigate, Outlet, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
import "./app.css";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Main from "./layout/Main";
import Login from "./pages/Login";
import DetailThread from "./pages/DetailThread";
import ListUser from "./pages/ListUser";
import Profile from "./pages/Profile";
import Follow from "./pages/Follow";
import Forget from "./pages/Forget";

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

 

  async function authCheck() {
    try {
      setAuthToken(localStorage.token);
      const response = await API.get("/auth/check");
      dispatch(AUTH_CHECK(response.data.user));
      setIsLoading(false);
    } catch (err) {
      dispatch(AUTH_ERROR());
      setIsLoading(false);
      navigate("/auth/login");
    }
  }

  useEffect(() => {
    if (localStorage.token) {
      authCheck();
    } else {
      setIsLoading(false);
    }
  }, []);

  function IsNotLogin() {
    if (!auth.username) {
      return <Navigate to={"/auth/login"} />;
    } else {
      return <Outlet />;
    }
  }

  function IsLogin() {
    if (auth.username) {
      return <Navigate to={"/"} />;
    } else {
      return <Outlet />;
    }
  }

  return (
    <>
      {isLoading ? null : (
        <ChakraProvider>
          <Routes>
            <Route path="/" element={<IsNotLogin />}>
              <Route
                path="/"
                element={
                  <Main>
                    <Home />
                  </Main>
                }
              />

              <Route
                path="/thread/:id"
                element={
                  <Main>
                    <DetailThread />
                  </Main>
                }
              />

              <Route
                path="/search"
                element={
                  <Main>
                    <ListUser />
                  </Main>
                }
              />

              <Route
                path="/follow"
                element={
                  <Main>
                    <Follow />
                  </Main>
                }
              />
              <Route
                path="/profile/:id"
                element={
                  <Main>
                    <Profile />
                  </Main>
                }
              />

              {/* <Route path="/profile/:id" element={<Profile />} /> */}
            </Route>

            <Route path="/" element={<IsLogin />}>
              <Route path="/auth/register" element={<Register />} />
              <Route path="/auth/login" element={<Login />} />
              <Route path="/auth/forget" element={<Forget />} />
            </Route>
          </Routes>
        </ChakraProvider>
      )}
    </>
  );
}

export default App;
