<style src="./assets/css/material-icons.css"/>
<style src="./assets/css/flags.css"/>
<style src="./components/css/app.css"/>
<script src="./components/js/app.js"/>

<template>
  <v-app>
    <v-main v-show="ready">
      <router-view class="app-content" ref="router-component"/>
      <notifications group="primary" position="top center"/>
      <notifications group="secondary" position="top right"/>
      <notifications group="info" position="bottom right"/>
    </v-main>
  </v-app>
</template>

