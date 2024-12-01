import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ShoppingListDetail from "./ShoppingListDetail";
import ShoppingListsOverview from "./ShoppingListsOverview";
import "./App.css";

function App() {
  const shoppingLists = [
    {
      id: 1,
      name: "Nákupný zoznam 1",
      owner: "user123",
      members: ["user456", "user789"],
      items: [
        { name: "Melón", checked: false },
        { name: "Avokádo", checked: true },
        { name: "Jahody", checked: false },
      ],
    },
    {
      id: 2,
      name: "Nákupný zoznam 2",
      owner: "user456",
      members: ["user123"],
      items: [
        { name: "Chlieb", checked: false },
        { name: "Mlieko", checked: true },
        { name: "Maslo", checked: false },
      ],
    },
  ];

  return (
    <BrowserRouter>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Prehľad zoznamov</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<ShoppingListsOverview shoppingLists={shoppingLists} />} />
          <Route path="/detail/:id" element={<ShoppingListDetail shoppingLists={shoppingLists} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;