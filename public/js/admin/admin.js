layui.use(['table', 'element', 'form'], function () {
    let element = layui.element;
    let $ = layui.$;
    let table = layui.table;
    let form = layui.form;
    table.render({
        elem: '#test',
        url: '/admin/user/',
        method: 'post',
        cellMinWidth: 100,
        cols: [
            [{
                    field: 'username',
                    title: '用户名',
                    aligin: 'center'
                },
                {
                    field: "password",
                    title: "用户密码",
                    aligin: "center",
                    edit: "test"
                },
                {
                    field: 'major',
                    title: '专业',
                    aligin: 'center',
                },
                {
                    field: 'ismanager',
                    title: '管理员权限',
                    aligin: 'center',
                    templet: d => {
                        return `<input type="checkbox" name="ismanager" value="${d._id}" lay-skin="switch" lay-text="可用|不可用" lay-filter="ismanagerDemo" ${d.ismanager === true ? 'checked' : ''}>`

                    }
                }
            ]
        ],
        page: true
    });

    //重置密码
    table.on('edit(demo)', function (obj) {
        $.ajax({
            url: 'admin/user/repassword',
            method: 'post',
            data: {
                newpassword: obj.value,
                _id: obj.data._id
            },
            success(res) {
                res.code === 0 && layer.tips(res.data)
                res.code === 1 && layer.alert(res.data, function () {
                    window.location.reload()
                })
            }

        })
    });

    //选项卡头像浮动清除
    (function () {
        let aLi = $('.layui-tab-title li');
        console.log(aLi);
    }());

    //监听管理员权限
    form.on('switch(ismanagerDemo)', function (obj) {
        $.ajax({
            url: '/admin/user/ismanager',
            method: 'post',
            data: {
                _id: this.value,
                ismanager: obj.elem.checked
            },
            success(res) {
                console.log(res);
                res.code === 0 && layer.tips(res.data, obj.othis)
                res.code === 1 && layer.alert(res.data, function () {
                    window.location.reload()
                })
            }
        })
    })
});