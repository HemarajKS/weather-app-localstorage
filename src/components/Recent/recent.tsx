import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Modal from 'react-modal'
import './recent.css'
import { deleteData } from '../../redux/reducers/deleteSlice'
import { getrecentData } from '../../redux/reducers/getRecentSlice'
import { useLocation, useNavigate } from 'react-router-dom'
import { getweather } from '../../redux/reducers/weatherSlice'
import { FavouriteData } from '../../redux/reducers/favouriteSlice'
import { getFavouriteData } from '../../redux/reducers/getFavSlice'
const Recent = () => {
  const [favset, setFavSet] = useState(false)

  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  const fav = useSelector((state: any) => state.getFavourite.data)
  const addFav = useSelector((state: any) => state.Favourite)
  const deleteFav = useSelector((state: any) => state.delete)

  useEffect(() => {
    dispatch(getrecentData())
  }, [])

  const recent: any = useSelector((state: any) => state.getrecent.data)

  useEffect(() => {
    dispatch(getrecentData())
  }, [])

  const [modalIsOpen, setIsOpen] = React.useState(false)

  function openModal() {
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false)
  }

  const deleteAll = () => {
    for (var key in recent.data) {
      if (recent.data.hasOwnProperty(key)) {
        console.log(key)
        dispatch(deleteData({ page: 'recent', id: key }))
        dispatch(getrecentData())
        closeModal()
      }
    }
  }

  // useEffect(() => {
  //   favset && dispatch(getFavouriteData())
  // }, [favset && fav])

  // recent &&
  //   recent.data &&
  //   favData &&
  //   favData.data &&
  //   favData.data &&
  //   Object.keys(favData.data).map((fav: any) => {
  //     let breakCondition = false;
  //     if (
  //       !breakCondition &&
  //       favData.data[fav].id === recent.data[key].id
  //     ) {
  //       breakCondition = true;
  //       return <div>yes</div>;
  //     } else {
  //       breakCondition = true;
  //       return <div>no</div>;
  //     }
  //   });

  // useEffect(() => {
  //   favData &&
  //     favData.data &&
  //     favData.data &&
  //     recent &&
  //     recent.data &&
  //     recent.data &&
  //     console.log('recent fav', favData.data, recent.data)
  // }, [favData])
  useEffect(() => {
    addFav.isSuccess && dispatch(getFavouriteData())
  }, [addFav])

  useEffect(() => {
    dispatch(getFavouriteData())
  }, [deleteFav])

  const arr = recent && recent.data && recent.data && Object.values(recent.data)

  const unique =
    recent &&
    recent.data &&
    recent.data &&
    arr
      .map((e: any) => e['id'])
      .map((e: any, i: any, final: any) => final.indexOf(e) === i && i)
      .filter((obj: any) => arr[obj])
      .map((e: any) => arr[e])

  var myData =
    fav &&
    fav.data &&
    Object.keys(fav.data).map((key) => {
      return fav.data[key].id
    })

  return (
    <>
      <div className="mobileHeader">Recent Search</div>
      {recent && recent.data && recent.data ? (
        <>
          <div className="favourites">
            <div className="favouritesHeader">
              <div className="favouritesLength">You recently searched for</div>
              <div className="favouritesRemoveAll" onClick={openModal}>
                Clear All
              </div>
            </div>
            {recent &&
              recent.data &&
              recent.data &&
              unique.length > 0 &&
              myData &&
              myData.length > 0 &&
              unique.reverse().map((key: any, i: any) => {
                let x = false

                if (myData.includes(key.id)) {
                  x = true
                }
                return (
                  <div className="favouritesBody" key={i}>
                    <div className="favouritesBodyDown">
                      <div
                        className="favPlace"
                        onClick={() => {
                          dispatch(getweather(key.id))
                          navigate('/')
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
                          onClick={() => {
                            Object.keys(fav.data).map((keyy) => {
                              if (fav.data[keyy].id === key.id) {
                                dispatch(
                                  deleteData({ page: 'Favourite', id: keyy }),
                                )
                              }
                            })
                          }}
                        />
                      ) : (
                        <img
                          src={require('../../assets/icons/icon_favourite.png')}
                          alt="fav"
                          width={18}
                          height={18}
                          onClick={() => {
                            console.log('fav', key)
                            dispatch(FavouriteData(key))
                            setFavSet(true)
                          }}
                        />
                      )}
                    </div>
                  </div>
                )
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
                <button className="modalBtnYes" onClick={deleteAll}>
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
  )
}

export default Recent
