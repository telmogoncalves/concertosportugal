import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // Reset the database
  await prisma.concert.deleteMany()
  await prisma.artist.deleteMany()
  await prisma.venue.deleteMany()

  const venues = [
    {
      slug: 'altice-arena-lisboa',
      name: 'Altice Arena',
      description:
        'A MEO Arena é o maior espaço de eventos de Lisboa, com 25 anos de experiência e um forte compromisso social e ambiental, que pode acolher uma enorme variedade de eventos como concertos, espectáculos familiares, festivais, congressos, reuniões corporativas, lançamentos de produtos, seminários de tamanhos diferentes - com alta qualidade e total versatilidade e flexibilidade. Em plena zona moderna do Parque das Nações, junto à margem do rio Tejo, a apenas 10 minutos do aeroporto internacional de Lisboa, beneficia de uma ampla oferta de serviços, desde a rede de transportes de Lisboa, incluindo estações de metro, autocarros e comboios, e de uma enorme variedade de hotéis.',
      address: 'Rossio dos Olivais, Lote 2.13.01A',
      city: 'Lisboa',
      zip: '1990-231',
      capacity: 20000,
      image: 'https://imperdivel.pt/wp-content/uploads/2023/06/Altice-Arena.jpg',
    },
    {
      slug: 'parque-urbano-do-tejo-e-do-trancao',
      name: 'Parque Urbano do Tejo e do Trancão',
      description:
        'O Parque Urbano do Tejo e do Trancão é um parque urbano em Lisboa, Portugal. O parque foi inaugurado em 2010 e é um dos maiores parques urbanos da cidade. O parque oferece uma variedade de atividades ao ar livre, incluindo trilhas para caminhada e ciclismo, áreas de piquenique, playgrounds e muito mais.',
      address: 'Rua Cintura do Porto de Lisboa',
      city: 'Lisboa',
      zip: '1950-376',
      capacity: 5000,
      image: 'https://www.masqueticket.com/storage/thumb/F0000000343_mapa_final_salas.webp',
    },
    {
      slug: 'lav-lisboa-ao-vivo',
      name: 'LAV - Lisboa ao Vivo',
      description:
        'O Lisboa ao Vivo é um espaço de eventos em Lisboa, Portugal. O espaço é conhecido por sua programação diversificada, que inclui concertos, festivais, festas e muito mais. O Lisboa ao Vivo é um local popular para shows ao vivo e eventos culturais em Lisboa.',
      address: 'Rua do Bojador',
      city: 'Lisboa',
      zip: '1990-027',
      capacity: 3000,
      image:
        'https://scontent.flis11-1.fna.fbcdn.net/v/t31.18172-8/19221703_797404483753885_2739342194578023239_o.jpg?_nc_cat=105&ccb=1-7&_nc_sid=5f2048&_nc_ohc=A6OQ7sVPUgYQ7kNvgHrVhas&_nc_ht=scontent.flis11-1.fna&oh=00_AYDxOUjb6Vi4U5GBnHLm9wkuWxGwcXQ4GZlDZOu_HgKcIA&oe=667DE7BD',
    },
  ]

  const artists = [
    {
      slug: 'dave-matthews-band',
      name: 'Dave Matthews Band',
      description:
        'Formada em 1991 nos Estados Unidos, a Dave Matthews Band é conhecida pelo seu estilo único que mistura rock, jazz, folk e funk. A banda é famosa pelas suas performances ao vivo enérgicas e improvisadas, tendo lançado vários álbuns de sucesso como "Crash" e "Before These Crowded Streets".',
      image: 'https://ogimg.infoglobo.com.br/in/23983717-bbc-61d/FT1086A/dave-matthews.jpeg.jpg',
    },
    {
      slug: 'vanessa-da-mata',
      name: 'Vanessa da Mata',
      description:
        'Vanessa da Mata é uma cantora e compositora brasileira que se tornou conhecida por suas canções de MPB e pop. Ela lançou vários álbuns de sucesso como "Sim" e "Essa Boneca Tem Manual".',
      image:
        'https://cdn.ibahia.com/img/inline/290000/1200x720/Vanessa-da-Mata-apresenta-show-comemorativo-dos-200029715500202306291540-7.webp?fallback=https%3A%2F%2Fcdn.ibahia.com%2Fimg%2Finline%2F290000%2FVanessa-da-Mata-apresenta-show-comemorativo-dos-200029715500202306291540.jpg%3Fxid%3D1337319&xid=1337319',
    },
    {
      slug: 'ed-sheeran',
      name: 'Ed Sheeran',
      description:
        'Edward Christopher Sheeran, mais conhecido como Ed Sheeran, é um cantor e compositor britânico. Ele é conhecido por suas baladas pop e folk, e já lançou vários álbuns de sucesso como "÷" e "x".',
      image:
        'https://www.apple.com/newsroom/images/product/music/standard/Apple-Music-Live-Ed-Sheeran-with-guitar_big.jpg.large.jpg',
    },
    {
      slug: 'olivia-rodrigo',
      name: 'Olivia Rodrigo',
      description:
        'Olivia Isabel Rodrigo é uma cantora e compositora americana. Ela é conhecida por suas canções de pop e rock, e já lançou vários singles de sucesso como "drivers license" e "good 4 u".',
      image:
        'https://img.nzz.ch/2024/01/30/06acb60b-0d27-4f41-9060-4f707a049da9.jpeg?width=1360&height=1495&fit=bounds&quality=75&auto=webp&crop=2774,3048,x0,y655',
    },
    {
      slug: 'all-them-witches',
      name: 'All Them Witches',
      description:
        'All Them Witches é uma banda de rock psicodélico de Nashville, Tennessee. A banda é conhecida por sua mistura única de rock, blues, psicodelia e música country, e já lançou vários álbuns de sucesso como "Dying Surfer Meets His Maker" e "Sleeping Through the War".',
      image: 'https://lightning100.com/wp-content/uploads/all-them-witches-nashville.jpg',
    },
  ]

  for (const venue of venues) {
    await prisma.venue.create({ data: venue })
  }

  for (const artist of artists) {
    await prisma.artist.create({ data: artist })
  }

  const dave = await prisma.artist.findFirst({ where: { slug: 'dave-matthews-band' } })
  const vanessa = await prisma.artist.findFirst({ where: { slug: 'vanessa-da-mata' } })
  const ed = await prisma.artist.findFirst({ where: { slug: 'ed-sheeran' } })
  const olivia = await prisma.artist.findFirst({ where: { slug: 'olivia-rodrigo' } })
  const allThemWitches = await prisma.artist.findFirst({ where: { slug: 'all-them-witches' } })

  const altice = await prisma.venue.findFirst({ where: { slug: 'altice-arena-lisboa' } })
  const parque = await prisma.venue.findFirst({ where: { slug: 'parque-urbano-do-tejo-e-do-trancao' } })
  const lav = await prisma.venue.findFirst({ where: { slug: 'lav-lisboa-ao-vivo' } })

  const concerts = [
    {
      name: 'Dave Matthews Band',
      slug: 'dave-matthews-band-lisboa-2024',
      date: new Date('2024-05-05'),
      artistId: dave?.id as string,
      venueId: altice?.id as string,
    },
    {
      name: 'Vanessa da Mata',
      slug: 'vanessa-da-mata-lisboa-2024',
      date: new Date('2024-05-09'),
      artistId: vanessa?.id as string,
      venueId: altice?.id as string,
    },
    {
      name: 'Ed Sheeran',
      slug: 'ed-sheeran-lisboa-2024',
      date: new Date('2024-06-16'),
      artistId: ed?.id as string,
      venueId: parque?.id as string,
    },
    {
      name: 'Olivia Rodrigo com Remi Wolf',
      slug: 'olivia-rodrigo-remi-wolf-lisboa-2024-1',
      date: new Date('2024-06-22'),
      artistId: olivia?.id as string,
      venueId: altice?.id as string,
    },
    {
      name: 'Olivia Rodrigo com Remi Wolf',
      slug: 'olivia-rodrigo-remi-wolf-lisboa-2024-2',
      date: new Date('2024-06-23'),
      artistId: olivia?.id as string,
      venueId: altice?.id as string,
    },
    {
      name: 'All Them Witches',
      slug: 'all-them-witches-lisboa-2024',
      date: new Date('2024-06-23'),
      artistId: allThemWitches?.id as string,
      venueId: lav?.id as string,
    },
  ]

  for (const concert of concerts) {
    await prisma.concert.create({ data: concert })
  }
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
