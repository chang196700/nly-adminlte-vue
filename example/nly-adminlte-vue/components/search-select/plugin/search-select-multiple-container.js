import Vue from "../../../utils/vue";
// import { mergeData } from "vue-functional-data-merge";
import { isFunction } from "../../../utils/inspect";
import { NlySearchSelectMultipleItem } from "./search-select-multiple-item";

const name = "NlySearchSelectMultipleContainer";

export const props = {
  open: {
    type: Boolean,
    default: false
  },
  focus: {
    type: Boolean,
    default: false
  },
  below: {
    type: Boolean,
    default: null
  },
  onwer: {
    type: String,
    default: null,
    required: true
  },
  value: {
    type: Array,
    default: undefined
  },
  placeholder: {
    type: String,
    default: "Choice a field"
  },
  inputFunction: {
    type: Function
  }
};

export const NlySearchSelectMultipleContainer = Vue.extend({
  name: name,
  model: {
    prop: "value",
    event: "change"
  },
  props,
  computed: {
    customProps() {
      return {
        open: this.open,
        focus: this.focus,
        below: this.below,
        onwer: this.onwer,
        value: this.value,
        placeholder: this.placeholder
      };
    },
    isItemInputFunction() {
      // console.log(111, isFunction(this.isInputFunction));
      return isFunction(this.inputFunction);
    }
  },
  render(h) {
    console.log(this.value, this.isItemInputFunction);
    var self = this;
    const $single = h(
      "span",
      {
        staticClass: "select2-selection select2-selection--multiple",
        attrs: {
          role: "combobox",
          "aria-haspopup": true,
          "aria-expanded": self.customProps.open ? true : false,
          tabindex: "0",
          "aria-disabled": "false",
          "aria-labelledby": `${self.customProps.onwer}-container`,
          "aria-owns": self.customProps.open
            ? `${self.customProps.onwer}-results`
            : null
        }
      },
      [
        h(NlySearchSelectMultipleItem, {
          props: {
            value: self.customProps.value,
            placeholder: self.customProps.placeholder,
            inputFunction: self.isItemInputFunction ? self.inputFunction : null
          },
          directives: [
            {
              name: "model",
              rawName: "v-model",
              value: self.value,
              expression: "value"
            }
          ]
        })
      ]
    );

    const $selection = h("span", { staticClass: "selection" }, [$single]);

    const $dropdown = h("span", {
      staticClass: "dropdown-wrapper",
      attrs: {
        "aria-hidden": true
      }
    });

    return h(
      "span",
      {
        staticClass: "select2 select2-container select2-container--default",
        class: [
          self.customProps.below === true
            ? "select2-container--below"
            : self.customProps.below === false
            ? "select2-container--above"
            : null,
          self.customProps.open ? "select2-container--open" : null,
          self.customProps.open
            ? null
            : self.customProps.focus
            ? "select2-container--focus"
            : null
        ],
        attrs: {
          dir: "ltr"
        },
        style: {
          width: "100%"
        }
      },
      [$selection, $dropdown]
    );
  }
});
