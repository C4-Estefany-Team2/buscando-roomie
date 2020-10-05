import Link from 'next/link'
import { Component } from 'react'
import style from '../styles/Components/Header.module.scss'

class Header extends Component {
  constructor (props) {
    super(props)
    this.handleAnnounce = this.handleAnnounce.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
    this.handleSession = this.handleSession.bind(this)
    this.handleRegister = this.handleRegister.bind(this)
    this.reload = this.reload.bind(this)
  }

  handleRegister () {
    this.props.modal(1)
  }

  // console.log( 'header:' , which)

  handleLogin () {
    this.props.modal(2)
  }

  handleAnnounce () {
    this.props.modal(3)
  }

  handleSession () {
    sessionStorage.setItem('usuario', JSON.stringify({
      user: '1'
    }))
    this.props.islog(false)
  }

  reload (arg) {
    console.log(arg);
    this.forceUpdate()
  }

  render () {
    if (this.props.reload) {
      this.props.force(!this.props.reload)
      console.log('antes de convertir:', this.props.reload)
      this.reload(1)
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
              {this.props.which
                ? <>
                  <li className={`${style['nav-list-item']}`}>
                    <a onClick={this.handleAnnounce}>Anuncia un cuarto</a>
                  </li>
                  <li className={`${style['nav-list-item']}`}>
                    <a onClick={this.handleSession}>Cerrar sesión</a>
                  </li>
                </>
                : <>
                  <li className={`${style['nav-list-item']}`}>
                    <a onClick={this.handleRegister}>Regístrate</a>
                  </li>
                  <li className={`${style['nav-list-item']}`}>
                    <a onClick={this.handleLogin}>Ingresa</a>
                  </li>
                </>
              }
            </ul>
          </nav>
        </div>
      </>
    )
  }
}

export default Header
