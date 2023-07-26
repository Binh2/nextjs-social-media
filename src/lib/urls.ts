const user = (handle?: string | null, path='') => (handle ? `/user/${handle}${path}` : `/u${path}`)
const aboutUser = (handle?: string | null, path='') => <string>user(handle, `/about${path}`) 

export { user, aboutUser }