<template>
    <div id="header">
        <h2>留言部分</h2>
    </div>
    <div id="chat_box">
        <p v-for="chat in chat_list">{{chat.name}} {{chat.time}}<br />{{chat.content}}</p>
    </div>
    <div id="input_box">
        <input type="text" v-model="name" placeholder="请输入称呼" />
        <input type="text" v-model= "content" placeholder="请输入要发送的内容" />
        <button @click.prevent="send">发送内容</button>
    </div>
</template>

<script>
    new Vue({
        data: {
            ws: null,
            name: "",
            time: "",
            content: "",
            chat_list: []
        },
        mounted: function () {
            this.ws = new WebSocket("ws://localhost:3000")
            this.ws.onopen = function () {
                console.log("留言框连接成功。")
            }
            var _this = this
            this.ws.onmessage = function (ev) {
                var chat = JSON.parse(ev.data)
                _this.chat_list.push(chat)
            }
        },
        methods: {
            get_time() {
                let yy = new Date().getFullYear()
                let mm = new Date().getMonth() + 1
                let dd = new Date().getDate()
                let hh = new Date().getHours()
                let mf = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes()
                let ss = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds()
                time = yy + '/' + mm + '/' + dd + ' ' + hh + ':' + mf + ':' + ss
            },
            send() {
                this.get_time()
                var data = {
                    name: this.name,
                    content: this.content
                }
                this.ws.send(JSON.stringify(data))
            }
        }
    })
</script>