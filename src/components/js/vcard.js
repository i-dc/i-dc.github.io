import ButtonCopy from "@/components/ButtonCopy";
import ShareBlock from "@/components/ShareBlock";
import {translate} from "@/utils/general";
import userData from "@/data/user_data";
import socials from "@/data/socials";
import QRCode from "qrcode";
import {getMapLink, getDistance, getWalkingTime, beautifyDistance, getRouteLink} from "@/utils/geo";

export default {
    name: "Vcard",
    components: {
        ButtonCopy,
        ShareBlock
    },
    computed: {
        language: {
            get() {
                return this.$store.state.language;
            },
            set(language) {
                this.$store.commit("language_set", language);
            }
        },
        telegram_link() {
            return `https://t.me/${userData["phone"]["messengers"]["telegram"]}`;
        },
        whatsapp_link() {
            return `whatsapp://send/?phone=+${userData["phone"]["value"]["short"]}`;
        },
        vcard_link() {
            return this["appPath"] + process.env.VUE_APP_VCARD_SRC;
        },
        subway_link() {
            return `https://yandex.ru/metro/moscow`;
        },
        qr_content() {
            return location["href"];
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
            return QRCode.toCanvas(canvas, this["qr_content"]);
        },
        setFullName() {

        },
        getMapLink,
        translate
    },
    mounted() {
        this.generateQr();

        this["userData"]["work"].map(work => {
            if (!work["coords"] || !work["location"]["subway"] || !work["location"]["subway"]["coords"]) {
                return work;
            }

            let distance, walkingTime;
            distance = getDistance(work["coords"], work["location"]["subway"]["coords"]);
            walkingTime = getWalkingTime(distance);

            work["location"]["subway"]["distance"]["time"] = walkingTime;
            work["location"]["subway"]["distance"]["value"] = beautifyDistance(distance);
            if (work["location"]["subway"]["type"] === "moscow-mcd") {
                work["location"]["subway"]["distance"]["time"] += " " + translate("from_station");
                work["location"]["subway"]["distance"]["value"] += " " + translate("from_station");
            } else {
                work["location"]["subway"]["distance"]["time"] += " " + translate("from_subway");
                work["location"]["subway"]["distance"]["value"] += " " + translate("from_subway");
            }

            work["location"]["subway"]["route_link"] = getRouteLink(work["coords"], work["location"]["subway"]["coords"]);

            return work;
        });

        this["work"] = this["userData"]["work"][this["userData"]["work"]["length"] - 1];
        this["ready"] = true;

        const nameParts = [];
        ["first_name", "last_name"].forEach(part => {
            if (part in this["userData"] && this["userData"][part]) {
                nameParts.push(this["userData"][part][this["language"]]);
            }
        });

        userData["full_name"] = nameParts.join(" ");
        document.title = userData["full_name"];
    }
};
