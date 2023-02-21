new Vue({
  el: '#app',
  data: {
    messages: [],
    newMessage: '',
    disabled: false
  },
  created: function () {
  },
  methods: {
    sendMessage: function () {
      if (this.newMessage) {
        this.messages.push({type: "Q", msg: this.newMessage})
        const content = this.newMessage.slice()

        this.newMessage = ''

        let that = this;
        that.disabled = true
        // 使用jQuery库发送POST请求
        $.ajax({
          type: 'POST',
          url: '/api/chat/question',
          timeout: 60000,
          jsonp: true,
          data: {content},
          success: (res) => {
            // 处理返回的数据
            if (res.code && res.code == 200) {
              that.messages.push({type: "A", msg: res.data})
            } else {
              that.messages.push({type: "A", msg: "An error occurred, please try again"})
            }
            that.disabled = false
          },
          error: (err) => {
            // 处理请求出错的情况
            that.messages.push({type: "A", msg: err.messages || "An error occurred, please try again"})
            that.disabled = false
          }
        })
      }
    }
  }
});