import { json } from '@sveltejs/kit'

import db from '$lib/db'

/** @type {import('./$types').RequestHandler} */
export async function GET() {
  const data = [
    {
      name: 'Rival Sons',
      slug: 'rival-sons',
      description:
        "Rival Sons é uma banda de rock americana formada em Long Beach, Califórnia, em 2009. A banda é conhecida por seu som blues rock com influências de hard rock e rock psicodélico. Eles ganharam reconhecimento com álbuns como 'Pressure & Time' e 'Feral Roots', e são conhecidos por suas performances energéticas ao vivo.",
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Rival_Sons_-_Ilosaarirock_2019_-_02.jpg/800px-Rival_Sons_-_Ilosaarirock_2019_-_02.jpg',
    },
    {
      name: 'The Legendary Tigerman',
      slug: 'the-legendary-tigerman',
      description:
        "The Legendary Tigerman é o alter ego de Paulo Furtado, um músico português conhecido por seu estilo de blues e rock'n'roll. Atuando como um one-man band, ele utiliza guitarra, bateria e gaita para criar um som autêntico e energético. Suas performances são marcadas por uma presença de palco intensa e cativante.",
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/The_Legendary_Tigerman_by_Teresa_Cristina.jpg/800px-The_Legendary_Tigerman_by_Teresa_Cristina.jpg',
    },
    {
      name: 'Blind Zero',
      slug: 'blind-zero',
      description:
        "Blind Zero é uma banda de rock portuguesa formada no Porto em 1994. Eles se destacaram na cena musical com seu álbum de estreia 'Trigger' e continuaram a ganhar popularidade com trabalhos subsequentes. A banda é conhecida por seu som alternativo e letras introspectivas.",
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Blind_Zero_2011.jpg/800px-Blind_Zero_2011.jpg',
    },
    {
      name: 'Peste & Sida',
      slug: 'peste-e-sida',
      description:
        "Peste & Sida é uma banda de punk rock portuguesa formada em 1986. Conhecidos por suas letras irreverentes e críticas sociais, eles são uma das bandas mais icônicas da cena punk portuguesa. Seus álbuns como 'Veneno' e 'Portem-se Bem' são considerados clássicos do punk rock lusitano.",
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Peste_&_Sida.jpg/800px-Peste_&_Sida.jpg',
    },
  ]

  await db.artist.createMany({
    data: data,
  })

  return json({ status: 200, message: 'Artists created successfully' })
}
