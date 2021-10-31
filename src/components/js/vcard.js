import ButtonCopy from "@/components/ButtonCopy";
import ShareBlock from "@/components/ShareBlock";
import {translate} from "@/utils/general";
import userData from "@/data/user_data";
import socials from "@/data/socials";
import QRCode from "qrcode";
import {beautifyDistance, getDistance, getMapLink, getRouteLink, getWalkingTime} from "@/utils/geo";

export default {
    name: "Vcard",
    components: {
        ButtonCopy,
        ShareBlock
    },
    computed: {
        language() {
            const langs = process.env.VUE_APP_LANG_LIST.split(",");
            if (langs.includes(this.$route.params.lang)) {
                return this.$route.params.lang;
            }

            return process.env.VUE_APP_LANG;
        },
        telegram_link() {
            return `https://t.me/${userData.phone.messengers.telegram}`;
        },
        whatsapp_link() {
            return `https://wa.me/${userData.phone.value.short}`;
        },
        vcard_link() {
            return this.appPath + process.env.VUE_APP_VCARD_SRC;
        },
        subway_link() {
            return `https://yandex.ru/metro/moscow`;
        },
        qr_content() {
            return location.href;
        }
    },
    data: () => ({
        ready: false,
        userData,
        appPath: process.env.NODE_ENV === "production" ? process.env.VUE_APP_PATH : "/",
        work: null,
        socials
    }),
    methods: {
        generateQr() {
            const canvas = document.querySelector(".qr-code");
            return QRCode.toCanvas(canvas, this.qr_content);
        },

        getMapLink,
        translate
    },
    mounted() {
        this.generateQr();
        const work = this.userData.work;

        if (work.coords && work?.location?.subway?.coords) {
            const distance = getDistance(work.coords, work.location.subway.coords);

            work.location.subway.distance.time = getWalkingTime(distance);
            work.location.subway.distance.value = beautifyDistance(distance);
            if (work.location.subway.type === "moscow-mcd") {
                work.location.subway.distance.time += " " + translate("from_station");
                work.location.subway.distance.value += " " + translate("from_station");
            } else {
                work.location.subway.distance.time += " " + translate("from_subway");
                work.location.subway.distance.value += " " + translate("from_subway");
            }

            work.location.subway.route_link = getRouteLink(work.coords, work.location.subway.coords);
        }

        if (work.remote_days) {
            const days = [
                "monday",
                "tuesday",
                "wednesday",
                "thursday",
                "friday",
                "saturday",
                "sunday"
            ], remote = [];

            for (let i = 0; i < 5; i++) {
                if (work.remote_days[i] === 1) {
                    remote.push(days[i]);
                }
            }

            if (remote.length) {
                work.remote = remote;
            }
        }

        this.work = work;
        this.ready = true;

        const nameParts = [];
        ["first_name", "last_name"].forEach(part => {
            if (part in this.userData && this.userData[part]) {
                nameParts.push(this.userData[part][this.language]);
            }
        });

        userData.full_name = nameParts.join(" ");
        document.title = userData.full_name;
    }
};
