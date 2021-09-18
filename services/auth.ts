import myapi from './myapi'


export async function checkToken(token:string) {
      try {
        const response = await myapi.get("auth", {
          headers: {
            'x-access-token': token,
          }
        })
      if (response.data.token) {
        // console.log(response.data.token);
        const subdata = response.data.token.sub;
        return { user: { id:  subdata.userid, name:  subdata.name, email: subdata.email, scopes: response.data.token.scopes }, auth:  subdata.auth };     
      }
      } catch (err) {
        return { error: err }
      }

}