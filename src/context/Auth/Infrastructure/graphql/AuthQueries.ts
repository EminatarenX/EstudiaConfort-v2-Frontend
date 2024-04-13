export const REGISTRATION_QUERY = (email: string, password: string) => ({
  query: `
  mutation CreateUser($input: UserInput) {
    createUser(input: $input) {
      code
      message
      status
      user {
        email
        createdAt
        id
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
})

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
                    water
                    topic
                    topic_salida
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
          topic
          topic_salida
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

export const EDIT_ROOM_MUTATION = (payload: { name: string, topic: string, topic_salida: string, roomId: string }) => ({
  query: `
    mutation Update($input: updateInput) {
      updateRoom(input: $input) {
        code
        success
        message
        room {
          id
        name
        topic
        topic_salida
        userId
        water
        }
      }
    }
  `,
  variables:{
    input: {
      ...payload
    }
  }
})

export const DELETE_ROOM_MUTATION = (roomId: string) => ({
  query: `
    mutation DeleteRoom($input: RoomId) {
      deleteRoom(input: $input) {
        code
        message
        success
      }
    }
  `,
  variables: {
    input: {
      roomId
    }
  }
})

export const CREATE_ROOM_MUTATION = (payload: { name: string, topic: string, topic_salida: string }) => ({
  query: `
    mutation CreateRoom($input: RoomInput) {
      createRoom(input: $input) {
        id
        name
        topic,
        topic_salida
        userId
      }
    }
  `,
  variables: {
    input: {
      ...payload
    }
  }
})