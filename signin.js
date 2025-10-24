const md = window.markdownit();
md.use(window.texmath.use(window.katex), {
    engine: window.katex,
    delimiters: 'dollars',
    katexOptions: { macros: { "\\RR": "\\mathbb{R}" } }
});

function check_other_char(str)
{
    var arr = ["\\", ">", "<"];
    for (var i = 0; i < arr.length; i++)
        for (var j = 0; j < str.length; j++)
            if (arr[i] == str.charAt(j)) return false;
    return true;
}

async function sign_in() {
    const userName = document.getElementById("name_text").value;
    const priKey = document.getElementById("prikey_text").value;
    if (userName == "") alert("错误：用户名为空");
    else if (!check_other_char(userName)) alert("错误：用户名不得包含 '\\' '<' '>'");
    else
    {
        const crypt = new JSEncrypt({ default_key_size: 2048 });
        crypt.setPrivateKey(priKey);
        localStorage.setItem("supa_name", userName);
        localStorage.setItem("supa_priKey", priKey);
        const pubKey = crypt.getPublicKey();
        //console.log(pubKey);
        alert('登录成功')
        window.location.reload();
    }
}

async function load() {
    if (localStorage.getItem("supa_name") != null) {
        window.location.replace("/supachat/message.html");
    } else {
        document.getElementById("titler").innerHTML = "登录";
        document.getElementById("container").innerHTML = `
            <div style="text-align: center;">
                <p>忘记 priKey 无法找回账号，或许可以找管理员把 priKey 要回来</p>
                <p>注意：由于本站逻辑，登录成功不意味着可以使用该账号发送消息，您登录后发送的消息可能在无法被他人查看</p>
                <textarea id="name_text" rows="2" cols="20" placeholder="昵称" spellcheck=false></textarea>
                <textarea id="prikey_text" rows="10" placeholder="supa_priKey" spellcheck=false style="width: 100%"></textarea>
                <p style="text-align: right;">或者<a href="/supachat/signup.html">注册</a></p>
                <button onclick="sign_in()">提交</button>
            </div>
        `;
        //console.log("Private Key: ", privateKey);
        //console.log("Public Key: ", publicKey);
    }
}

load();