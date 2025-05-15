import MenuItem from "../models/menuItemSchema.js";
import Menu from "../models/menuSchema.js";

export const createMenu = async (req, res) => {
  try {
    const { menuName, menuDescription, items } = req.body;

    if (!menuName || !menuDescription || !items)
      return res.status(404).json({
        success: false,
        message: "fill all the feilds to create Menu",
      });

    if (!Array.isArray(items)) {
      items = [items];
    }

    const isValid = items.every(
      (item) =>
        item.name &&
        item.description &&
        item.price !== undefined &&
        item.price !== null
    );

    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: "Each item must include name, description, and price",
      });
    }

    const savedItems = await MenuItem.insertMany(items);

    const itemIds = savedItems.map((item) => item._id);

    const menuExists = await Menu.findOne({ menuName });

    if (menuExists) {
      const deleteItem = await MenuItem.findByIdAndDelete(itemIds);

      if (deleteItem) {
        return res.status(400).json({
          success: false,
          message: "Menu already exist",
        });
      }
    }

    const newMenu = new Menu({
      menuName,
      menuDescription,
      items: itemIds,
    });

    const savedMenu = await newMenu.save();
    if (!savedMenu)
      return res.status(500).json({
        success: false,
        message: "Server error try later",
      });

    return res.status(201).json({
      success: true,
      message: "Menu created successfully",
      menu: savedMenu,
    });
  } catch (error) {
    console.log("error in createMenu", error);
    return res.status(500).json({
      success: false,
      message: "Server error try later",
    });
  }
};

export const getMenuData = async (req, res) => {
  try {
    const getData = await Menu.find().populate("items");
    if (!getData)
      return res
        .status(500)
        .json({ success: false, message: "couldint find any Menu's" });
    return res.status(200).json({ success: true, menu: getData });
  } catch (error) {
    console.log("error in getMenuData", error);

    return res.status(500).json({
      success: false,
      message: "Server error try later",
    });
  }
};
