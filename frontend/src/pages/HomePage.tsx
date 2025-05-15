import React, { useEffect, useState } from "react";
import "../assets/css/home.css";
import api from "../services/axiosInstance";
import { AxiosError } from "axios";
import Pagination from "./Pagination";

interface MenuItem {
  _id: string;
  name: string;
  description: string;
  price: number;
}

interface Menu {
  _id: string;
  menuName: string;
  menuDescription: string;
  items: MenuItem[];
}

const HomePage: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menu, setMenu] = useState<Menu[]>([]);
  const [activeTab, setActiveTab] = useState<string | null>(null);

  useEffect(() => {
    const getMenuData = async () => {
      try {
        const response = await api.get("/menu/getMenuData");
        if (response.data.success) {
          console.log("data", response.data.menu);
          const menuData = response.data.menu;
          setMenu(menuData);

          if (menuData.length > 0) {
            setActiveTab(menuData[0].menuName);
          }
          return;
        }

        return console.log("error", response.data.message);
      } catch (err) {
        console.log("error", err);
        const error = err as AxiosError<{ message: string }>;
        return console.log("error", error?.response?.data?.message);
      }
    };
    getMenuData();
  }, []);

  const menuNames = menu.map((menuObj) => menuObj.menuName);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemPerPage: number = 3;
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  const onPageChange = (pageNum: number) => {
    setCurrentPage(pageNum);
  };
  const activeMenu = menu.find((m) => m.menuName === activeTab);

  const totalItems = activeMenu?.items.length || 0;
  const totalPages = Math.ceil(totalItems / itemPerPage);

  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const paginatedItems =
    activeMenu?.items.slice(indexOfFirstItem, indexOfLastItem) || [];

  const toggleMobileMenu = () => {
    const newMenuState = !menuOpen;
    setMenuOpen(newMenuState);

    const image = document.getElementById(
      "targetImg"
    ) as HTMLImageElement | null;

    if (image) {
      if (newMenuState) {
        image.classList.add("disabled-image");
      } else {
        image.classList.remove("disabled-image");
      }
    }
  };

  return (
    <>
      <div className="homePageContainer">
        <header className="homePageHeader">
          <div className="homePageHeaderTop">
            <div className="homePageLogo">
              <img
                id="targetImg"
                src="/images/22e31e486860545013e0a63ba8cb7e94004971f7.png"
                alt="logo"
              />

              <div className="homePageLogoTopRow">
                <span className="deepText">DEEP</span>
                <span className="netText" style={{ color: "#fff" }}>
                  NET
                </span>
              </div>

              <span
                style={{
                  color: "grey",
                  marginLeft: "-161px",
                  marginTop: "20px",
                }}
                className="softText"
              >
                SOFT
              </span>
            </div>

            <div className="homePageHamburger" onClick={toggleMobileMenu}>
              &#9776;
            </div>
          </div>

          <nav className={`homePageNav ${menuOpen ? "showMobileNav" : ""}`}>
            <a href="#">Home</a>
            <a style={{ color: "#4197f7" }} href="#">
              Menu
            </a>
            <a href="#">About</a>
            <a href="#">Contact</a>
          </nav>
        </header>

        <section className="homePageHero">
          <h1 className="homePageMenuTitle">MENU</h1>
          <p className="homePageMenuDescription">
            Please take a look at our menu featuring food, drinks, and brunch.
            If you'd like to place an order, use the "Order Online" button
            located below the menus.
          </p>
        </section>

        <div className="homePageTabs">
          {menuNames.map((names, i) => (
            <button
              key={i}
              style={{ backgroundColor: "black" }}
              className={activeTab === names ? "active" : ""}
              onClick={() => setActiveTab(names)}
            >
              {names}
            </button>
          ))}
        </div>

        {activeMenu && (
          <section key={activeMenu._id} className="homePageBrunchSection">
            <div className="homePageBrunchDiv">
              <img
                src="\images\drinkimage2.png"
                alt="Top Left"
                className="homePageBrunchImageTopLeft"
              />
              <h2 className="homePageBrunchTitle">
                <span>{activeMenu.menuDescription}</span>
              </h2>
              <div className="homePageBrunchTextFeilds">
                {paginatedItems.map((item) => (
                  <div key={item._id} className="homePageBrunchTextRow">
                    <h3>
                      {item.name}..........................${item.price}
                    </h3>
                    <p>{item.description}</p>
                  </div>
                ))}

                <div className="paginationWrapper">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={onPageChange}
                  />
                </div>
              </div>

              <img
                src="\images\6b91b238f07a69022d4c64e313237eadaceb997f.png"
                alt="Bottom Right"
                className="homePageBrunchImageBottomRight"
              />
            </div>
          </section>
        )}

        <footer>
          <div className="footer-container">
            <div className="connect-section">
              <h4>CONNECT WITH US</h4>
              <div className="contact-info">
                <div className="contact-item">
                  <img
                    src="\images\bytesize_telephone.png"
                    alt="Phone Icon"
                    className="contact-icon"
                  />
                  <span>+1 555 123 4567</span>
                </div>

                <div className="contact-item">
                  <img
                    src="\images\formkit_email.png"
                    alt="Phone Icon"
                    className="contact-icon"
                  />
                  <span>info@deepnetsoft.com</span>
                </div>
              </div>
            </div>

            <div className="logo-section">
              <div className="logo">
                <img
                  src="/images/22e31e486860545013e0a63ba8cb7e94004971f7.png"
                  alt="Deep Net Soft"
                />
                <div className="logo-text">
                  <span style={{ color: "#0099ff" }} className="deep">
                    DEEP
                  </span>{" "}
                  <span style={{ color: "white" }} className="net">
                    NET
                  </span>{" "}
                  <span style={{ color: "grey" }} className="soft">
                    SOFT
                  </span>
                </div>
              </div>
              <div className="socialMedia">
                <a href="#">
                  <img
                    className="image1"
                    src="\images\iconoir_facebook.png"
                    alt="facebook"
                  />
                </a>
                <a href="#">
                  <img
                    className="image2"
                    src="\images\basil_twitter-outline.png"
                    alt="twitter"
                  />
                </a>
                <a href="#">
                  <img
                    className="image3"
                    src="\images\mingcute_youtube-line.png"
                    alt="youtube"
                  />
                </a>
                <a href="#">
                  <img
                    className="image3"
                    src="\images\insta.png"
                    alt="instagram"
                  />
                </a>
              </div>
            </div>

            <div className="find-section">
              <h4>FIND US</h4>
              <div className="location">
                <img
                  src="\images\streamline_travel-map-location-pin-navigation-map-maps-pin-gps-location.png"
                  alt="Phone Icon"
                  className="contact-icon"
                />
                <span>
                  First floor, Geo infopark,
                  <br />
                  Infopark EXPY, Kakkanad
                </span>
              </div>
            </div>
          </div>

          <div className="copyright">
            <p>© 2023 DeepNetSoft Solutions. All rights reserved.</p>
            <div className="terms">
              <a href="#">Terms & Conditions</a>
              <span className="divider">|</span>
              <a href="#">Privacy Policy</a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default HomePage;
