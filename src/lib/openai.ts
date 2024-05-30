import { OpenAI } from 'openai'

import { OPENAI_API_KEY } from '$env/static/private'

export default new OpenAI({ apiKey: OPENAI_API_KEY })
