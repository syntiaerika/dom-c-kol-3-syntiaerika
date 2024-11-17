import React, { useState } from "react";
import "./ShoppingListDetail.css";

function ShoppingListDetail() {
  const [shoppingList, setShoppingList] = useState({
    name: "Nákupný zoznam 1",
    owner: "user123",
    members: ["user456", "user789"],
    items: [
      { name: "Melón", checked: false },
      { name: "Avokádo", checked: true },
      { name: "Jahody", checked: false },
    ],
    filter: "all",
  });

  const [currentUser, setCurrentUser] = useState("user789"); 

  const [editingName, setEditingName] = useState(false);
  const [newName, setNewName] = useState(shoppingList.name);
  const [editingItemName, setEditingItemName] = useState(null);
  const [newItemName, setNewItemName] = useState("");

  const handleCheckItem = (index) => {
    setShoppingList((prevList) => ({
      ...prevList,
      items: prevList.items.map((item, i) =>
        i === index ? { ...item, checked: !item.checked } : item,
      ),
    }));
  };

  const handleEditName = () => {
    setEditingName(true);
    setNewName(shoppingList.name);
  };

  const handleSaveName = () => {
    setShoppingList((prevList) => ({ ...prevList, name: newName }));
    setEditingName(false);
  };

  const handleCancelName = () => {
    setEditingName(false);
  };

  const handleAddMember = (newMember) => {
    setShoppingList((prevList) => ({
      ...prevList,
      members: [...prevList.members, newMember],
    }));
  };

  const handleRemoveMember = (memberToRemove) => {
    setShoppingList((prevList) => ({
      ...prevList,
      members: prevList.members.filter((member) => member !== memberToRemove),
    }));
  };

  const handleLeaveShoppingList = () => {
    setShoppingList((prevList) => ({
      ...prevList,
      members: prevList.members.filter((member) => member !== currentUser),
    }));
  };

  const handleAddItem = (newItem) => {
    setShoppingList((prevList) => ({
      ...prevList,
      items: [...prevList.items, { name: newItem, checked: false }],
    }));
  };

  const handleRemoveItem = (index) => {
    setShoppingList((prevList) => ({
      ...prevList,
      items: prevList.items.filter((_, i) => i !== index),
    }));
  };

  const handleFilterChange = (newFilter) => {
    setShoppingList((prevList) => ({ ...prevList, filter: newFilter }));
  };

  const handleEditItemName = (index, itemName) => {
    setEditingItemName(index);
    setNewItemName(itemName);
  };

  const handleSaveItemName = (index) => {
    setShoppingList((prevList) => ({
      ...prevList,
      items: prevList.items.map((item, i) =>
        i === index ? { ...item, name: newItemName } : item,
      ),
    }));
    setEditingItemName(null);
  };

  const handleCancelItemName = () => {
    setEditingItemName(null);
  };

  const filteredItems = shoppingList.items.filter((item) => {
    if (shoppingList.filter === "unresolved") return !item.checked;
    if (shoppingList.filter === "resolved") return item.checked;
    return true;
  });

  const isOwner = currentUser === shoppingList.owner;

  return (
    <div className="shopping-list-container">
      <div className="header">
        {editingName && isOwner ? (
          <div className="edit-name">
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
            <button className="save-button" onClick={handleSaveName}>
              Uložiť
            </button>
            <button className="cancel-button" onClick={handleCancelName}>
              Zrušiť
            </button>
          </div>
        ) : (
          <h1 className="list-name" onClick={isOwner ? handleEditName : null}>
            {shoppingList.name}
          </h1>
        )}
        <p className="owner">Vlastník: {shoppingList.owner}</p>
      </div>

      <div className="members-section">
        <h2>Členovia:</h2>
        <ul className="members-list">
          {shoppingList.members.map((member, index) => (
            <li key={index} className="member-item">
              {member}
              {isOwner && member !== shoppingList.owner && (
                <div className="member-actions">
                  <button
                    className="remove-member-button"
                    onClick={() => handleRemoveMember(member)}
                  >
                    Odstrániť
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
        {!isOwner && (
          <button className="leave-button" onClick={handleLeaveShoppingList}>
            Opustiť zoznam
          </button>
        )}
      </div>

      <div className="items-section">
        <h2>Položky:</h2>
        <div className="filter">
          Filter:
          <select
            value={shoppingList.filter}
            onChange={(e) => handleFilterChange(e.target.value)}
          >
            <option value="all">Všetky</option>
            <option value="unresolved">Nevyriešené</option>
            <option value="resolved">Vyriešené</option>
          </select>
        </div>
        <ul className="items-list">
          {filteredItems.map((item, index) => (
            <li key={index} className="item">
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => handleCheckItem(index)}
              />
              {editingItemName === index ? (
                <div className="edit-item-name">
                  <input
                    type="text"
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                  />
                  <button
                    className="save-button"
                    onClick={() => handleSaveItemName(index)}
                  >
                    Uložiť
                  </button>
                  <button
                    className="cancel-button"
                    onClick={handleCancelItemName}
                  >
                    Zrušiť
                  </button>
                </div>
              ) : (
                <span className="item-name">{item.name}</span>
              )}
              <div className="item-actions">
                <button
                  className="edit-item-button"
                  onClick={() => handleEditItemName(index, item.name)}
                >
                  Premenovať
                </button>
                {(isOwner || !item.checked) && (
                  <button
                    className="remove-item-button"
                    onClick={() => handleRemoveItem(index)}
                  >
                    Zmazať
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
        <button
          className="add-item-button"
          onClick={() => handleAddItem("Nová položka")}
        >
          Pridať položku do nákupného zoznamu
        </button>
      </div>
    </div>
  );
}

export default ShoppingListDetail;