import Carousel from '../../components/Carousel'
import { useRouter } from 'next/router'
import styles from '../../styles/Components/Room.module.scss'
import useFetchRoom from '../../hooks/useFetchRoom'
import PageLoading from '../../components/PageLoading'

const urlbase = 'https://api.whatsapp.com/send?phone='
const chat = '&text=%C2%A1Hola%21%20me%20interesa%20tu%20anuncio%20en%20roomie%20finder'

const Room = () => {
  const router = useRouter()
  const { room } = router.query
  const { data, loading } = useFetchRoom(room)

  return (
    <>
      {loading ? <PageLoading /> : (
        <>
          <Carousel images={data.images}/>
          <section className={styles.containerDetails}>
            <article className={styles.infoRoom}>
              <h2>{data.name}</h2>
              <h2><span>${data.price} MXN </span> en {data.location}</h2>
              <h2>Sobre la habitación</h2>
              <p>{data.description}</p>
              <h2>Servicios</h2>
              <ul>
                {data.wc ? <li><span><img src="/wc.png" alt="baño privado"/> Baño privado</span></li> : <></>}
                {data.Wifi ? <li><span><img src="/wifi.png" alt="Wifi"/> Wifi</span></li> : <></>}
                {data.desyuno ? <li><span><img src="/breakfast.png" alt="Desayuno"/> Desayuno</span></li> : <></>}
                {data.Lacanderia ? <li><span><img src="/laundry.png" alt="Lavanderia"/> Lavanderia</span></li> : <></>}
                {data.telefono ? <li><span><img src="/phone.png" alt="Teléfono"/> Teléfono</span></li> : <></>}
              </ul>
              <h2>Sobre la ubicación</h2>
              <p>{data.DescriptionLocal}</p>
            </article>
            <article className={styles.infoHost}>
              <h2>{data.nameHost} {data.edadHost} años</h2>
              <img
                className={styles.photoHost}
                src={data.Perfil[0]}
                alt="Photo host"
              />
              <small>¿Te gustó la habitación?</small>
              <small>Ponerse en contacto</small>
              <span>
                <a href={`${urlbase}${data.telefonoHost}${chat}`} target='_blank' rel='noreferrer'><img src="/whatsapp.svg" alt="whatsapp"/></a>
                <a
                  href={`mailto:${data.correoHost}?subject=Roomie Finder match&body=Estoy interesado en tu habitación de Roomie Finder`}
                  target='_blank' rel='noreferrer'
                >
                  <img src="/email.svg"alt="email"/>
                </a>
              </span>
            </article>
          </section>
        </>
      )}
    </>
  )
}

export default Room
