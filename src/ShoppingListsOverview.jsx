import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./ShoppingListsOverview.css";

function ShoppingListsOverview({ shoppingLists }) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [shoppingListToDelete, setShoppingListToDelete] = useState(null);
  const [newListName, setNewListName] = useState("");
  const currentUser = "user123"; // Nahraďte skutočným ID používateľa

  const handleAddShoppingList = () => {
    const newList = {
      id: Date.now(),
      name: newListName,
      owner: currentUser,
      members: [],
      items: [],
    };
    shoppingLists.push(newList); // Pridanie nového zoznamu do poľa shoppingLists
    setNewListName("");
    setIsAddModalOpen(false);
  };

  const handleDeleteShoppingList = (listId) => {
    setShoppingListToDelete(listId);
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteShoppingList = () => {
    const index = shoppingLists.findIndex((list) => list.id === shoppingListToDelete);
    if (index > -1) {
      shoppingLists.splice(index, 1);
    }
    setIsDeleteModalOpen(false);
  };

  return (
    <div>
      <button className="add-button" onClick={() => setIsAddModalOpen(true)}>
        Pridať zoznam
      </button>
      <div className="shopping-lists-grid">
        {shoppingLists.map((list) => (
          <Link key={list.id} to={`/detail/${list.id}`} className="shopping-list-tile">
            <h2>{list.name}</h2>
            <p>
              Vlastník: {list.owner}, Počet položiek: {list.items.length}
            </p>
            {list.owner === currentUser && (
              <button
                className="delete-button"
                onClick={(e) => {
                  e.preventDefault();
                  handleDeleteShoppingList(list.id);
                }}
              >
                Zmazať
              </button>
            )}
          </Link>
        ))}
      </div>

      {isAddModalOpen && (
        <div className="modal-content">
          <div className="modal-header">
            <h2>Pridať nákupný zoznam</h2>
            <button onClick={() => setIsAddModalOpen(false)}>Zavrieť</button>
          </div>
          <div className="modal-body">
            <label htmlFor="name">Názov:</label>
            <input type="text" id="name" value={newListName} onChange={(e) => setNewListName(e.target.value)} />
            <button onClick={handleAddShoppingList}>Uložiť</button>
          </div>
        </div>
      )}

      {isDeleteModalOpen && (
        <div className="modal-content">
          <div className="modal-header">
            <h2>Potvrdiť zmazanie</h2>
            <button onClick={() => setIsDeleteModalOpen(false)}>Zavrieť</button>
          </div>
          <div className="modal-body">
            <p>Naozaj chcete zmazať tento nákupný zoznam?</p>
            <button onClick={confirmDeleteShoppingList}>Zmazať</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShoppingListsOverview;