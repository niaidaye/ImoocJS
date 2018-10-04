// 封装一个getElementById()方法
function byId(id) {
    return typeof (id) === "string" ? document.getElementById(id) : id;
}
// 全局变量
var index = 0,
    timer = null,
    // 获取id为banner下的div标签
    pics = byId("banner").getElementsByTagName("div"),
    // 获取id为dost下的span标签
    dost = byId("dost").getElementsByTagName("span"),
    // 获取，prev的id
    prev = byId("prev"),
    // 获取，next的id
    next = byId("next"),
    len = pics.length,
    // 获取，主菜单
    menu = byId("menu-content"),
    // 获取，主菜单下class为menu-item的数组
    menuItems = menu.getElementsByClassName("menu-item"),
    // 获取，子菜单
    subMenu = byId("sub-menu"),
    // 获取，子菜单下class为inner-box的数组
    innerBoxs = subMenu.getElementsByClassName("inner-box");

function slideImg() {
    var main = byId("main");
    // 鼠标划过清除定时器，离开继续
    main.onmouseover = function () {
        // 鼠标划过清除定时器
        if (timer) {
            clearInterval(timer);
        };
    }
    main.onmouseout = function () {
        timer = setInterval(function () {
            index++;
            if (index >= len) {
                index = 0;
            };
            // 切换图片
            changImg();
        }, 3000);
    }
    // 自动在main上触发鼠标离开的事件
    main.onmouseout();

    // 便利所有原点，绑定点击事件，点击圆点切换图片
    for (let i = 0; i < len; i++) {
        // 给所有span添加一个id的属性值。值为当前span的索引
        dost[i].id = i;
        dost[i].onclick = function () {
            // 改变index为当前span的索引
            index = this.id;
            // 调用changImg()函数
            changImg();
        }
    }
    // 下一张
    next.onclick = function () {
        index++;
        if (index >= len) {
            index = 0;
        }
        changImg();
    }
    // 上一张
    prev.onclick = function () {
        index--;
        if (index < 0) {
            index = len - 1;
        }
        changImg();
    }
    // 导航菜单
    // 遍历子菜单
    for (let i = 0; i < menuItems.length; i++) {
        // 给每一个menu-item定义data-index属性，作为索引
        menuItems[i].setAttribute("data-index", i);
        menuItems[i].onmouseover = function () {
            let idx = this.getAttribute("data-index");
            subMenu.className = "sub-menu";
            // 遍历所有子菜单，将每一个都隐藏
            for (let i = 0; i < innerBoxs.length; i++) {
                innerBoxs[i].style.display = "none";
                menuItems[i].style.background = "none";
            };
            menuItems[idx].style.background = "rgba(0,0,0,0.1)";            
            innerBoxs[idx].style.display = "block";
        };
    }
    // 滑过主菜单，隐藏子菜单
    menu.onmouseout = function () {
        subMenu.className = "sub-menu hide";
    };
    // 移动到子菜单，显示子菜单
    subMenu.onmouseover = function () { 
        this.className = "sub-menu";        
     };
    //  滑过子菜单，隐藏子菜单
    subMenu.onmouseout = function () {
        this.className = "sub-menu hide";
    };
}
// 切换图片
function changImg() {
    // 遍历banner下的div，将其隐藏
    for (let i = 0; i < len; i++) {
        // 遍历banner下的div，将其隐藏
        pics[i].style.display = "none";
        // 遍历dots下的所有span，将span清除类
        dost[i].className = "";
    }
    // 更具index索引找到当前的div，将其显示
    pics[index].style.display = "block";
    // 更具index索引找到当前的span，将其显示
    dost[index].className = "active"
}

// 计时器
slideImg();