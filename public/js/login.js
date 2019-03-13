layui.use(['element', 'form'], function () {
    let element = layui.element,
        form = layui.form,
        $ = layui.$;
    //监听form表单
    form.on('submit(formDemo)', data => {
        $.ajax({
            url: '/login',
            method: 'post',
            data: {
                username: data.field.username,
                password: data.field.password
            },
            success(data) {
                layer.alert(data.msg);
                if (data.code === 0) {
                    location.href = "/"
                }
            }
        })
        return false;
    })
    $(() => {
        let WindowWidth = $(window).width() - 30;
        if ($(window).width() < 768) {
            $(".user_form").css('width', WindowWidth + 'px')
        }
        $(window).resize(() => {
            let WindowWidth = $(window).width() - 30;
            if ($(window).width() < 768) {
                $(".user_form").css('width', WindowWidth + 'px')
                if ($(window).width() >= 768) {
                    $(".user_form").css('width', 850 + 'px')
                }
            }
        })
    });
})