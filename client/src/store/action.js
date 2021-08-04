const login=(name)=>{

    const user = name
    return{
        type:"LOGIN",
        payload:user ? user:'',
    }
}

export{login};