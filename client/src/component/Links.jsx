import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import productCategory from '../helper/productCategory';

function Links() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null); // main dropdown (boys/girls)
  const [openSub, setOpenSub] = useState(null); // sub dropdown (summer/winter etc)

  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
        setOpenDropdown(null);
        setOpenSub(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const closeAll = () => {
    setMenuOpen(false);
    setOpenDropdown(null);
    setOpenSub(null);
  };

  // Sub-categories label mapping
  const subLabels = {
    summer: "Summer",
    winter: "Winter",
    eastern: "Eastern",
    newbornAndToddler: "Newborn & Toddler",
    teen: "Teen",
  };

  const renderNestedDropdown = (title, categoryKey) => {
    const isOpen = openDropdown === categoryKey;
    const subCategories = productCategory[categoryKey]; // e.g. { summer: [...], winter: [...] }

    return (
      <li className="relative list-none font-bold text-white text-base md:text-lg">
        <button
          onClick={() => {
            setOpenDropdown(isOpen ? null : categoryKey);
            setOpenSub(null);
          }}
          className="flex items-center gap-1 focus:outline-none"
        >
          {title}
          <svg className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isOpen && (
          <ul className="bg-gray-800 rounded shadow-md mt-2 md:absolute md:top-full md:left-0 z-10 min-w-[160px]">
            {Object.keys(subCategories).map((subKey) => (
              <li key={subKey} className="relative">
                <button
                  onClick={() => setOpenSub(openSub === subKey ? null : subKey)}
                  className="w-full text-left px-4 py-2 hover:bg-gray-700 text-white flex justify-between items-center"
                >
                  {subLabels[subKey] || subKey}
                  <svg className={`w-3 h-3 transition-transform ${openSub === subKey ? 'rotate-90' : ''}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {openSub === subKey && (
                  <ul className="bg-gray-700 md:absolute md:left-full md:top-0 min-w-[160px] rounded shadow-md z-20">
                    {subCategories[subKey].map((item) => (
                      <li key={item.id} className="px-4 py-2 hover:bg-gray-600">
                        <Link
                          to={`/category-product/${item.value}`}
                          onClick={closeAll}
                          className="text-white block"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        )}
      </li>
    );
  };

  // Simple flat dropdown (for newborn)
  const renderFlatDropdown = (title, categoryKey) => {
    const isOpen = openDropdown === categoryKey;
    const items = productCategory[categoryKey];

    return (
      <li className="relative list-none font-bold text-white text-base md:text-lg">
        <button
          onClick={() => setOpenDropdown(isOpen ? null : categoryKey)}
          className="flex items-center gap-1 focus:outline-none"
        >
          {title}
          <svg className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isOpen && (
          <ul className="bg-gray-800 rounded shadow-md mt-2 md:absolute md:top-full md:left-0 z-10 min-w-[150px]">
            {items.map((item) => (
              <li key={item.id} className="px-4 py-2 hover:bg-gray-700">
                <Link to={`/category-product/${item.value}`} onClick={closeAll} className="text-white block">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <div
      ref={menuRef}
      className={`w-full px-4 md:px-16 py-2 bg-black z-40 ${isHomePage ? 'sticky top-13' : ''}`}
    >
      {/* Mobile Hamburger */}
      <div className="flex justify-between items-center md:hidden">
        <h1 className="text-white text-xl font-bold">Menu</h1>
        <button onClick={() => setMenuOpen(!menuOpen)} className="text-white focus:outline-none">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      <ul className={`${menuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row md:items-center md:justify-start gap-4 md:gap-8 mt-4 md:mt-0`}>
        <li className="list-none font-bold text-white text-base md:text-lg">
          <Link to="/" onClick={closeAll}>Home</Link>
        </li>

        {renderNestedDropdown('Boys', 'boys')}
        {renderNestedDropdown('Girls', 'girls')}
        {renderFlatDropdown('New Born', 'newborn')}

        <li className="list-none font-bold text-white text-base md:text-lg">
          <Link to="/about" onClick={closeAll}>About</Link>
        </li>
        <li className="list-none font-bold text-white text-base md:text-lg">
          <Link to="/contactUs" onClick={closeAll}>Contact Us</Link>
        </li>
      </ul>
    </div>
  );
}

export default Links;