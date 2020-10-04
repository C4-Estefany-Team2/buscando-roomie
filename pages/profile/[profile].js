import { useRouter } from 'next/router'
import styles from '../../styles/Components/Profile.module.scss'
import useFetchProfile from '../../hooks/useFetchProfile'

const photoHost = 'https://www.eyescreamproductions.com/allaccess/wp-content/uploads/2012/11/2011DaveGrohlNMEAwardsDC200112.jpg'
const gender = 'Masculino'
const age = 39
const urlbase = 'https://api.whatsapp.com/send?phone='
const chat = '&text=%C2%A1Hola%21%20me%20interesa%20tu%20anuncio%20en%20roomie%20finder'
const phone = 573175736257

const Profile = () => {
  const router = useRouter()
  const { profile } = router.query
  const { data, loading } = useFetchProfile(profile)
  return (
    <>
      {loading ? <h1>Cargando</h1> : (
        <>
          <main className={styles.container}>
            <section className={styles.user}>
              <article className={styles.userData}>
                <img className={styles.photoHost} src={photoHost} alt="Photo host"/>
                <h3> {data.name} </h3>
                <p> {gender}, {age} años </p>
              </article>
              <article className={styles.contactUser}>
                <small>Comunícate con {data.name}</small>
                <article>
                  <a href={`${urlbase}${phone}${chat}`} target='_blank'><img src="/whatsapp.svg" alt=""/></a>
                  <a href="/"><img src="/email.svg" alt=""/></a>
                </article>
              </article>
            </section>
            <section className={styles.about}>
              <h2>Acerca de mí</h2>
              <div className={styles.info}>
                <div>
                  <h3>Cómo soy</h3>
                  <p>{data.soy}</p>
                </div>
                <div>
                  <h3>Qué busco</h3>
                  <p>{data.busco}</p>
                </div>
                <div>
                  <h3>Qué me gusta</h3>
                  <p>{data.gustos}</p>
                </div>
              </div>
            </section>
          </main>
        </>
      )}
    </>
  )
}

export default Profile
