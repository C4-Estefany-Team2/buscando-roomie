import Link from 'next/link'
import style from '../styles/Components/Header.module.scss'
import { useState, useEffect } from 'react'

const Header = (props) => {
  const { modal } = props
  const [islogged, setislogged] = useState(false)
  const [change, setchange] = useState(0)
  const [usuario, setusuario] = useState(user())
  function user () {
    try {
      const user = JSON.parse(sessionStorage.getItem('usuario'))
      return user
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    console.log(islogged)
    console.log(usuario.user)
  }, [change])

  try {
    console.log('usurio:', !(usuario.user === '1'))
    if (!(usuario.user === '1') && change === 0) {
      console.log('logueado: ', usuario)
      setusuario(usuario)
      if (change === 0) {
        setchange(1)
        console.log('change', change)
        setislogged(true)
      }
    }
  } catch (error) {
    console.log(error)
  }

  console.log(islogged)
  const handleRegister = () => {
    modal(1)
  }

  const handleLogin = () => {
    modal(2)
  }

  return (
    <>
      <div className={`${['fade-in-down header']}`}>
        <div className={`${style['header-bar']}`}>
          <Link href='/'>
            <a><div className={`${style['header-bar-img-logo']}`}></div></a>
          </Link>
          <label
            className={`${style['fa-bars']}`}
            id={`${style['slide-nav-button']}`}
            htmlFor='menu'
          >
            <span>
              <img src='/menu.svg' alt='menu' />
            </span>
          </label>
        </div>
        <nav
          id={`${style['slide-menu']}`}
          className={`${style['slide-menu-nav']}`}
        >
          <input
            type='checkbox'
            id='menu'
            className={`${style['font-menu']}`}
          />
          <ul className={`${style['nav-list']}`}>
            {islogged
              ? <>
                <li className={`${style['nav-list-item']}`}>
                  <a>Anuncia un cuarto</a>
                </li>
                <li className={`${style['nav-list-item']}`}>
                  <a>Perfil</a>
                </li>
                <li className={`${style['nav-list-item']}`}>
                  <a>Cerrar sesión</a>
                </li>
              </>
              : <>
                <li className={`${style['nav-list-item']}`}>
                  <a onClick={handleRegister}>Regístrate</a>
                </li>
                <li className={`${style['nav-list-item']}`}>
                  <a onClick={handleLogin}>Ingresa</a>
                </li>
              </>
            }
          </ul>
        </nav>
      </div>
    </>
  )
}

export default Header
