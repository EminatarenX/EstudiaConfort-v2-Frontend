export const LOGIN_QUERY = (email: string, password: string) =>{
    return {
        query: `
            mutation Auth($input: UserInput) {
                auth(input: $input) {
                email
                id
                jwt
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