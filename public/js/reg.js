layui.use(['element', 'form', 'layer'], function () {
    let element = layui.element,
        form = layui.form,
        $ = layui.$,
        layer = layui.layer
    $('#form1').submit(e => {
        e.preventDefault();
        $.post("/reg", $('#form1').serialize(), (data, err) => {
            layer.alert(data.msg);
            if (data.code === 0) {
                setTimeout(() => {
                    location.href = "/"
                }, 1000)
            }
        })
    })
    //匹配两次密码是否正确
    let $password = $('.layui-input-block input[name=password]')
    let $password2 = $('.layui-input-block input[name=password2]')
    let $username = $('.layui-input-block input[name=username]')
    $password2.on("blur", function () {
        const pwd = $password.val()
        if ($(this).val() !== pwd) {
            layer.msg("两次密码不一致")
        }
    })
    $username.on("blur", function () {
        if (!(/^[a-z]\w{5,17}$/i.test($username.val()))) {
            layer.msg("用户名必须以字母开头,6~18个字符,不允许出现特殊符号")
        }
    })
    form.verify({
        pass: [
            /^[\w\-\]\\<>,.?/+*=)([{}:;"'&^%$#@!`~|]{6,18}$/, '密码必须6到12位'
        ]
    });
    $(() => {
        let WindowWidth = $(window).width() - 30;
        if ($(window).width() < 768) {
            $(".user_form").css('width', WindowWidth + 'px')
        }
        $(window).resize(() => {
            let WindowWidth = $(window).width() - 30;
            if ($(window).width() < 768) {
                $(".user_form").css('width', WindowWidth + 'px')
            }
            if ($(window).width() >= 768) {
                $(".user_form").css('width', 850 + 'px')
            }
        })
    });
})