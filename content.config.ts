// import { defineCollection, defineContentConfig, z } from '@nuxt/content'

// export default defineContentConfig({
//   collections: {
//     authors: defineCollection({
//       type: 'data',
//       source: 'authors/**.json',
//       schema: z.object({
//         name: z.string(),
//         avatar: z.string(),
//         url: z.string()
//       })
//     })
//   }
// })
import { defineContentConfig, defineCollection } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: '**/*.json' // Change this to target JSON files
    })
  }
})