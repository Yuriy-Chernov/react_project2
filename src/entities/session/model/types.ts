type User = {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  gender: string
  image: string
}

type LoginResponse = User & {
  accessToken: string
  refreshToken: string
}

function toUser(response: LoginResponse): User {
  return {
    id: response.id,
    username: response.username,
    email: response.email,
    firstName: response.firstName,
    lastName: response.lastName,
    gender: response.gender,
    image: response.image,
  }
}

export type { LoginResponse, User }
export { toUser }
