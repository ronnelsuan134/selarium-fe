export const checkIfAuthenticated = () => {
  return localStorage.getItem('isAuthenticated') ?? false
}
