
import React from 'react';

function MenuItemsCards({ menuitem }) {  // Destructure `menuitem` from props

  return (
    <div className="card card-compact bg-base-100 w-96 shadow-xl">
      <figure>
        <img src={menuitem?.image} alt="menuitem" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{menuitem?.title}</h2>
        <p>{menuitem?.description}</p>
        {/* You can remove or leave the button */}
        <div className="card-actions justify-end">
          <button className="btn btn-primary">
            {/* Button text, you can leave it or remove */}
            View More
          </button>
        </div>
      </div>
    </div>
  );
}

export default MenuItemsCards;
