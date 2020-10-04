import styles from '../styles/Components/Home.module.scss'
import Search from '../components/Search'
import Hero from '../components/Hero'
import Card from '../components/Card'
import useFetchCardRoom from '../hooks/useFetchCardRoom'
import { useRouter } from 'next/router'

export default function Home () {
  const router = useRouter()
  const { rooms } = router.query
  const { room } = useFetchCardRoom(rooms)
  console.log(room)

  return (
    <>
      <Hero
        heroImage={ '/heroImage.png'}
      />
      <main className={styles.father}>
        <Search />
        <section className={styles.main}>
          {room.data?.map((item) => (
            <Card key={item.id} {...item} />
          ))
          }
        </section>
      </main>
    </>
  )
}
