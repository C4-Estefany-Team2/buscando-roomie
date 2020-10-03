import style from '../styles/Components/AnnouncingRoom.module.scss'
import { useState } from 'react'

function AnnouncingRoom ({ handleClose, show, modal, props }) {
  const showHideClassName = show ? style.principalContainer : style.displayNone

  const [form, setValues] = useState({
    email: ''
  })

  const handleInput = (event) => {
    setValues({
      ...form,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
  }

  return (
    <div className={showHideClassName}>
      <article className={style.container}>
        <div>
          <span onClick={handleClose}>X</span>
          <h2>Anuncia un cuarto</h2>
          <form onSubmit={handleSubmit}>
            <section>
              <label >Tu foto
                <input type="file" name="" id=""/>
              </label>
              <label >Fotos del cuarto
                <input type="file" name="" id=""/>
              </label>
            </section>
            <section>
              <article>
                <input
                  type="number"
                  placeholder="Precio de la habitación (USD)"
                  required
                  onChange={handleInput}
                />
                <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="10"
                  placeholder="Descripción de la habitación"
                  onChange={handleInput}
                ></textarea>
              </article>
              <article>
                <input type="text" placeholder="Ubicación" required onChange={handleInput}/>
                <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="10"
                  placeholder="Descripción del sector"
                  onChange={handleInput}
                ></textarea>
              </article>
              <article>
                <input type="text" placeholder="Características" required onChange={handleInput}/>
                <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="10"
                  placeholder="Acerca de ti"
                  onChange={handleInput}
                ></textarea>
              </article>
            </section>
            <input type="submit" value="Publicar"/>
          </form>
        </div>
      </article>
    </div>
  )
}

export default AnnouncingRoom
