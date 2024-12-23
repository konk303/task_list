import { BrowserRouter, Route, Routes } from "react-router";
import App from "./App";
import ListContainer from "./components/ListContainer";
import ListsContainer from "./components/ListsContainer";
import Home from "./components/Home";
import ListsHome from "./components/ListsHome";

export default function RouteSets () {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={ <App /> }>
                    <Route index element={ <Home /> } />
                    <Route path="lists" element={ <ListsContainer /> }>
                        <Route index element={ <ListsHome /> } />
                        <Route path=":listId" element={ <ListContainer /> } />
                    </Route>
                    <Route path="*" element={ <h1>404</h1> } />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
