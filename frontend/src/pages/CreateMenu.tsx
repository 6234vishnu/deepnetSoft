import React, { useEffect, useState } from "react";
import "../assets/css/menu.css";
import api from "../services/axiosInstance";
import { AxiosError } from "axios";

const CreateMenu: React.FC = () => {
  const [menuName, setMenuName] = useState("");
  const [menuDescription, setMenuDescription] = useState("");
  const [items, setItems] = useState([
    { name: "", description: "", price: "" },
  ]);
  const [message, setMessage] = useState<string>("");
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      setMessage("");
    }, 3500);
    return () => clearTimeout(timer);
  }, [message]);

  const handleItemChange = (index: number, field: string, value: string) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const addMenuItem = () => {
    setItems([...items, { name: "", description: "", price: "" }]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      menuName,
      menuDescription,
      items: items.map((item) => ({
        ...item,
        price: parseFloat(item.price),
      })),
    };
    if (!payload) return setMessage("fill all the feilds before submission");

    try {
      const response = await api.post("/menu/createRouter", payload);
      if (response.data.success) {
        return setMessage("menu created successFully");
      }
      return setMessage(response.data.message);
    } catch (err) {
      console.log("error", err);
      const error = err as AxiosError<{ message: string }>;
      return setMessage(
        error?.response?.data?.message || "Server error try later"
      );
    }
  };

  return (
    <>
      <div className="createMenuContainer">
        <h2 className="createMenuTitle">Create New Menu</h2>
        <p style={{ color: "red" }}>{message}</p>
        <form className="createMenuForm" onSubmit={handleSubmit}>
          <input
            className="createMenuInput"
            type="text"
            placeholder="Menu Name"
            value={menuName}
            onChange={(e) => setMenuName(e.target.value)}
            required
          />
          <textarea
            className="createMenuTextarea"
            placeholder="Menu Description"
            value={menuDescription}
            onChange={(e) => setMenuDescription(e.target.value)}
          />

          <h3 className="createMenuSubTitle">Menu Items</h3>
          {items.map((item, index) => (
            <div className="createMenuItemGroup" key={index}>
              <input
                className="createMenuInput"
                type="text"
                placeholder="Item Name"
                value={item.name}
                onChange={(e) =>
                  handleItemChange(index, "name", e.target.value)
                }
                required
              />
              <input
                className="createMenuInput"
                type="text"
                placeholder="Item Description"
                value={item.description}
                onChange={(e) =>
                  handleItemChange(index, "description", e.target.value)
                }
              />
              <input
                className="createMenuInput"
                type="number"
                placeholder="Item Price"
                value={item.price}
                onChange={(e) =>
                  handleItemChange(index, "price", e.target.value)
                }
                required
              />
            </div>
          ))}

          <button
            className="createMenuAddBtn"
            type="button"
            onClick={addMenuItem}
          >
            + Add Item
          </button>
          <button className="createMenuSubmitBtn" type="submit">
            Create Menu
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateMenu;
