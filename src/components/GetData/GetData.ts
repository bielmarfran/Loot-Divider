import { useState, useEffect } from 'react'
import en from '../../data/en'
import pt from '../../data/pt'

export default function GetData(): any {
  const [data, setData] = useState(en)
  if (typeof document !== 'undefined') {
    document.documentElement.lang = 'en-us'
  }

  useEffect(() => {
    if (navigator.language.startsWith('pt')) {
      setData(pt)
      if (typeof document !== 'undefined') {
        document.documentElement.lang = 'pt'
      }
    }
  }, [])

  return data
}
