import axios from "axios";
import { IAuthRepository } from "../Domain/IAuthRepository";
import { LOGIN_QUERY, GET_ALL_ROOMS_QUERY, GET_ROOM_QUERY, WATER_INTERRUPTOR_MUTATION, EDIT_ROOM_MUTATION, DELETE_ROOM_MUTATION, CREATE_ROOM_MUTATION, REGISTRATION_QUERY } from "./graphql/AuthQueries";

export class AuthRepository implements IAuthRepository {
  private api: any;
  constructor() {
    this.api = axios.create({
      baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}`
    })
  }
  async login(email: string, password: string) {
    const { data } = await this.api.post('/', LOGIN_QUERY(email, password))
    return data;
  }

  async registration(email: string, password: string) {
    const { data } = await this.api.post('/', REGISTRATION_QUERY(email, password))

    return data;
  }

  async getAllRooms(token: string): Promise<any> {
    if (!token) return
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }
    const { data } = await this.api.post('/', GET_ALL_ROOMS_QUERY(), config)
    return data
  }

  async getRoom(token: string, id: string): Promise<any> {
    if (!token) return
    const config = {
      headers: {

        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }

      const { data } = await this.api.post('/', GET_ROOM_QUERY(id), config)
      return data
  }

  async waterInterruptor(token: string, roomId: string, payload: { water_bomb: number }) {
    if (!token) return
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }

    const { data } = await this.api.post('/', WATER_INTERRUPTOR_MUTATION(roomId, payload), config)
    return data
  }

  async editRoom(token: string, payload: { name: string, roomId: string, topic: string, topic_salida: string }) {
    if (!token) return
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }
    const { data } = await this.api.post(`/`, EDIT_ROOM_MUTATION(payload), config)
    return data
  }

  async deleteRoom(token: string, roomId: string): Promise<any> {
      if(token) Promise.reject(false) 
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }

      const { data } = await this.api.post('/', DELETE_ROOM_MUTATION(roomId), config)
      return data
  }

  async createRoom(token: string, payload: { name: string; topic: string; topic_salida: string; }): Promise<any> {
    if (!token) return Promise.reject(false)
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }  
    const { data } = await this.api.post('/', CREATE_ROOM_MUTATION(payload), config)
    return data  
  }
}
