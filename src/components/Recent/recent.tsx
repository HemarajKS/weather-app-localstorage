import React, { useEffect, useState } from 'react';

import Modal from 'react-modal';
import './recent.css';

import { useNavigate } from 'react-router-dom';

const Recent = () => {
  const navigate = useNavigate();

  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <div className="mobileHeader">Recent Search</div>
      {false ? (
        <>
          <div className="favourites">
            <div className="favouritesHeader">
              <div className="favouritesLength">You recently searched for</div>
              <div className="favouritesRemoveAll" onClick={openModal}>
                Clear All
              </div>
            </div>
            {[].map((key: any, i: any) => {
              let x = false;

              return (
                <div className="favouritesBody" key={i}>
                  <div className="favouritesBodyDown">
                    <div
                      className="favPlace"
                      onClick={() => {
                        navigate('/');
                      }}
                    >
                      {key.place}, {key.region}
                    </div>
                    <div className="favouritebodyDownLower">
                      <div className="favIcon">
                        <img src={key.icon} alt="sunny" />
                      </div>
                      <div className="favTemp">
                        {key.temp_c && key.temp_c.toFixed(0)}{' '}
                        <span>{'\u00B0'}C</span>
                      </div>
                      <div className="favCond">{key.condition}</div>
                    </div>
                  </div>
                  <div
                    className="favLike"
                    onClick={() => {
                      // deleteFav(ele.id);
                    }}
                  >
                    {x ? (
                      <img
                        src={require('../../assets/icons/icon_favourite_Active.png')}
                        alt="fav"
                        onClick={() => {}}
                      />
                    ) : (
                      <img
                        src={require('../../assets/icons/icon_favourite.png')}
                        alt="fav"
                        width={18}
                        height={18}
                        onClick={() => {}}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Example Modal"
          >
            <div className="modalBox">
              <div className="modalText">
                Are you sure want to remove all the recent searches?
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
      ) : (
        <div className="noFavAdded">
          <img
            src={require('../../assets/icons/icon_nothing.png')}
            alt="nothing"
          />
          <div className="noFavText">No Recent Search</div>
        </div>
      )}
    </>
  );
};

export default Recent;
