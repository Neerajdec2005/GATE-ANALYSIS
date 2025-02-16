

function Message(){
    const name  = 'Niranjan';
    if(name)
        return <h1>Hello {name}</h1>;
    else return <h1>hello world!</h1>;
}

export default Message;