<template>
  <div>
    <h1>题目部分</h1>
    <h2>{{ title }}</h2>
    <p>{{ content }}</p>
  </div>
</template>
<script>
import { inject } from 'vue'
export default {
  name: "Document",
  data: function () {
    return {
      title: "",
      content: "",
      currentUser: inject('CurrentID'),
      Onechat:inject('Onechat'), 
    };
  },
  watch: {
    Onechat:{//判断，当Onechat发生变化时，说明服务器传来了值，这时候判断是否为聊天数据，若是，则增加
      handler(val,oldval){
        console.log("hahahahahahah");
        console.log(oldval);
        var jsObj = JSON.parse(val);
        if(typeof(jsObj.IsPorblem)=="undefined"){
          return;
        }
        console.log("服务端返回的数据:" + event.data);
        this.title=jsObj.title;
        this.content=jsObj.content;  
      },

        deep: true,
    }
  },
  /*
  created: function () {
    const self = this;
    var url =
      "https://virtserver.swaggerhub.com/tootal/codeview/1.0.0/problems";
    fetch(url, {
      method: "GET",
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        self.title = json[0]["title"];
        self.content = json[0]["content"];
      });
  },
  */
};
</script>
