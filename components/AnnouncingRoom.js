import style from '../styles/Components/AnnouncingRoom.module.scss'
import { useState, useEffect } from 'react'
import axios from 'axios'

function AnnouncingRoom ({ handleClose, show, modal, props }) {
  const showHideClassName = show ? style.principalContainer : style.displayNone
  const usuario = JSON.parse(localStorage.getItem('usuario'))

  const [form, setValues] = useState({
    profileImg: '',
    roomImg: '',
    cost: '',
    location: '',
    roomDescription: '',
    locationDesc: '',
    Wc: false,
    Wifi: false,
    Desayuno: false,
    Lavanderia: false,
    Telefono: false,
    Tv: false,
    idHost: parseInt(usuario.user.id),
    hostName: usuario.user.name
  })

  const handleInput = (event) => {
    setValues({
      ...form,
      [event.target.name]: event.target.value
    })
  }

  const handleFile = (event) => {
    if (event.target.name === 'profileImg') {
      setValues({
        ...form,
        [event.target.name]: event.target.files[0].name
      })
    } else {
      const files = [...event.target.files]
      for (let i = 0; i < files.length; i++) {
        files[i] = files[i].name
      }
      console.log(files)
      setValues({
        ...form,
        [event.target.name]: files
      })
    }

    console.log(form)
  }

  const handleCheck = (event) => {
    const inputs = document.getElementsByTagName('input')
    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].getAttribute('type') === 'checkbox') {
        console.log(`${inputs[i].name}: ${inputs[i].checked}`)
        setValues({
          ...form,
          [event.target.name]: event.target.checked
        })
      }
    }
    console.log(form)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const url = 'http://localhost:8080/api/rooms'
    axios({
      method: 'post',
      url: url,
      data: {
        name: 'habitación',
        ocupation: '2',
        photoHost: [form.profileImg, 'aaaaaah'],
        images: form.roomImg,
        price: form.cost,
        location: form.location,
        description: form.roomDescription,
        DescriptionLocal: form.locationDesc,
        Wc: form.Wc,
        Wifi: form.Wifi,
        Desayuno: form.Desayuno,
        Lavanderia: form.Lavanderia,
        Telefono: form.Telefono,
        Tv: form.tv,
        idHost: form.idHost,
        nameHost: form.hostName,
        createdAt: Date.now()
      }
    }).then((res) => {
      console.log(res)
    }).catch((error) => {
      console.log(error)
    })
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
                <input type='file'
                  name='profileImg'
                  accept="image/*"
                  onChange={handleFile}/>
              </label>
              <label >Fotos del cuarto
                <input type='file'
                  name='roomImg'
                  accept="image/*"
                  multiple="multiple"
                  onChange={handleFile}/>
              </label>
            </section>
            <section>
              <article>
                <input
                  type="number"
                  placeholder="Precio de la habitación (USD)"
                  name='cost'
                  required
                  onChange={handleInput}
                />
                <textarea
                  name="roomDescription"
                  cols="30"
                  rows="10"
                  placeholder="Descripción de la habitación"
                  onChange={handleInput}
                ></textarea>
              </article>
              <article>
                <input type="text"
                  placeholder="Ubicación"
                  name='location'
                  required
                  onChange={handleInput}/>
                <textarea
                  name="locationDesc"
                  cols="30"
                  rows="10"
                  placeholder="Descripción del sector"
                  onChange={handleInput}
                ></textarea>
              </article>
              <article>
                <label>Servicios</label>
                <section >
                  <label >TV <input type="checkbox" name="Tv" onChange={handleCheck}/></label>
                  <label >Telefono <input type="checkbox" name="Telefono" onChange={handleCheck}/></label>
                  <label >WC <input type="checkbox" name="Wc" onChange={handleCheck}/></label>
                  <label >Desayuno <input type="checkbox" name="Desayuno" onChange={handleCheck}/></label>
                  <label >Wifi <input type="checkbox" name="Wifi" onChange={handleCheck}/></label>
                  <label >Lavanderia <input type="checkbox" name="Lavanderia" onChange={handleCheck}/></label>
                </section>
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
