new Vue({
  el: '#app',
  data: {
    messages: [],
    newMessage: '',
    loading: false
  },
  created: function () {
  },
  methods: {
    sendMessage: function () {
      if (this.newMessage) {
        this.messages.push({type: "Q", msg: this.newMessage})
        const content = this.newMessage.slice()
        this.newMessage = ''
        this.loading = true
        let that = this;
        // 使用jQuery库发送POST请求
        $.ajax({
          type: 'POST',
          url: '/api/chat/question',
          timeout: 60000,
          jsonp: true,
          data: {content},
          success: function (res) {
            // console.log(res)
            // 处理返回的数据
            if (res.code && res.code == 200) {
              that.messages.push({type: "A", msg: res.data})
            } else {
              that.messages.push({type: "A", msg: "An error occurred, please try again"})
            }
            that.loading = false
          },
          error: function (err) {
            console.log(err)
            // 处理请求出错的情况
            that.messages.push({type: "A", msg: err.messages || "An error occurred, please try again"})
            that.loading = false
          }
        })
      }
    }
  }
});