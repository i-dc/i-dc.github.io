<style src="./css/vcard.css"/>
<script src="./js/vcard.js"/>

<template>
    <v-card min-width="240" max-width="1400">
      <h1>
        <span class="head-primary">
          <i class="name-icon"></i>
          {{userData["full_name"]}}
        </span>

        <span class="head-secondary">
          <span class="head-socials">
            <template v-for="(name, social) in socials">
              <a class="social" :class="'social_' + social" :href="userData['socials'][social]" :key="'soc-' + social" target="_blank" :title="name" v-if="social in userData['socials'] && userData['socials'][social]"></a>
            </template>
          </span>
          <share-block/>
          <span class="head-messengers">
            <a class="messenger messenger_telegram" :href="telegram_link" :title="translate('write_telegram')" v-if="userData['phone']['messengers']['telegram']"></a>
            <a class="messenger messenger_whatsapp" :href="whatsapp_link" :title="translate('write_whatsapp')" v-if="userData['phone']['messengers']['whatsapp']"></a>
          </span>
        </span>
      </h1>
      <div class="post-head"></div>
      <h4 v-if="work"><i :class="'info-icon material-icons position_' + work['position']['icon']">{{work["position"]["icon"]}}</i> {{work["position"]["name"][language]}}</h4>
      <br>
      <div class="info-container">
        <div :class="'company company_' + work['code']" v-if="work"></div>
        <div class="main-info">
          <div v-if="userData['emails'] && userData['emails']['length']"><i class="info-icon material-icons">mail</i> <span class="info-label">Email:</span>
            <a class="email-link" :href="'mailto:' + userData['emails'][0]" :title="translate('write_to') + ' ' + userData['emails'][0]">{{userData["emails"][0]}}</a>
            <i class="material-icons copy-button" :title="translate('copy')" v-on:click="$copy(userData['emails'][0], 'email_copied')">content_copy</i>
          </div>

          <div><i class="info-icon material-icons">phone</i> <span class="info-label">{{translate("phone")}}:</span>
            <i :class="'operator operator_' + userData['phone']['operator']['code']" :title="userData['phone']['operator']['name'][language]"></i>
            <a class="phone-link" :href="'tel:+' + userData['phone']['value']['short']" :title="translate('phone_call') + ' ' + userData['phone']['value']['formatted']">{{userData["phone"]["value"]["formatted"]}}</a>
            <i class="material-icons copy-button" :title="translate('copy')"  v-on:click="$copy(userData['phone']['value']['formatted'], 'phone_copied')">content_copy</i>
            <span class="messenger-separator"></span>
            <span class="phone-messengers">
              <a class="messenger messenger_telegram" :href="telegram_link" :title="translate('write_telegram')" v-if="userData['phone']['messengers']['telegram']"></a>
              <a class="messenger messenger_whatsapp" :href="whatsapp_link" :title="translate('write_whatsapp')" v-if="userData['phone']['messengers']['whatsapp']"></a>
            </span>
          </div>
          <div v-if="work">
            <div v-if="work['website']">
              <i class="info-icon material-icons">language</i> <span class="info-label">{{translate("website")}}:</span> <a :href="work['website'][language]" target="_blank"> {{work["website"][language]}}</a>
            </div>

            <div class="work-info">
              <div>
                <span :class="'location location_' + work['location']['region']['code']" :title="work['location']['region']['name'][language]" v-if="work['location']['region']"></span>
                <span :class="'location location_' + work['location']['locality']['code']" :title="work['location']['locality']['name'][language]" v-if="work['location']['locality']"></span>
                <a :href="getMapLink(work['coords'])" target="_blank" :title="translate('show_on_map')">{{work["address"][language]}}</a>
              </div>
              <div class="subway" v-if="work['location'] && work['location']['subway']">
                <span :class="'c-icon c-icon_' + work['location']['subway']['type']"></span>
                  <a :href="subway_link + '?' + work['location']['subway']['coords'][1] + ',' + work['location']['subway']['coords'][0]" target="_blank" :title="translate('show_subway_scheme')">
                  {{work["location"]["subway"]["name"][language]}}</a><span class="subway-line-name">, {{work["location"]["subway"]["line"]["name"][language]}}</span>
                <template v-if="work['location']['subway']['type'] === 'moscow-mcd'">
                  <span :class="'c-icon c-icon_' + work['location']['subway']['line']['code']"></span>
                </template>
                <template v-else>
                  <svg class="subway-line-icon" height="10" width="10"><circle cx="5" cy="5" r="5" :fill="'#' + work['location']['subway']['line']['color']"></circle></svg>
                </template>
                <span class="subway-distance">
                  <span class="c-icon c-icon_walk"></span><a :href="work['location']['subway']['route_link']" target="_blank" :title="work['location']['subway']['distance']['value']" v-if="work['location']['subway']['distance']">{{work["location"]["subway"]["distance"]["time"]}}</a>
                </span>
              </div>
            </div>
          </div>
        </div>
        <canvas class="qr-code" v-on:click="$copy(qr_content, 'qr_copied')"></canvas>
    </div>
    <div class="vcard-line">
      <a class="vcard-link" download :href="vcard_link">
        <v-btn class="button-primary text-transform-none" color="white" rounded>
          <i class="info-icon material-icons">person_add</i>
          {{translate("save_contact")}}
        </v-btn>
      </a>
    </div>
  </v-card>
</template>
