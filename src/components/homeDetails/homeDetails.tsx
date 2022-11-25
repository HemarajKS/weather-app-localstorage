import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Switch from 'react-switch'
import { deleteData } from '../../redux/reducers/deleteSlice'
import { FavouriteData } from '../../redux/reducers/favouriteSlice'
import { getFavouriteData } from '../../redux/reducers/getFavSlice'
import './homeDetails.css'

const HomeDetails = () => {
  useEffect(() => {
    dispatch(getFavouriteData())
  }, [])

  const dispatch = useDispatch()
  const [checked, setChecked] = useState(true)
  const [favExist, setfavExist] = useState(false)
  const [currentkey, setcurrentkey] = useState('')
  const weather: any = useSelector((state: any) => state.search)
  const fav: any = useSelector((state: any) => state.getFavourite.data)
  const favouritePost = useSelector((state: any) => state.Favourite.data)

  useEffect(() => {
    dispatch(getFavouriteData())
  }, [weather])

  const handleChange = (nextChecked: boolean) => {
    setChecked(nextChecked)
  }

  useEffect(() => {
    fav && fav.data && whetherLiked()
    dispatch(getFavouriteData())
  }, [weather && weather.search && weather, fav && fav.data])

  const whetherLiked = () => {
    for (var i = 0; i < Object.keys(fav.data).length; i++) {
      if (fav.data[Object.keys(fav.data)[i]].id === weather.search.id) {
        setfavExist(true)

        return
      } else {
        setfavExist(false)
      }
    }
  }

  useEffect(() => {
    dispatch(getFavouriteData())
  }, [favExist, dispatch])

  const [date, setDate] = useState(new Date())

  function refreshClock() {
    setDate(new Date())
  }
  useEffect(() => {
    const timerId = setInterval(refreshClock, 1000)
    return function cleanup() {
      clearInterval(timerId)
    }
  }, [])

  useEffect(() => {
    dispatch(getFavouriteData())
  }, [setfavExist])

  return (
    <div className="homeBodyContainer">
      <div className="HomePage">
        <div className="HomePagebodyTabTime">
          {' '}
          <span>
            {' '}
            {date.toLocaleString('en-us', {
              weekday: 'short',
            })}
            , {date.getDate()}{' '}
            {date.toLocaleString('en-us', {
              month: 'short',
            })}{' '}
            {date.getFullYear()}
            &nbsp;&nbsp;&nbsp;
            {date.toLocaleString('en-US', {
              hour: 'numeric',
              minute: 'numeric',
              hour12: true,
            })}
          </span>
        </div>
        {weather && weather.search && (
          <div className="homePagePlace">
            {weather.search.place + ' , ' + weather.search.region}
          </div>
        )}
        {weather && weather.search && (
          <>
            {favExist ? (
              <div
                className="homePageFav"
                onClick={() => {
                  console.log('remove', weather.search, fav.data)
                  console.log('removeee', Object.keys(fav.data))
                  for (var i = 0; i < Object.keys(fav.data).length; i++) {
                    console.log(
                      fav.data[Object.keys(fav.data)[i]].id,
                      weather.search.id,
                    )
                    if (
                      fav.data[Object.keys(fav.data)[i]].id ===
                      weather.search.id
                    ) {
                      setfavExist(false)
                      console.log('current key', Object.keys(fav.data)[i])
                      dispatch(
                        deleteData({
                          page: 'Favourite',
                          id: Object.keys(fav.data)[i],
                        }),
                      )
                      return
                    }
                  }
                }}
              >
                <div className="homePageFavIcon">
                  <img
                    src={require('../../assets/icons/icon_favourite_Active.png')}
                    alt="Favourite"
                    width={25}
                  />
                </div>
                <div className="homePageFavText" style={{ color: '#FAD05B' }}>
                  Added to favourite
                </div>
              </div>
            ) : (
              <div
                className="homePageFav"
                onClick={() => {
                  let arr: any = []
                  dispatch(FavouriteData(weather.search))
                  console.log('remove', weather.search, fav.data)
                  console.log('removeee', Object.keys(fav.data))
                  for (var i = 0; i < Object.keys(fav.data).length; i++) {
                    console.log(
                      fav.data[Object.keys(fav.data)[i]].id,
                      weather.search.id,
                    )
                    if (
                      fav.data[Object.keys(fav.data)[i]].id ===
                      weather.search.id
                    ) {
                      arr.push('exist')
                      setfavExist(true)
                      return
                    }
                  }
                  if (arr.includes('exist')) {
                    alert()
                  } else {
                  }
                }}
              >
                <div className="homePageFavIcon">
                  <img
                    src={require(`../../assets/icons/icon_favourite.png`)}
                    alt="Favourite"
                  />
                </div>
                <div className="homePageFavText">Add to favourite</div>
              </div>
            )}
          </>
        )}
        {weather && weather.search && (
          <div className="homePageWeather">
            <div className="homePageWeatherIcon">
              <img
                src={weather.search.icon}
                alt="Weather"
                className="homePageWeatherIcon"
              />
            </div>
            <div className="homePageWeatherTemperature">
              <div className="homePageWeatherTemp">
                {' '}
                {checked
                  ? weather.search.temp_f.toFixed(0) + '\u00B0'
                  : weather.search.temp_c.toFixed(0) + '\u00B0'}{' '}
              </div>
              <div className="homePageWeatherUnit">
                <Switch
                  borderRadius={4}
                  onChange={handleChange}
                  checked={checked}
                  className="react-switch"
                  offColor="transparent"
                  onColor="transparent"
                  uncheckedHandleIcon={
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                        fontSize: 18,
                        color: 'red',
                      }}
                    >
                      {'\u00B0'}C
                    </div>
                  }
                  uncheckedIcon={
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                        fontSize: 18,
                        paddingRight: 2,
                        color: 'white',
                        zIndex: '2',
                      }}
                    >
                      {'\u00B0'}F
                    </div>
                  }
                  checkedIcon={
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                        fontSize: 18,
                        paddingRight: 2,
                        color: 'white',
                      }}
                    >
                      {'\u00B0'}C
                    </div>
                  }
                  checkedHandleIcon={
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                        color: 'red',
                        fontSize: 18,
                      }}
                    >
                      {'\u00B0'}F
                    </div>
                  }
                />
              </div>
            </div>
            <div className="homePageWeatherText">
              {weather.search.condition}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default HomeDetails
