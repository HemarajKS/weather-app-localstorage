import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../../components/Favourites/favpourites.css';
import Modal from 'react-modal';
import { getFavouriteData } from '../../redux/reducers/getFavSlice';
import { deleteData } from '../../redux/reducers/deleteSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import searchSlice from '../../redux/reducers/currentData';
import { getweather } from '../../redux/reducers/weatherSlice';

const Favourites = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
    dispatch(getFavouriteData());
  }, []);

  const fav = useSelector((state: any) => state.getFavourite.data);
  const del = useSelector((state: any) => state.delete.isSuccess);

  useEffect(() => {
    del && dispatch(getFavouriteData());
    setDeleted(false);
  }, [deleted]);

  const deleteAll = () => {
    // closeModal()

    for (var key in fav.data) {
      if (fav.data.hasOwnProperty(key)) {
        console.log('keys', key);
        dispatch(deleteData({ page: 'Favourite', id: key }));
        dispatch(getFavouriteData());
        closeModal();
      }
    }
  };

  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const deleteFav = (delId: any) => {
    dispatch(deleteData({ page: 'Favourite', id: delId }));
    dispatch(getFavouriteData());
  };

  return (
    <>
      <div className="mobileHeader">Favourite</div>
      {fav && fav.data && Object.keys(fav.data).length > 0 ? (
        <div className="favourites">
          <div className="favouritesHeader">
            <div className="favouritesLength">
              {fav &&
                fav.data &&
                Object.keys(fav.data).length > 0 &&
                Object.keys(fav.data).length}{' '}
              City added as favourite
            </div>
            <div className="favouritesRemoveAll" onClick={openModal}>
              Remove All
            </div>
          </div>
          {fav &&
            fav.data &&
            Object.keys(fav.data).length > 0 &&
            Object.keys(fav.data)
              .reverse()
              .map((key: any, i: any) => {
                return (
                  <div className="favouritesBody" key={i}>
                    <div className="favouritesBodyDown">
                      <div
                        className="favPlace"
                        onClick={() => {
                          dispatch(getweather(fav.data[key].id));
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
                          {fav.data[key].temp_c &&
                            fav.data[key].temp_c.toFixed(0)}{' '}
                          <span>{'\u00B0'}C</span>
                        </div>
                        <div className="favCond">
                          {fav.data[key].condition && fav.data[key].condition}
                        </div>
                      </div>
                    </div>
                    <div
                      className="favLike"
                      onClick={() => {
                        deleteFav(key);
                        setDeleted(true);
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
            <button className="modalBtnYes" onClick={deleteAll}>
              Yes
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Favourites;
