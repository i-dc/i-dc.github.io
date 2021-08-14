<style src="./css/share_block.css"/>
<script src="./js/share_block.js"/>

<template>
  <v-dialog max-width="700" v-model="dialog">
    <template v-slot:activator="{on, attrs}">
      <v-btn class="head-share" text :title="translate('share')" v-bind="attrs" v-on="on">
        <span class="share-icon"></span>
      </v-btn>
    </template>
    <v-card class="help-dialog">
      <v-card-title class="headline">
        <span class="share-icon"></span>
        <span class="headline__full">{{translate("share_page")}}</span>
        <span class="headline__short">{{translate("share")}}</span>
        <i class="headline__close material-icons" :title="translate('close')" v-on:click="dialog = false">close</i>
      </v-card-title>
      <v-card-text>
        <v-row class="share-block__url">
          <div class="share-block__label">
            <v-icon>link</v-icon>
            {{translate('page_link')}}
          </div>
          <div class="share-url">
            <div class="share-block__link" :title="translate('_share_page_copy')" v-on:click="$copy(page_link)" v-ripple="{class: `success--text`}">{{page_link}}</div>
            <div class="share-block__copy">
              <button-copy :content="page_link" :title="translate('_share_page_copy')"/>
            </div>
          </div>
          <div class="share-list">
            <span class="share-list__label">{{translate("share_socials")}}</span>
            <a class="share-social" :class="`share_${social}`" :href="link" :key="`share-${social}`" target="_blank" :title="translate(`share_${social}`)" v-for="(link, social) in share_links"></a>
          </div>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
