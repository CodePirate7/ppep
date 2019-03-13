layui.use(['element', 'carousel'], function () {
    var element = layui.element;
    var carousel = layui.carousel;
    let $ = layui.$;
    //建造轮播实例
    carousel.render({
        elem: '#test1',
        width: '100%', //设置容器宽度
        arrow: 'always', //始终显示箭头
        height: '370px'
        //,anim: 'updown' //切换动画方式
    });
    //this
    let $items = $('.layui-col-sm1')
    $items.on("mouseover", function () {
        $items.eq(0).removeClass("this");
    })
    $items.on("mouseout", function () {
        $items.eq(0).addClass("this");
    })
    //按钮
    let $sm1 = $('.layui-col-sm1');
    let $sm3 = $('.layui-col-sm3');
    let WindowWidth = $(window).width();
    if (WindowWidth < 1071) {
        $sm1.addClass('collapse');
        $sm3.eq(1).addClass('collapse');
        let $btn = $('#btn1');
        $btn.removeClass("collapse-btn");
        $btn.on('click', function () {
            if ($sm1.hasClass('collapse') && $sm3.eq(1).hasClass('collapse')) {
                $sm1.removeClass('collapse');
                $sm3.eq(1).removeClass('collapse');
            } else {
                $sm1.addClass('collapse');
                $sm3.eq(1).addClass('collapse');
            }
        })
    }

    console.log(WindowWidth);

});