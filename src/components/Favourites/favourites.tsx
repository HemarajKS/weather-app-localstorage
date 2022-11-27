import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../../components/Favourites/favpourites.css';
import Modal from 'react-modal';

import { useLocation, useNavigate } from 'react-router-dom';
import { favdelAll, favouriteDel } from '../../redux/reducers/favSlice';
import { getweather } from '../../redux/reducers/weatherSlice';

const Favourites = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const favData = useSelector((state: any) => state.fav.value);
  const tempUnit = useSelector((state: any) => state.tempUnit.value);

  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <div className="mobileHeader">Favourite</div>
      {favData && favData.length > 0 ? (
        <>
          <div className="favouritesHeader">
            <div className="favouritesLength">
              {favData.length} {favData.length === 1 ? 'city' : 'cities'} added
              as favourite
            </div>
            <div className="favouritesRemoveAll" onClick={openModal}>
              Clear All
            </div>
          </div>
          <div className="favourites">
            {favData.map((key: any, i: any) => {
              return (
                <div className="favouritesBody" key={i}>
                  <div className="favouritesBodyDown">
                    <div
                      className="favPlace"
                      onClick={() => {
                        dispatch(
                          getweather(`${key.location.lat},${key.location.lon}`)
                        );
                        navigate('/');
                      }}
                    >
                      {key.location.name && key.location.name},{' '}
                      {key.location.region && key.location.region}
                    </div>
                    <div className="favouritebodyDownLower">
                      <div className="favIcon">
                        <img src={key.current.condition.icon} alt="sunny" />
                      </div>
                      <div className="favTemp">
                        {!tempUnit ? (
                          <>
                            {key.current.temp_c &&
                              key.current.temp_c.toFixed(0)}{' '}
                            <span>{'\u00B0'}C</span>
                          </>
                        ) : (
                          <>
                            {key.current.temp_f &&
                              key.current.temp_f.toFixed(0)}{' '}
                            <span>{'\u00B0'}F</span>
                          </>
                        )}
                      </div>
                      <div className="favCond">
                        {key.current.condition.text &&
                          key.current.condition.text}
                      </div>
                    </div>
                  </div>
                  <div
                    className="favLike"
                    onClick={() => {
                      dispatch(favouriteDel(i));
                    }}
                  >
                    <img
                      src={require('../../assets/icons/icon_favourite_Active.png')}
                      alt="fav"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </>
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
            <button
              className="modalBtnYes"
              onClick={() => {
                dispatch(favdelAll());
                closeModal();
              }}
            >
              Yes
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Favourites;
