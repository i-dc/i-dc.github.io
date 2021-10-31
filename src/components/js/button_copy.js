import {translate} from "@/utils/general";

export default {
    name: "button_copy",
    props: {
        content: String,
        onlyIcon: Boolean
    },
    methods: {
        copy() {
            return this.$copy(this.content);
        },
        translate
    }
};
