import en from '../data/en'
import pt from '../data/pt'

export default async function GetData(): Promise<any> {
  let data = en
  if (typeof document !== 'undefined') {
    document.documentElement.lang = 'en-us'
  }

  if (navigator.language.startsWith('pt')) {
    data = pt
    if (typeof document !== 'undefined') {
      document.documentElement.lang = 'pt'
    }
  }
  return data
}
