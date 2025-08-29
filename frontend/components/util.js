
export const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'

export function authHeader(){
  if (typeof window==='undefined') return {}
  const token = localStorage.getItem('token')
  return token ? { 'Authorization': 'Bearer ' + token } : {}
}
