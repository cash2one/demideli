<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    name: 'App'
}
</script>

<style>
html, body, #app, .index {
    background-color: #f2f2f2;
}
body {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #f2f2f2;
    height: 100%;
    overflow-x: hidden;
}
* {
    margin: 0;
    padding: 0;
    color: #2c3e50;
    font-family: Helvetica;
}
li {
    list-style: none;
}
a {
    text-decoration: none;
}
</style>
