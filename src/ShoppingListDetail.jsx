import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./ShoppingListDetail.css";

function ShoppingListDetail({ shoppingLists }) {
  const { id } = useParams();
  const shoppingList = shoppingLists.find((list) => list.id === parseInt(id));
  const [currentUser, setCurrentUser] = useState("user123");

  const [editingName, setEditingName] = useState(false);
  const [newName, setNewName] = useState(shoppingList.name);
  const [editingItemName, setEditingItemName] = useState(null);
  const [newItemName, setNewItemName] = useState("");
  const [newMember, setNewMember] = useState("");
  const [newItem, setNewItem] = useState("");
  const [filter, setFilter] = useState("all");

  const handleCheckItem = (index) => {
    shoppingList.items[index].checked = !shoppingList.items[index].checked;
    setShoppingList({ ...shoppingList });
  };

  const handleEditName = () => {
    setEditingName(true);
    setNewName(shoppingList.name);
  };

  const handleSaveName = () => {
    shoppingList.name = newName;
    setShoppingList({ ...shoppingList });
    setEditingName(false);
  };

  const handleCancelName = () => {
    setEditingName(false);
  };

  const handleAddMember = () => {
    if (newMember) {
      shoppingList.members.push(newMember);
      setShoppingList({ ...shoppingList });
      setNewMember("");
    }
  };

  const handleRemoveMember = (index) => {
    shoppingList.members.splice(index, 1);
    setShoppingList({ ...shoppingList });
  };

  const handleLeaveShoppingList = () => {
    const index = shoppingList.members.indexOf(currentUser);
    if (index > -1) {
      shoppingList.members.splice(index, 1);
      setShoppingList({ ...shoppingList });
    }
  };

  const handleAddItem = () => {
    if (newItem) {
      shoppingList.items.push({ name: newItem, checked: false });
      setShoppingList({ ...shoppingList });
      setNewItem("");
    }
  };

  const handleRemoveItem = (index) => {
    shoppingList.items.splice(index, 1);
    setShoppingList({ ...shoppingList });
  };

  const handleEditItemName = (index) => {
    setEditingItemName(index);
    setNewItemName(shoppingList.items[index].name);
  };

  const handleSaveItemName = (index) => {
    shoppingList.items[index].name = newItemName;
    setShoppingList({ ...shoppingList });
    setEditingItemName(null);
  };

  const handleCancelItemName = () => {
    setEditingItemName(null);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const isOwner = currentUser === shoppingList.owner;
  const filteredItems = shoppingList.items.filter((item) => {
    if (filter === "unresolved") return !item.checked;
    if (filter === "resolved") return item.checked;
    return true;
  });

  if (!shoppingList) {
    return <div>Zoznam nebol nájdený.</div>;
  }

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
                    onClick={() => handleRemoveMember(index)}
                  >
                    Odstrániť
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
        {isOwner && (
          <div className="add-member-field">
            <input
              type="text"
              value={newMember}
              onChange={(e) => setNewMember(e.target.value)}
              placeholder="Pridať člena"
            />
            <button onClick={handleAddMember}>Pridať</button>
          </div>
        )}
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
          <select value={filter} onChange={handleFilterChange}>
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
                  onClick={() => handleEditItemName(index)}
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
        <div className="add-item-field">
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="Pridať položku"
          />
          <button onClick={handleAddItem}>Pridať</button>
        </div>

        <Link to="/">
          <button className="back-to-overview-button">
            Prehľad zoznamov
          </button>
        </Link>
      </div>
    </div>
  );
}

export default ShoppingListDetail;