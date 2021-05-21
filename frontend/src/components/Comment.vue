<template>
    <div class="outer_frame">
        <div id="header">
            <h2>留言部分</h2>
        </div>
        <div id="chat_box">
            <p v-for="chat in chat_list" v-bind:key="chat.index">{{chat.name}} {{chat.time}}<br />{{chat.content}}</p>
        </div>
        <div id="input_box">
            <input type="text" v-model="name" placeholder="请输入称呼" />
            <input type="text" v-model="content" placeholder="请输入要发送的内容" />
            <button @click.prevent="send">发送内容</button>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                ws: null,
                name: "",
                time: "",
                content: "",
                chat_list: []
            }
        },
        mounted() {
            this.ws_init();
        },
        methods: {
            ws_init() {
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
            get_time() {
                let yy = new Date().getFullYear()
                let mm = new Date().getMonth() + 1
                let dd = new Date().getDate()
                let hh = new Date().getHours()
                let mf = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes()
                let ss = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds()
                let curr_time = yy + '/' + mm + '/' + dd + ' ' + hh + ':' + mf + ':' + ss
                this.time = curr_time
            },
            send() {
                this.get_time()
                var data = {
                    name: this.name,
                    time: this.time,
                    content: this.content
                }
                this.ws.send(JSON.stringify(data))
            }
        }
    }
</script>