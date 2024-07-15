
const submitBtn = document.querySelector("[data-submit]");
const passkeyInp = document.querySelector("[data-passkey]");

submitBtn.onclick = async(e) => {
    const key = passkeyInp.value;
    let res = await App.signup(key);

    if (res)
    {
        localStorage.setItem("vermaMobKey",key);
        setTimeout(()=>{
            location.replace("index.html");
        },600);
    }else {
        alert("Invalid Passkey!");
    }

}