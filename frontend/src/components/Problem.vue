<template>
    <div>
        <h1>题目部分</h1>
        <h2>{{ title }}</h2>
        <p>{{ content }}</p>
    </div>
</template>
<script>
export default {
    name: 'Problem',
    data: function() {
        return {
            title: '',
            content: ''
        }
    },
    created: function() {
        const self = this
        fetch('http://localhost:3000/', {
            method: 'GET',
            mode: 'cors'
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(json) {
            self.title = json['data']['title']
            self.content = json['data']['content']
        });
    }
}
</script>