export default async function authHeader() {
  const token = window.localstorage.getItem('token');
  if (token) {
    return {
      authorization: 'Bearer ' + JSON.parse(token)
    };
  } else {
    return {};
  }
}