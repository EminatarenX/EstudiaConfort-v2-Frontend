export const LOGIN_QUERY = (email: string, password: string) => {
  return {
    query: `
            mutation Auth($input: UserInput) {
                auth(input: $input) {
                  code
                  message
                  status
                  user {
                    id
                    email
                    jwt
}
                  
                }
            }
            `,
    variables: {
      input: {
        email,
        password
      }
    }
  }
}

export const GET_ALL_ROOMS_QUERY = () => {
  return {
    query: `
            query findRooms {
                findRooms{
                    id
                    name
                    tools {
                      id
                      state
                      roomId
                      name
                    }
                    userId
                  
                }
            }
        `,
  }
}


export const GET_ROOM_QUERY = (id: string) => {
  return {
    query: `
      query FindRoom($input: findRoomInput) {
        findRoom(input: $input) {
          id
          name
          water
          userId
        }
      }
        `,
    variables: {
      input: {
          roomId: id
      }
    }
  }
}

export const WATER_INTERRUPTOR_MUTATION = (roomId: string, payload: { water_bomb: number}) => ({
  query: `
  mutation Mutation($input: WaterInterruptorInput!) {
    waterInterruptor(input: $input) {
      code
      message
      success
    }
  }
  `,
  variables: {
    input: {
      roomId,
      payload
    }
  }
})