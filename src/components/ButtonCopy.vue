<style src="./css/button_copy.css"/>
<script src="./js/button_copy.js"/>
<template>
    <v-btn class="button-copy text-transform-none" color="white" text :title="translate('copy')" v-ripple v-on:click="copy">
        <i class="material-icons button-copy__icon">content_copy</i>
        <span class="button-copy__label" v-if="!onlyIcon">{{translate("copy")}}</span>
    </v-btn>
</template>
