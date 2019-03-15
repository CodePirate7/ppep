layui.use(['table', 'element', 'form','layedit','util'], function () {
    let element = layui.element;
    let $ = layui.$;
    let table = layui.table;
    let form = layui.form;
    let layedit = layui.layedit;
    let util = layui.util;

    //选项卡头像浮动清除
    (function () {
        let aLi = $('.layui-tab-title li');
        console.log(aLi);
    }());
    //-----------------用户管理--------------------
    //用户管理表格渲染
    table.render({
        elem: '#test',
        url: '/admin/user/',
        method: 'post',
        cellMinWidth: 100,
        cols: [
            [{
                    field: 'username',
                    title: '用户名',
                    align: 'center'
                },
                {
                    field: "password",
                    title: "用户密码",
                    align: "center",
                    edit: "test"
                },
                {
                    field: 'major',
                    title: '专业',
                    align: 'center',
                },
                {
                    field: 'ismanager',
                    title: '管理员权限',
                    align: 'center',
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

    //-----------------新闻列表--------------------

    table.render({
        elem: '#news',
        url: '/admin/news/',
        method: 'post',
        cellMinWidth: 80,
        cols: [
            [{
                    field: 'title',
                    title: '标题',
                    align: 'center',
                    
                },
                {
                    field: 'author',
                    title: '发布者',
                    align: 'center',
                    templet: d => {
                        return d.author.username
                    }

                },
                {
                    field: 'time',
                    title: '发布时间',
                    align: 'center',
                    sort:true,
                    templet: d => {
                        return util.timeAgo(new Date(d.time),true)
                    }
                },
                {
                    field: 'tool',
                    title: '操作',
                    align: 'center',
                    toolbar: '#barDel'
                }
                
            ]
        ],
        page: true
    });

    //删除任务
    table.on('tool(demo1)', obj => {
        console.log(obj.data._id);
        $.ajax({
            url: '/admin/news/del',
            method: 'post',
            data: {
                _id: obj.data._id
            },
            success(data) {
                data.code === 1 && layer.tips(data.msg, obj.othis)
                data.code === 0 && layer.alert(data.msg, function () {
                    window.location.reload()
                })
            }

        })
    })


    //-----------------发布新闻--------------------

    //富文本编辑器
    let edit = layedit.build('textedit',{
        uploadImage: {url: '/admin/news/upload/',method: 'post'}
    })

    //新闻内容提交
    form.on('submit(newssubmit)',data =>{
        let field = data.field;
        field.content = layedit.getContent(edit);
        $.ajax({
            url: '/admin/news/add',
            method: 'post',
            data: field,
            success(msg){
                if(msg.code === 0){
                    layer.alert(msg.msg,function(){
                        window.location.reload()
                    }) 
                }
            }
        })
        return false;
    })
    


});