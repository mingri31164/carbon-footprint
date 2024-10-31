$(function(){
    // 初始化右侧滚动条
    // 这个方法定义在scroll.js中
    resetui()


    //为发送按钮绑定点击事件
    $('#btnSend').on('click',function(){
        var text = $('#ipt').val().trim()
        if(text.length <= 0){
            return $('#ipt').val('')
        }

        //追加内容到页面
        $('#talk_list').append('<li class="right_word"><img src="img/person02.png" /> <span>'+text+'</span></li>')
        $('#ipt').val('')

        //重置滚动条
        resetui()
        getMsg(text)
    })
  })

  function getMsg(text){
        $.ajax({
            method:'GET',
            url:'http://10.34.126.46:8070/user/chat',
            data:{
                msg:text
            },
            success:function(res){
                console.log(res);
                if(res.code === 200){
                    //接收消息
                    var msg = res.data

                    $('#talk_list').append('<li class="left_word"><img src="img/person01.png" /> <span>'+msg+'</span></li>')

                    //重置滚动条
                    resetui()
                    // getVoice(msg)
                }
            }
        })
  }

$('#ipt').on('keyup',function(e){
    e.keyCode
    if(e.keyCode === 13){
        $('#btnSend').click()
    }
})