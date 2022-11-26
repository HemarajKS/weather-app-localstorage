import React, { useEffect, useState } from 'react';

import Modal from 'react-modal';
import './recent.css';

import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getweather } from '../../redux/reducers/weatherSlice';
import { recentDel } from '../../redux/reducers/recentSlice';
import { favouriteAdd } from '../../redux/reducers/favSlice';

const Recent = () => {
  const dispatch = useDispatch();
  const recentData = useSelector((state: any) => state.recent.value);
  const favData = useSelector((state: any) => state.fav.value);
  const tempUnit = useSelector((state: any) => state.tempUnit.value);

  console.log('recent data', recentData);

  useEffect(() => {
    const recentData = JSON.parse(localStorage.getItem('recent') || '[]');

    for (let i = 0; i < recentData.length; i++) {
      console.log('ith recent', recentData[i]);
    }

    console.log('recentData', recentData);
  }, []);

  const navigate = useNavigate();

  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  console.log('recent data', localStorage.getItem('recent'));

  return (
    <>
      <div className="mobileHeader">Recent Search</div>
      {recentData && recentData.length > 0 ? (
        <>
          <div className="favouritesHeader">
            <div className="favouritesLength">You recently searched for</div>
            <div className="favouritesRemoveAll" onClick={openModal}>
              Clear All
            </div>
          </div>
          <div className="favourites">
            {recentData.map((key: any, i: any) => {
              let x = false;
              favData.some((ele: any, i: any) => {
                console.log('ele', ele);
                if (
                  ele.location.name === (key && key.location.name) &&
                  ele.location.lat === (key && key.location.lat) &&
                  ele.location.lon === (key && key.location.lon)
                ) {
                  x = true;
                }
              });

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
                      {key.location.name}, {key.location.region}
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
                        {key.current.condition.text}
                      </div>
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
                        onClick={() => {
                          dispatch(favouriteAdd(key));
                        }}
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
                <button
                  className="modalBtnYes"
                  onClick={() => {
                    dispatch(recentDel());
                  }}
                >
                  Yes
                </button>
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
