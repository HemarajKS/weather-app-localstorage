import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../../components/Favourites/favpourites.css';
import Modal from 'react-modal';

import { useLocation, useNavigate } from 'react-router-dom';

const Favourites = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  let fav: any = {};

  return (
    <>
      <div className="mobileHeader">Favourite</div>
      {false ? (
        <div className="favourites">
          <div className="favouritesHeader">
            <div className="favouritesLength">6 City added as favourite</div>
            <div className="favouritesRemoveAll" onClick={openModal}>
              Remove All
            </div>
          </div>
          {[].map((key: any, i: any) => {
            return (
              <div className="favouritesBody" key={i}>
                <div className="favouritesBodyDown">
                  <div
                    className="favPlace"
                    onClick={() => {
                      navigate('/');
                    }}
                  >
                    {fav.data[key].place && fav.data[key].place},{' '}
                    {fav.data[key].region && fav.data[key].region}
                  </div>
                  <div className="favouritebodyDownLower">
                    <div className="favIcon">
                      <img src={fav.data[key].icon} alt="sunny" />
                    </div>
                    <div className="favTemp">
                      {fav.data[key].temp_c && fav.data[key].temp_c.toFixed(0)}{' '}
                      <span>{'\u00B0'}C</span>
                    </div>
                    <div className="favCond">
                      {fav.data[key].condition && fav.data[key].condition}
                    </div>
                  </div>
                </div>
                <div className="favLike" onClick={() => {}}>
                  <img
                    src={require('../../assets/icons/icon_favourite_Active.png')}
                    alt="fav"
                  />
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="noFavAdded">
          <img
            src={require('../../assets/icons/icon_nothing.png')}
            alt="nothing"
          />
          <div className="noFavText">No Favourites added</div>
        </div>
      )}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        <div className="modalBox">
          <div className="modalText">
            Are you sure want to remove all the favourites?
          </div>
          <div className="modalButtons">
            <button className="modalBtnNo" onClick={closeModal}>
              No
            </button>
            <button className="modalBtnYes">Yes</button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Favourites;
