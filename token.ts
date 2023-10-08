import { load } from "https://deno.land/std@0.202.0/dotenv/mod.ts"

import { URL_GET_TOKEN } from "./consts.ts"

type TokenResponse = {
    errcode: number,
    access_token: string,
    errmsg: string,
    expires_in: number,
  }
  
  export async function fetchToken(): Promise<string> {
    const token = await getToken()
    if(token!=null){
      return token
    }
    const tokenResponse = await doFetchToken();
    await storeToken(tokenResponse.access_token, tokenResponse.expires_in/2)
    return tokenResponse.access_token
  }
  
  async function doFetchToken(): Promise<TokenResponse> {
    const env = await load();
    const response = await fetch(`${URL_GET_TOKEN}?corpid=${env['corpid']}&corpsecret=${env['corpsecret']}`);
    const token: TokenResponse = await response.json();
    if (token.errcode === 0) {
      return token
    }
    throw new Error(token.errmsg)
  }
  
  async function storeToken(token: string, ttl: number) {
    const kv = await Deno.openKv();
    await kv.set(["token"], token, { expireIn: ttl });
  }
  
  async function getToken(): Promise<string | null> {
    const kv = await Deno.openKv();
    const token = await kv.get<string>(["token"]);
    if (token) {
      return token.value
    }
    return null
  }