import styles from '../styles/Components/Home.module.scss'
import Login from '../components/Login'
import Register from '../components/Register'
import Header from '../components/Header'
import Footer from '../components/Footer'
import AnnouncingRoom from '../components/AnnouncingRoom'

import { useState, useEffect } from 'react'

export default function Layout (props) {
  const { children } = props
  const [room, setRoom] = useState([])
  const [dato, setDato] = useState(0)
  let [islogged, setislogged] = useState(false)
  const usuario = user()
  let [login, setLogin] = useState(false)
  let [register, setRegister] = useState(false)
  let [announce, setAnnounce] = useState(false)
  let [reload, setReload] = useState(false)

  useEffect(() => {
    try {
      if (!(usuario.user === '1') && islogged === false) {
        setislogged(islogged = true)
        console.log('log:', islogged)
      }
    } catch (error) {
      console.log(error)
    }
    if (dato === 1) {
      setRegister((register = true))
      setLogin((login = false))
      setAnnounce((announce = false))
    } else if (dato === 2) {
      setLogin((login = true))
      setRegister((register = false))
      setAnnounce((announce = false))
    } else if (dato === 0) {
      setLogin((login = false))
      setRegister((register = false))
      setAnnounce((announce = false))
    } else if (dato === 3) {
      setLogin((login = false))
      setRegister((register = false))
      setAnnounce((announce = true))
    }
  })

  function user () {
    try {
      const user = JSON.parse(sessionStorage.getItem('usuario'))
      return user
    } catch (error) {
      console.log(error)
    }
  }

  function handleLogged (arg) {
    setislogged(arg)
  }

  function showModal (arg) {
    setDato(arg)
  }

  const hideAnnounceModal = () => {
    setAnnounce(false)
    setDato(0)
  }

  const hideLoginModal = () => {
    setLogin(false)
    setDato(0)
  }

  const hideRegisterModal = () => {
    setRegister(false)
    setDato(0)
  }

  function forceReload (arg) {
    console.log('entro al reload', arg)
    setReload(arg)
  }

  return (
    <>
      <Header modal={(arg) => showModal(arg)}
        islog={(arg) => handleLogged(arg)}
        which={islogged}
        force={(arg) => forceReload(arg)}
        reload={reload}/>
      <div className={styles.container}>
        <Login
          show={login}
          handleClose={hideLoginModal}
          modal={(arg) => showModal(arg)}
          force={(arg) => forceReload(arg)}
        />

        <AnnouncingRoom
          show={announce}
          handleClose={hideAnnounceModal}
          modal={(arg) => showModal(arg)}
        />

        <Register
          show={register}
          handleClose={hideRegisterModal}
          modal={(arg) => showModal(arg)}
        />
        {children}
      </div>
      <Footer />
    </>
  )
}
